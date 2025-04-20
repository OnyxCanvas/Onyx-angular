export interface OnyxBaseShape {
  id: string;
  x?: number;
  y?: number;
  strokeWidth?: number;
  fill?: string;
  stroke?: string;
  opacity?: number;
  rotation?: number;
}

export enum OnyxShapeType {
  RECTANGLE = 'rectangle',
  CIRCLE = 'circle',
  LINE = 'line',
  TEXT = 'text',
  IMAGE = 'image',
}

export interface OnyxRect extends OnyxBaseShape {
  type: OnyxShapeType.RECTANGLE;
  width: number;
  height: number;
}

export interface OnyxCircle extends OnyxBaseShape {
  type: OnyxShapeType.CIRCLE;
  radius: number;
}

export interface OnyxLine extends OnyxBaseShape {
  type: OnyxShapeType.LINE;
  points: number[];
}

export interface OnyxText extends OnyxBaseShape {
  type: OnyxShapeType.TEXT;
  text: string;
  fontSize: number;
}

export interface OnyxImage extends OnyxBaseShape {
  type: OnyxShapeType.IMAGE;
  src: string;
  width: number;
  height: number;
}

export type OnyxShape = OnyxRect |
  OnyxCircle |
  OnyxLine |
  OnyxText |
  OnyxImage;
