# AFScroll (Animation Frame Scroll)

The script aligns page scroll update with animation frame.  
It allows to perform js based DOM manipulation related to page scroll just in time, not too late.

* [Quick start](#quick-start)
* [Features](#features)
* [Disadvantages](#disadvantages)
* [Why you may need AFScroll?](#why-you-may-need-afscroll?)
* [Options](#options)
* [Methods](#methods)
* [Events](#Events)

## Quick start

### Install

```bash
# install af-scroll npm package
npm install --save af-scroll
```

### Initialization

```js
// import create function
import createAFScroll from 'af-scroll';

// call to initialize
createAFScroll();
```

## Features

* alignment of js on scroll updates with the visual scroll update
* on scroll updates throttled by requestAnimationFrame
* native scroll triggers (native scrollbar, mouse wheel, keyboard, touch)
* scroll smoothing (optional)
* scroll locking (optional)

## Disadvantages

* additional wrapping element in DOM 
* missing support for native scroll to results of find on page

## Why you may need AFScroll?

If you want to manipulate DOM elements by js and set them based on the scroll position.

### What happens when you use default scroll:

* user scrolls a page
* browser renders new scroll position
* **user sees new scroll position**
* the native on scroll event is triggered
* js updates for current scroll position  
(any custom DOM manipulations by js)
* **user sees DOM elements updated by js**

### What happens when you use AFScroll:

* user scrolls a page
* browser renders new scroll position
* user not sees new scroll position
* the native on scroll event is triggered
* js updates for current scroll position  
(update visible scroll position & any custom DOM manipulations by js)
* **user sees new scroll position & DOM elements updated by js in the same time**

## Options

```js
createAFScroll({
  smoothForce: 0.8,
  smoothLimit: 0.2,
  scrollEl: null,
  className: 'afScroll',
  wrapExclude: 'script, link',
  autoHeight: 12,
  onUpdate: () => {},
  onComplete: () => {},
});
```

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `smoothForce` | Number | `0.8` | smoothing force in range 0.0 - 1.0<br />`0`: no smooth<br />`1`: no scroll |
| `smoothLimit` | Number | `0.2` | min diff between current and target value to keep smooth loop |
| `scrollEl` | Element | `null` | static scroll wrapper element<sup>1</sup> |
| `className` | String | `"afScroll"` | css class name of scroll wrapper element<sup>2</sup> |
| `wrapExclude` | String | `"script, link"` | css selector to exclude from wrapping<sup>2</sup> |
| `autoHeight` | Number | `12` | height checking period in frames<br />`1`: each frame<br />`0`: disabled<br />`12`: once per each 12 frames |
| `onUpdate` | Function | `() => {}` | callback function triggered on scroll update |
| `onComplete` | Function | `() => {}` | callback function triggered after smooth loop stopped |

1. prevents DOM modification by auto created wrapper, passed `scrollEl` will be used instead of it
2. ignored if `scrollEl` passed

## Methods

```js
// example of using methods
const afScroll = createAFScroll(/* optional options */);
afScroll.scrollTo(0); // scroll to top
afScroll.lock(); // lock scroll
afScroll.unlock(); // unlock scroll
afScroll.destroy(); // destroy af-scroll
afScroll.init(); // reinit af-scroll
```

| Method | Arguments | Return | Description |
| --- | --- | --- | --- |
| `init()` | none | undefined | reinitialize the script after destroy |
| `scrollTo(scroll)` | `scroll` {Number} target scroll value in px unit | undefined | scroll to `scroll` value |
| `lock()` | none | undefined | lock scroll |
| `unlock()` | none | undefined | unlock scroll |
| `destroy()` | none | undefined | destroy the script and restore original html |

## Events

```js
createAFScroll({
  onUpdate: (scroll) => {
    // custom behavior
  },
  onComplete: (scroll) => {
    // custom behavior
  },
});
```

| Event | Arguments | When triggered |
| --- | --- | --- |
| `onUpdate(scroll)` | `scroll` {Number} scroll value in px unit | in each animation frame of move to target scroll |
| `onComplete(scroll)` | `scroll` {Number} scroll value in px unit | after achieve target scroll - smooth loop stopped |