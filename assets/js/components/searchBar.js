/**
 * Componente que gerencia a barra de pesquisa e sugestões
 */
const SearchBar = {
    // Elementos do DOM
    searchInput: null,
    searchButton: null,
    suggestionsContainer: null,
    
    // Estado das sugestões
    debounceTimeout: null,
    
    /**
     * Inicializa o componente de barra de pesquisa
     * @param {Function} searchCallback - Função a ser chamada quando uma pesquisa é realizada
     */
    init(searchCallback) {
      this.searchInput = document.getElementById('search-input');
      this.searchButton = document.getElementById('search-button');
      this.suggestionsContainer = document.getElementById('suggestions');
      
      // Event listeners
      this.searchButton.addEventListener('click', () => {
        const query = this.searchInput.value.trim();
        if (query) {
          this.suggestionsContainer.style.display = 'none';
          searchCallback(query);
        }
      });
      
      this.searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
          const query = this.searchInput.value.trim();
          if (query) {
            this.suggestionsContainer.style.display = 'none';
            searchCallback(query);
          }
        }
      });
      
      // Implementar debounce para limitar chamadas à API ao digitar
      this.searchInput.addEventListener('input', Helpers.debounce(() => {
        const query = this.searchInput.value.trim();
        
        if (query.length >= 2) {
          this.fetchAndDisplaySuggestions(query, searchCallback);
        } else {
          this.suggestionsContainer.style.display = 'none';
        }
      }, 300));
      
      // Fechar sugestões ao clicar fora
      document.addEventListener('click', (event) => {
        if (!this.searchInput.contains(event.target) && !this.suggestionsContainer.contains(event.target)) {
          this.suggestionsContainer.style.display = 'none';
        }
      });
      
      // Inicializar com foco no campo de busca
      this.searchInput.focus();
    },
    
    /**
     * Busca e exibe sugestões de autocompletar
     * @param {string} query - Texto da consulta
     * @param {Function} searchCallback - Função de callback para pesquisa
     */
    async fetchAndDisplaySuggestions(query, searchCallback) {
      try {
        const data = await ApiService.fetchSuggestions(query);
        this.displaySuggestions(data.data || [], searchCallback);
      } catch (error) {
        console.error('Erro ao buscar sugestões:', error);
        this.suggestionsContainer.style.display = 'none';
      }
    },
    
    /**
     * Exibe sugestões de autocompletar
     * @param {Array} suggestions - Lista de sugestões
     * @param {Function} searchCallback - Função de callback para pesquisa
     */
    displaySuggestions(suggestions, searchCallback) {
      if (suggestions.length === 0) {
        this.suggestionsContainer.style.display = 'none';
        return;
      }
      
      this.suggestionsContainer.innerHTML = '';
      
      suggestions.forEach(suggestion => {
        const suggestionItem = document.createElement('div');
        suggestionItem.className = 'suggestion-item';
        suggestionItem.textContent = suggestion;
        
        suggestionItem.addEventListener('click', () => {
          this.searchInput.value = suggestion;
          this.suggestionsContainer.style.display = 'none';
          searchCallback(suggestion);
        });
        
        this.suggestionsContainer.appendChild(suggestionItem);
      });
      
      this.suggestionsContainer.style.display = 'block';
    }
  };