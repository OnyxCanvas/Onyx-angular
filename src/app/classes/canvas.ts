import Konva from 'konva';
import { Shapes } from './shapes';
import { Rectangle } from './shapes-impl/rect';
import { OCShape } from '@app/classes/abstract/shape';
import { CANVAS_EXPORT_OFFSET } from '@app/constants/canvas-values';

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

  public export() {
    const leftMostX = this.shapes.getAllShapes().reduce((acc, layer) => {
      return Math.min(acc, layer.x!);
    }, Infinity);
    const rightMostX = this.shapes.getAllShapes().reduce((acc, layer) => {
      return Math.max(acc, layer.x! + layer.calculatedWidth);
    }, -Infinity);
    const topMostY = this.shapes.getAllShapes().reduce((acc, layer) => {
      return Math.min(acc, layer.y!);
    }, Infinity);
    const bottomMostY = this.shapes.getAllShapes().reduce((acc, layer) => {
      return Math.max(acc, layer.y! + layer.calculatedHeight);
    }, -Infinity);
    const width = rightMostX - leftMostX;
    const height = bottomMostY - topMostY;
    const x = leftMostX;
    const y = topMostY;
    const dataURL = this._stage.toDataURL({
      pixelRatio: (width * height) > 1000000 ? 1 : 2, // Set pixel ratio to 1 for large images
      x: x - CANVAS_EXPORT_OFFSET,
      y: y - CANVAS_EXPORT_OFFSET,
      width: width + (CANVAS_EXPORT_OFFSET * 2), // Multiply by 2 to account for the offset of left and top
      height: height + (CANVAS_EXPORT_OFFSET * 2), // Multiply by 2 to account for the offset of left and top
    });
    // create link to download
    const link = document.createElement('a');
    link.download = 'stage.png';
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
