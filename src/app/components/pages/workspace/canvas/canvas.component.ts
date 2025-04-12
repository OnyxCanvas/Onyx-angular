import { afterNextRender, Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { CanvasService } from '@services/canvas.service';
import { CanvasCursor, CanvasToolType } from '@app/models/tools';
import { OnyxCanvas } from '@app/components/classes/canvas';
import { availableCanvasTools } from '@app/components/configs/tools';
import { UnsubscribeService } from '@services/unsubscribe.service';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'oc-canvas',
  imports: [CdkDrag, ToolbarComponent],
  templateUrl: './canvas.component.html',
  styles: ``,
  providers: [UnsubscribeService]
})
export class CanvasComponent {

  private canvasRef: OnyxCanvas | null = null;
  protected readonly unsubscribe$ = inject(UnsubscribeService);
  protected readonly canvasService = inject(CanvasService);
  private readonly mainCanvas = viewChild.required<ElementRef<HTMLCanvasElement>>('mainCanvas');
  private readonly container = viewChild.required<ElementRef<HTMLDivElement>>('container');
  protected readonly isDragEnabled = signal(false);
  protected readonly currentCursor = signal<CanvasCursor>(CanvasCursor.DEFAULT);
  protected readonly initialWidth = signal(0);
  protected readonly initialHeight = signal(0);

  constructor() {
    afterNextRender(() => {
      const container = this.container().nativeElement;
      const { width, height } = container.getBoundingClientRect();
      this.initialWidth.set(width);
      this.initialHeight.set(height);
      this.canvasRef = new OnyxCanvas(this.mainCanvas().nativeElement);
    })
    this.canvasService.selectedTool$.pipe(takeUntil(this.unsubscribe$)).subscribe((tool) => {
      this.isDragEnabled.set(tool === CanvasToolType.PAN);
      const selectedTool = availableCanvasTools.find(t => t.name === tool);
      if (selectedTool) {
        this.currentCursor.set(selectedTool.cursor || CanvasCursor.DEFAULT);
      }
    })
  }
}
