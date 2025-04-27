import { OnyxBaseShape, OnyxShapeType } from '@app/models/shape';
import Konva from "konva";
import { Vector2d } from 'konva/lib/types';
import { v4 as uuid } from 'uuid';

export abstract class OCShape<ShapeType extends Konva.Shape = Konva.Shape> implements OnyxBaseShape {

  protected _shape: ShapeType | null = null;
  private readonly _shapeType: OnyxShapeType;

  public abstract onDrawEvent(vector: Vector2d): void;

  constructor(shape: ShapeType, type: OnyxShapeType) {
    this.addDefaultProperties(shape);
    this._shape = shape;
    this._shapeType = type;
  }

  private addDefaultProperties(shape: ShapeType): void {
    if (!shape.id()) {
      shape!.id(uuid());
    }
  }

  get type(): OnyxShapeType {
    return this._shapeType;
  }

  public get shape(): ShapeType | null {
    return this._shape;
  }

  get id(): string {
    return this._shape?.id()!;
  }

  set id(value: string) {
    this._shape?.id(value);
  }

  get x(): number {
    return this.shape?.x()!;
  }

  set x(value: number) {
    this._shape?.x(value);
  }

  get y(): number {
    return this.shape?.y()!;
  }

  set y(value: number) {
    this._shape?.y(value);
  }

  get strokeWidth(): number | undefined {
    return this._shape?.strokeWidth();
  }

  set strokeWidth(value: number | undefined) {
    this._shape?.strokeWidth(value);
  }

  get fill(): string | undefined {
    return this._shape?.fill() as string;
  }

  set fill(value: string | undefined) {
    this._shape?.fill(value);
  }

  get stroke(): string | undefined {
    return this._shape?.stroke() as string;
  }

  set stroke(value: string | undefined) {
    this._shape?.stroke(value);
  }

  get opacity(): number | undefined {
    return this._shape?.opacity();
  }

  set opacity(value: number | undefined) {
    this._shape?.opacity(value);
  }

  get rotation(): number | undefined {
    return this._shape?.rotation();
  }

  set rotation(value: number | undefined) {
    this._shape?.rotation(value);
  }

  public cleanup(): void {
    if (this._shape) {
      this._shape.destroy();
    }
  }

  public get calculatedWidth(): number {
    const bounds = this._shape?.getClientRect();
    return bounds ? bounds.width : 0;
  }

  public get calculatedHeight(): number {
    const bounds = this._shape?.getClientRect();
    return bounds ? bounds.height : 0;
  }

}
