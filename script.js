const grid = document.getElementById("grid");
const start = document.getElementById("start");
const stop = document.getElementById("stop");

const rows = 10;
const cols = 20;

let draggedCar = null;
let sourceCell = null;
let previousCell = null;

const warning = document.getElementById("warning");

function showWarning(message) {
  warning.textContent = message;
  warning.classList.add("show");

  clearTimeout(warning.timer);

  warning.timer = setTimeout(() => {
    warning.classList.remove("show");
  }, 2000);
}

function isNearAnotherCar(targetCell, excludeCar) {
  const targetIndex = Array.prototype.indexOf.call(grid.children, targetCell);
  const targetRow = Math.floor(targetIndex / cols);
  const targetCol = targetIndex % cols;

  const cars = grid.querySelectorAll(".car");

  for (const car of cars) {
    if (car === excludeCar) continue;

    const carCell = car.parentElement;
    const carIndex = Array.prototype.indexOf.call(grid.children, carCell);

    if (carIndex === -1) continue;

    const carRow = Math.floor(carIndex / cols);
    const carCol = carIndex % cols;

    const dist = Math.abs(carRow - targetRow) + Math.abs(carCol - targetCol);

    if (dist < 2) return true;
  }

  return false;
}

for (let i = 0; i < rows * cols; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");

  cell.addEventListener("dragover", (e) => e.preventDefault());

  cell.addEventListener("drop", (e) => {
    e.preventDefault();

    if (!draggedCar) return;

    if (cell.querySelector(".car")) return;

    if (isNearAnotherCar(cell, draggedCar)) {
      showWarning("Collision Warning!");
      draggedCar = null;
      sourceCell = null;
      return;
    }

    const intersection = [
      getCell(8, 3),
      getCell(9, 3),
      getCell(10, 3),
      getCell(11, 3),
      getCell(8, 4),
      getCell(9, 4),
      getCell(10, 4),
      getCell(11, 4),
      getCell(8, 5),
      getCell(9, 5),
      getCell(10, 5),
      getCell(11, 5),
      getCell(8, 6),
      getCell(9, 6),
      getCell(10, 6),
      getCell(11, 6),
    ];

    const rightLane = [
      getCell(12, 4),
      getCell(13, 4),
      getCell(14, 4),
      getCell(15, 4),
      getCell(16, 4),
      getCell(17, 4),
      getCell(18, 4),
      getCell(19, 4),
    ];
    const rightLaneExit = [
      getCell(0, 4),
      getCell(1, 4),
      getCell(2, 4),
      getCell(3, 4),
      getCell(4, 4),
      getCell(5, 4),
      getCell(6, 4),
      getCell(7, 4),
    ];

    const leftLane = [
      getCell(0, 5),
      getCell(1, 5),
      getCell(2, 5),
      getCell(3, 5),
      getCell(4, 5),
      getCell(5, 5),
      getCell(6, 5),
      getCell(7, 5),
    ];
    const leftLaneExit = [
      getCell(12, 5),
      getCell(13, 5),
      getCell(14, 5),
      getCell(15, 5),
      getCell(16, 5),
      getCell(17, 5),
      getCell(18, 5),
      getCell(19, 5),
    ];

    const upperLane = [getCell(9, 0), getCell(9, 1), getCell(9, 2)];
    const upperLaneExit = [getCell(9, 7), getCell(9, 8), getCell(9, 9)];

    const bottomLane = [getCell(10, 7), getCell(10, 8), getCell(10, 9)];
    const bottomLaneExit = [getCell(10, 0), getCell(10, 1), getCell(10, 2)];

    const laneRules = [
      { lane: rightLane, exit: rightLaneExit, lightIndex: 0 },
      { lane: leftLane, exit: leftLaneExit, lightIndex: 3 },
      { lane: upperLane, exit: upperLaneExit, lightIndex: 2 },
      { lane: bottomLane, exit: bottomLaneExit, lightIndex: 1 },
    ];

    for (const rule of laneRules) {
      const enteringFromThisLane = rule.lane.includes(previousCell);
      const goingIntoIntersectionOrPast =
        intersection.includes(cell) || rule.exit.includes(cell);
      const isRed =
        lights[rule.lightIndex].style.backgroundImage.includes("red");

      if (enteringFromThisLane && goingIntoIntersectionOrPast && isRed) {
        showWarning("Red Light! You cannot enter the intersection.");
        draggedCar = null;
        sourceCell = null;
        return;
      }
    }

    if (sourceCell) sourceCell.removeChild(draggedCar);

    cell.appendChild(draggedCar);

    draggedCar = null;
    sourceCell = null;
  });

  grid.appendChild(cell);
}

document.querySelectorAll(".car").forEach((car) => {
  car.addEventListener("dragstart", () => {
    draggedCar = car;
    sourceCell = car.parentElement;
    previousCell = sourceCell;
  });

  car.addEventListener("dragend", () => {
    draggedCar = null;
    sourceCell = null;
  });
});

function createTrafficLight() {
  const tl = document.createElement("div");
  tl.classList.add("traffic-light");
  return tl;
}

function getCell(col, row) {
  return grid.children[row * cols + col];
}

const light1 = createTrafficLight();
const light2 = createTrafficLight();
const light3 = createTrafficLight();
const light4 = createTrafficLight();

getCell(7, 2).appendChild(light1);
getCell(12, 2).appendChild(light2);
getCell(7, 7).appendChild(light3);
getCell(12, 7).appendChild(light4);

const lights = [light1, light2, light3, light4];

//loop lights
function loopLights(active) {
  lights.forEach((light) => {
    light.style.backgroundImage = 'url("assets/other/red.png")';
  });
  lights[active].style.backgroundImage = 'url("assets/other/green.png")';
}

let current = 0;
let timer = null;

start.addEventListener("click", function () {
  if (timer) {
    return;
  }

  loopLights(current);

  setTimeout(() => {
    lights[current].style.backgroundImage = 'url("assets/other/yellow.png")';
  }, 8000);

  setTimeout(() => {
    current = (current + 1) % 4;
    loopLights(current);
  }, 10000);

  timer = setInterval(() => {
    setTimeout(() => {
      lights[current].style.backgroundImage = 'url("assets/other/yellow.png")';
    }, 8000);

    setTimeout(() => {
      current = (current + 1) % 4;
      loopLights(current);
    }, 10000);
  }, 10000);
});

stop.addEventListener("click", function () {
  clearInterval(timer);
  timer = null;

  lights.forEach((light) => {
    light.style.backgroundImage = 'url("assets/other/red.png")';
  });

  current = 0;
});

const dashboard = document.getElementById("carTray");

dashboard.addEventListener("dragover", (e) => {
  e.preventDefault();
});

dashboard.addEventListener("drop", (e) => {
  e.preventDefault();

  if (!draggedCar) return;

  dashboard.appendChild(draggedCar);

  draggedCar = null;
  sourceCell = null;
});
