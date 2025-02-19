import { Component } from '@angular/core';
import { OCCommonsModule } from '@app/oc-commons.module';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'oc-navbar',
  imports: [AvatarModule, OCCommonsModule],
  templateUrl: './navbar.component.html',
  styles: ``
})
export class NavbarComponent {

}
