import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';

import { AppModule } from './app/app.module';
import { AppConfig } from './app/models/app-config';

const results: Array<any> = [];

const filesToFetch: Array<any> = [
  fetch('./assets/config/base-config.json')
    .then(response => response.json())
    .then(config => results[0] = config)
];

Promise.all(filesToFetch).then(() => {
  const config = Object.assign({}, results[0]);
  if (environment.production) {
    enableProdMode();
  }
  platformBrowserDynamic([{provide: AppConfig, useValue: config}]).bootstrapModule(AppModule)
    .catch(err => console.error(err));
});
