import { AsyncPipe, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CanvasTool } from '@app/models/tools';
import { CanvasService } from '@services/canvas.service';

@Component({
  selector: 'oc-toolbar',
  imports: [NgClass, AsyncPipe],
  templateUrl: './toolbar.component.html',
  styles: ``
})
export class ToolbarComponent {

  protected canvasService = inject(CanvasService);

  protected availableTools: CanvasTool[] = [
    {
      name: 'Pan',
      icon: 'pan_tool',
      description: 'Pan tool',
      action: () => {
        console.log('Select tool clicked');
      }
    },
    {
      name: 'Select',
      icon: 'arrow_selector_tool',
      description: 'Select tool',
      action: () => {
        console.log('Select tool clicked');
      }
    },
  ]

}
