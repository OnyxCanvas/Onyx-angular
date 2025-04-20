import { Injectable } from '@angular/core';
import { availableCanvasTools } from '@app/configs/tools';
import { CanvasTool, CanvasToolType } from '@app/models/tools';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CanvasService {

  public selectedTool$ = new BehaviorSubject<CanvasToolType | null>(null);

  public getCurrentTool(): CanvasTool | null {
    if (!this.selectedTool$.getValue()) {
      return null;
    }
    return availableCanvasTools.find(tool => tool.name === this.selectedTool$.getValue()) || null;
  }

}
