"use strict";
var Popup = (function () {
    function Popup(popupTitle, viewEngine) {
        this.popupTitle = popupTitle;
        this.viewEngine = viewEngine;
    }
    Popup.prototype.output = function (viewTemplate, vars) {
        var _this = this;
        this.popupNode = this.createPopupNode('popup__bottom');
        return new Promise(function (success, error) {
            _this.viewEngine.get(viewTemplate, vars)
                .then(function (view) {
                _this.popupNode.appendChild(view);
                document.body.appendChild(_this.popupNode);
                success();
            })
                .catch(error);
        });
    };
    Popup.prototype.remove = function () {
        if (this.popupNode && document.body.contains(this.popupNode))
            document.body.removeChild(this.popupNode);
    };
    Popup.prototype.createPopupNode = function (className) {
        var popupNode = document.createElement('div');
        popupNode.classList.add(className);
        if (this.isFirstPageVisit())
            popupNode.classList.add('expanded');
        return popupNode;
    };
    Popup.prototype.isFirstPageVisit = function () {
        return null === localStorage.getItem(this.popupTitle);
    };
    return Popup;
}());
exports.Popup = Popup;
