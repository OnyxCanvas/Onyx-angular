export interface CanvasTool {
    name: string;
    icon: string;
    description: string;
    action: () => void;
}
