import { OnyxShapeType } from '@app/models/shape';
import { Prettify } from './prettify';

export enum CanvasToolCategory {
  SHAPES = 'shapes',
  TOOLS = 'tools',
}

interface CanvasToolBase {
  readonly name: CanvasToolType;
  readonly icon: string;
  /** The icon description which is shown in tooltip */
  readonly description: string;
  readonly action: () => void;
  readonly cursor?: CanvasCursor;
  readonly disabled?: boolean;
  /* if true, a separator will be shown before this tool */
  readonly separator?: boolean;
}

export type CanvasTool = Prettify<CanvasToolBase & ({
  readonly category: CanvasToolCategory.SHAPES;
  readonly shape: OnyxShapeType
} | {
  readonly category: CanvasToolCategory.TOOLS;
})>


export enum CanvasToolType {
  SELECT = 'select',
  PAN = 'pan',
  ZOOM = 'zoom',
  BRUSH = 'brush',
  RECTANGLE = 'rectangle',
  LINE = 'line',
}

export enum CanvasCursor {
  DEFAULT = 'default',
  MOVE = 'move',
  CROSSHAIR = 'crosshair',
  POINTER = 'pointer',
  GRAB = 'grab',
  ZOOM_IN = 'zoom-in',
  ZOOM_OUT = 'zoom-out',
}
