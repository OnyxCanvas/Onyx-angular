import { CdkDragEnd, CdkDragMove } from '@angular/cdk/drag-drop';
export class OnyxCanvas {

  private _width: number;
  private _height: number;
  private _canvas: HTMLCanvasElement;
  private _context: CanvasRenderingContext2D;
  private transformX: number = 0;
  private transformY: number = 0;

  constructor(canvas: HTMLCanvasElement) {
    this._canvas = canvas;
    this._context = canvas.getContext('2d')!;
    this._width = canvas.width;
    this._height = canvas.height;
    this.setDimensions(this._width, this._height);

    // for debug
    setTimeout(() => {
      const ctx = this._context;
      ctx.strokeStyle = "blue";
      ctx.lineWidth = 2;
      ctx.strokeRect(10, 10, 500, 500);
    });
  }

  public getDimensions() {
    return { width: this._width, height: this._height };
  }

  public setDimensions(width: number, height: number) {
    this._width = width;
    this._height = height;
    this._canvas.width = width;
    this._canvas.height = height;
  }

  public get width() {
    return this._width;
  }

  public get height() {
    return this._height;
  }

  public setTransform(transform: CdkDragMove['distance']) {
    this.transformX = transform.x;
    this.transformY = transform.y;
  }

  public expandCanvasIfNeeded(event: CdkDragMove, parent: HTMLDivElement) {
    this.setTransform(event.distance);
    const { width, height } = this.getDimensions();
    const parentWidth = parent.clientWidth;
    const parentHeight = parent.clientHeight;
    // console.log('Parent dimensions:', parentWidth, parentHeight);
    console.log(this._canvas.getBoundingClientRect());
  }

  private redraw() {
  }
}
