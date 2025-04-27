import { OCShape } from '@app/classes/abstracts/shape';
import { OnyxRect, OnyxShapeType } from '@app/models/shape';
import Konva from 'konva';
import { v4 as uuid } from 'uuid';

export class Rectangle extends OCShape<Konva.Rect> implements OnyxRect {

  private readonly _type = OnyxShapeType.RECTANGLE;

  constructor(shape: Omit<OnyxRect, 'type'> & { type?: OnyxShapeType.RECTANGLE }) {
    if (shape.type !== undefined && shape.type !== OnyxShapeType.RECTANGLE) {
      throw new Error('Invalid shape type');
    }
    const rect = new Konva.Rect({
      x: shape.x,
      y: shape.y,
      width: shape.width,
      height: shape.height,
      fill: shape.fill,
      stroke: shape.stroke,
      strokeWidth: shape.strokeWidth,
      opacity: shape.opacity,
    });
    super(rect, OnyxShapeType.RECTANGLE);
  }
  public override get type(): OnyxShapeType.RECTANGLE {
    return this._type;
  }
  public get width(): number {
    return this._shape?.width()!
  }
  public set width(value: number) {
    this._shape?.width(value);
  }
  public get height(): number {
    return this._shape?.height()!
  }
  public set height(value: number) {
    this._shape?.height(value);
  }

  public override onDrawEvent(vector: Konva.Vector2d): void {
    if (this._shape) {
      this.width = vector.x - this._shape.x();
      this.height = vector.y - this._shape.y();
    }
  }

  public static getEmptyShape(options: Partial<OnyxRect> = {}): Rectangle {
    return new Rectangle({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      fill: 'transparent',
      stroke: 'black',
      strokeWidth: 1,
      opacity: 1,
      id: uuid(),
      ...options
    });
  }

}
