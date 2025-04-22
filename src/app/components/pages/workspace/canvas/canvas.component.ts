import { afterNextRender, Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { CanvasService } from '@services/canvas.service';
import { CanvasCursor, CanvasToolType } from '@app/models/tools';
import { OnyxCanvas } from '@app/classes/canvas';
import { availableCanvasTools } from '@app/configs/tools';
import { UnsubscribeService } from '@services/unsubscribe.service';
import { takeUntil } from 'rxjs';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'oc-canvas',
  imports: [ToolbarComponent],
  templateUrl: './canvas.component.html',
  styles: ``,
  providers: [UnsubscribeService]
})
export class CanvasComponent {

  private toaster = inject(HotToastService);

  private canvasRef: OnyxCanvas | null = null;
  private readonly unsubscribe$ = inject(UnsubscribeService);
  protected readonly canvasService = inject(CanvasService);
  private readonly mainCanvas = viewChild.required<ElementRef<HTMLDivElement>>('mainCanvas');
  private readonly container = viewChild.required<ElementRef<HTMLDivElement>>('container');
  protected readonly currentCursor = signal<CanvasCursor>(CanvasCursor.DEFAULT);

  constructor() {
    afterNextRender(() => {
      const container = this.container().nativeElement;
      const { width, height } = container.getBoundingClientRect();
      this.canvasRef = new OnyxCanvas(this.mainCanvas().nativeElement, width, height);
    })
    this.canvasService.selectedTool$.pipe(takeUntil(this.unsubscribe$)).subscribe((tool) => {
      this.canvasRef?.togglePanningMode(tool === CanvasToolType.PAN);
      const selectedTool = availableCanvasTools.find(t => t.name === tool);
      if (selectedTool) {
        this.currentCursor.set(selectedTool.cursor || CanvasCursor.DEFAULT);
      }
    })
  }

}
