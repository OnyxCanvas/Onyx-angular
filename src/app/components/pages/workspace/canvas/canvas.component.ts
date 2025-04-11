import { afterRender, Component, ElementRef, signal, viewChild } from '@angular/core';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { ToolbarComponent } from "./toolbar/toolbar.component";

@Component({
  selector: 'oc-canvas',
  imports: [CdkDrag, ToolbarComponent],
  templateUrl: './canvas.component.html',
  styles: ``
})
export class CanvasComponent {

  private container = viewChild.required<ElementRef<HTMLDivElement>>('container')

  protected initialWidth = signal(0);
  protected initialHeight = signal(0);

  constructor() {
    afterRender(() => {
      const container = this.container().nativeElement;
      const { width, height } = container.getBoundingClientRect();
      this.initialWidth.set(width);
      this.initialHeight.set(height);
    })
  }
}
