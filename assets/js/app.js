/**
 * Aplicação principal - Buscador de cartas de Magic
 */
document.addEventListener('DOMContentLoaded', () => {
    // Elementos do DOM
    const resultsContainer = document.getElementById('results');
    const loadingIndicator = document.getElementById('loading');
    const paginationContainer = document.getElementById('pagination');
    
    // Inicializar componentes
    Pagination.init(paginationContainer);
    
    /**
     * Função principal para pesquisar cartas
     * @param {string} query - Texto da consulta
     */
    async function searchCards(query) {
      try {
        loadingIndicator.style.display = 'flex';
        resultsContainer.innerHTML = '';
        paginationContainer.innerHTML = '';
        
        const data = await ApiService.searchCards(query);
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
    
    /**
     * Carrega a próxima página de resultados
     * @param {string} nextPageUrl - URL da próxima página
     */
    async function loadNextPage(nextPageUrl) {
      try {
        loadingIndicator.style.display = 'flex';
        
        const data = await ApiService.loadNextPage(nextPageUrl);
        
        // Adicionar novos resultados
        data.data.forEach(card => {
          const cardElement = CardElement.create(card);
          resultsContainer.appendChild(cardElement);
        });
        
        // Atualizar paginação
        Pagination.setup(data, loadNextPage);
        
      } catch (error) {
        console.error('Erro ao carregar mais resultados:', error);
        Pagination.showError(error.message);
      } finally {
        loadingIndicator.style.display = 'none';
      }
    }
    
    /**
     * Exibe os resultados da pesquisa
     * @param {Object} data - Dados recebidos da API
     */
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
        const cardElement = CardElement.create(card);
        resultsContainer.appendChild(cardElement);
      });
      
      // Configurar paginação
      Pagination.setup(data, loadNextPage);
    }
    
    // Inicializar barra de pesquisa com callback de pesquisa
    SearchBar.init(searchCards);
  });