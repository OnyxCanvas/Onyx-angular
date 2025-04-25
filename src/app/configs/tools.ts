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
  {
    separator: true,
    name: CanvasToolType.RECTANGLE,
    icon: 'rectangle',
    description: 'Rectangle tool',
    category: CanvasToolCategory.SHAPES,
    action: () => {
      console.log('Rectangle tool clicked');
    },
  },
  {
    name: CanvasToolType.LINE,
    icon: 'pen_size_1',
    description: 'Line tool',
    category: CanvasToolCategory.SHAPES,
    action: () => {
      console.log('Line tool clicked');
    },
  }
]
