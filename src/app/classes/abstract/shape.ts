import { OnyxBaseShape, OnyxShapeType, OnyxShape } from '@app/models/shape';
import Konva from "konva";

export abstract class OCShape implements OnyxBaseShape {

  protected _shape: Konva.Shape | null = null;
  private _id: string;
  private _x?: number | undefined;
  private _y?: number | undefined;
  private _strokeWidth?: number | undefined;
  private _fill?: string | undefined;
  private _stroke?: string | undefined;
  private _opacity?: number | undefined;
  private _rotation?: number | undefined;
  private readonly _shapeType: OnyxShapeType;

  public abstract get calculatedWidth(): number;
  public abstract get calculatedHeight(): number;

  constructor(shape: Konva.Shape, type: OnyxShapeType) {
    this._shape = shape;
    this._id = '';
    this._x = shape.x();
    this._y = shape.y();
    this._strokeWidth = shape.strokeWidth();
    this._fill = shape.fill() as string;
    this._stroke = shape.stroke() as string;
    this._opacity = shape.opacity();
    this._rotation = shape.rotation();
    this._shapeType = type;
  }

  get type(): OnyxShapeType {
    return this._shapeType;
  }

  public get shape(): Konva.Shape | null {
    return this._shape;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
    this._shape?.id(value);
  }

  get x(): number | undefined {
    return this._x;
  }

  set x(value: number | undefined) {
    this._x = value;
    this._shape?.x(value);
  }

  get y(): number | undefined {
    return this._y;
  }

  set y(value: number | undefined) {
    this._y = value;
    this._shape?.y(value);
  }

  get strokeWidth(): number | undefined {
    return this._strokeWidth;
  }

  set strokeWidth(value: number | undefined) {
    this._strokeWidth = value;
    this._shape?.strokeWidth(value);
  }

  get fill(): string | undefined {
    return this._fill;
  }

  set fill(value: string | undefined) {
    this._fill = value;
    this._shape?.fill(value);
  }

  get stroke(): string | undefined {
    return this._stroke;
  }

  set stroke(value: string | undefined) {
    this._stroke = value;
    this._shape?.stroke(value);
  }

  get opacity(): number | undefined {
    return this._opacity;
  }

  set opacity(value: number | undefined) {
    this._opacity = value;
    this._shape?.opacity(value);
  }

  get rotation(): number | undefined {
    return this._rotation;
  }

  set rotation(value: number | undefined) {
    this._rotation = value;
    this._shape?.rotation(value);
  }

  public cleanup(): void {
    if (this._shape) {
      this._shape.destroy();
    }
  }
}
