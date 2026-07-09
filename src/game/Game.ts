import { Player } from "./Player"
import { Obstacle } from "./Obstacle"


export class Game {
    score = 0
    highScore = 0
    gameOver = false
    gameSpeed = 6

    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    player = new Player()

    obstacles: Obstacle[] = []

    obstacleSprites = [
        new URL("../assets/jessie.png", import.meta.url).href,
        new URL("../assets/james.png", import.meta.url).href
    ]

    constructor(canvas: HTMLCanvasElement) {

        this.canvas = canvas
        const context = canvas.getContext("2d")

        if (!context) {
            throw new Error("Canvas not supported.")
        }
        this.ctx = context

        window.addEventListener("keydown", (event) => {

            if (
                event.code === "Space" ||
                event.code === "ArrowUp"
            ) {
                if (this.gameOver) {
                    this.reset()
                    return
                }
                this.player.jump()
            }
        })

        this.obstacles.push(
            new Obstacle(
                900,
                344,
                this.randomObstacleSprite()
            )
        )

    }

    start() {
        const loop = () => {
            if (!this.gameOver) {
                this.draw()
            } else {
                this.drawGameOver()
            }
            requestAnimationFrame(loop)
        }
        loop()
    }

    draw() {
        this.score += 1
        this.gameSpeed = 6 + Math.floor(this.score / 300)
        if (this.score > this.highScore) {
            this.highScore = this.score
        }
        this.ctx.clearRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        )

        this.ctx.fillStyle = "#38bdf8"

        this.ctx.fillRect(
            0,
            344,
            this.canvas.width,
            4
        )

        this.player.update()

        for (const obstacle of this.obstacles) {
            obstacle.speed = this.gameSpeed
            obstacle.update()
            if (obstacle.x + obstacle.width < 0) {
                obstacle.x = this.canvas.width + Math.random() * 300

                obstacle.setSprite(
                    this.randomObstacleSprite()
                )
            }
            obstacle.draw(this.ctx)
        }

        this.player.draw(this.ctx)

        if (this.checkCollision()) {
            this.gameOver = true
        }
        this.drawScore()
    }
    reset() {

        this.score = 0
        this.gameOver = false
        this.player.x = 80
        this.player.y = this.player.groundY
        this.player.velocityY = 0
        this.obstacles = [
            new Obstacle(
                900,
                344,
                this.randomObstacleSprite()
            )
        ]

    }

    drawGameOver() {

        this.ctx.fillStyle = "#ff4444"

        this.ctx.font = "bold 52px monospace"

        this.ctx.textAlign = "center"

        this.ctx.fillText(
            "GAME OVER",
            this.canvas.width / 2,
            150
        )

        this.ctx.font = "26px monospace"

        this.ctx.fillStyle = "white"

        this.ctx.fillText(
            `Score : ${this.score}`,
            this.canvas.width / 2,
            220
        )

        this.ctx.fillText(
            "Press SPACE to Restart",
            this.canvas.width / 2,
            280
        )

    }

    private checkCollision(): boolean {
        for (const obstacle of this.obstacles) {
            if (
                this.player.x < obstacle.x + obstacle.width &&
                this.player.x + this.player.width > obstacle.x &&
                this.player.y < obstacle.y + obstacle.height &&
                this.player.y + this.player.height > obstacle.y
            ) {
                return true
            }
        }
        return false

    }

    private drawScore() {

        this.ctx.fillStyle = "#38bdf8"
        this.ctx.font = "bold 24px monospace"
        this.ctx.textAlign = "left"
        this.ctx.fillText(
            `SCORE ${this.score}`,
            20,
            40
        )
        this.ctx.fillText(
            `BEST  ${this.highScore}`,
            20,
            70
        )

    }

    private randomObstacleSprite(): string {

        return this.obstacleSprites[
            Math.floor(Math.random() * this.obstacleSprites.length)
        ]!

    }
}


