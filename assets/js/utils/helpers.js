/**
 * Funções auxiliares gerais
 */
const Helpers = {
    /**
     * Verifica se uma carta tem dupla face
     * @param {Object} card - Objeto da carta
     * @returns {boolean} - Verdadeiro se a carta tem dupla face
     */
    isDoubleFacedCard(card) {
      return card.card_faces && card.card_faces.length > 1 && card.card_faces[0].image_uris;
    },
    
    /**
     * Implementa o debounce para limitar chamadas de função
     * @param {Function} func - Função a ser executada
     * @param {number} wait - Tempo de espera em milissegundos
     * @returns {Function} - Função com debounce aplicado
     */
    debounce(func, wait) {
      let timeout;
      
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    }
  };