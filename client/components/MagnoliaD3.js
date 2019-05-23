import * as d3 from 'd3';

const magnolia = () => {
  const height = Math.min(width, 640);
  const radius0 = Math.min(width, height) / 2;
  const radius = radius0 * (1 - k * Math.SQRT1_2);
  const radius2 = radius0 * k / 2;
  const context = DOM.context2d(width, height);
  context.fillStyle = "white";
  context.strokeStyle = "steelblue";

  function stack(da, i0, i1) {
    for (let i = i0; i < i1; ++i) {
      const a = i / n * 2 * Math.PI;
      context.save();
      context.rotate(a);
      context.translate(0, radius);
      context.rotate(a * turns / 2 + da);
      context.fillRect(-radius2, -radius2, 2 * radius2, 2 * radius2);
      context.strokeRect(-radius2, -radius2, 2 * radius2, 2 * radius2);
      context.restore();
    }
  }

  while (true) {
    const da = (Date.now() / 10000) % 1 * 2 * Math.PI;
    context.clearRect(0, 0, width, height);
    context.save();
    context.beginPath();
    context.rect(0, height / 2, width, height / 2);
    context.clip();
    context.translate(width / 2, height / 2);
    stack(da, n / 5, n * 5 / 2);
    context.restore();

    context.save();
    context.beginPath();
    context.rect(0, 0, width, height / 2);
    context.clip();
    context.translate(width / 2, height / 2);
    stack(da, 0, n);
    context.restore();

    yield context.canvas;
  }
}

export default magnolia;
