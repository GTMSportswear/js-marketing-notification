import { LocalStorageManager } from './github/gtmsportswear/js-local-storage-manager@1.0.2/local-storage-manager';

export interface NotificationNode {
  classNames?: Array<string>,
  node: Element
}

export interface Notification {
  tabContent: NotificationNode,
  notificationBlocks: Array<NotificationNode>
}

export class JsMarketingNotification {
  private notificationContainer: Element,
          lsm = new LocalStorageManager();

  constructor(private notificationTitle: string) { }

  public output(notification: Notification): void {
    this.notificationContainer = document.createElement('div');
    this.notificationContainer.classList.add('marketing-notification');

    const tab = this.createNotificationTab(notification.tabContent, this.notificationContainer),
          body = this.createNotificationBody(notification.notificationBlocks);

    this.notificationContainer.appendChild(tab);
    this.notificationContainer.appendChild(body);
    document.body.appendChild(this.notificationContainer);

    if (this.isFirstPageVisit())
      this.notificationContainer.classList.add('expanded');

    this.lsm.setItem(this.notificationTitle, new Date().toISOString());
  }

  public remove(): void {
    if (this.notificationContainer && document.body.contains(this.notificationContainer))
      document.body.removeChild(this.notificationContainer);
  }

  private isFirstPageVisit(): boolean {
    return null === this.lsm.getItem(this.notificationTitle);
  }

  private createNotificationTab(notification: NotificationNode, containerNode: Element): Element {
    const node = document.createElement('div');

    this.appendNotificationNode(notification, node);
    node.classList.add('marketing-notification__tab');

    node.addEventListener('click', e => {
      containerNode.classList.toggle('expanded');
    });

    return node;
  }

  private createNotificationBody(notificationBlocks: Array<NotificationNode>): Element {
    const node = document.createElement('div'),
          notificationNodes = notificationBlocks.map(block => this.appendNotificationNode(block, node));

    node.classList.add('marketing-notification__body');

    return node;
  }

  private appendNotificationNode(notification: NotificationNode, containerNode: Element): Element {
    containerNode.appendChild(notification.node);

    if (null != notification.classNames && notification.classNames.length > 0)
      notification.classNames.forEach(className => containerNode.classList.add(className));

    return containerNode;
  }
}
