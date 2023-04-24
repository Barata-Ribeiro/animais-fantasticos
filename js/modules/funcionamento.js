export default function initOperations() {
    const operation = document.querySelector('[data-semana');
    // Pega os números, transforma em array com split(), transforma em números com map()
    const weekDays = operation.dataset.semana.split(',').map(Number);
    const weekHours = operation.dataset.horario.split(',').map(Number);

    // Variável para criar data
    const todayDate = new Date();
    // Constante com o dia de hoje
    const todayDay = todayDate.getDay();
    // Constante com a hora atual
    const todayHour = todayDate.getHours();
    // Constante que compara o dia de hoje com os dias da semana
    const OpenWeekday = weekDays.indexOf(todayDay) !== -1;
    // Se hora atual for maior ou igual horario funcionamento abertura
    // E hora atual for menor que horário funcionamento fechamento
    const OpenHour = todayHour >= weekHours[0] && todayHour < weekHours[1];
    // Se semana funcionamento true e horario funcionamento true
    if (OpenWeekday && OpenHour) {
        // Add classe 'aberto'
        operation.classList.add('aberto');
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
