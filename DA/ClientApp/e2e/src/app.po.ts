import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.Get('/');
  }

  GetMainHeading() {
    return element(by.css('app-root h1')).GetText();
  }
}
