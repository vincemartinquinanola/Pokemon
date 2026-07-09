export class Obstacle {
    x: number
    y: number

    width = 50
    height = 70

    speed = 0
    image = new Image()

    constructor(
        startX: number,
        groundY: number,
        sprite: string
    ) {
        this.x = startX
        this.y = groundY - this.height
        this.image.src = sprite
    }

    update() {
        this.x -= this.speed
    }

    draw(ctx: CanvasRenderingContext2D) {
        if (!this.image.complete) return
        ctx.drawImage(
            this.image,
            this.x,
            this.y,
            this.width,
            this.height
        )
    }

    setSprite(sprite: string) {
        this.image.src = sprite
    }
}