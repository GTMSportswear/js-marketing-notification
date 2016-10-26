export interface Notification {
  heading: string;
  buttonTitle: string;
  image?: string;
  content?: string;
}

export class JsMarketingNotification {
  private popupNode: Element;
  
  constructor(private popupTitle: string) {}

  public output(): void {
    const popupNode = document.createElement('div');
    popupNode.classList.add('marketing-notification');
    if (this.isFirstPageVisit())
      popupNode.classList.add('expanded');

    document.body.appendChild(popupNode);
  }

  public remove(): void {
    if (this.popupNode && document.body.contains(this.popupNode))
      document.body.removeChild(this.popupNode);
  }

  private isFirstPageVisit(): boolean {
    return null === localStorage.getItem(this.popupTitle);
  }
}