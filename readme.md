# AFScroll (Animation Frame Scroll)

The script aligns page scroll update with animation frame.  
It allows to perform js based DOM manipulation related to page scroll just in time, not too late.

## Quick start

### Install

`npm install --save af-scroll`

### Initialization

```js
import createAFScroll from 'af-scroll';
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

## Methods
