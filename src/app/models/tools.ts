export interface CanvasTool {
    readonly name: CanvasToolType;
    readonly icon: string;
    readonly description: string;
    readonly action: () => void;
    readonly cursor?: CanvasCursor;
}

export enum CanvasToolType {
    SELECT = 'select',
    PAN = 'pan',
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