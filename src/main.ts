import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideAnimations } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import localeEl from '@angular/common/locales/el';
import { LOCALE_ID } from '@angular/core';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideAnimations(),
    { provide: LOCALE_ID, useValue: 'el' }
  ]
}).catch((err) => console.error(err));
registerLocaleData(localeEl);
