export {};

const canvas = document.querySelector<HTMLCanvasElement>("#allocation-canvas")!;
const ctx = canvas.getContext("2d")!;
const readout = document.querySelector<HTMLParagraphElement>(
  "#allocation-readout",
)!;
let num = 2;

interface shiftCalculation {
  numProducers: number;
  maxProducers: number;
  production: number;
  consumption: number;
  balance: number;
}

function calculateShift(inp: number): shiftCalculation {
  const producers = inp * 3;
  const consumers = 6;
  return {
    numProducers: inp,
    maxProducers: 6,
    production: producers,
    consumption: consumers,
    balance: producers - consumers,
  };
}

interface rowDisplayRecord {
  label: string;
  value: number;
  color: string;
}

function update() {
  const stats = calculateShift(num);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < stats.maxProducers; i++) {
    ctx.fillStyle = i < stats.numProducers ? "#27766b" : "#c9d2c9";
    ctx.fillRect(18 + i * 45, 16, 36, 36);
    ctx.fillStyle = i < stats.numProducers ? "#ffffff" : "#233e43";
    ctx.font = "16px system-ui";
    ctx.fillText(String(i + 1), 31 + i * 45, 40);
  }

  ctx.fillStyle = "#233e43";
  ctx.font = "14px system-ui";
  ctx.fillText(
    `Producers: ${stats.numProducers} / ${stats.maxProducers}`,
    18,
    76,
  );

  const row: rowDisplayRecord[] = [
    {
      label: `Production: ${stats.production}`,
      value: stats.production,
      color: "#27766b",
    },
    {
      label: `Consumption: ${stats.consumption}`,
      value: stats.consumption,
      color: "#a44d23",
    },
  ];

  row.forEach((row, index) => {
    // Derive row positions from order
    const labelY = 102 + index * 52;
    const barY = 110 + index * 52;

    ctx.fillStyle = "#233e43";
    ctx.font = "14px system-ui";
    ctx.fillText(row.label, 18, labelY);

    ctx.fillStyle = row.color;
    ctx.fillRect(18, barY, row.value * 14, 20);
  });

  readout.textContent =
    `Assigned: ${stats.numProducers}/6 · Production: ${stats.production} · Consumption: ${stats.consumption} · Balance: ${
      stats.balance > 0 ? "+" : ""
    }${stats.balance}`;
}
document.querySelector<HTMLButtonElement>("#allocation-less")!.onclick = () => {
  num = Math.max(0, num - 1);
  update();
};
document.querySelector<HTMLButtonElement>("#allocation-more")!.onclick = () => {
  num = Math.min(6, num + 1);
  update();
};
document.querySelector<HTMLButtonElement>("#allocation-reset")!.onclick =
  () => {
    num = 2;
    update();
  };
update();
