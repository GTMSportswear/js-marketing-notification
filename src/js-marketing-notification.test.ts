import { JsMarketingNotification, Notification } from './js-marketing-notification';

let notifier: JsMarketingNotification,
    notification: Notification;

QUnit.module('Marketing notification', {
  beforeEach: () => {
    notifier = new JsMarketingNotification('catalog-request');
    notification = {
      tabContent: 'Order Catalog',
      heading: 'GTM Sportswear',
      buttonTitle: 'Click Me'
    };
  },
  afterEach: () => {
    notifier.remove();
    localStorage.removeItem('catalog-request');
  }
});

QUnit.test('Can append itself to page.', assert => {
  notifier.output(notification);
  const node = document.querySelector('.marketing-notification');

  assert.ok(node);
});

QUnit.test('Can remove itself from page', assert => {
  notifier.output(notification);
  notifier.remove();
  const node = document.querySelector('.marketing-notification');

  assert.notOk(node);
});

QUnit.test('Should be expanded on first page load', assert => {
  notifier.output(notification);

  assert.ok(document.querySelector('.marketing-notification').classList.contains('expanded'));
});

QUnit.test('Should be collapsed on subsequent page loads', assert => {
  localStorage.setItem('catalog-request', new Date().toISOString());

  notifier.output(notification);
  assert.notOk(document.querySelector('.marketing-notification').classList.contains('expanded'));
});

QUnit.test('Should display notification content', assert => {
  notifier.output(notification);
  const node = document.querySelector('.marketing-notification');

  assert.equal(node.querySelector('.marketing-notification__tab h4').innerHTML, 'Order Catalog')
  assert.equal(node.querySelector('.marketing-notification__body h4').innerHTML, 'GTM Sportswear');
  assert.equal(node.querySelector('img'), null);
  assert.equal(node.querySelector('p'), null);
  assert.equal(node.querySelector('button').innerHTML, 'Click Me');
});

QUnit.test('Should show optional content if available', assert => {
  notification.image = 'testImage.jpg';
  notification.content = 'Lorem ipsum';
  notifier.output(notification);
  const node = document.querySelector('.marketing-notification');

  assert.equal(node.querySelector('img').getAttribute('src'), 'testImage.jpg');
  assert.equal(node.querySelector('p').innerHTML, 'Lorem ipsum');
});

QUnit.test('Should toggle expanded class when clicked', assert => {
  notifier.output(notification);
  const node = document.querySelector('.marketing-notification'),
        tabNode = document.querySelector('.marketing-notification__tab'),
        event = new MouseEvent('click', {
                  'view': window,
                  'bubbles': true,
                  'cancelable': true
                });

  tabNode.dispatchEvent(event);
  assert.notOk(node.classList.contains('expanded'));
  tabNode.dispatchEvent(event);
  assert.ok(node.classList.contains('expanded'));
});

QUnit.test('Should add to local storage after initial load', assert=> {
  notifier.output(notification);

  assert.notEqual(localStorage.getItem('catalog-request'), null);
});
