export interface CanvasTool {
    name: CanvasToolType;
    icon: string;
    description: string;
    action: () => void;
}

export enum CanvasToolType {
    SELECT = 'select',
    PAN = 'pan',
}