function $bc68805842a7be7a$export$79b2f7037acddd43(arr, cb) {
    const l = arr.length;
    for(let i = 0; i < l; i++){
        const result = cb(arr[i], i, arr);
        if (result === true) continue;
        if (result === false) break;
    }
}
function $bc68805842a7be7a$export$3a89f8d6f6bf6c9f(begin, end, factor) {
    return begin + (end - begin) * factor;
}
function $bc68805842a7be7a$export$1d567c320f4763bc(el, styles) {
    Object.keys(styles).forEach((styleKey)=>{
        el.style[styleKey] = styles[styleKey];
    });
}
var $bc68805842a7be7a$export$2e2bcd8739ae039 = {
    each: $bc68805842a7be7a$export$79b2f7037acddd43,
    lerp: $bc68805842a7be7a$export$3a89f8d6f6bf6c9f,
    style: $bc68805842a7be7a$export$1d567c320f4763bc
};


class $cf838c15c8b009ba$export$2e2bcd8739ae039 {
    constructor({ smoothForce: smoothForce = 0.8 , smoothLimit: smoothLimit = 0.2 , scrollEl: scrollEl = null , className: className = "afScroll" , wrapExclude: wrapExclude = "script, link" , autoHeight: autoHeight = 12 , onUpdate: onUpdate = ()=>{} , onComplete: onComplete = ()=>{}  } = {}){
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
        this.bodyEl = document.getElementsByTagName("body")[0];
        this.scrollEl = null;
        this.autoHeightFrame = 0;
        this.lastHeight = null;
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
        this.onResize();
        this.scrollTo(this.targetScroll);
        this.updateScroll(this.targetScroll);
        this.bindEvents();
        this.startAutoHeight();
    }
    /**
   * create scroll wrapper element
   */ createScroll() {
        const { bodyEl: bodyEl , staticScrollEl: staticScrollEl  } = this;
        const scrollEl = staticScrollEl !== null ? staticScrollEl : document.createElement("div");
        (0, $bc68805842a7be7a$export$1d567c320f4763bc)(scrollEl, {
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            overflow: "hidden"
        });
        this.scrollEl = scrollEl;
        if (staticScrollEl !== null) return;
        const { className: className , wrapExclude: wrapExclude  } = this;
        scrollEl.setAttribute("class", className);
        const childrenArr = [];
        (0, $bc68805842a7be7a$export$79b2f7037acddd43)(bodyEl.children, (childEl)=>{
            if (childEl === scrollEl || childEl.matches(wrapExclude)) return true;
            childrenArr.push(childEl);
        });
        (0, $bc68805842a7be7a$export$79b2f7037acddd43)(childrenArr, (childEl)=>{
            scrollEl.appendChild(childEl);
        });
        bodyEl.insertBefore(scrollEl, bodyEl.children[0]);
    }
    bindThis() {
        this.onScrollEvent = this.onScroll.bind(this);
        this.onResizeEvent = this.onResize.bind(this);
        this.smoothTick = this.smoothUpdate.bind(this);
        this.autoHeightTick = this.autoHeightUpdate.bind(this);
    }
    bindEvents() {
        window.addEventListener("scroll", this.onScrollEvent);
        window.addEventListener("resize", this.onResizeEvent);
    }
    unbindEvents() {
        window.removeEventListener("scroll", this.onScrollEvent);
        window.removeEventListener("resize", this.onResizeEvent);
    }
    onScroll() {
        if (this.lockedScroll !== null) this.scrollTo(this.lockedScroll);
        this.targetScroll = window.scrollY;
        cancelAnimationFrame(this.smoothRaf);
        this.smoothRaf = requestAnimationFrame(this.smoothTick);
    }
    smoothUpdate() {
        if (this.lockedScroll !== null) return;
        if (Math.abs(this.targetScroll - this.lastScroll) < this.smoothLimit) {
            this.updateScroll(this.targetScroll);
            this.onComplete(this.targetScroll);
            return;
        }
        this.updateScroll((0, $bc68805842a7be7a$export$3a89f8d6f6bf6c9f)(this.lastScroll, this.targetScroll, this.smoothFactor));
        this.smoothRaf = requestAnimationFrame(this.smoothTick);
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
        (0, $bc68805842a7be7a$export$1d567c320f4763bc)(this.bodyEl, {
            height: `${scrollHeight}px`
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
        this.stopAutoHeight();
        this.unbindEvents();
        this.removeScroll();
        this.lockedScroll = null;
    }
    /**
   * remove scroll wrapper element
   */ removeScroll() {
        const { bodyEl: bodyEl , scrollEl: scrollEl , staticScrollEl: staticScrollEl  } = this;
        (0, $bc68805842a7be7a$export$1d567c320f4763bc)(bodyEl, {
            height: ""
        });
        this.scrollEl = null;
        this.autoHeightFrame = 0;
        this.lastHeight = null;
        if (staticScrollEl !== null) {
            (0, $bc68805842a7be7a$export$1d567c320f4763bc)(scrollEl, {
                position: "",
                top: "",
                left: "",
                width: "",
                height: "",
                overflow: ""
            });
            return;
        }
        const childrenArr = [];
        (0, $bc68805842a7be7a$export$79b2f7037acddd43)(scrollEl.children, (childEl)=>{
            childrenArr.push(childEl);
        });
        (0, $bc68805842a7be7a$export$79b2f7037acddd43)(childrenArr, (childEl)=>{
            bodyEl.insertBefore(childEl, scrollEl);
        });
        bodyEl.removeChild(scrollEl);
    }
}


export {$cf838c15c8b009ba$export$2e2bcd8739ae039 as default};
//# sourceMappingURL=module.js.map
