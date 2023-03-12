import { each, lerp, style } from './helpers';

/**
 * AFScroll (Animation Frame Scroll)
 * @param {Object} options general options
 * @property {Number} smoothForce smoothing force in range 0.0 - 1.0, 0: no smooth, 1: no scroll
 * @property {Number} smoothLimit min diff between current and target value to keep smooth loop
 * @property {Element} scrollEl static scroll wrapper element
 * @property {String} className css class name of scroll wrapper element
 * @property {String} wrapExclude css selector to exclude from wrapping
 * @property {Number} autoHeight height checking period in frames, 1: each frame, 0: disabled
 * @property {Function} onUpdate callback function triggered on scroll update
 * @property {Function} onComplete callback function triggered after smooth loop stopped
 */
export default function createAFScroll({
  smoothForce: smoothForceArg = 0.8,
  smoothLimit: smoothLimitArg = 0.2,
  scrollEl: scrollElArg = null,
  className: classNameArg = 'afScroll',
  wrapExclude: wrapExcludeArg = 'script, link',
  autoHeight: autoHeightArg = 12,
  onUpdate: onUpdateArg = () => {},
  onComplete: onCompleteArg = () => {}
} = {}) {
  const smoothFactor = 1 - smoothForceArg;
  const smoothLimit = smoothLimitArg;
  const staticScrollEl = scrollElArg;
  const className = classNameArg;
  const wrapExclude = wrapExcludeArg;
  const autoHeight = autoHeightArg;
  const onUpdate = onUpdateArg;
  const onComplete = onCompleteArg;

  let targetScroll = 0;
  let lastScroll = 0;
  let lockedScroll = null;
  let smoothRaf = null;
  let heightRaf = null;

  const bodyEl = document.getElementsByTagName('body')[0];
  let scrollEl = null;
  let autoHeightFrame = 0;
  let lastHeight = null;

  /**
   * create scroll wrapper element
   */
  function createScroll() {
    scrollEl = staticScrollEl !== null
      ? staticScrollEl
      : document.createElement('div');
    style(scrollEl, {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      overflow: 'hidden',
    });

    if (staticScrollEl !== null) return;

    scrollEl.setAttribute('class', className);

    const childrenArr = [];
    each(bodyEl.children, childEl => {
      if (childEl === scrollEl || childEl.matches(wrapExclude)) return true;
      childrenArr.push(childEl);
    });
    each(childrenArr, childEl => {
      scrollEl.appendChild(childEl);
    });
    bodyEl.insertBefore(scrollEl, bodyEl.children[0]);
  }

  /**
   * remove scroll wrapper element
   */
  function removeScroll() {
    style(bodyEl, { height: '' });
    autoHeightFrame = 0;
    lastHeight = null;

    if (staticScrollEl !== null) {
      style(scrollEl, {
        position: '',
        top: '',
        left: '',
        width: '',
        height: '',
        overflow: '',
      });
      scrollEl = null;

      return;
    }

    const childrenArr = [];
    each(scrollEl.children, childEl => {
      childrenArr.push(childEl);
    });
    each(childrenArr, childEl => {
      bodyEl.insertBefore(childEl, scrollEl);
    });
    bodyEl.removeChild(scrollEl);
    scrollEl = null;
  }

  /**
   * scrollTo
   * @public
   * @param {Number} scroll scroll value
   */
  function scrollTo(scroll) {
    document.body.scrollTop = document.documentElement.scrollTop = scroll;
  }

  /**
   * lock scroll
   * @public
   */
  function lock() {
    lockedScroll = lastScroll;
  }

  /**
   * unlock scroll
   * @public
   */
  function unlock() {
    lockedScroll = null;
  }

  function updateScroll(scroll) {
    lastScroll = scroll;
    scrollEl.scrollTop = scroll;
    onUpdate(scroll);
  }

  function smoothUpdate() {
    if (lockedScroll !== null) return;

    if (Math.abs(targetScroll - lastScroll) < smoothLimit) {
      updateScroll(targetScroll);
      onComplete(targetScroll);
      return;
    }

    updateScroll(lerp(lastScroll, targetScroll, smoothFactor));

    smoothRaf = requestAnimationFrame(smoothUpdate);
  }

  function onScroll() {
    if (lockedScroll !== null) scrollTo(lockedScroll);

    targetScroll = window.scrollY;

    cancelAnimationFrame(smoothRaf);
    smoothRaf = requestAnimationFrame(smoothUpdate);
  }

  function breakSmoothLoop() {
    cancelAnimationFrame(smoothRaf);
  }

  function autoHeightUpdate() {
    if (++autoHeightFrame >= autoHeight) {
      autoHeightFrame = 0;
      updateHeight();
    }

    heightRaf = requestAnimationFrame(autoHeightUpdate);
  }

  function startAutoHeight() {
    if (autoHeight === 0 || autoHeight === false) return;

    heightRaf = requestAnimationFrame(autoHeightUpdate);
  }

  function stopAutoHeight() {
    cancelAnimationFrame(heightRaf);
  }

  function updateHeight() {
    const scrollHeight = scrollEl.scrollHeight;
    if (scrollHeight === lastHeight) return;

    lastHeight = scrollHeight;
    style(bodyEl, {
      height: `${scrollHeight}px`,
    });
  }

  function onResize() {
    updateHeight();
    updateHeight(); // double to fix some size issues
  }

  function bindEvents() {
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onResize);
  }

  function unbindEvents() {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onResize);
  }

  /**
   * initialize AFScroll
   * @public
   */
  function init() {
    if (scrollEl !== null) return;

    targetScroll = window.scrollY;
    createScroll();
    onResize();

    scrollTo(targetScroll);
    updateScroll(targetScroll);

    bindEvents();
    startAutoHeight();
  }

  /**
   * destroy AFScroll
   * @public
   */
  function destroy() {
    if (scrollEl === null) return;

    breakSmoothLoop();
    stopAutoHeight();
    unbindEvents();
    removeScroll();

    lockedScroll = null;
  }

  init();

  return {
    init,
    scrollTo,
    lock,
    unlock,
    destroy,
  };
}
