const grid = document.getElementById("grid");
const start = document.getElementById('start');
const stop = document.getElementById('stop');

const rows = 10;
const cols = 20;

let draggedCar = null;
let sourceCell = null;

//grid builder
for (let i = 0; i < rows * cols; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");

    cell.addEventListener("dragover", e => e.preventDefault());

    cell.addEventListener("drop", e => {
        e.preventDefault();

        if (!draggedCar) return;

        if (cell.querySelector(".car")) return;

        if (sourceCell)
            sourceCell.removeChild(draggedCar);

        cell.appendChild(draggedCar);

        draggedCar = null;
        sourceCell = null;
    });

    grid.appendChild(cell);
}

document.querySelectorAll(".car").forEach(car => {

    car.addEventListener("dragstart", () => {
        draggedCar = car;
        sourceCell = car.parentElement;
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
    lights.forEach(light => {
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

    timer = setInterval(() => {
        setTimeout(() => {
            lights[current].style.backgroundImage = 'url("assets/other/yellow.png")';
        }, 8000);

        setTimeout(() => {
            current = (current + 1) % 4;
            loopLights(current);
        }, 10000);


    }, 10000);

})

stop.addEventListener("click", function () {
    clearInterval(timer);
    timer = null;

    lights.forEach(light => {
        light.style.backgroundImage = 'url("assets/other/red.png")';
    });

    current = 0;
})

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


