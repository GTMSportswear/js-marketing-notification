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
    this.popupNode = document.createElement('div');
    this.popupNode.classList.add('marketing-notification');
    if (this.isFirstPageVisit())
      this.popupNode.classList.add('expanded');

    document.body.appendChild(this.popupNode);
  }

  public remove(): void {
    if (this.popupNode && document.body.contains(this.popupNode))
      document.body.removeChild(this.popupNode);
  }

  private isFirstPageVisit(): boolean {
    return null === localStorage.getItem(this.popupTitle);
  }
}