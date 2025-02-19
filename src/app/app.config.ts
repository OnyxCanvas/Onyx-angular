import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { routes } from './app.routes';
import { OcThemePreset } from './oc-theme';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
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
    })
  ]
};
