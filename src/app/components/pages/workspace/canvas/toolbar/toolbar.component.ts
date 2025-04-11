import { AsyncPipe, NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CanvasTool, CanvasToolType } from '@app/models/tools';
import { CanvasService } from '@services/canvas.service';

@Component({
  selector: 'oc-toolbar',
  imports: [NgClass, AsyncPipe],
  templateUrl: './toolbar.component.html',
  styles: ``
})
export class ToolbarComponent implements OnInit {

  protected canvasService = inject(CanvasService);

  protected availableTools: CanvasTool[] = [
    {
      name: CanvasToolType.PAN,
      icon: 'pan_tool',
      description: 'Pan tool',
      action: () => {
        console.log('Select tool clicked');
      }
    },
    {
      name: CanvasToolType.SELECT,
      icon: 'arrow_selector_tool',
      description: 'Select tool',
      action: () => {
        console.log('Select tool clicked');
      }
    },
  ]

  ngOnInit(): void {
    this.canvasService.selectedTool$.next(CanvasToolType.PAN)
  }

}
