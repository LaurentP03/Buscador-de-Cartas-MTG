# 🧙‍♂️ Buscador de Cartas de Magic: The Gathering

Uma aplicação web para buscar e visualizar cartas do jogo Magic: The Gathering utilizando a API Scryfall.

## 📋 Visão Geral

Este projeto permite aos jogadores e entusiastas de Magic: The Gathering pesquisar facilmente cartas do jogo usando diversos critérios. A aplicação oferece uma interface amigável em português e conecta-se à poderosa API Scryfall para obter dados atualizados e imagens de alta qualidade.

### ✨ Funcionalidades

- **Busca avançada** por nome, tipo, cor, custo de mana e outros parâmetros
- **Autocompletar** com sugestões durante a digitação
- **Visualização em grid** com imagens de alta qualidade das cartas
- **Suporte para cartas de dupla-face** com alternância entre frentes
- **Paginação** para navegar por grandes conjuntos de resultados
- **Design responsivo** para uso em dispositivos móveis e desktop

## 🚀 Tecnologias

- **Frontend**: HTML5, CSS3, JavaScript vanilla
- **Backend**: Node.js + Express
- **API Externa**: [Scryfall API](https://scryfall.com/docs/api)
- **Dependências**: 
  - express (servidor web)
  - node-fetch (requisições HTTP)
  - nodemon (desenvolvimento)

## 🛠️ Instalação

### Pré-requisitos

- Node.js (versão 14.x ou superior)
- npm (incluído na instalação do Node.js)

### Passos para instalação

1. **Clone o repositório**

```bash
git clone https://github.com/seu-usuario/magic-card-search.git
cd magic-card-search
```

2. **Instale as dependências**

```bash
npm install
```

3. **Inicie o servidor**

Para ambiente de produção:
```bash
npm start
```

Para desenvolvimento (com reinício automático):
```bash
npm run dev
```

4. **Acesse a aplicação**

Abra seu navegador e acesse:
```
http://localhost:3000
```

## 💻 Como Usar

1. **Busca básica**: Digite o nome de uma carta (ex. "Black Lotus", "Lightning Bolt")
2. **Busca avançada**: Use operadores de sintaxe especial para refinar sua busca

### 🔍 Operadores de Busca

| Operador | Descrição | Exemplo |
|----------|-----------|---------|
| `t:` | Buscar por tipo | `t:creature` |
| `c:` | Buscar por cor | `c:red` ou `c:rw` (vermelho/branco) |
| `cmc:` | Custo de mana convertido | `cmc=3` ou `cmc>2` |
| `r:` | Raridade | `r:mythic` |
| `set:` | Conjunto/expansão | `set:znr` (Zendikar Rising) |
| `is:` | Propriedades especiais | `is:commander` |

### Exemplos de Busca Avançada

- Criaturas vermelhas: `t:creature c:red`
- Feitiços com custo 2 ou menos: `t:sorcery cmc<=2`
- Planeswalkers míticos: `t:planeswalker r:mythic`
- Terrenos de Zendikar: `t:land set:znr`

## 🔄 API

A aplicação consome a API Scryfall através de dois endpoints principais:

- **GET /api/search?q=TERMO** - Busca cartas baseado no termo
- **GET /api/autocomplete?q=TEXTO** - Sugere nomes de cartas enquanto o usuário digita

## 📁 Estrutura do Projeto

```
magic-card-search/
│
├── assets/
│   ├── css/
│   │   └── styles.css           # Estilos da aplicação
│   │
│   └── js/
│       ├── services/
│       │   └── api.js           # Comunicação com a API
│       │
│       ├── components/
│       │   ├── cardElement.js   # Componente de carta
│       │   ├── pagination.js    # Componente de paginação
│       │   └── searchBar.js     # Componente de busca
│       │
│       ├── utils/
│       │   └── helpers.js       # Funções auxiliares
│       │
│       └── app.js              # Ponto de entrada JavaScript
│
├── index.html                   # Arquivo HTML principal
├── server.js                    # Servidor Express
├── package.json                 # Dependências e scripts
├── .gitignore                   # Arquivos ignorados pelo git
└── README.md                    # Documentação
```

## 🌐 Ambiente de Produção

Para implantar em produção:

1. A aplicação está configurada para usar a variável de ambiente `PORT` ou porta 3000 por padrão
2. Configure corretamente o CORS e segurança se hospedado em domínio separado
3. Considere usar um proxy reverso como Nginx para melhor desempenho

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📜 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👏 Agradecimentos

- [Scryfall](https://scryfall.com/) por fornecer uma API gratuita e completa
- [Wizards of the Coast](https://company.wizards.com/) pela criação do jogo Magic: The Gathering
- Todos os jogadores e entusiastas que compartilham sua paixão pelo jogo

---

Desenvolvido por [Laurent](https://github.com/LaurentP03) © 2025