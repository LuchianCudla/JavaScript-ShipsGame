//Global variables

const data = {
  shipTypes: {
    carrier: { size: 5, count: 1 },
    battleship: { size: 4, count: 1 },
    cruiser: { size: 3, count: 1 },
    submarine: { size: 3, count: 1 },
    destroyer: { size: 2, count: 1 },
  },
  layout: [
    {
      ship: "carrier",
      positions: [
        [2, 9],
        [3, 9],
        [4, 9],
        [5, 9],
        [6, 9],
      ],
    },
    {
      ship: "battleship",
      positions: [
        [5, 2],
        [5, 3],
        [5, 4],
        [5, 5],
      ],
    },
    {
      ship: "cruiser",
      positions: [
        [8, 1],
        [8, 2],
        [8, 3],
      ],
    },
    {
      ship: "submarine",
      positions: [
        [3, 0],
        [3, 1],
        [3, 2],
      ],
    },
    {
      ship: "destroyer",
      positions: [
        [0, 0],
        [1, 0],
      ],
    },
  ],
};

const createShips = [
  "destroyer",
  "battleship",
  "carrier",
  "cruiser",
  "submarine",
];

let Numhits = 0;

//******************************************************** */

const shipsWrapper = document.querySelector(".ships-wrapper");
const container = document.querySelector(".container");

// Creating the layout
const containerArr = Array(10)
  .fill()
  .map((el, i) => Array(10).fill());

createShips.forEach((ship) => {
  const singleWrapper = document.querySelector(".ship-wrapper");
  const container = document.createElement("div");
  container.classList.add("ship-container");
  const img = document.createElement("img");
  img.src = `./pics/${ship}Shape.png`;
  container.append(img);
  const hitsContainer = document.createElement("div");
  hitsContainer.classList.add("hits-container");
  hitsContainer.id = ship;
  container.append(hitsContainer);
  singleWrapper.append(container);
  shipsWrapper.append(singleWrapper);
});

containerArr.forEach((el, i) => {
  el.forEach((_, j) => {
    const div = document.createElement("div");
    div.classList.add("item");
    container.appendChild(div);
    div.addEventListener("click", (e) => checkCoordinates(e.target, i, j), {
      once: true,
    });
  });
});
/***********************************************************/

// Number of hits
const hits = document.createElement("div");
hits.classList.add("hits");
const h2 = document.createElement("h2");
h2.style.color = "white";
h2.textContent = `Hits: ${Numhits}`;
hits.append(h2);
shipsWrapper.append(hits);

// Find the coordinates in the layout

let { layout, shipTypes } = data;

const checkCoordinates = (e, i, j) => {
  const isShipType = layout.find(({ positions }) =>
    positions.some(([a, b]) => a == i && b == j)
  )?.ship;
  shipStyle(e, isShipType);
  Numhits++;
  h2.textContent = `Hits: ${Numhits}`;
};

// Applying styles and updating the number of hits for each ship

const shipStyle = (e, isShipType) => {
  if (isShipType) {
    shipTypes = {
      ...shipTypes,
      [isShipType]: {
        ...shipTypes[isShipType],
        size: shipTypes[isShipType].size - shipTypes[isShipType].count,
      },
    };

    e.style.backgroundImage = "url('./pics/HitSmall.png')";
    e.classList.add("backgroundSize");
    const selectedShip = document.querySelector(`#${isShipType}`);
    const hitImg = document.createElement("img");
    hitImg.src = "./pics/HitSmall.png";
    selectedShip.appendChild(hitImg);

    if (shipTypes[isShipType].size == 0) {
      const checkedImg = document.createElement("img");
      checkedImg.src = "./pics/checked.svg";
      selectedShip.append(checkedImg);
    }
  }

  if (!isShipType) {
    e.style.backgroundImage = "url('./pics/MissSmall.png')";
    e.classList.add("backgroundSize");
  }
};
