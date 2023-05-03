export default class Operations {
    constructor(opData, activeClass) {
        this.operation = document.querySelector(opData);
        this.activeClass = activeClass;
    }

    workingData() {
        // Pega os números, transforma em array com split(), transforma em números com map()
        this.weekDays = this.operation.dataset.semana.split(',').map(Number);
        this.weekHours = this.operation.dataset.horario.split(',').map(Number);
    }

    currentData() {
        // Propriedade para criar data
        this.todayDate = new Date();
        // Propriedade com o dia de hoje
        this.todayDay = this.todayDate.getDay();
        // Propriedade com a hora atual de Brasilia
        this.todayHour = this.todayDate.getUTCHours() - 3;
    }

    isOpen() {
        // Variável que compara o dia de hoje com os dias da semana
        const OpenWeekday = this.weekDays.indexOf(this.todayDay) !== -1;
        // Se hora atual for maior ou igual horário funcionamento abertura
        // E hora atual for menor que horário funcionamento fechamento
        const OpenHour = this.todayHour >= this.weekHours[0] && this.todayHour < this.weekHours[1];
        return OpenWeekday && OpenHour;
    }

    activeOpen() {
        if (this.isOpen()) {
            this.operation.classList.add(this.activeClass);
        }
    }

    init() {
        if (this.operation) {
            this.workingData();
            this.currentData();
            this.activeOpen();
        }
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
