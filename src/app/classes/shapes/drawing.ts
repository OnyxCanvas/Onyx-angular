import { OCShape } from '@app/classes/abstracts/shape';
import { OnyxBaseShape, OnyxLine, OnyxShapeType } from '@app/models/shape';
import Konva from 'konva';
import { Vector2d } from 'konva/lib/types';

export class Drawing extends OCShape<Konva.Line> implements OnyxLine {

  protected _points: number[];
  private readonly _type = OnyxShapeType.DRAWING;

  constructor(shape: Omit<OnyxLine, 'type'> & { type?: OnyxShapeType.DRAWING | OnyxShapeType.DRAWING }) {
    if (shape.type !== undefined && shape.type !== OnyxShapeType.DRAWING) {
      throw new Error('Invalid shape type');
    }
    const line = new Konva.Line({
      x: shape.x,
      y: shape.y,
      points: shape.points,
      stroke: shape.stroke,
      strokeWidth: shape.strokeWidth,
      opacity: shape.opacity,
      lineCap: 'round',
      lineJoin: 'round',
    });
    super(line, OnyxShapeType.LINE);
    this._shape = line;
    this._points = shape.points;
  }

  public override onDrawEvent(vector: Konva.Vector2d): void {
    if (this._shape) {
      this.addPoint(vector);
    }
  }

  public override get type(): OnyxShapeType.DRAWING {
    return this._type;
  }

  public get points(): number[] {
    return this._points;
  }

  public set points(value: number[]) {
    this._points = value;
    this._shape?.points(value);
  }

  public addPoint(point: Vector2d): void {
    const modifiedX = point.x - this.x;
    const modifiedY = point.y - this.y;
    this._points.push(modifiedX, modifiedY);
    this._shape?.points(this._points);
  }

}
