export class GameObject {
    x;
    y;
    scaledX;
    scaledY;
    width;
    height;

    rotation = 0;
    scale = 1;

    img;

    constructor(img) {
        this.img = img;
    }

    draw(ctx) {
        ctx.save();
        
        ctx.translate(this.scaledX, this.scaledY);
        ctx.rotate(this.rotation);
        ctx.scale(this.scale, this.scale);
        
        ctx.drawImage(this.img, -this.width / 2, -this.height / 2, this.width, this.height);

        ctx.restore();
    }

    update(dt) {}

    resize() {
        this.scaledX = this.x * window.devicePixelRatio;
        this.scaledY = this.y * window.devicePixelRatio;

        if (this.img) {
            this.width = this.img.width * window.devicePixelRatio;
            this.height = this.img.height * window.devicePixelRatio;
        }
    }

    moveTo(x, y) {
        this.x = x;
        this.y = y;
        this.resize();
    }
}