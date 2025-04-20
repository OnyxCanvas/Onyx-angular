import { OCShape } from '@app/classes/abstract/shape';
import { OnyxRect, OnyxShape, OnyxShapeType } from '@app/models/shape';
import Konva from 'konva';

export class Rectangle extends OCShape implements OnyxRect {

  private _height: number;
  private _width: number;
  private readonly _type = OnyxShapeType.RECTANGLE;

  constructor(shape: Omit<OnyxRect, 'type'> & { type?: OnyxShapeType.RECTANGLE }) {
    if (shape.type !== undefined && shape.type !== OnyxShapeType.RECTANGLE) {
      throw new Error('Invalid shape type');
    }
    super(new Konva.Rect({
      x: shape.x,
      y: shape.y,
      width: shape.width,
      height: shape.height,
      fill: shape.fill,
      stroke: shape.stroke,
      strokeWidth: shape.strokeWidth,
      opacity: shape.opacity,
    }), OnyxShapeType.RECTANGLE);
    this._width = shape.width;
    this._height = shape.height;
  }
  public override get type(): OnyxShapeType.RECTANGLE {
    return this._type;
  }
  public get width(): number {
    return this._width;
  }
  public set width(value: number) {
    this._width = value;
    this._shape?.width(value);
  }
  public get height(): number {
    return this._height;
  }
  public set height(value: number) {
    this._height = value;
    this._shape?.height(value);
  }

}
