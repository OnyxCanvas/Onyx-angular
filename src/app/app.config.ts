import { ApplicationConfig, inject, provideEnvironmentInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { OcThemePreset } from './oc-theme';
import { HotToastService, provideHotToastConfig } from '@ngneat/hot-toast';
import { ToastProxy } from '@classes/core/toast-proxy';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHotToastConfig({
      position: 'bottom-center',
      theme: 'toast'
    }),
    providePrimeNG({
      theme: {
        preset: OcThemePreset,
        options: {
          darkModeSelector: 'dark',
          cssLayer: {
            name: 'primeng',
            order: 'tailwind.base, primeng, tailwind.components, tailwind.utilities'
          }
        }
      }
    }),
    provideEnvironmentInitializer(() => ToastProxy.init(inject(HotToastService)))
  ]
};
