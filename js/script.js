import SmoothScroll from './modules/smooth-scroll.js';
import initAccordion from './modules/accordion.js';
import initTabNav from './modules/tab-nav.js';
import initModal from './modules/modal.js';
import initTooltip from './modules/tooltip.js';
import initDropdownMenu from './modules/dropdown-menu.js';
import initMenuMobile from './modules/menu-mobile.js';
import initOperations from './modules/funcionamento.js';
import initFetchAnimais from './modules/fetch-animais.js';
import initFetchBitcoin from './modules/fetchBitcoin.js';
import initScrollAnimation from './modules/anima-scroll.js';

const smoothScroll = new SmoothScroll('[data-menu="suave"] a[href^="#"]');
smoothScroll.init();

initScrollAnimation();
initTabNav();
initAccordion();
initModal();
initTooltip();
initDropdownMenu();
initMenuMobile();
initOperations();
initFetchAnimais();
initFetchBitcoin();
