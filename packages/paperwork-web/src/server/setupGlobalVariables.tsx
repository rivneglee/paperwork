// @ts-nocheck
import { JSDOM } from 'jsdom';

const dom = new JSDOM('', {
  url: 'https://ssr.paperwork.com/',
  referrer: 'https://ssr.paperwork.com/',
  contentType: 'text/html',
  includeNodeLocations: true,
  storageQuota: 10000000,
});
global.window = dom.window;
global.document = dom.window.document;
global.HTMLElement = window.HTMLElement;
global.HTMLAnchorElement = window.HTMLAnchorElement;
Object.keys(window).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property];
  }
});
global.localStorage = {
  setItem: () => {},
  getItem: () => null,
};
global.navigator = {
  userAgent: 'node',
};
