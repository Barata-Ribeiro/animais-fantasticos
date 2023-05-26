import debounce from './debounce.js';

export class Slide {
    constructor(slide, wrapper) {
        // Seleciona os elementos do slides com base no seletor fornecido
        this.slide = document.querySelector(slide);
        this.wrapper = document.querySelector(wrapper);
        // Define o objeto 'dist' para armazenar informações de distância e posição
        this.dist = { finalPosition: 0, startX: 0, movement: 0 };
        // Classe CSS para o slide ativo
        this.activeClass = 'active';
        // Adiciona um novo evento para o slide para atualizar as posições
        this.changeEvent = new Event('changeEvent');
    }

    transition(active) {
        // Define a transição CSS para o slide com base no valor de 'active'
        this.slide.style.transition = active ? 'transform .3s' : '';
    }

    moveSlide(distX) {
        // Atualiza a posição do movimento
        this.dist.movePosition = distX;
        // O valor de 'distX' será usado como o valor do deslocamento do eixo X na transformação CSS
        this.slide.style.transform = `translate3d(${distX}px, 0, 0)`;
    }

    updatePosition(clientX) {
        // Calcula a quantidade de movimento com base na diferença
        // entre a posição inicial e a posição atual do mouse
        this.dist.movement = (this.dist.startX - clientX) * 1.6;
        // Retorna a posição final atualizada do slide
        return this.dist.finalPosition - this.dist.movement;
    }

    onStart(event) {
        let movetype;
        // Verifica se o evento é do tipo'mousedown' ou 'touchmove'
        if (event.type === 'mousedown') {
            event.preventDefault();
            // Armazena a posição inicial do mouse
            this.dist.startX = event.clientX;
            // Seta o tipo do movimento para 'mousemove'
            movetype = 'mousemove';
        } else {
            // Armazena a posição inicial do touch, do primeiro dedo
            this.dist.startX = event.changedTouches[0].clientX;
            // Seta o tipo do movimento para 'touchmove'
            movetype = 'touchmove';
        }
        // Adiciona um eventListener ao elemento wrapper
        this.wrapper.addEventListener(movetype, this.onMove);
        // Desabilita a transição CSS durante o movimento do slide
        this.transition(false);
    }

    onMove(event) {
        // Verifica o tipo do evento e seta a posição final atualizada do slide de acordo com o tipo
        const pointerPosition = event.type === 'mousemove' ? event.clientX : event.changedTouches[0].clientX;
        // Obtém a posição final atualizada do slide
        const finalPosition = this.updatePosition(pointerPosition);
        // Move o slide para a nova posição
        this.moveSlide(finalPosition);
    }

    onEnd(event) {
        // Verifica se o evento e remove o evento de acordo com o tipo
        const movetype = event.type === 'mouseup' ? 'mousemove' : 'touchmove';
        // Remove o eventListener 'mousemove' do 'wrapper' para parar de mover o slide
        this.wrapper.removeEventListener(movetype, this.onMove);
        // Atualiza a posição final com a posição do movimento ao soltar o mouse ou encerrar o toque
        this.dist.finalPosition = this.dist.movePosition;
        // Habilita a transição CSS após o movimento do slide
        this.transition(true);
        // Verifica a posição final para decidir qual slide mostrar
        this.changeSlideOnEnd();
    }

    changeSlideOnEnd() {
        // Verifica se deve mudar de slide com base no movimento final e nos índices do slide
        if (this.dist.movement > 120 && this.index.next !== undefined) {
            this.activeNextSlide();
        } else if (this.dist.movement < -120 && this.index.prev !== undefined) {
            this.activePrevSlide();
        } else {
            // Reverte para o slide ativo se o movimento
            // não foi suficiente para mudar para o próximo ou anterior
            this.changeSlide(this.index.active);
        }
    }

    addSlideEvents() {
        // Adiciona os eventListeners ao wrapper, tanto do mouse
        // quanto do touch, para realizar a mudança de slide.
        this.wrapper.addEventListener('mousedown', this.onStart);
        this.wrapper.addEventListener('mouseup', this.onEnd);
        this.wrapper.addEventListener('touchstart', this.onStart, {
            passive: true,
        });
        this.wrapper.addEventListener('touchend', this.onEnd);
    }

    // Slides config

    slidePosition(slide) {
        // Calcula a posição do slide com base na margem e no tamanho do wrapper
        const margin = (this.wrapper.offsetWidth - slide.offsetWidth) / 2;
        return -(slide.offsetLeft - margin);
    }

