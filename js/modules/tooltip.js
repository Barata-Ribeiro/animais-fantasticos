export default function Tooltip() {
    const tooltips = document.querySelectorAll('[data-tooltip]');

    const onMouseMove = {
        handleEvent(event) {
            // Para ambos, pega o estilo de top e left e transforma na posição do mouseover + px
            this.tooltipBox.style.top = `${event.pageY + 20}px`;
            this.tooltipBox.style.left = `${event.pageY + 20}px`;
        },
    };

    // Criado um objeto em vez de criar uma função, para organizar o código
    const onMouseLeave = {
        // Precisa ser esse nome declarado para que o evento funcione
        handleEvent() {
            // remove a tooltipBox, this para falar com a tooltipBox
            this.tooltipBox.remove();
            // remove totalmente ambos eventos, eles não existem mais
            this.element.removeEventListener('mouseleave', onMouseLeave);
            this.element.removeEventListener('mousemove', onMouseMove);
        },
    };

    function criarTooltipBox(element) {
        // cria uma div nova
        const tooltipBox = document.createElement('div');
        // pega o atributo aria-label do element e seu texto
        const text = element.getAttribute('aria-label');
        // adiciona a classe 'tooltip' a div criada em tooltipBox
        tooltipBox.classList.add('tooltip');
        // Adiciona o texto do aria-label acima
        tooltipBox.innerText = text;
        // Adiciona o element ao final do documento
        document.body.appendChild(tooltipBox);
        return tooltipBox;
    }

    function onMouseOver() {
        // Parâmetro this pois ele faz referencia ao item do evento no loop
        const tooltipBox = criarTooltipBox(this);

        onMouseMove.tooltipBox = tooltipBox;
        // Evento para o tooltipBox seguir o mouse enquanto ele está sobre o element
        this.addEventListener('mousemove', onMouseMove);
        // Ele vai preencher o objeto com a tooltipBox criada anteriormente
        onMouseLeave.tooltipBox = tooltipBox;
        // this é a div do mapa
        onMouseLeave.element = this;
        // Evento para quando o mouseover não estiver no element,
        // ou seja, mouseleave, executar a função onMouseLeave
        this.addEventListener('mouseleave', onMouseLeave);
    }

    tooltips.forEach((item) => {
        item.addEventListener('mouseover', onMouseOver);
    });
}
