export default class TabNav {
    // Construtor recebe seletor de menu e seletor de conteúdo como parâmetros
    constructor(menu, content) {
        // Seleciona todos os itens do menu
        this.tabMenu = document.querySelectorAll(menu);
        // Seleciona todos os elementos de conteúdo
        this.tabContent = document.querySelectorAll(content);
        // Classe CSS para a aba ativa
        this.activeClass = 'ativo';
    }

    // Ativa a aba correspondente ao índice fornecido
    activeTab(index) {
        // Remove a classe ativa de todas as seções de conteúdo
        this.tabContent.forEach((section) => {
            section.classList.remove(this.activeClass);
        });

        // Adiciona a classe ativa e a direção à seção de conteúdo correspondente
        const direcao = this.tabContent[index].dataset.anime;
        this.tabContent[index].classList.add(this.activeClass, direcao);
    }

    // Adiciona eventos de clique às abas do menu
    addTabNavEvent() {
        this.tabMenu.forEach((itemMenu, index) => {
            // Adiciona um ouvinte de evento de clique a cada item do menu
            itemMenu.addEventListener('click', () => this.activeTab(index));
        });
    }

    // Inicializa a funcionalidade de navegação por abas
    init() {
        // Verifica se os elementos do menu e conteúdo existem
        if (this.tabMenu.length && this.tabContent.length) {
            // Ativa a primeira aba e adiciona eventos de clique às abas do menu
            this.activeTab(0);
            this.addTabNavEvent();
        }
        // Retorna o objeto para permitir o encadeamento de métodos
        return this;
    }
}
