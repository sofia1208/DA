import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

export function GetBaseUrl() {
  return document.GetElementsByTagName('base')[0].href;
}

const providers = [
  { provide: 'BASE_URL', useFactory: GetBaseUrl, deps: [] }
];

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic(providers).bootstrapModule(AppModule)
  .catch(err => console.log(err));

export { renderModule, renderModuleFactory } from '@angular/platform-server';