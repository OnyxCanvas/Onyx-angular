import { Injectable } from '@angular/core';
import { CanvasTool } from '@app/models/tools';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CanvasService {

  public selectedTool$ = new BehaviorSubject<CanvasTool | null>(null);

}
