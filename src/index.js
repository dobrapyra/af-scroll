import { each, lerp, style } from './helpers';

/**
 * AFScroll (Animation Frame Scroll)
 * @param {Object} options general options
 * @property {Number} smoothForce smoothing force in range 0.0 - 1.0, 0: no smooth, 1: no scroll
 * @property {Number} smoothLimit min diff between current and target value to keep smooth loop
 * @property {Element} scrollEl static scroll wrapper element
 * @property {String} className css class name of scroll wrapper element
 * @property {Array} wrapExclude css selector to exclude from wrapping
 * @property {Number} autoHeight height checkoing period in frames, 1: each frame, 0: disabled
 * @property {Function} onUpdate callback function triggered on scroll update
 * @property {Function} onComplete callback function triggered after smooth loop stopped
 */
export default class AFScroll {
  constructor({
    smoothForce = 0.8,
    smoothLimit = 0.2,
    scrollEl = null,
    className = 'afScroll',
    wrapExclude = 'script, link',
    autoHeight = 12,
    onUpdate = () => {},
    onComplete = () => {}
  } = {}) {
    this.smoothFactor = 1 - smoothForce;
    this.smoothLimit = smoothLimit;
    this.staticScrollEl = scrollEl;
    this.className = className;
    this.wrapExclude = wrapExclude;
    this.autoHeight = autoHeight;
    this.onUpdate = onUpdate;
    this.onComplete = onComplete;

    this.targetScroll = 0;
    this.lastScroll = 0;
    this.lockedScroll = null;

    this.bodyEl = document.getElementsByTagName('body')[0];
    this.scrollEl = null;
    this.autoHeightFrame = 0;
    this.lastHeight = null;

    this.bindThis();
    this.init();
  }

  /**
   * initialize AFScroll
   * @public
   */
  init() {
    if (this.scrollEl !== null) return;

    this.targetScroll = window.scrollY;
    this.createScroll();
    this.onResize();

    this.scrollTo(this.targetScroll);
    this.updateScroll(this.targetScroll);

    this.bindEvents();
    this.startAutoHeight();
  }

  /**
   * create scroll wrapper element
   */
  createScroll() {
    const { bodyEl, staticScrollEl } = this;

    const scrollEl = staticScrollEl !== null
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

    this.scrollEl = scrollEl;

    if (staticScrollEl !== null) return;

    const { className, wrapExclude } = this;

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

  bindThis() {
    this.onScrollEvent = this.onScroll.bind(this);
    this.onResizeEvent = this.onResize.bind(this);
    this.smoothUpdateTick = this.smoothUpdate.bind(this);
    this.autoHeightTick = this.autoHeightUpdate.bind(this);
  }

  bindEvents() {
    window.addEventListener('scroll', this.onScrollEvent);
    window.addEventListener('resize', this.onResizeEvent);
  }

  unbindEvents() {
    window.removeEventListener('scroll', this.onScrollEvent);
    window.removeEventListener('resize', this.onResizeEvent);
  }

  onScroll() {
    if (this.lockedScroll !== null) this.scrollTo(this.lockedScroll);

    this.targetScroll = window.scrollY;

    cancelAnimationFrame(this.smoothRaf);
    this.smoothRaf = requestAnimationFrame(this.smoothUpdateTick);
  }

  smoothUpdate() {
    if (this.lockedScroll !== null) return;

    if (Math.abs(this.targetScroll - this.lastScroll) < this.smoothLimit) {
      this.updateScroll(this.targetScroll);
      this.onComplete(this.targetScroll);
      return;
    }

    this.updateScroll(lerp(this.lastScroll, this.targetScroll, this.smoothFactor));

    this.smoothRaf = requestAnimationFrame(this.smoothUpdateTick);
  }

  updateScroll(scroll) {
    this.lastScroll = scroll;
    this.scrollEl.scrollTop = scroll;
    this.onUpdate(scroll);
  }

  onResize() {
    this.updateHeight();
    this.updateHeight(); // double to fix some size issues
  }

  updateHeight() {
    const scrollHeight = this.scrollEl.scrollHeight;
    if (scrollHeight === this.lastHeight) return;

    this.lastHeight = scrollHeight;
    style(this.bodyEl, {
      height: `${scrollHeight}px`,
    });
  }

  startAutoHeight() {
    if (this.autoHeight === 0 || this.autoHeight === false) return;

    this.heightRaf = requestAnimationFrame(this.autoHeightTick);
  }

  stopAutoHeight() {
    cancelAnimationFrame(this.heightRaf);
  }

  autoHeightUpdate() {
    if (++this.autoHeightFrame >= this.autoHeight) {
      this.autoHeightFrame = 0;
      this.updateHeight();
    }

    this.heightRaf = requestAnimationFrame(this.autoHeightTick);
  }

  /**
   * scrollTo
   * @public
   * @param {Number} scroll scroll value
   */
  scrollTo(scroll) {
    document.body.scrollTop = document.documentElement.scrollTop = scroll;
  }

  /**
   * lock scroll
   * @public
   */
  lock() {
    this.lockedScroll = this.lastScroll;
  }

  /**
   * unlock scroll
   * @public
   */
  unlock() {
    this.lockedScroll = null;
  }

  /**
   * destroy AFScroll
   * @public
   */
  destroy() {
    if (this.scrollEl === null) return;

    this.stopAutoHeight();
    this.unbindEvents();
    this.removeScroll();

    this.lockedScroll = null;
  }

  /**
   * remove scroll wrapper element
   */
  removeScroll() {
    const { bodyEl, scrollEl, staticScrollEl } = this;

    style(bodyEl, { height: '' });
    this.scrollEl = null;
    this.autoHeightFrame = 0;
    this.lastHeight = null;

    if (staticScrollEl !== null) {
      style(scrollEl, {
        position: '',
        top: '',
        left: '',
        width: '',
        height: '',
        overflow: '',
      });

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
  }
}