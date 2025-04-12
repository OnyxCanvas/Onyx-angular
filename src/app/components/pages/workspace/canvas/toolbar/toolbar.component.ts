import { AsyncPipe, NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { availableCanvasTools } from '@app/components/configs/tools';
import { CanvasTool, CanvasToolType } from '@app/models/tools';
import { CanvasService } from '@services/canvas.service';

@Component({
  selector: 'oc-toolbar',
  imports: [NgClass, AsyncPipe],
  templateUrl: './toolbar.component.html',
  styles: ``
})
export class ToolbarComponent implements OnInit {

  protected readonly canvasService = inject(CanvasService);

  protected readonly availableTools: CanvasTool[] = availableCanvasTools;

  ngOnInit(): void {
    this.canvasService.selectedTool$.next(CanvasToolType.PAN)
  }

}
