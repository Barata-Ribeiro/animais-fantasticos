export default class Modal {
    // Construtor recebe seletores do botão de abrir,
    // botão de fechar e contêiner do modal como parâmetros
    constructor(openButton, closeButton, containerModal) {
        // Seleciona o botão de abrir o modal
        this.openButton = document.querySelector(openButton);
        // Seleciona o botão de fechar o modal
        this.closeButton = document.querySelector(closeButton);
        // Seleciona o contêiner do modal
        this.containerModal = document.querySelector(containerModal);

        // Faz o bind do "this" ao callback para fazer referência
        // ao objeto da classe
        this.eventToggleModal = this.eventToggleModal.bind(this);
        this.outsideModal = this.outsideModal.bind(this);
    }

    // Abre ou fecha o modal (alterna a classe "ativo")
    toggleModal() {
        this.containerModal.classList.toggle('ativo');
    }

    // Adiciona o evento de toggle ao modal (abrir/fechar)
    eventToggleModal(event) {
        event.preventDefault(); // Previne o comportamento padrão do evento
        this.toggleModal(); // Chama a função para alternar o modal
    }

    // Fecha o modal quando clicar do lado de fora
    outsideModal(event) {
        // Verifica se o evento foi disparado pelo contêiner do modal
        if (event.target === this.containerModal) {
            this.toggleModal(); // Fecha o modal
        }
    }

    // Adiciona eventos aos elementos do modal (abrir, fechar e clicar fora)
    addModalEvents() {
        this.openButton.addEventListener('click', this.eventToggleModal); // Adiciona o evento de clique ao botão de abrir
        this.closeButton.addEventListener('click', this.eventToggleModal); // Adiciona o evento de clique ao botão de fechar
        this.containerModal.addEventListener('click', this.outsideModal); // Adiciona o evento de clique ao contêiner do modal
    }

    // Inicializa a funcionalidade do modal
    init() {
        // Verifica se os elementos do modal existem
        if (this.openButton && this.closeButton && this.containerModal) {
            this.addModalEvents(); // Adiciona os eventos aos elementos do modal
        }
        return this; // Retorna o objeto para permitir o encadeamento de métodos
    }
}
