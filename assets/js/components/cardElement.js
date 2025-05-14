/**
 * Componente que gerencia a criação e manipulação de elementos de carta
 */
const CardElement = {
    /**
     * Cria um elemento HTML para a carta
     * @param {Object} card - Objeto da carta
     * @returns {HTMLElement} - Elemento DOM da carta
     */
    create(card) {
      const cardElement = document.createElement('div');
      cardElement.className = 'card';
      cardElement.dataset.cardId = card.id || '';
      
      // Verificar se é uma carta de dupla face
      const isDoubleFaced = Helpers.isDoubleFacedCard(card);
      
      // Selecionar a imagem da carta adequada
      let imageUrl;
      let faceIndex = 0;
      
      if (card.image_uris) {
        // Carta normal com apenas uma face
        imageUrl = card.image_uris.normal;
      } else if (isDoubleFaced) {
        // Carta de dupla face
        imageUrl = card.card_faces[0].image_uris.normal;
      } else {
        // Fallback para cartões sem imagem
        imageUrl = 'https://via.placeholder.com/265x370/f0f0f0/888888?text=Imagem+não+disponível';
      }
      
      // Criar HTML básico da carta
      let cardHTML = `
        <img src="${imageUrl}" alt="${card.name}" class="card-image" data-face="${faceIndex}">
        <div class="card-details">
          <h3 class="card-name">${card.name}</h3>
          <p class="card-type">${card.type_line || ''}</p>
          <p class="card-set">${card.set_name || ''}</p>
      `;
      
      // Adicionar botão para alternar faces se for carta dupla
      if (isDoubleFaced) {
        cardHTML += `
          <button class="flip-button" data-card-id="${card.id || ''}">
            Mostrar outra face
          </button>
        `;
      }
      
      cardHTML += `</div>`;
      cardElement.innerHTML = cardHTML;
      
      // Adicionar evento para o botão de flip se existir
      if (isDoubleFaced) {
        const flipButton = cardElement.querySelector('.flip-button');
        flipButton.addEventListener('click', (event) => {
          event.stopPropagation(); // Impedir propagação para o elemento pai
          this.flipCardFace(cardElement, card);
        });
      }
      
      return cardElement;
    },
    
    /**
     * Alterna entre as faces de uma carta de dupla face
     * @param {HTMLElement} cardElement - Elemento DOM da carta
     * @param {Object} card - Objeto da carta
     */
    flipCardFace(cardElement, card) {
      const cardImage = cardElement.querySelector('.card-image');
      const cardName = cardElement.querySelector('.card-name');
      const cardType = cardElement.querySelector('.card-type');
      const currentFace = parseInt(cardImage.dataset.face);
      const newFace = currentFace === 0 ? 1 : 0;
      
      // Atualizar a imagem e o texto para a nova face
      cardImage.src = card.card_faces[newFace].image_uris.normal;
      cardImage.alt = card.card_faces[newFace].name;
      cardImage.dataset.face = newFace;
      
      // Atualizar detalhes da carta
      cardName.textContent = card.card_faces[newFace].name;
      cardType.textContent = card.card_faces[newFace].type_line || '';
      
      // Atualizar texto do botão
      const flipButton = cardElement.querySelector('.flip-button');
      flipButton.textContent = `Mostrar ${newFace === 0 ? 'frente' : 'verso'}`;
    }
  };