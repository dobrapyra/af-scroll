import AFScroll from '../../../dist/module';

const afScroll = new AFScroll();

const scrollTopButton = document.querySelector('[data-scroll-top]');
scrollTopButton.addEventListener('click', () => {
  afScroll.scrollTo(0);
});

const destroyButton = document.querySelector('[data-destroy]');
destroyButton.addEventListener('click', () => {
  afScroll.destroy()
});

const reinitButton = document.querySelector('[data-reinit]');
reinitButton.addEventListener('click', () => {
  afScroll.init()
});