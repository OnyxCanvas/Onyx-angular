import { OCShape } from '@app/classes/abstract/shape';

export class Shapes {

  private _allShapes: OCShape[] = [];

  constructor() { }

  public addShape(shape: OCShape): void {
    this._allShapes.push(shape);
  }
  public removeShape(shape: OCShape): void {
    const index = this._allShapes.indexOf(shape);
    if (index > -1) {
      this._allShapes.splice(index, 1);
      shape.cleanup();
    }
  }
  public clearShapes(): void {
    this._allShapes.forEach((shape) => {
      shape.cleanup();
    });
    this._allShapes = [];
  }
  public getAllShapes(): OCShape[] {
    return this._allShapes;
  }
  public setAllShapes(shapes: OCShape[]): void {
    this._allShapes = shapes;
  }
  public getShapeById(id: string): OCShape | undefined {
    return this._allShapes.find((shape) => shape.id === id);
  }
  public getShapesByType(type: string): OCShape[] {
    return this._allShapes.filter((shape) => shape.type === type);
  }

  public translateAllShapes(x: number, y: number): void {
    this._allShapes.forEach((shape) => {
      shape.x = shape.x! + x;
      shape.y = shape.y! + y;
    });
  }
}
