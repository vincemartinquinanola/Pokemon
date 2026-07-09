export class Player {
    x = 80
    y = 280
    width = 64
    height = 64
    image = new Image()

    velocityY = 0
    gravity = 0.8
    jumpForce = -16
    groundY = 280
    isGrounded = true

    constructor() {
        this.image.src = new URL(
            "../assets/pikachu1.png",
            import.meta.url
        ).href
    }

    update() {

        this.velocityY += this.gravity

        this.y += this.velocityY

        if (this.y >= this.groundY) {

            this.y = this.groundY

            this.velocityY = 0

            this.isGrounded = true
        }
    }

    jump() {

        if (!this.isGrounded) return

        this.velocityY = this.jumpForce

        this.isGrounded = false
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

}
