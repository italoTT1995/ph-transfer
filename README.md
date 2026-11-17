# PH Transfer - Site Institucional & Landing Page One-Page

Website oficial e Landing Page de alto padrão desenvolvida para a **PH Transfer** (transporte executivo, transfers e turismo em Belo Horizonte/MG).

## 🎨 Características do Projeto
- **Padrão Visual:** Dark Luxury (`#0d0d0e` / `#151518`), inspirado nas referências de design do Behance (Aroeira Arquitetura) e nos mockups oficiais.
- **Tipografia:** Combinação de modernismo com serifa clássica editorial (`Instrument Serif` itálica + `Plus Jakarta Sans`).
- **Animações & UX:** Efeitos de Scroll Reveal (IntersectionObserver), microinterações nos botões e cards translúcidos (*glassmorphism*).
- **Conversão:** Botões de WhatsApp com mensagens pré-formatadas para orçamentos e agendamentos instantâneos.
- **Responsividade:** 100% otimizado para smartphones, tablets e computadores.

## 📁 Estrutura de Arquivos
```text
ph-transfer-site/
├── index.html           # Estrutura semântica completa das 9 seções
├── styles.css           # Estilos personalizados, efeitos de vidro e animações
├── script.js            # Lógica de scroll reveal, menu mobile, FAQ e WhatsApp
├── README.md            # Documentação e guia de publicação
└── assets/
    └── img/             # Fotos em alta resolução da frota, interior e café Santiago
```

## 🚀 Como Executar Localmente
Basta dar dois cliques no arquivo `index.html` ou abrir no seu navegador favorito (Chrome, Edge, Firefox).

## 🌐 Como Publicar no Cloudflare Pages
1. Acesse o painel do [Cloudflare Dashboard](https://dash.cloudflare.com/) > **Workers & Pages**.
2. Clique em **Create Application** > aba **Pages**.
3. Escolha uma das opções:
   - **Upload Assets:** Basta arrastar a pasta `ph-transfer-site` completa para publicar em 10 segundos.
   - **Connect to Git:** Conecte ao seu repositório no GitHub/GitLab (o Cloudflare faz o deploy automático a cada commit na branch `main`).
