import { IViewEngine, View } from '../view/view';

export class Popup {
  private popupNode: Element;
  
  constructor(private popupTitle: string, private viewEngine: IViewEngine) {}

  public output(viewTemplate: string, vars: any): Promise<Element> {
    this.popupNode = this.createPopupNode('popup__bottom');

    return new Promise((success, error) => {
      this.viewEngine.get(viewTemplate, vars)
        .then((view: View) => {
          this.popupNode.appendChild(view);
          document.body.appendChild(this.popupNode);
          success();
        })
        .catch(error);
    });
  }

  public remove(): void {
    if (this.popupNode && document.body.contains(this.popupNode))
      document.body.removeChild(this.popupNode);
  }

  private createPopupNode(className: string): Element {
    const popupNode = document.createElement('div');
    popupNode.classList.add(className);
    if (this.isFirstPageVisit())
      popupNode.classList.add('expanded');

    return popupNode;
  }

  private isFirstPageVisit(): boolean {
    return null === localStorage.getItem(this.popupTitle);
  }
}
