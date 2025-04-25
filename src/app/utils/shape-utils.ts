import { DEFAULT_STROKE_WIDTH } from '@app/constants/canvas-values';
import { OnyxShapeType, OnyxBaseShape } from '@app/models/shape';
import { OCShape } from '@classes/abstracts/shape';
import { Line, Rectangle } from '@classes/shapes';
import Konva from 'konva';
import { v4 as uuid } from 'uuid';

export function getEmptyShape(shapeType: OnyxShapeType, startVector: Konva.Vector2d): OCShape {
  switch (shapeType) {
    case OnyxShapeType.LINE:
      return new Line({
        points: [],
        stroke: '#000000',
        strokeWidth: DEFAULT_STROKE_WIDTH,
        opacity: 1,
        id: uuid(),
        x: startVector.x,
        y: startVector.y,
      })
    case OnyxShapeType.RECTANGLE:
      return new Rectangle({
        x: startVector.x,
        y: startVector.y,
        width: 0,
        height: 0,
        fill: 'transparent',
        stroke: '#000000',
        strokeWidth: DEFAULT_STROKE_WIDTH,
        opacity: 1,
        id: uuid()
      });
    default:
      throw new Error('Unsupported shape type');
  }
}
