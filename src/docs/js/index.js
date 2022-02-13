import AFScroll from '../../../dist/module';

(function(){
  // AFScroll
  const afScroll = new AFScroll();

  [
    { selector: '[data-scroll-top]', cb: () => { afScroll.scrollTo(0); } },
    { selector: '[data-destroy]', cb: () => { afScroll.destroy(); } },
    { selector: '[data-reinit]', cb: () => { afScroll.init(); } },
    { selector: '[data-lock]', cb: () => { afScroll.lock(); } },
    { selector: '[data-unlock]', cb: () => { afScroll.unlock(); } },
  ].map(action => {
    const button = document.querySelector(action.selector);
    button.addEventListener('click', action.cb);
  })

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