import { CanvasCursor, CanvasTool, CanvasToolType } from '@app/models/tools';

export const availableCanvasTools: CanvasTool[] = [
    {
        name: CanvasToolType.PAN,
        icon: 'pan_tool',
        description: 'Pan tool',
        cursor: CanvasCursor.GRAB,
        action: () => {
            console.log('Pan tool clicked');
        }
    },
    {
        name: CanvasToolType.SELECT,
        icon: 'arrow_selector_tool',
        description: 'Select tool',
        cursor: CanvasCursor.DEFAULT,
        action: () => {
            console.log('Select tool clicked');
        }
    },
]