import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule
  ],
  exports: [
    ButtonModule
  ]
})
export class OCCommonsModule { }
