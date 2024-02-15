import Accordion from './modules/accordion.js';
import DropdownMenu from './modules/dropdown-menu.js';
import fetchAnimais from './modules/fetch-animais.js';
import fetchBitcoin from './modules/fetchBitcoin.js';
import Operations from './modules/funcionamento.js';
import MenuMobile from './modules/menu-mobile.js';
import Modal from './modules/modal.js';
import ScrollAnima from './modules/scroll-anima.js';
import SlideNav from './modules/slide.js';
import SmoothScroll from './modules/smooth-scroll.js';
import TabNav from './modules/tab-nav.js';
import Tooltip from './modules/tooltip.js';

const smoothScroll = new SmoothScroll('[data-menu="suave"] a[href^="#"]');
smoothScroll.init();

const accordion = new Accordion('[data-anime="accordion"] dt');
accordion.init();

const tabNav = new TabNav(
    '[data-tab="menu"] li',
    '[data-tab="content"] section',
);
tabNav.init();

const modal = new Modal(
    '[data-modal="abrir"]',
    '[data-modal="fechar"]',
    '[data-modal="container"]',
);
modal.init();

const tooltip = new Tooltip('[data-tooltip]');
tooltip.init();

const scrollAnima = new ScrollAnima('[data-anime="scroll"]');
scrollAnima.init();

const dropdownMenu = new DropdownMenu('[data-dropdown]');
dropdownMenu.init();

const menuMobile = new MenuMobile('[data-menu="button"]', '[data-menu="list"]');
menuMobile.init();

const operations = new Operations('[data-semana]', 'aberto');
operations.init();

fetchAnimais('./js/animaisApi.json', '.grid-numeros');

fetchBitcoin('https://blockchain.info/ticker', '.btc-preco');

const slide = new SlideNav('.slide', '.slide-wrapper');
slide.init();
slide.addControl('.custom-controls');
