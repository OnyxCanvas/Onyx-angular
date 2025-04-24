import { OnyxShapeType } from "./shape";

export interface CanvasTool {
  readonly name: CanvasToolType;
  readonly icon: string;
  /** The icon description which is shown in tooltip */
  readonly description: string;
  readonly action: () => void;
  readonly cursor?: CanvasCursor;
  readonly disabled?: boolean;
}

export interface CanvasShapeTool extends CanvasTool {
  readonly shapeType: OnyxShapeType;
}

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
