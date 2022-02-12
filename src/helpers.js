/**
 * lerp
 * @param {Array} arr array or other iterable collection
 * @param {Function} cb callback function for each array element
 */
export const each = (arr, cb) => {
  const l = arr.length;
  for (let i = 0; i < l; i++) {
    const result = cb(arr[i], i, arr);
    if (result === true) continue;
    if (result === false) break;
  }
};

/**
 * lerp
 * @param {Number} begin begin value
 * @param {Number} end end value
 * @param {Number} factor in range 0.0 - 1.0
 * @returns interpolated value
 */
export const lerp = (begin, end, factor) => {
  return begin + ((end - begin) * factor);
};

/**
 * style
 * @param {Element} el
 * @param {Object} styles
 */
export const style = (el, styles) => {
  Object.keys(styles).forEach(styleKey => {
    el.style[styleKey] = styles[styleKey];
  });
};

export default {
  each,
  lerp,
  style,
};