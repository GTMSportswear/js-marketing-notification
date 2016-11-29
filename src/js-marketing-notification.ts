import { LocalStorageManager } from './github/gtmsportswear/js-local-storage-manager@1.0.2/local-storage-manager';

export interface Notification {
  tabText: string;
  notificationBlocks: Array<Element>;
  collapseTimeout?: number;
}

export class JsMarketingNotification {
  private notificationContainer: Element;
  private lsm = new LocalStorageManager();
  private openCallback: Function;
  private closeCallback: Function;

  public output(notification: Notification): void {
    this.notificationContainer = document.createElement('div');
    this.notificationContainer.classList.add('marketing-notification');
    this.notificationContainer.appendChild(this.createNotificationTab(notification.tabText, this.notificationContainer, notification));
    this.notificationContainer.appendChild(this.createNotificationBody(notification.notificationBlocks));
    this.notificationParent.appendChild(this.notificationContainer);

    notification.collapseTimeout = notification.collapseTimeout ? notification.collapseTimeout : 1000 * 10;

    if (this.isFirstPageVisit()) {
      this.toggleNotificationDisplay(this.notificationContainer, notification);
      setTimeout(() => {
        if (this.notificationContainer.classList.contains('marketing-notification--expanded'))
          this.toggleNotificationDisplay(this.notificationContainer, notification);
      }, notification.collapseTimeout);
    }
    this.lsm.setItem(this.notificationTitle, new Date().toISOString());
  }

  public remove(): void {
    if (this.notificationContainer && document.body.contains(this.notificationContainer))
      document.body.removeChild(this.notificationContainer);
  }

  public set setOpenCallback(fn: Function) {
    if (typeof(fn) !== 'function') return;
    this.openCallback = fn;
  }

  public set setCloseCallback(fn: Function) {
    if (typeof(fn) !== 'function') return;
    this.closeCallback = fn;
  }

  constructor(private notificationTitle: string, private notificationParent: Element) { }

  private isFirstPageVisit(): boolean {
    return null === this.lsm.getItem(this.notificationTitle);
  }

  private createNotificationTab(tabText: string, containerNode: Element, notification: Notification): Element {
    const node = document.createElement('div'),
          nodeHeader = document.createElement('h2'),
          nodeArrow = document.createElement('span');

    ['icon', 'arrow-right'].forEach(clss => nodeArrow.classList.add(clss));
    nodeHeader.innerHTML = tabText;
    node.appendChild(nodeHeader);
    node.appendChild(nodeArrow);
    node.classList.add('marketing-notification__tab');

    node.addEventListener('click', e => {
      this.toggleNotificationDisplay(containerNode, notification);
    });

    return node;
  }

  private createNotificationBody(notificationBlocks: Array<Element>): Element {
    const node = document.createElement('div');

    notificationBlocks.forEach(block => this.appendNotificationNode(block, node));
    node.classList.add('marketing-notification__body');

    return node;
  }

  private appendNotificationNode(node: Element, containerNode: Element): Element {
    containerNode.appendChild(node);

    return containerNode;
  }

  private toggleNotificationDisplay(node: Element, notification: Notification): void {
    const expansionClass = 'marketing-notification--expanded';
    node.classList.toggle(expansionClass);

    if (node.classList.contains(expansionClass)) {
      if (this.openCallback) this.openCallback(node);
    }
    else {
      if (this.closeCallback) return this.closeCallback(node);
    }
  }
}
