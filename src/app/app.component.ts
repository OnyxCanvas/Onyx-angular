import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'oc-root',
  imports: [RouterOutlet, ButtonModule],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'onyxCanvas';
}
