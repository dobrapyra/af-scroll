/**
 * lerp
 * @param {Array} arr array or other iterable collection
 * @param {Function} cb callback function for each array element
 */ function $9daa40506ab05f9d$export$79b2f7037acddd43(arr, cb) {
    const l = arr.length;
    for(let i = 0; i < l; i++){
        const result = cb(arr[i], i, arr);
        if (result === true) continue;
        if (result === false) break;
    }
}
function $9daa40506ab05f9d$export$3a89f8d6f6bf6c9f(begin, end, factor) {
    return begin + (end - begin) * factor;
}
function $9daa40506ab05f9d$export$1d567c320f4763bc(el, styles) {
    Object.keys(styles).forEach((styleKey)=>{
        el.style[styleKey] = styles[styleKey];
    });
}
var $9daa40506ab05f9d$export$2e2bcd8739ae039 = {
    each: $9daa40506ab05f9d$export$79b2f7037acddd43,
    lerp: $9daa40506ab05f9d$export$3a89f8d6f6bf6c9f,
    style: $9daa40506ab05f9d$export$1d567c320f4763bc
};


function $2776a60caf88deef$export$2e2bcd8739ae039({ smoothForce: smoothForceArg = 0.8 , smoothLimit: smoothLimitArg = 0.2 , scrollEl: scrollElArg = null , className: classNameArg = "afScroll" , wrapExclude: wrapExcludeArg = "script, link" , autoHeight: autoHeightArg = 12 , onUpdate: onUpdateArg = ()=>{} , onComplete: onCompleteArg = ()=>{}  } = {}) {
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
    const bodyEl = document.getElementsByTagName("body")[0];
    let scrollEl = null;
    let autoHeightFrame = 0;
    let lastHeight = null;
    /**
   * create scroll wrapper element
   */ function createScroll() {
        scrollEl = staticScrollEl !== null ? staticScrollEl : document.createElement("div");
        (0, $9daa40506ab05f9d$export$1d567c320f4763bc)(scrollEl, {
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            overflow: "hidden"
        });
        if (staticScrollEl !== null) return;
        scrollEl.setAttribute("class", className);
        const childrenArr = [];
        (0, $9daa40506ab05f9d$export$79b2f7037acddd43)(bodyEl.children, (childEl)=>{
            if (childEl === scrollEl || childEl.matches(wrapExclude)) return true;
            childrenArr.push(childEl);
        });
        (0, $9daa40506ab05f9d$export$79b2f7037acddd43)(childrenArr, (childEl)=>{
            scrollEl.appendChild(childEl);
        });
        bodyEl.insertBefore(scrollEl, bodyEl.children[0]);
    }
    /**
   * remove scroll wrapper element
   */ function removeScroll() {
        (0, $9daa40506ab05f9d$export$1d567c320f4763bc)(bodyEl, {
            height: ""
        });
        autoHeightFrame = 0;
        lastHeight = null;
        if (staticScrollEl !== null) {
            (0, $9daa40506ab05f9d$export$1d567c320f4763bc)(scrollEl, {
                position: "",
                top: "",
                left: "",
                width: "",
                height: "",
                overflow: ""
            });
            scrollEl = null;
            return;
        }
        const childrenArr = [];
        (0, $9daa40506ab05f9d$export$79b2f7037acddd43)(scrollEl.children, (childEl)=>{
            childrenArr.push(childEl);
        });
        (0, $9daa40506ab05f9d$export$79b2f7037acddd43)(childrenArr, (childEl)=>{
            bodyEl.insertBefore(childEl, scrollEl);
        });
        bodyEl.removeChild(scrollEl);
        scrollEl = null;
    }
    /**
   * scrollTo
   * @public
   * @param {Number} scroll scroll value
   */ function scrollTo(scroll) {
        document.body.scrollTop = document.documentElement.scrollTop = scroll;
    }
    /**
   * lock scroll
   * @public
   */ function lock() {
        lockedScroll = lastScroll;
    }
    /**
   * unlock scroll
   * @public
   */ function unlock() {
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
        updateScroll((0, $9daa40506ab05f9d$export$3a89f8d6f6bf6c9f)(lastScroll, targetScroll, smoothFactor));
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
        (0, $9daa40506ab05f9d$export$1d567c320f4763bc)(bodyEl, {
            height: `${scrollHeight}px`
        });
    }
    function onResize() {
        updateHeight();
        updateHeight(); // double to fix some size issues
    }
    function bindEvents() {
        window.addEventListener("scroll", onScroll);
        window.addEventListener("resize", onResize);
    }
    function unbindEvents() {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onResize);
    }
    /**
   * initialize AFScroll
   * @public
   */ function init() {
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
   */ function destroy() {
        if (scrollEl === null) return;
        breakSmoothLoop();
        stopAutoHeight();
        unbindEvents();
        removeScroll();
        lockedScroll = null;
    }
    init();
    return {
        init: init,
        scrollTo: scrollTo,
        lock: lock,
        unlock: unlock,
        destroy: destroy
    };
}


//# sourceMappingURL=commonjs.js.map
