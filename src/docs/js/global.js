(function(){
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