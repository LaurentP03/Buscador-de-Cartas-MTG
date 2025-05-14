/**
 * API Service para comunicação com a Scryfall API
 */
const ApiService = {
    /**
     * Busca cartas de acordo com a consulta
     * @param {string} query - Texto da busca
     * @returns {Promise} - Promise com os resultados da busca
     */
    async searchCards(query) {
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        
        if (!response.ok) {
          throw new Error(`Erro na busca: ${response.status}`);
        }
        
        return await response.json();
      } catch (error) {
        console.error('Erro ao buscar cartas:', error);
        throw error;
      }
    },
    
    /**
     * Busca sugestões de autocompletar
     * @param {string} partial - Texto parcial para sugestões
     * @returns {Promise} - Promise com as sugestões
     */
    async fetchSuggestions(partial) {
      if (partial.length < 2) {
        return { data: [] };
      }
      
      try {
        const response = await fetch(`/api/autocomplete?q=${encodeURIComponent(partial)}`);
        
        if (!response.ok) {
          throw new Error(`Erro nas sugestões: ${response.status}`);
        }
        
        return await response.json();
      } catch (error) {
        console.error('Erro ao buscar sugestões:', error);
        throw error;
      }
    },
    
    /**
     * Carrega a próxima página de resultados
     * @param {string} nextPageUrl - URL da próxima página
     * @returns {Promise} - Promise com os resultados da próxima página
     */
    async loadNextPage(nextPageUrl) {
      try {
        const response = await fetch(nextPageUrl);
        
        if (!response.ok) {
          throw new Error(`Erro ao carregar mais resultados: ${response.status}`);
        }
        
        return await response.json();
      } catch (error) {
        console.error('Erro ao carregar mais resultados:', error);
        throw error;
      }
    }
  };