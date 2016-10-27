export interface Notification {
  heading: string;
  buttonTitle: string;
  image?: string;
  content?: string;
}

export class JsMarketingNotification {
  private notificationContainer: Element;
  
  constructor(private popupTitle: string) {}

  public output(notification: Notification): void {
    this.notificationContainer = document.createElement('div');
    this.notificationContainer.classList.add('marketing-notification');
    if (this.isFirstPageVisit())
      this.notificationContainer.classList.add('expanded');

    const tab = this.createNotificationTab(this.notificationContainer);
    const body = this.createNotificationBody(notification);
    
    this.notificationContainer.appendChild(body);

    document.body.appendChild(this.notificationContainer);
  }

  public remove(): void {
    if (this.notificationContainer && document.body.contains(this.notificationContainer))
      document.body.removeChild(this.notificationContainer);
  }

  private isFirstPageVisit(): boolean {
    return null === localStorage.getItem(this.popupTitle);
  }

  private createNotificationTab(container: Element): void {
    const tab = document.createElement('div');
    tab.classList.add('marketing-notification__tab');
    tab.addEventListener('click', e => {
      container.classList.toggle('expanded');
    });

    container.appendChild(tab);
  }

  private createNotificationBody(notification: Notification): DocumentFragment {
    const fragment = document.createDocumentFragment();
    const body = document.createElement('div');
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
    if (!imageSrc) return;

    const imageNode = document.createElement('img');
    imageNode.src = imageSrc;
    container.appendChild(imageNode);
  }

  private createContent(container: Element, content: string): void {
    if (!content) return;

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
