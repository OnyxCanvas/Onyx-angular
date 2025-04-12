import { afterRender, Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { CanvasService } from '@services/canvas.service';
import { CanvasToolType } from '@app/models/tools';

@Component({
  selector: 'oc-canvas',
  imports: [CdkDrag, ToolbarComponent],
  templateUrl: './canvas.component.html',
  styles: ``
})
export class CanvasComponent {

  protected readonly canvasService = inject(CanvasService);
  private readonly container = viewChild.required<ElementRef<HTMLDivElement>>('container');

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

  protected get isDragToolSelected() {
    return this.canvasService.getCurrentTool()?.name === CanvasToolType.PAN;
  }
}
