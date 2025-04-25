import Konva from 'konva';
import { Shapes } from './shapes';
import { OCShape } from '@app/classes/abstracts/shape';
import { CANVAS_EXPORT_OFFSET } from '@app/constants/canvas-values';
import { ToastProxy } from './toast-proxy';
import { CanvasTool, CanvasToolCategory, CanvasToolType } from '@app/models/tools';
import { availableCanvasTools } from '@app/configs/tools';
import { getEmptyShape } from '@app/utils/shape-utils';

export class OnyxCanvas {

  private _width: number;
  private _height: number;
  private _stage: Konva.Stage;
  private _elementRef: HTMLDivElement;
  private _mainLayer: Konva.Layer;
  private _backgroundLayer: Konva.Layer;
  private _translation: { x: number, y: number } = { x: 0, y: 0 };
  private _scale: number = 1;
  private _selectedTool?: CanvasTool;
  private _isDrawingInfo = { isDrawing: false, shape: undefined as OCShape | undefined };

  private shapes = new Shapes();

  constructor(canvas: HTMLDivElement, width: number, height: number) {
    this._elementRef = canvas;
    this._width = width;
    this._height = height;
    this.setDimensions(width, height);
    this._stage = new Konva.Stage({
      container: this._elementRef,
      width,
      height,
      draggable: false,
    })
    // Add initial layers
    this._backgroundLayer = new Konva.Layer();
    this._mainLayer = new Konva.Layer();
    this._stage.add(this._backgroundLayer);
    this._stage.add(this._mainLayer);

    this.setupEventListeners();

  }

  public toolChange(tool: CanvasToolType) {
    if (tool === CanvasToolType.PAN) {
      this.togglePanningMode(true);
    } else {
      this.togglePanningMode(false);
    }
    if (tool === CanvasToolType.SELECT) {
      this.shapes.toggleAllShapeDraggable(true);
    } else {
      this.shapes.toggleAllShapeDraggable(false);
    }
    const toolDetails = availableCanvasTools.find(t => t.name === tool);
    if (toolDetails) {
      this._selectedTool = toolDetails;
    }
  }

  public togglePanningMode(enable: boolean) {
    this._stage.draggable(enable);
  }

  public createShape(shape: OCShape) {
    this.shapes.addShape(shape);
    this._mainLayer.add(shape.shape!);
    this.redraw();
  }

  public getDimensions() {
    return { width: this._width, height: this._height };
  }

  public setDimensions(width: number, height: number) {
    this._width = width;
    this._height = height;
    this._elementRef.style.width = `${width}px`;
    this._elementRef.style.height = `${height}px`;
  }

  public get width() {
    return this._width;
  }

  public get height() {
    return this._height;
  }

  private redraw() {
    this._backgroundLayer.batchDraw();
    this._mainLayer.batchDraw();
  }

  public cleanup() {
    this.shapes.clearShapes();
    this._backgroundLayer.destroy();
    this._mainLayer.destroy();
    this._stage.destroy();
  }

  private setupEventListeners() {
    // while dragging, move the elements in the stage together to the new position
    // TODO: Find a better way to do this. Because currently just for dragging canvas, x and y of all shapes are updated
    this._stage.on('dragend', (e) => {
      if (this._stage.draggable()) {
        const target = e.target;
        const pos = target.position();
        const currentTranslation = { x: pos.x, y: pos.y };
        this._translation.x += currentTranslation.x;
        this._translation.y += currentTranslation.y;
        target.position({
          x: 0,
          y: 0,
        });
        this.shapes.translateAllShapes(currentTranslation.x, currentTranslation.y);
      }
    });

    // listen for mousedown to check move start for a drawing shapes
    this._stage.on('mousedown touchstart', (e) => {
      if (this._selectedTool?.category === CanvasToolCategory.SHAPES) { // only for shapes, allow drawing
        const pos = this._stage.getPointerPosition();
        if (pos) {
          const emptyShape = getEmptyShape(this._selectedTool!.shape!, pos);
          this.createShape(emptyShape);
          this._isDrawingInfo = { isDrawing: true, shape: emptyShape };
        }
      }
    });
    // listen for mousemove to check move end for a drawing shapes
    this._stage.on('mousemove touchmove', (e) => {
      if (this._isDrawingInfo.isDrawing) {
        const pos = this._stage.getPointerPosition();
        if (pos) {
          const shape = this._isDrawingInfo.shape;
          if (shape) {
            shape.onDrawEvent(pos);
            this.redraw();
          }
        }
      }
    });
    // listen for mouseup to check move end for a drawing shapes
    this._stage.on('mouseup touchend', (e) => {
      if (this._isDrawingInfo.isDrawing) {
        this._isDrawingInfo = { isDrawing: false, shape: undefined };
      }
    });
  }

  public export() {
    if (this.shapes.getAllShapes().length === 0) {
      ToastProxy.instance.error('Add at least one shape to export');
      return;
    }
    const leftMostX = this.shapes.getAllShapes().reduce((acc, layer) => {
      return Math.min(acc, layer.x!);
    }, Infinity);
    const rightMostX = this.shapes.getAllShapes().reduce((acc, layer) => {
      return Math.max(acc, layer.x! + layer.calculatedWidth);
    }, -Infinity);
    const topMostY = this.shapes.getAllShapes().reduce((acc, layer) => {
      return Math.min(acc, layer.y!);
    }, Infinity);
    const bottomMostY = this.shapes.getAllShapes().reduce((acc, layer) => {
      return Math.max(acc, layer.y! + layer.calculatedHeight);
    }, -Infinity);
    const width = rightMostX - leftMostX;
    const height = bottomMostY - topMostY;
    const x = leftMostX;
    const y = topMostY;
    const dataURL = this._stage.toDataURL({
      pixelRatio: (width * height) > 1000000 ? 1 : 2, // Set pixel ratio to 1 for large images
      x: x - CANVAS_EXPORT_OFFSET,
      y: y - CANVAS_EXPORT_OFFSET,
      width: width + (CANVAS_EXPORT_OFFSET * 2), // Multiply by 2 to account for the offset of left and top
      height: height + (CANVAS_EXPORT_OFFSET * 2), // Multiply by 2 to account for the offset of left and top
    });
    // create link to download
    const link = document.createElement('a');
    link.download = 'stage.png';
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
