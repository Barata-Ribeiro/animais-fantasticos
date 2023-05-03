// Adicionando comentários e revisando o código

export default class Operations {
    // Construtor da classe com dois parâmetros: opData e activeClass
    constructor(opData, activeClass) {
        // Seleciona o elemento com o seletor opData e atribui à propriedade 'operation'
        this.operation = document.querySelector(opData);
        // Atribui o valor de 'activeClass' à propriedade 'activeClass'
        this.activeClass = activeClass;
    }

    workingData() {
        // Pega os dados de dias e horários de semana no atributo 'data' do elemento 'operation'
        // e os converte em arrays de números
        this.weekDays = this.operation.dataset.semana.split(',').map(Number);
        this.weekHours = this.operation.dataset.horario.split(',').map(Number);
    }

    currentData() {
        // Atribui a data atual à propriedade 'todayDate'
        this.todayDate = new Date();
        // Atribui o dia atual à propriedade 'todayDay'
        this.todayDay = this.todayDate.getDay();
        // Atribui a hora atual de Brasília à propriedade 'todayHour'
        this.todayHour = this.todayDate.getUTCHours() - 3;
    }

    isOpen() {
        // Verifica se o dia atual está entre os dias de funcionamento
        const OpenWeekday = this.weekDays.indexOf(this.todayDay) !== -1;
        // Verifica se a hora atual está dentro do horário de funcionamento
        const OpenHour = this.todayHour >= this.weekHours[0] && this.todayHour < this.weekHours[1];

        // Retorna verdadeiro se ambos OpenWeekday e OpenHour forem verdadeiros
        return OpenWeekday && OpenHour;
    }

    activeOpen() {
        // Se a função 'isOpen()' retornar verdadeiro,
        // adiciona a classe 'activeClass' ao elemento 'operation'
        if (this.isOpen()) {
            this.operation.classList.add(this.activeClass);
        }
    }

    // Método para inicializar a classe
    init() {
        // Verifica se a propriedade 'operation' existe
        if (this.operation) {
            // Chama os métodos 'workingData', 'currentData' e 'activeOpen'
            this.workingData();
            this.currentData();
            this.activeOpen();
        }
        // Retorna a instância da classe
        return this;
    }
}

// ESTUDO DE DATAS //
// // Data do computador
// const agora = new Date();
// // Data futura pré-estabelecida
// const futuro = new Date('Dec 24 2023 23:59');

// function milisecParaDias(time) {
//     // Retorna atual/futuro dividido pelos milisegundos de 24 horas
//     return time / (24 * 60 * 60 * 1000);
// }
// console.log(agora, futuro);

// const diasAgora = milisecParaDias(agora.getTime());
// const diasFuturo = milisecParaDias(futuro.getTime());

// console.log(diasFuturo - diasAgora);
