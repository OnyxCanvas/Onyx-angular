export interface CanvasTool {
    name: CanvasToolType;
    icon: string;
    description: string;
    action: () => void;
    cursor?: CanvasCursor;
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
}