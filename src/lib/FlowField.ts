type CanvasGradiantColorStop = {
  color: string;
  offset: number;
};

type CanvasGradiantStops = CanvasGradiantColorStop[];

export class FlowField {
  #currentAnimationFrame: number | null = null;
  #lastTimestamp = 0;
  #interval = 1000 / 60;
  #counter = 0;
  radius = 0;
  radiusVelocity = 0.02;
  pointerX = 0;
  pointerY = 0;

  constructor(
    private ctx: CanvasRenderingContext2D,
    public width: number,
    public height: number,
    public cellSize = 15,
    public gradiantStops: CanvasGradiantStops = [
      { offset: 0.5, color: "yellow" },
      { offset: 0.7, color: "blue" },
      { offset: 0.9, color: "red" },
    ]
  ) {
    this.#createGradient(gradiantStops);
  }

  #createGradient(gradiantStops: CanvasGradiantStops) {
    const gradient = this.ctx.createLinearGradient(
      0,
      0,
      this.width,
      this.height
    );
    gradiantStops.forEach(({ offset, color }) =>
      gradient.addColorStop(offset, color)
    );
    this.ctx.strokeStyle = gradient;
    this.ctx.lineWidth = 1;
  }

  #drawLine(x: number, y: number, angle: number) {
    const dxToPointer = this.pointerX - x;
    const dyToPointer = this.pointerY - y;
    let distance = dxToPointer * dxToPointer + dyToPointer * dyToPointer;
    if (distance > 100000) distance = 100000;
    if (distance < 10000) distance = 10000;
    const lineLength = distance * 0.0009;

    this.ctx?.beginPath();
    this.ctx?.moveTo(x, y);
    this.ctx?.lineTo(
      x + Math.cos(angle) * lineLength,
      y + Math.sin(angle) * lineLength
    );
    this.ctx.stroke();
    this.ctx?.closePath();
  }

  animate(timestamp = 0) {
    const dt = timestamp - this.#lastTimestamp;
    if (this.#counter > this.#interval) {
      this.ctx.clearRect(0, 0, this.width, this.height);
      for (let x = 0; x < this.width; x += this.cellSize) {
        for (let y = 0; y < this.height; y += this.cellSize) {
          const angle = (Math.cos(x * 0.01) + Math.sin(y * 0.01)) * this.radius;

          this.#drawLine(x, y, angle);
        }
      }
      this.radius += this.radiusVelocity;
      if (this.radius > 10 || this.radius < -10) this.radius *= -1;
      this.#counter = 0;
    } else {
      this.#counter += dt;
    }
    this.#currentAnimationFrame = requestAnimationFrame(
      this.animate.bind(this)
    );
  }

  updateDimensions(width: number, heigth: number) {
    if (this.#currentAnimationFrame !== null)
      cancelAnimationFrame(this.#currentAnimationFrame);
    this.width = width;
    this.height = heigth;
    this.#createGradient(this.gradiantStops);
    this.animate();
  }

  setPointerCoordinates(x: number, y: number) {
    this.pointerX = x;
    this.pointerY = y;
  }
}
