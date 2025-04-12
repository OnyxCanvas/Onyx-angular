export class OnyxCanvas {

    private _width: number;
    private _height: number;
    private _canvas: HTMLCanvasElement;
    private _context: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement) {
        this._canvas = canvas;
        this._context = canvas.getContext('2d')!;
        this._width = canvas.width;
        this._height = canvas.height;
        this.setDimensions(this._width, this._height);
    }

    public getDimensions() {
        return { width: this._width, height: this._height };
    }

    public setDimensions(width: number, height: number) {
        this._width = width;
        this._height = height;
    }

    public get width() {
        return this._width;
    }

    public get height() {
        return this._height;
    }
}