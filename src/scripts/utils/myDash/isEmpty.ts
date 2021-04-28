// []        true, empty array
// {}        true, empty object
// null      true
// undefined true
// ""        true, empty string
// ''        true, empty string
// 0         false, number
// true      false, boolean
// false     false, boolean
// Date      false
// function  false

export const isEmpty = (value: unknown) => {
  const firstCondition = typeof (value) === 'function'
    || typeof (value) === 'number'
    || typeof (value) === 'boolean'
    || Object.prototype.toString.call(value) === '[object Date]';

  if (firstCondition) return false;

  return value === undefined
    || value == null
    || Array.isArray(value) && value.length === 0
    || Object.prototype.toString.call(value) === '[object Object]' && Object.keys(value as object).length === 0;
};
