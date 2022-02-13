function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "default", () => $4fa36e821943b400$export$2e2bcd8739ae039);
const $20b4a97a61b3fccb$export$79b2f7037acddd43 = (arr, cb)=>{
    const l = arr.length;
    for(let i = 0; i < l; i++){
        const result = cb(arr[i], i, arr);
        if (result === true) continue;
        if (result === false) break;
    }
};
const $20b4a97a61b3fccb$export$3a89f8d6f6bf6c9f = (begin, end, factor)=>{
    return begin + (end - begin) * factor;
};
const $20b4a97a61b3fccb$export$1d567c320f4763bc = (el, styles)=>{
    Object.keys(styles).forEach((styleKey)=>{
        el.style[styleKey] = styles[styleKey];
    });
};
var $20b4a97a61b3fccb$export$2e2bcd8739ae039 = {
    each: $20b4a97a61b3fccb$export$79b2f7037acddd43,
    lerp: $20b4a97a61b3fccb$export$3a89f8d6f6bf6c9f,
    style: $20b4a97a61b3fccb$export$1d567c320f4763bc
};


class $4fa36e821943b400$export$2e2bcd8739ae039 {
    constructor({ smoothForce: smoothForce = 0.8 , smoothLimit: smoothLimit = 0.2 , className: className = 'afScroll' , wrapExclude: wrapExclude = 'script, link' , onUpdate: onUpdate = ()=>{
    } , onComplete: onComplete = ()=>{
    }  } = {
    }){
        this.smoothFactor = 1 - smoothForce;
        this.smoothLimit = smoothLimit;
        this.className = className;
        this.wrapExclude = wrapExclude;
        this.onUpdate = onUpdate;
        this.onComplete = onComplete;
        this.targetScroll = 0;
        this.lastScroll = 0;
        this.lockedScroll = null;
        this.bodyEl = document.getElementsByTagName('body')[0];
        this.scrollEl = null;
        this.bindThis();
        this.init();
    }
    /**
   * initialize AFScroll
   * @public
   */ init() {
        if (this.scrollEl !== null) return;
        this.targetScroll = window.scrollY;
        this.createScroll();
        this.resizeBody();
        this.scrollTo(this.targetScroll);
        this.updateScroll(this.targetScroll);
        this.bindEvents();
    }
    /**
   * create scroll wrapper element
   */ createScroll() {
        const { bodyEl: bodyEl , className: className , wrapExclude: wrapExclude  } = this;
        const scrollEl = document.createElement('div');
        scrollEl.setAttribute('class', className);
        $20b4a97a61b3fccb$export$1d567c320f4763bc(scrollEl, {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden'
        });
        const childrenArr = [];
        $20b4a97a61b3fccb$export$79b2f7037acddd43(bodyEl.children, (childEl)=>{
            if (childEl === scrollEl || childEl.matches(wrapExclude)) return true;
            childrenArr.push(childEl);
        });
        $20b4a97a61b3fccb$export$79b2f7037acddd43(childrenArr, (childEl)=>{
            scrollEl.appendChild(childEl);
        });
        bodyEl.insertBefore(scrollEl, bodyEl.children[0]);
        this.scrollEl = scrollEl;
    }
    bindThis() {
        this.onScrollEvent = this.onScroll.bind(this);
        this.onResizeEvent = this.onResize.bind(this);
        this.smoothUpdateTick = this.smoothUpdate.bind(this);
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
        cancelAnimationFrame(this.raf);
        this.raf = requestAnimationFrame(this.smoothUpdateTick);
    }
    smoothUpdate() {
        if (Math.abs(this.targetScroll - this.lastScroll) < this.smoothLimit) {
            this.updateScroll(this.targetScroll);
            this.onComplete(this.targetScroll);
            return;
        }
        this.updateScroll($20b4a97a61b3fccb$export$3a89f8d6f6bf6c9f(this.lastScroll, this.targetScroll, this.smoothFactor));
        this.raf = requestAnimationFrame(this.smoothUpdateTick);
    }
    updateScroll(scroll) {
        this.lastScroll = scroll;
        this.scrollEl.scrollTop = scroll;
        this.onUpdate(scroll);
    }
    onResize() {
        this.resizeBody();
    }
    resizeBody() {
        this.singleResize();
        this.singleResize(); // double to fix some size issues
    }
    singleResize() {
        $20b4a97a61b3fccb$export$1d567c320f4763bc(this.bodyEl, {
            height: `${this.scrollEl.scrollHeight}px`
        });
    }
    /**
   * scrollTo
   * @public
   * @param {Number} scroll scroll value
   */ scrollTo(scroll) {
        document.body.scrollTop = document.documentElement.scrollTop = scroll;
    }
    /**
   * lock scroll
   * @public
   */ lock() {
        this.lockedScroll = this.lastScroll;
    }
    /**
   * unlock scroll
   * @public
   */ unlock() {
        this.lockedScroll = null;
    }
    /**
   * destroy AFScroll
   * @public
   */ destroy() {
        if (this.scrollEl === null) return;
        this.unbindEvents();
        this.removeScroll();
        this.lockedScroll = null;
    }
    /**
   * remove scroll wrapper element
   */ removeScroll() {
        const { bodyEl: bodyEl , scrollEl: scrollEl  } = this;
        $20b4a97a61b3fccb$export$1d567c320f4763bc(bodyEl, {
            height: ''
        });
        const childrenArr = [];
        $20b4a97a61b3fccb$export$79b2f7037acddd43(scrollEl.children, (childEl)=>{
            childrenArr.push(childEl);
        });
        $20b4a97a61b3fccb$export$79b2f7037acddd43(childrenArr, (childEl)=>{
            bodyEl.insertBefore(childEl, scrollEl);
        });
        bodyEl.removeChild(scrollEl);
        this.scrollEl = null;
    }
}


//# sourceMappingURL=main.js.map
