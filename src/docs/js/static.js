import createAFScroll from '../../../dist/module';

(function(){
  // AFScroll
  const afScroll = createAFScroll({
    scrollEl: document.querySelector('.afScroll'),
  });

  [
    { selector: '[data-scroll-top]', cb: () => { afScroll.scrollTo(0); } },
    { selector: '[data-destroy]', cb: () => { afScroll.destroy(); } },
    { selector: '[data-reinit]', cb: () => { afScroll.init(); } },
    { selector: '[data-lock]', cb: () => { afScroll.lock(); } },
    { selector: '[data-unlock]', cb: () => { afScroll.unlock(); } },
  ].map(({ selector, cb }) => {
    const button = document.querySelector(selector);
    button.addEventListener('click', cb);
  })
})();