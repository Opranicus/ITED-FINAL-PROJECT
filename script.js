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

function getCell(col,row){
    return grid.children[row * cols + col];
}

//lights pos
getCell(7,2).appendChild(createTrafficLight());
getCell(12,2).appendChild(createTrafficLight());
getCell(7,7).appendChild(createTrafficLight());
getCell(12,7).appendChild(createTrafficLight());

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


//start lights
start.addEventListener("click", function(){
    
})