import Konva from 'konva';
import { Shapes } from './shapes';
import { Rectangle } from './shapes-impl/rect';
import { OCShape } from '@app/classes/abstract/shape';

export class OnyxCanvas {

  private _width: number;
  private _height: number;
  private _stage: Konva.Stage;
  private _elementRef: HTMLDivElement;
  private _mainLayer: Konva.Layer;
  private _backgroundLayer: Konva.Layer;
  private _translation: { x: number, y: number } = { x: 0, y: 0 };
  private _scale: number = 1;

  private shapes = new Shapes();

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
    this._backgroundLayer = new Konva.Layer();
    this._mainLayer = new Konva.Layer();
    this._stage.add(this._backgroundLayer);
    this._stage.add(this._mainLayer);
    const rect = new Rectangle({
      x: -50,
      y: -50,
      width: 100,
      height: 100,
      fill: 'transparent',
      stroke: 'black',
      strokeWidth: 2,
      id: 'rect1',
    })

    this._stage.on('dragend', (e) => {
      const target = e.target as Konva.Stage;
      const pos = target.position();
      const currentTranslation = { x: pos.x, y: pos.y };
      this._translation.x += currentTranslation.x;
      this._translation.y += currentTranslation.y;
      target.position({
        x: 0,
        y: 0,
      });
      this.shapes.translateAllShapes(currentTranslation.x, currentTranslation.y);
    });

  }

  public createShape(shape: OCShape) {
    this.shapes.addShape(shape);
    this._mainLayer.add(shape.shape!);
    this.redraw();
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
