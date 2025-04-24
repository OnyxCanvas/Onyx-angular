import { OnyxShapeType } from '@app/models/shape';
import { CanvasCursor, CanvasShapeTool, CanvasTool, CanvasToolType } from '@app/models/tools';

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
    },
  }
]

export const availableCanvasShapes: CanvasShapeTool[] = [
  {
    name: CanvasToolType.RECTANGLE,
    icon: 'rectangle',
    description: 'Rectangle tool',
    shapeType: OnyxShapeType.RECTANGLE,
    action: () => {
      console.log('Rectangle tool clicked');
    },
  },
  {
    name: CanvasToolType.LINE,
    icon: 'line_tool',
    description: 'Line tool',
    shapeType: OnyxShapeType.LINE,
    action: () => {
      console.log('Line tool clicked');
    },
  }
]
