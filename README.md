# Buscador de Cartas de Magic: The Gathering 🧙‍♂️✨

Um aplicativo web que permite pesquisar e visualizar cartas de Magic: The Gathering utilizando a API Scryfall.

## 📋 Sobre o Projeto

Este aplicativo oferece uma interface amigável para buscar cartas do popular jogo de cartas colecionáveis Magic: The Gathering. Utilizando a API Scryfall, o aplicativo permite que os usuários:

- Pesquisem cartas por nome
- Utilizem filtros avançados como tipo, cor, custo de mana, etc.
- Visualizem imagens das cartas em alta qualidade
- Naveguem pelos resultados da busca com paginação
- Recebam sugestões automáticas ao digitar

## 🚀 Tecnologias Utilizadas

- **Frontend**: HTML, CSS e JavaScript vanilla
- **Backend**: Node.js com Express
- **API**: Scryfall API
- **Dependências**: node-fetch para requisições HTTP no servidor

## 🔧 Instalação e Configuração

### Pré-requisitos

- Node.js (versão 12 ou superior)
- npm (gerenciador de pacotes do Node.js)

### Passos para instalação

1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/magic-card-search.git
   cd magic-card-search
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor:
   ```bash
   npm start
   ```

4. Acesse o aplicativo:
   ```
   http://localhost:3000
   ```

## 🔍 Como Usar

1. Digite o nome de uma carta ou critérios de busca no campo de pesquisa
2. Conforme você digita, aparecerão sugestões automáticas
3. Clique no botão "Buscar" ou pressione Enter para realizar a pesquisa
4. Os resultados serão exibidos como cards com imagens e informações básicas
5. Clique em qualquer carta para ver mais detalhes no site Scryfall
6. Use o botão "Carregar mais resultados" para ver mais cartas

## 🧩 Exemplos de Filtros de Busca

A API Scryfall permite o uso de vários operadores avançados para refinar sua busca:

- `t:creature` - Busca apenas criaturas
- `c:red` - Busca cartas vermelhas
- `cmc>3` - Busca cartas com custo de mana convertido maior que 3
- `is:commander` - Busca cartas que podem ser usadas como comandante
- `set:znr` - Busca cartas da coleção Zendikar Rising

Combine estes filtros para buscas mais específicas, por exemplo:
```
t:creature c:red cmc>3 set:znr
```

## 🔄 API Endpoints

O servidor expõe dois endpoints principais:

- **GET /api/search?q=TERMO** - Busca cartas baseado no termo de pesquisa
- **GET /api/autocomplete?q=TEXTO** - Sugere nomes de cartas com base no texto parcial

Estes endpoints fazem proxy para a API Scryfall, permitindo que o frontend se comunique com ela sem problemas de CORS.

## 📁 Estrutura do Projeto

```
magic-card-search/
│
├── public/
│   ├── index.html     # Página HTML principal
│   ├── styles.css     # Estilos do aplicativo
│   └── script.js      # JavaScript para o frontend
│
├── server.js          # Servidor Express e endpoints da API
│
├── package.json       # Dependências e scripts do projeto
└── README.md          # Documentação
```

## 🛠️ Desenvolvimento

Para iniciar o servidor em modo de desenvolvimento com recarga automática:

```bash
npm run dev
```

## 📜 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para mais detalhes.

## 👏 Agradecimentos

- [Scryfall](https://scryfall.com/) por fornecer uma API gratuita e robusta
- [Wizards of the Coast](https://company.wizards.com/) por criar o Magic: The Gathering

---

Feito por [Laurent](https://github.com/LaurentP03)
