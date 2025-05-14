/**
 * Componente que gerencia a paginação dos resultados
 */
const Pagination = {
    // Elementos do DOM
    paginationContainer: null,
    
    // Estado da paginação
    nextPage: null,
    
    /**
     * Inicializa o componente de paginação
     * @param {HTMLElement} container - Elemento contêiner da paginação
     */
    init(container) {
      this.paginationContainer = container;
    },
    
    /**
     * Configura a paginação com base nos dados recebidos
     * @param {Object} data - Dados de resposta da API
     * @param {Function} loadMoreCallback - Função de callback para carregar mais resultados
     */
    setup(data, loadMoreCallback) {
      this.paginationContainer.innerHTML = '';
      
      if (data.has_more && data.next_page) {
        this.nextPage = data.next_page;
        
        const paginationButton = document.createElement('button');
        paginationButton.className = 'pagination-button';
        paginationButton.textContent = 'Carregar mais resultados';
        paginationButton.addEventListener('click', () => loadMoreCallback(this.nextPage));
        
        this.paginationContainer.appendChild(paginationButton);
      } else {
        this.nextPage = null;
      }
    },
    
    /**
     * Exibe uma mensagem de erro na paginação
     * @param {string} errorMessage - Mensagem de erro a ser exibida
     */
    showError(errorMessage) {
      const errorElement = document.createElement('div');
      errorElement.className = 'no-results';
      errorElement.innerHTML = `
        <h3>Erro ao carregar mais resultados</h3>
        <p>${errorMessage}</p>
      `;
      
      this.paginationContainer.innerHTML = '';
      this.paginationContainer.appendChild(errorElement);
    }
  };