import Konva from 'konva';

export class OnyxCanvas {

  private _width: number;
  private _height: number;
  private _stage: Konva.Stage;
  private _elementRef: HTMLDivElement;
  private _mainLayer: Konva.Layer;
  private _backgroundLayer: Konva.Layer;
  private _translation: { x: number, y: number } = { x: 0, y: 0 };
  private _scale: number = 1;

  constructor(canvas: HTMLDivElement, width: number, height: number) {
    this._elementRef = canvas;
    this._width = width;
    this._height = height;
    this.setDimensions(width, height);
    this._stage = new Konva.Stage({
      container: this._elementRef,
      width,
      height,
      draggable: true,
    })
    // Add initial layers
    this._backgroundLayer = new Konva.Layer({ width, height });
    this._mainLayer = new Konva.Layer({ width, height });
    this._stage.add(this._backgroundLayer);
    this._stage.add(this._mainLayer);


    // for debugging
    // set rectangle with border
    const border = new Konva.Rect({
      x: 20,
      y: 20,
      width: 100,
      height: 100,
      stroke: 'red',
      strokeWidth: 2,
    });
    console.log(border.toJSON ())
    this._backgroundLayer.add(border);
    this.redraw();

    this._stage.on('dragend', (e) => {
      console.log('dragend', e);
      const target = e.target as Konva.Stage;
      const pos = target.position();
      this._translation.x = pos.x;
      this._translation.y = pos.y;
      console.log('translation', this._translation);
      // undo the drag and move only the border shape to new position
      target.position({
        x: 0,
        y: 0,
      });
      border.position({
        x: border.x() + this._translation.x,
        y: border.y() + this._translation.y,
      });
    });

  }

  public getDimensions() {
    return { width: this._width, height: this._height };
  }

  public setDimensions(width: number, height: number) {
    this._width = width;
    this._height = height;
    this._elementRef.style.width = `${width}px`;
    this._elementRef.style.height = `${height}px`;
  }

  public get width() {
    return this._width;
  }

  public get height() {
    return this._height;
  }

  private redraw() {
    this._backgroundLayer.batchDraw();
    this._mainLayer.batchDraw();
  }

  public cleanup() {
    this._backgroundLayer.destroy();
    this._mainLayer.destroy();
    this._stage.destroy();
  }
}
