import { JsMarketingNotification } from './js-marketing-notification';

let notifier: JsMarketingNotification;

QUnit.module('Marketing notification', {
  beforeEach: () => {
    notifier = new JsMarketingNotification('catalog-request');
  },
  afterEach: () => {
    notifier.remove();
    localStorage.removeItem('catalog-request');
  }
});

QUnit.test('Can handle basic inputs', assert => {
  notifier.output();
  const node = document.querySelector('.marketing-notification');

  assert.ok(node);
});

// test('Can append itself to page', assert => {
//   const done = assert.async();

//   popup.output('template.html', {})
//     .then(() => {
//       notEqual(document.querySelector('.popup__bottom'), null);
//       done();
//     });
// });

// test('Can remove itself from page', assert => {
//   const done = assert.async();

//   popup.output('template.html', {})
//     .then(() => {
//       popup.remove();
//       equal(document.querySelector('.popup__bottom'), null);
//       done();
//     }); 
// });

// test('Should be expanded on first page load', assert => {
//   const done = assert.async();

//   popup.output('template.html', {})
//     .then(() => {
//       ok(document.querySelector('.popup__bottom').classList.contains('expanded'));
//       done();
//     });
// });

// test('Should be collapsed on subsequent page loads', assert => {
//   const done = assert.async();
//   localStorage.setItem('marketing-notification', new Date().toISOString());

//   popup.output('template.html', {})
//     .then(() => {
//       notOk(document.querySelector('.popup__bottom').classList.contains('expanded'));
//       done();
//     });
// });