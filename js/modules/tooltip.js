export default class Tooltip {
    // Construtor da classe Tooltip
    constructor(tooltips) {
        // Seleciona todos os elementos com a classe passada em 'tooltips'
        this.tooltips = document.querySelectorAll(tooltips);

        // Bind do objeto da classe aos callbacks
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseOver = this.onMouseOver.bind(this);
    }

    // Move a tooltip com base em seus estilos
    // de acordo com a posição do mouse
    onMouseMove(event) {
        // Atualiza a posição vertical da tooltip
        this.tooltipBox.style.top = `${event.pageY + 20}px`;

        // Verifica a posição horizontal da tooltip
        // e ajusta para não sair da tela
        if (event.pageX + 240 > window.innerWidth) this.tooltipBox.style.left = `${event.pageX - 190}px`;
        else this.tooltipBox.style.left = `${event.pageX + 20}px`;
    }

    // Remove a tooltipBox e os eventos de mousemove e mouseleave
    onMouseLeave({ currentTarget }) {
        // Remove a tooltipBox
        this.tooltipBox.remove();

        // Remove os eventos de mousemove e mouseleave do elemento
        currentTarget.removeEventListener('mouseleave', this.onMouseLeave);
        currentTarget.removeEventListener('mousemove', this.onMouseMove);
    }

    // Cria a tooltip box e coloca no body
    criarTooltipBox(element) {
        // Cria uma nova div
        const tooltipBox = document.createElement('div');

        // Obtém o atributo aria-label do elemento e seu texto
        const text = element.getAttribute('aria-label');

        // Adiciona a classe 'tooltip' à div criada em tooltipBox
        tooltipBox.classList.add('tooltip');

        // Adiciona o texto do aria-label acima
        tooltipBox.innerText = text;

        // Adiciona o elemento ao final do documento
        document.body.appendChild(tooltipBox);
        this.tooltipBox = tooltipBox;
    }

    // Cria a tooltip e adiciona os eventos
    // de mousemove e mouseleave ao target
    onMouseOver({ currentTarget }) {
        // Cria a tooltipbox e coloca em uma propriedade
        this.criarTooltipBox(currentTarget);

        // Adiciona o evento para o tooltipBox
        // seguir o mouse enquanto ele está sobre o elemento
        currentTarget.addEventListener('mousemove', this.onMouseMove);

        // Adiciona o evento para quando o mouse não estiver no elemento,
        // ou seja, mouseleave, executar a função onMouseLeave
        currentTarget.addEventListener('mouseleave', this.onMouseLeave);
    }

    // Adiciona os eventos de mouseover a cada tooltip do site
    addTooltipsEvent() {
        this.tooltips.forEach((item) => {
            // Adiciona o evento de mouseover ao item
            item.addEventListener('mouseover', this.onMouseOver);
        });
    }

    // Inicializa a classe Tooltip
    init() {
        // Verifica se existem tooltips e adiciona eventos a eles
        if (this.tooltips.length) {
            this.addTooltipsEvent();
        }

        // Retorna a instância atual da classe
        return this;
    }
}
