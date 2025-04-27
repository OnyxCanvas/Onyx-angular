import { OCShape } from '@app/classes/abstracts/shape';
import { OnyxBaseShape, OnyxLine, OnyxShapeType } from '@app/models/shape';
import Konva from 'konva';
import { Vector2d } from 'konva/lib/types';

export class Line extends OCShape<Konva.Line> implements OnyxLine {

  protected _points: number[];
  private readonly _type = OnyxShapeType.LINE;

  constructor(shape: Omit<OnyxLine, 'type'> & { type?: OnyxShapeType.LINE | OnyxShapeType.DRAWING }) {
    if (shape.type !== undefined && shape.type !== OnyxShapeType.LINE) {
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
    this._points = shape.points;
  }

  public override onDrawEvent(vector: Konva.Vector2d): void {
    if (this.shape) {
      this.addPoint(vector);
    }
  }

  public override onDrawEnd(vector: Konva.Vector2d): void {
    if (this.shape) {
      this.shape.points(this._points);
    }
  }

  public override get type(): OnyxShapeType.LINE {
    return this._type;
  }

  public get points(): number[] {
    return this._points;
  }

  public set points(value: number[]) {
    this._points = value;
    this.shape?.points(value);
  }

  public addPoint(point: Vector2d): void {
    const modifiedX = point.x - this.x;
    const modifiedY = point.y - this.y;
    this._points = [this._points[0], this._points[1], modifiedX, modifiedY];
    this.shape?.points(this._points);
  }

}
