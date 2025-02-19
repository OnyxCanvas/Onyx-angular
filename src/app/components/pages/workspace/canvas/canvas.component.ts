import { afterRender, AfterViewInit, ChangeDetectorRef, Component, ElementRef, viewChild } from '@angular/core';

@Component({
  selector: 'oc-canvas',
  imports: [],
  templateUrl: './canvas.component.html',
  styles: ``
})
export class CanvasComponent {

  container = viewChild.required<ElementRef<HTMLDivElement>>('container')

  initialWidth = 0;
  initialHeight = 0;

  constructor(cdr: ChangeDetectorRef) {
    afterRender(() => {
      const container = this.container().nativeElement;
      const { width, height } = container.getBoundingClientRect();
      this.initialWidth = width;
      this.initialHeight = height;
      cdr.detectChanges();
    })
  }
}
