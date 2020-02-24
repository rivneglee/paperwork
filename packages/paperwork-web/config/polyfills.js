'use strict';

if (typeof Promise === 'undefined') {
  // Rejection tracking prevents a common issue where React gets into an
  // inconsistent state due to an error, but it gets swallowed by a Promise,
  // and the user has no idea what causes React's erratic future behavior.
  require('promise/lib/rejection-tracking').enable();
  window.Promise = require('promise/lib/es6-extensions.js');
}

// fetch() polyfill for making API calls.
require('whatwg-fetch');
require('core-js/fn/object/assign');
require('core-js/fn/object/values');
require('core-js/fn/string/starts-with');
require('core-js/fn/string/ends-with');
require('core-js/fn/number/is-nan');
require('core-js/fn/array/from');
require('core-js/fn/array/find');
require('core-js/fn/array/fill');
require('core-js/fn/array/find-index');
require('core-js/fn/array/is-array');
require('core-js/fn/map');
require('core-js/fn/set');
require('core-js/modules/es6.symbol');

// Object.assign() is commonly used with React.
// It will use the native implementation if it's present and isn't buggy.
Object.assign = require('object-assign');

// In tests, polyfill requestAnimationFrame since jsdom doesn't provide it yet.
// We don't polyfill it in the browser--this is user's responsibility.
if (process.env.NODE_ENV === 'test') {
  require('raf').polyfill(global);
}
