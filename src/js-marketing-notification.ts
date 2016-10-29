import { LocalStorageManager } from './github/gtmsportswear/js-local-storage-manager@1.0.2/local-storage-manager';

export interface Notification {
  tabContent: string,
  heading: string;
  buttonTitle: string;
  image?: string;
  content?: string;
}

export class JsMarketingNotification {
  private notificationContainer: Element;
  
  constructor(private notificationTitle: string) {}

  public output(notification: Notification): void {
    const lsm = new LocalStorageManager(),
          body = this.createNotificationBody(notification);

    this.notificationContainer = document.createElement('div');
    this.notificationContainer.classList.add('marketing-notification');
    if (this.isFirstPageVisit())
      this.notificationContainer.classList.add('expanded');
    
    lsm.setItem(this.notificationTitle, new Date().toISOString());
    this.createNotificationTab(this.notificationContainer, notification.tabContent);
    this.notificationContainer.appendChild(body);

    document.body.appendChild(this.notificationContainer);
  }

  public remove(): void {
    if (this.notificationContainer && document.body.contains(this.notificationContainer))
      document.body.removeChild(this.notificationContainer);
  }

  private isFirstPageVisit(): boolean {
    return null === localStorage.getItem(this.notificationTitle);
  }

  private createNotificationTab(container: Element, content: string): void {
    const tabNode = document.createElement('div'),
          contentNode = document.createElement('h4');
          
    contentNode.innerHTML = content;
    tabNode.appendChild(contentNode);
    tabNode.classList.add('marketing-notification__tab');

    tabNode.addEventListener('click', e => {
      container.classList.toggle('expanded');
    });

    container.appendChild(tabNode);
  }

  private createNotificationBody(notification: Notification): DocumentFragment {
    const fragment = document.createDocumentFragment(),
          body = document.createElement('div');
    body.classList.add('marketing-notification__body');

    this.createHeading(body, notification.heading);
    this.createImage(body, notification.image);
    this.createContent(body, notification.content);
    this.createButton(body, notification.buttonTitle);

    fragment.appendChild(body);

    return fragment;
  }

  private createHeading(container: Element, heading: string): void {
    const headingNode = document.createElement('h4');
    headingNode.innerHTML = heading;
    container.appendChild(headingNode);
  }

  private createImage(container: Element, imageSrc: string): void {
    if (null == imageSrc) return;

    const imageNode = document.createElement('img');
    imageNode.src = imageSrc;
    container.appendChild(imageNode);
  }

  private createContent(container: Element, content: string): void {
    if (null == content) return;

    const contentNode = document.createElement('p');
    contentNode.innerHTML = content;
    container.appendChild(contentNode);
  }

  private createButton(container: Element, title: string): void {
    const buttonNode = document.createElement('button');
    ['btn', 'blue', 'primary'].forEach(className => buttonNode.classList.add(className));
    buttonNode.innerHTML = title;

    container.appendChild(buttonNode);
  }
}
