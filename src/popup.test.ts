import { IViewEngine } from '../view/view';
import { Popup } from './popup';

let viewSpy: ViewSpy,
    popup: Popup;

QUnit.module('Popup', {
  beforeEach: () => {
    viewSpy = new ViewSpy();
    popup = new Popup('marketing-notification', viewSpy);
  },
  afterEach: () => {
    popup.remove();
    localStorage.removeItem('marketing-notification');
  }
});

test('Can handle basic inputs', assert => {
  popup.output('someViewTemplateString.html', {
    test: 'variable'
  });

  equal(viewSpy.callString, 'someViewTemplateString.html');
  equal(viewSpy.callVars.test, 'variable');
});

test('Can append itself to page', assert => {
  const done = assert.async();

  popup.output('template.html', {})
    .then(() => {
      notEqual(document.querySelector('.popup__bottom'), null);
      done();
    });
});

test('Can remove itself from page', assert => {
  const done = assert.async();

  popup.output('template.html', {})
    .then(() => {
      popup.remove();
      equal(document.querySelector('.popup__bottom'), null);
      done();
    }); 
});

test('Should be expanded on first page load', assert => {
  const done = assert.async();

  popup.output('template.html', {})
    .then(() => {
      ok(document.querySelector('.popup__bottom').classList.contains('expanded'));
      done();
    });
});

test('Should be collapsed on subsequent page loads', assert => {
  const done = assert.async();
  localStorage.setItem('marketing-notification', new Date().toISOString());

  popup.output('template.html', {})
    .then(() => {
      notOk(document.querySelector('.popup__bottom').classList.contains('expanded'));
      done();
    });
});

class ViewSpy implements IViewEngine {
  public callString = '';
  public callVars: any;

  public get(targetTemplate: string, vars: any): Promise<Element> {
    this.callString = targetTemplate;
    this.callVars = vars;
    
    return new Promise((success, error) => {
      success(document.createElement('div'));
    });
  }
}
