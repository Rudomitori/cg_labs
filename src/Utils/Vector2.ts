export default class Vector2 {
    public x:number;
    public y:number;

    public constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public get length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    //#region + - * /
    add(otherVector: Vector2): Vector2 {
        this.x += otherVector.x;
        this.y += otherVector.y;
        return this;
    }

    subtract(otherVector: Vector2): Vector2 {
        this.x -= otherVector.x;
        this.y -= otherVector.y;
        return this;
    }

    multiply(multiplier: number): Vector2 {
        this.x *= multiplier;
        this.y *= multiplier;
        return this;
    }

    divide(divider: number): Vector2 {
        this.x /= divider;
        this.y /= divider;
        return this;
    }
    //#endregion

    public get copy() : Vector2 {
        console.log('copy vector', {
            x: this.x,
            y: this.y
        });
        return new Vector2(this.x, this.y);
    }
}