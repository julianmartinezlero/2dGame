window.addEventListener("load", () => {
  const canvasGame = document.getElementById("canvasGame");
  const ctx = canvasGame.getContext("2d");
  console.log(ctx);
  canvasGame.width = 800;
  canvasGame.height = 500;

  class InputHandler {
    constructor() {
      this.keys = [];
      window.addEventListener("keydown", (e) => {
        if (
          (e.key == "ArrowDown" ||
            e.key == "ArrowLeft" ||
            e.key == "ArrowRight" ||
            e.key == "ArrowUp") &&
          this.keys.indexOf(e.key) === -1
        ) {
          this.keys.push(e.key);
        }
        console.log(e.key);

        console.log(this.keys);
      });

      window.addEventListener("keyup", (e) => {
        if (
          e.key == "ArrowDown" ||
          e.key == "ArrowLeft" ||
          e.key == "ArrowRight" ||
          e.key == "ArrowUp"
        ) {
          this.keys.splice(this.keys.indexOf(e.key), 1);
        }
        console.log(this.keys);
      });
    }
  }

  class Player {
    constructor(gameWidth, gameHeight) {
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.width = 400;
      this.height = 200;
      this.x = 0;
      this.y = gameHeight - this.height;
      this.frameX = 0;
      this.frameY = 0;
      this.image = document.getElementById("player");
      this.speed = 0;
      this.vy = 0;
      this.weigth = 1;

      this.maxFrameY = 11;

      this.fps = 60;
      this.fps = 60;
      this.frameInterval = 1000 / this.fps;
      this.frameTimer = 0;
    }

    render(ctx) {
      ctx.drawImage(
        this.image,
        this.frameX * this.width,
        this.frameY * this.height,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }

    update(input, deltaTime) {
      if (this.frameTimer > this.frameInterval) {
        if (this.frameY >= this.maxFrameY) this.frameY = 0;
        else this.frameY++;
        this.frameTimer = 0;
      } else {
        this.frameTimer += deltaTime;
      }

      if (input.keys.indexOf("ArrowRight") > -1) {
        this.speed = 5;
      } else if (input.keys.indexOf("ArrowLeft") > -1) {
        this.speed = -5;
      } else if (input.keys.indexOf("ArrowUp") > -1 && this.onground()) {
        this.vy -= 20;
      } else {
        this.speed = 0;
      }

      this.x += this.speed;
      if (this.x < 0) {
        this.x = 0;
      }
      if (this.x > this.gameWidth - this.width) {
        this.x = this.gameWidth - this.width;
      }

      this.y += this.vy;
      if (!this.onground()) {
        this.vy += this.weigth;
      } else {
        this.vy = 0;
      }

      if (this.y > this.gameHeight - this.height) {
        this.y = this.gameHeight - this.height;
      }
    }

    onground() {
      return this.y >= this.gameHeight - this.height;
    }
  }

  class Enemie {}

  class Background {
    constructor(gameWidth, gameHeight) {
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.image = document.getElementById("background");
      this.x = 0;
      this.y = 0;
      this.width = 800;
      this.height = 500;
      this.speed = -5;
    }

    // ctx canvas context
    draw(ctx) {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      ctx.drawImage(
        this.image,
        this.x + this.width,
        this.y,
        this.width,
        this.height
      );
      ctx.drawImage(
        this.image,
        this.x - this.width,
        this.y,
        this.width,
        this.height
      );
    }

    update() {
      this.x -= this.speed;
      if (this.x < 0 - this.width) {
        this.x = 0;
      }
      if (this.x > 0 + this.width) {
        this.x = 0 - this.width;
      }
    }
  }

  const input = new InputHandler();
  const player = new Player(canvasGame.width, canvasGame.height);
  const background = new Background(canvasGame.width, canvasGame.height);
  let lastTime = 0;

  player.render(ctx);
  const animation = (timer) => {
    const deltaTime = timer - lastTime;
    lastTime = timer;
    ctx.clearRect(0, 0, canvasGame.width, canvasGame.height);
    background.draw(ctx);
    background.update(ctx);

    player.render(ctx);
    player.update(input, deltaTime);

    requestAnimationFrame(animation);
  };

  animation(0);
});
