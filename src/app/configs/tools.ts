import { OnyxShapeType } from '@app/models/shape';
import { CanvasCursor, CanvasTool, CanvasToolCategory, CanvasToolType } from '@app/models/tools';

export const availableCanvasTools: CanvasTool[] = [
  {
    name: CanvasToolType.PAN,
    icon: 'pan_tool',
    description: 'Pan tool',
    cursor: CanvasCursor.GRAB,
    category: CanvasToolCategory.TOOLS,
    action: () => {
      console.log('Pan tool clicked');
    }
  },
  {
    name: CanvasToolType.SELECT,
    icon: 'arrow_selector_tool',
    description: 'Select tool',
    cursor: CanvasCursor.DEFAULT,
    category: CanvasToolCategory.TOOLS,
    action: () => {
      console.log('Select tool clicked');
    },
  },
  // Shapes Below
  {
    separator: true,
    name: CanvasToolType.RECTANGLE,
    icon: 'rectangle',
    description: 'Rectangle tool',
    shape: OnyxShapeType.RECTANGLE,
    category: CanvasToolCategory.SHAPES,
    action: () => {
      console.log('Rectangle tool clicked');
    },
  },
  {
    name: CanvasToolType.LINE,
    icon: 'pen_size_3',
    description: 'Line tool',
    shape: OnyxShapeType.LINE,
    category: CanvasToolCategory.SHAPES,
    action: () => {
      console.log('Line tool clicked');
    },
  },
  {
    name: CanvasToolType.Drawing,
    icon: 'draw',
    description: 'Drawing tool',
    shape: OnyxShapeType.DRAWING,
    category: CanvasToolCategory.SHAPES,
    action: () => {
      console.log('Brush tool clicked');
    },
  }
]
