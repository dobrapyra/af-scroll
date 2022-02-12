import AFScroll from '../../../dist/module';

(function(){
  // AFScroll
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

  // Accordion
  const accordionEl = document.querySelector('.accordion');

  const accordionItems = accordionEl.querySelectorAll('.accordion__item');

  accordionItems.forEach(itemEl => {
    const headEl = itemEl.querySelector('.accordion__head');
    headEl.addEventListener('click', () => {
      itemEl.classList.toggle('accordion__item--opened');
    })
  });
})();