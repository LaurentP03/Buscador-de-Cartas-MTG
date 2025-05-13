document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');
  const suggestionsContainer = document.getElementById('suggestions');
  const resultsContainer = document.getElementById('results');
  const loadingIndicator = document.getElementById('loading');
  const paginationContainer = document.getElementById('pagination');
  
  let nextPage = null;
  let debounceTimeout = null;
  
  // Função para pesquisar cartas
  async function searchCards(query) {
    try {
      loadingIndicator.style.display = 'flex';
      resultsContainer.innerHTML = '';
      paginationContainer.innerHTML = '';
      
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error(`Erro na busca: ${response.status}`);
      }
      
      const data = await response.json();
      displayResults(data);
    } catch (error) {
      console.error('Erro ao buscar cartas:', error);
      resultsContainer.innerHTML = `
        <div class="no-results">
          <h3>Erro ao buscar cartas</h3>
          <p>${error.message || 'Verifique sua busca e tente novamente.'}</p>
        </div>
      `;
    } finally {
      loadingIndicator.style.display = 'none';
    }
  }
  
  // Função para buscar sugestões de autocompletar
  async function fetchSuggestions(partial) {
    if (partial.length < 2) {
      suggestionsContainer.style.display = 'none';
      return;
    }
    
    try {
      const response = await fetch(`/api/autocomplete?q=${encodeURIComponent(partial)}`);
      
      if (!response.ok) {
        throw new Error(`Erro nas sugestões: ${response.status}`);
      }
      
      const data = await response.json();
      displaySuggestions(data.data || []);
    } catch (error) {
      console.error('Erro ao buscar sugestões:', error);
      suggestionsContainer.style.display = 'none';
    }
  }
  
  // Função para exibir resultados
  function displayResults(data) {
    if (!data.data || data.data.length === 0) {
      resultsContainer.innerHTML = `
        <div class="no-results">
          <h3>Nenhuma carta encontrada</h3>
          <p>Tente modificar sua busca.</p>
        </div>
      `;
      return;
    }
    
    resultsContainer.innerHTML = '';
    
    data.data.forEach(card => {
      const cardElement = document.createElement('div');
      cardElement.className = 'card';
      
      // Selecionar a imagem da carta (alguns cartões têm faces múltiplas)
      let imageUrl = card.image_uris ? card.image_uris.normal : 
                     (card.card_faces && card.card_faces[0].image_uris ? 
                      card.card_faces[0].image_uris.normal : 
                      'https://via.placeholder.com/265x370/f0f0f0/888888?text=Imagem+não+disponível');
      
      cardElement.innerHTML = `
        <img src="${imageUrl}" alt="${card.name}" class="card-image">
        <div class="card-details">
          <h3 class="card-name">${card.name}</h3>
          <p class="card-type">${card.type_line || ''}</p>
          <p class="card-set">${card.set_name || ''}</p>
        </div>
      `;
      
      cardElement.addEventListener('click', () => {
        window.open(card.scryfall_uri, '_blank');
      });
      
      resultsContainer.appendChild(cardElement);
    });
    
    // Configurar paginação
    if (data.has_more && data.next_page) {
      nextPage = data.next_page;
      
      const paginationButton = document.createElement('button');
      paginationButton.className = 'pagination-button';
      paginationButton.textContent = 'Carregar mais resultados';
      paginationButton.addEventListener('click', () => loadNextPage());
      
      paginationContainer.innerHTML = '';
      paginationContainer.appendChild(paginationButton);
    } else {
      nextPage = null;
      paginationContainer.innerHTML = '';
    }
  }
  
  // Função para carregar a próxima página de resultados
  async function loadNextPage() {
    if (!nextPage) return;
    
    try {
      loadingIndicator.style.display = 'flex';
      
      const response = await fetch(nextPage);
      if (!response.ok) {
        throw new Error(`Erro ao carregar mais resultados: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Adicionar novos resultados
      data.data.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        
        let imageUrl = card.image_uris ? card.image_uris.normal : 
                     (card.card_faces && card.card_faces[0].image_uris ? 
                      card.card_faces[0].image_uris.normal : 
                      'https://via.placeholder.com/265x370/f0f0f0/888888?text=Imagem+não+disponível');
        
        cardElement.innerHTML = `
          <img src="${imageUrl}" alt="${card.name}" class="card-image">
          <div class="card-details">
            <h3 class="card-name">${card.name}</h3>
            <p class="card-type">${card.type_line || ''}</p>
            <p class="card-set">${card.set_name || ''}</p>
          </div>
        `;
        
        cardElement.addEventListener('click', () => {
          window.open(card.scryfall_uri, '_blank');
        });
        
        resultsContainer.appendChild(cardElement);
      });
      
      // Atualizar paginação
      if (data.has_more && data.next_page) {
        nextPage = data.next_page;
      } else {
        nextPage = null;
        paginationContainer.innerHTML = '';
      }
      
    } catch (error) {
      console.error('Erro ao carregar mais resultados:', error);
      
      const errorElement = document.createElement('div');
      errorElement.className = 'no-results';
      errorElement.innerHTML = `
        <h3>Erro ao carregar mais resultados</h3>
        <p>${error.message}</p>
      `;
      
      paginationContainer.innerHTML = '';
      paginationContainer.appendChild(errorElement);
    } finally {
      loadingIndicator.style.display = 'none';
    }
  }
  
  // Função para exibir sugestões
  function displaySuggestions(suggestions) {
    if (suggestions.length === 0) {
      suggestionsContainer.style.display = 'none';
      return;
    }
    
    suggestionsContainer.innerHTML = '';
    
    suggestions.forEach(suggestion => {
      const suggestionItem = document.createElement('div');
      suggestionItem.className = 'suggestion-item';
      suggestionItem.textContent = suggestion;
      
      suggestionItem.addEventListener('click', () => {
        searchInput.value = suggestion;
        suggestionsContainer.style.display = 'none';
        searchCards(suggestion);
      });
      
      suggestionsContainer.appendChild(suggestionItem);
    });
    
    suggestionsContainer.style.display = 'block';
  }
  
  // Event listeners
  searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
      suggestionsContainer.style.display = 'none';
      searchCards(query);
    }
  });
  
  searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      const query = searchInput.value.trim();
      if (query) {
        suggestionsContainer.style.display = 'none';
        searchCards(query);
      }
    }
  });
  
  // Implementar debounce para limitar chamadas à API ao digitar
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim();
    
    // Limpar timeout anterior se existir
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    
    // Configurar novo timeout (300ms)
    debounceTimeout = setTimeout(() => {
      if (query.length >= 2) {
        fetchSuggestions(query);
      } else {
        suggestionsContainer.style.display = 'none';
      }
    }, 300);
  });
  
  // Fechar sugestões ao clicar fora
  document.addEventListener('click', (event) => {
    if (!searchInput.contains(event.target) && !suggestionsContainer.contains(event.target)) {
      suggestionsContainer.style.display = 'none';
    }
  });
  
  // Inicializar com foco no campo de busca
  searchInput.focus();
});
