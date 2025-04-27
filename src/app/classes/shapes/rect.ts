import { OCShape } from '@app/classes/abstracts/shape';
import { OnyxRect, OnyxShapeType } from '@app/models/shape';
import Konva from 'konva';

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
    return this.shape?.width()!
  }
  public set width(value: number) {
    this.shape?.width(value);
  }
  public get height(): number {
    return this.shape?.height()!
  }
  public set height(value: number) {
    this.shape?.height(value);
  }

  public override onDrawEvent(vector: Konva.Vector2d): void {
    if (this.shape) {
      this.width = vector.x - this.shape.x();
      this.height = vector.y - this.shape.y();
    }
    console.log(this.width)
  }

  public override onDrawEnd(vector: Konva.Vector2d): void {
    if (this.shape) {
      this.shape?.setAttrs({
        width: Math.abs(vector.x - this.shape.x()),
        height: Math.abs(vector.y - this.shape.y()),
        x: Math.min(vector.x, this.shape.x()),
        y: Math.min(vector.y, this.shape.y()),
      });
    }
    console.log(this.width)
  }

}
