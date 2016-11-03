import { JsMarketingNotification, Notification } from './js-marketing-notification';
import { LocalStorageManager } from './github/gtmsportswear/js-local-storage-manager@1.0.2/local-storage-manager';

let lsm: LocalStorageManager,
    notifier: JsMarketingNotification,
    notification: Notification = {
      tabContent: document.createElement('h2'),
      notificationBlocks: [document.createElement('a')]
    };

QUnit.module('Marketing notification', {
  beforeEach: () => {
    lsm = new LocalStorageManager();
    notifier = new JsMarketingNotification('catalog-request');
  },
  afterEach: () => {
    notifier.remove();
    lsm.removeItem('catalog-request');
  }
});

QUnit.test('can append itself to page.', assert => {
  notifier.output(notification);
  const node = document.querySelector('.marketing-notification');

  assert.ok(node);
});

QUnit.test('can remove itself from page', assert => {
  notifier.output(notification);
  notifier.remove();
  const node = document.querySelector('.marketing-notification');

  assert.notOk(node);
});

QUnit.test('should be expanded on first page load', assert => {
  notifier.output(notification);

  console.log(lsm.getItem('catalog-request'));
  assert.ok(document.querySelector('.marketing-notification').classList.contains('expanded'));
});

QUnit.test('should be collapsed on subsequent page loads', assert => {
  lsm.setItem('catalog-request', new Date().toISOString());

  notifier.output(notification);
  assert.notOk(document.querySelector('.marketing-notification').classList.contains('expanded'));
});

QUnit.test('should toggle expanded class when clicked', assert => {
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

QUnit.test('should add to local storage after initial load', assert=> {
  notifier.output(notification);

  assert.notEqual(lsm.getItem('catalog-request'), null);
});

QUnit.test('should contain tab content', assert => {
  notifier.output(notification);
  const node = document.querySelector('.marketing-notification__tab');

  assert.notEqual(node, null);
  assert.notEqual(node.querySelector('h2'), null);
});

QUnit.test('should contain notification block', assert => {
  notifier.output(notification);
  const node = document.querySelector('.marketing-notification__body');

  assert.notEqual(node, null);
  assert.notEqual(node.querySelector('a'), null);
});
