import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '@layout/navbar/navbar.component';

@Component({
  selector: 'oc-app-layout',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app-layout.component.html',
  styles: ``
})
export class AppLayoutComponent {

}