    slidesConfig() {
        // Mapeia todos os slides e calcula sua posição inicial em relação ao wrapper
        this.slideArray = [...this.slide.children].map((element) => {
            const position = this.slidePosition(element);
            return { position, element };
        });
    }

    slidesIndexNav(index) {
        // Configura os índices do slide anterior, ativo e próximo
        const last = this.slideArray.length - 1;
        this.index = {
            prev: index ? index - 1 : undefined,
            active: index,
            next: index === last ? undefined : index + 1,
        };
    }

    changeSlide(index) {
        // Move o slide para a posição do slide ativo
        const activeSlide = this.slideArray[index];
        this.moveSlide(activeSlide.position);
        // Atualiza os índices do slide
        this.slidesIndexNav(index);
        // Atualiza a posição final do slide
        this.dist.finalPosition = activeSlide.position;
        // Atualiza a classe ativa para o slide correspondente
        this.changeActiveClass();
        // Vai emitir o evento 'changeEvent'
        this.wrapper.dispatchEvent(this.changeEvent);
    }

    changeActiveClass() {
        this.slideArray.forEach((slide) => slide.element.classList.remove(this.activeClass));
        this.slideArray[this.index.active].element.classList.add(this.activeClass);
    }

    // slide nav

    activePrevSlide() {
        // Ativa o slide anterior
        if (this.index.prev !== undefined) this.changeSlide(this.index.prev);
    }

    activeNextSlide() {
        // Ativa o próximo slide
        if (this.index.next !== undefined) this.changeSlide(this.index.next);
    }

    onResize() {
        // Quando a janela é redimensionada,
        // recalcula as configurações dos slides após um curto atraso
        setTimeout(() => {
            this.slidesConfig();
            this.changeSlide(this.index.active);
        }, 1000);
    }

    addResizeEvent() {
        // Adiciona um eventListener de redimensionamento da janela que chama a função 'onResize'
        window.addEventListener('resize', this.onResize);
    }

    bindEvents() {
        // 'bind' é usado para garantir que 'this' se refira sempre à instância da classe Slide,
        // mesmo quando os métodos são usados como manipuladores de eventos
        this.onStart = this.onStart.bind(this);
        this.onMove = this.onMove.bind(this);
        this.onEnd = this.onEnd.bind(this);

        // Bind da extension
        this.activePrevSlide = this.activePrevSlide.bind(this);
        this.activeNextSlide = this.activeNextSlide.bind(this);

        // Utiliza a função debounce para limitar a frequência com que 'onResize' é chamado
        this.onResize = debounce(this.onResize.bind(this), 200);
    }

    init() {
        this.bindEvents();
        this.transition(true);
        this.addSlideEvents();
        this.slidesConfig();
        this.addResizeEvent();
        this.changeSlide(0);

        // Retorna a instância do objeto Slide para possibilitar a encadeação de métodos
        return this;
    }
}

export default class SlideNav extends Slide {
    constructor(...args) {
        super(...args);
        this.bindControlEvents();
    }

    // Adiciona os botões de prev e next ao slide
    addArrow(prev, next) {
        this.prevElement = document.querySelector(prev);
        this.nextElement = document.querySelector(next);
        this.addArrowEvent();
    }

    addArrowEvent() {
        this.prevElement.addEventListener('click', this.activePrevSlide);
        this.nextElement.addEventListener('click', this.activeNextSlide);
    }

    // Cria os controles de bolinha do slide
    createControl() {
        const control = document.createElement('ul');
        control.dataset.control = 'slide';
        this.slideArray.forEach((slide, index) => {
            control.innerHTML += `
      <li><a href="#slide${index + 1}">${index + 1}</a></li>`;
        });
        this.wrapper.appendChild(control);
        return control;
    }

    // Adiciona evento ao item do controle
    eventControl(item, index) {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            this.changeSlide(index);
        });
        this.wrapper.addEventListener('changeEvent', this.activeControlItem);
    }

    // Ativa o item do controle correspondente ao slide atual
    activeControlItem() {
        this.controlArray.forEach((item) => item.classList.remove(this.activeClass));
        this.controlArray[this.index.active].classList.add(this.activeClass);
    }

    // Adiciona controles de slide personalizados ou cria controles padrão
    addControl(customControl) {
        this.control = document.querySelector(customControl) || this.createControl();
        this.controlArray = [...this.control.children];
        // 'Ativa' o controle logo que abrir a pagina
        this.activeControlItem();
        this.controlArray.forEach(this.eventControl);
    }

    // Liga o contexto do evento ao objeto atual
    bindControlEvents() {
        this.eventControl = this.eventControl.bind(this);
        this.activeControlItem = this.activeControlItem.bind(this);
    }
}
