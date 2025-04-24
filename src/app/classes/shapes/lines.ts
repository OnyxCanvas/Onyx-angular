import { OCShape } from '@app/classes/abstracts/shape';
import { OnyxLine, OnyxShapeType } from '@app/models/shape';
import Konva from 'konva';

export class Line extends OCShape implements OnyxLine {

  private _points: number[];
  private readonly _type = OnyxShapeType.LINE;
  protected override _shape: Konva.Line | null = null;

  constructor(shape: Omit<OnyxLine, 'type'> & { type?: OnyxShapeType.LINE }) {
    if (shape.type !== undefined && shape.type !== OnyxShapeType.LINE) {
      throw new Error('Invalid shape type');
    }
    const line = new Konva.Line({
      points: shape.points,
      stroke: shape.stroke,
      strokeWidth: shape.strokeWidth,
      opacity: shape.opacity,
      lineCap: 'round',
      lineJoin: 'round'
    });
    super(line, OnyxShapeType.LINE);
    this._shape = line;
    this._points = shape.points;
  }

  public override get calculatedWidth(): number {
    const bounds = this._shape?.getClientRect();
    return bounds ? bounds.width : 0;
  }

  public override get calculatedHeight(): number {
    const bounds = this._shape?.getClientRect();
    return bounds ? bounds.height : 0;
  }

  public override get type(): OnyxShapeType.LINE {
    return this._type;
  }

  public get points(): number[] {
    return this._points;
  }

  public set points(value: number[]) {
    this._points = value;
    this._shape?.points(value);
  }

  public get calculatedPoints(): number[] {
    return this._shape?.points() ?? [];
  }
}
