const row = 16;
const column = 16;
const width = 64;
const playerWidth = 64 / 3;

const speed = 2;

const fov = 60;
const resolution = 10;
const stepAngle = fov / width / resolution;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const fpsText = document.getElementById("fps");

const canvas2 = document.getElementById("canvas2");
const ctx2 = canvas2.getContext("2d");

let fps;

const blockType = ["texture.png", "lucky.jpg"];
let loadedTexture = {};

canvas.width = width * row;
canvas.height = width * column;

canvasWidth = (width * row) / 1.4;
canvasHeight = (width * row) / 1.4;
canvas2.width = canvasWidth;
canvas2.height = canvasHeight;

let firstTime = new Date();

const doublePi = Math.PI * 2;

const map = [
  // row 0
  { type: 1, block: "texture.png" },
  { type: 1, block: "texture.png" },
  { type: 1, block: "texture.png" },
  { type: 1, block: "texture.png" },
  { type: 1, block: "texture.png" },
  { type: 1, block: "texture.png" },
  { type: 1, block: "texture.png" },
  { type: 1, block: "texture.png" },
  { type: 1, block: "lucky.jpg" },
  { type: 1, block: "texture.png" },
  { type: 1, block: "texture.png" },
  { type: 1, block: "texture.png" },
  { type: 1, block: "texture.png" },
  { type: 1, block: "texture.png" },
  { type: 1, block: "texture.png" },
  { type: 1, block: "texture.png" },

  // row 1
  { type: 1, block: "texture.png" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 1, block: "texture.png" },

  // row 2
  { type: 1, block: "texture.png" },
  { type: 0, block: "lucky.jpg" },
  { type: 1, block: "texture.png" },
  { type: 0, block: "lucky.jpg" },
  { type: 1, block: "texture.png" },
  { type: 0, block: "lucky.jpg" },
  { type: 1, block: "texture.png" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 1, block: "texture.png" },
  { type: 0, block: "lucky.jpg" },
  { type: 1, block: "texture.png" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 1, block: "texture.png" },

  // row 3
  { type: 1, block: "texture.png" },
  { type: 0, block: "lucky.jpg" },
  { type: 1, block: "texture.png" },
  { type: 0, block: "lucky.jpg" },
  { type: 1, block: "texture.png" },
  { type: 0, block: "lucky.jpg" },
  { type: 1, block: "texture.png" },
  { type: 0, block: "lucky.jpg" },
  { type: 1, block: "texture.png" },
  { type: 0, block: "lucky.jpg" },
  { type: 1, block: "texture.png" },
  { type: 0, block: "lucky.jpg" },
  { type: 1, block: "texture.png" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 1, block: "texture.png" },

  // row 4
  { type: 1, block: "texture.png" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 1, block: "texture.png" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 1, block: "texture.png" },

  // row 5
  { type: 1, block: "texture.png" },
  { type: 0, block: "lucky.jpg" },
  { type: 1, block: "texture.png" },
  { type: 1, block: "texture.png" },
  { type: 1, block: "texture.png" },
  { type: 0, block: "lucky.jpg" },
  { type: 1, block: "texture.png" },
  { type: 0, block: "lucky.jpg" },
  { type: 1, block: "texture.png" },
  { type: 1, block: "texture.png" },
  { type: 1, block: "texture.png" },
  { type: 0, block: "lucky.jpg" },
  { type: 1, block: "texture.png" },
  { type: 1, block: "texture.png" },
  { type: 0, block: "lucky.jpg" },
  { type: 1, block: "texture.png" },

  // row 6
  { type: 1, block: "texture.png" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 1, block: "texture.png" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 1, block: "texture.png" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 1, block: "texture.png" },

  // row 7
  { type: 1, block: "texture.png" },
  { type: 0, block: "lucky.jpg" },
  { type: 1, block: "texture.png" },
  { type: 0, block: "lucky.jpg" },
  { type: 1, block: "texture.png" },
  { type: 1, block: "texture.png" },
  { type: 1, block: "texture.png" },
  { type: 1, block: "texture.png" },
  { type: 1, block: "texture.png" },
  { type: 0, block: "lucky.jpg" },
  { type: 1, block: "texture.png" },
  { type: 1, block: "texture.png" },
  { type: 1, block: "texture.png" },
  { type: 0, block: "lucky.jpg" },
  { type: 1, block: "texture.png" },
  { type: 1, block: "texture.png" },

  // row 8
  { type: 1, block: "texture.png" },
  { type: 0, block: "lucky.jpg" },
  { type: 1, block: "texture.png" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 1, block: "texture.png" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 1, block: "texture.png" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 1, block: "texture.png" },

  // row 9
  { type: 1, block: "texture.png" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 1, block: "texture.png" },
  { type: 1, block: "texture.png" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 1, block: "texture.png" },
  { type: 1, block: "texture.png" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 1, block: "texture.png" },

  // row 10
  { type: 1, block: "texture.png" },
  { type: 0, block: "lucky.jpg" },
  { type: 1, block: "texture.png" },
  { type: 0, block: "lucky.jpg" },
  { type: 1, block: "texture.png" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 1, block: "texture.png" },
  { type: 0, block: "lucky.jpg" },
  { type: 1, block: "texture.png" },
  { type: 0, block: "lucky.jpg" },
  { type: 1, block: "texture.png" },
  { type: 0, block: "lucky.jpg" },
  { type: 1, block: "texture.png" },

  // row 11
  { type: 1, block: "texture.png" },
  { type: 0, block: "lucky.jpg" },
  { type: 1, block: "texture.png" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 1, block: "texture.png" },
  { type: 1, block: "texture.png" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 1, block: "texture.png" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 1, block: "texture.png" },

  // row 12
  { type: 1, block: "texture.png" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 1, block: "texture.png" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 1, block: "texture.png" },
  { type: 0, block: "lucky.jpg" },
  { type: 1, block: "texture.png" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 1, block: "texture.png" },

  // row 13
  { type: 1, block: "texture.png" },
  { type: 0, block: "lucky.jpg" },
  { type: 1, block: "texture.png" },
  { type: 0, block: "lucky.jpg" },
  { type: 1, block: "texture.png" },
  { type: 1, block: "texture.png" },
  { type: 1, block: "texture.png" },
  { type: 0, block: "lucky.jpg" },
  { type: 1, block: "texture.png" },
  { type: 0, block: "lucky.jpg" },
  { type: 1, block: "texture.png" },
  { type: 0, block: "lucky.jpg" },
  { type: 1, block: "texture.png" },
  { type: 1, block: "texture.png" },
  { type: 0, block: "lucky.jpg" },
  { type: 1, block: "texture.png" },

  // row 14
  { type: 1, block: "texture.png" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 0, block: "lucky.jpg" },
  { type: 1, block: "texture.png" },

  // row 15
  { type: 1, block: "texture.png" },
  { type: 1, block: "texture.png" },
  { type: 1, block: "texture.png" },
  { type: 1, block: "texture.png" },
  { type: 1, block: "texture.png" },
  { type: 1, block: "texture.png" },
  { type: 1, block: "texture.png" },
  { type: 1, block: "texture.png" },
  { type: 1, block: "texture.png" },
  { type: 1, block: "texture.png" },
  { type: 1, block: "texture.png" },
  { type: 1, block: "texture.png" },
  { type: 1, block: "texture.png" },
  { type: 1, block: "texture.png" },
  { type: 1, block: "texture.png" },
  { type: 1, block: "texture.png" },
];

let player = {
  x: 90,
  y: 90,
  up: false,
  right: false,
  left: false,
  degree: 90,
};

let collisionArray = [];

const collisionMap = (x, y) => {
  if (x > 0 && x < row * width && y > 0 && y < row * width)
    return map[Math.floor(y / width) * row + Math.floor(x / width)].type;
};

addEventListener("keydown", (e) => {
  if (e.key == "w") {
    player.up = true;
  }

  if (e.key == "a") {
    player.left = true;
  }
  if (e.key == "d") {
    player.right = true;
  }
});
addEventListener("keyup", (e) => {
  if (e.key == "w") {
    player.up = false;
  }

  if (e.key == "a") {
    player.left = false;
  }
  if (e.key == "d") {
    player.right = false;
  }
});

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < column; j++) {
      if (map[j + i * row].type == 1) {
        ctx.fillStyle = "black";
        ctx.fillRect(j * width, i * width, width - 1, width - 1);
      } else {
        ctx.fillStyle = "grey";
        ctx.fillRect(j * width, i * width, width - 1, width - 1);
      }
    }
  }
};

const drawPlayer = () => {
  const radian = player.degree * (Math.PI / 180);
  const dx = Math.cos(radian) * speed;
  const dy = Math.sin(radian) * speed;
  ctx.fillStyle = "yellow";
  ctx.beginPath();
  ctx.arc(
    player.x + playerWidth / 2,
    player.y + playerWidth / 2,
    playerWidth / 2,
    0,
    doublePi
  );
  ctx.fill();

  if (player.up) {
    player.x += dx;
    player.y += dy;
  }
  if (player.left) {
    player.degree -= 3;
  }
  if (player.right) {
    player.degree += 3;
  }
};

const playerCollision = () => {
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < column; j++) {
      if (
        player.x + playerWidth > j * width &&
        player.x < j * width + width &&
        player.y + playerWidth > i * width &&
        player.y < i * width + width &&
        map[j + i * row].type == 1
      ) {
        const radian = player.degree * (Math.PI / 180);
        const dx = Math.cos(radian) * speed;
        const dy = Math.sin(radian) * speed;
        player.x -= dx;
        player.y -= dy;
      }
    }
  }
};

const drawRay = (startDeg) => {
  const startX = player.x + playerWidth / 2;
  const startY = player.y + playerWidth / 2;

  const { k, x, y, side, block } = rayCollision(startDeg);

  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(x, y);
  ctx.stroke();
  return { k, side, block };
};

const rayCollision = (startDeg) => {
  const radian = (player.degree + startDeg) * (Math.PI / 180);
  let foundY = false;
  let foundX = false;
  let k;
  let side;
  let block;
  const Px = player.x + playerWidth / 2;
  const Py = player.y + playerWidth / 2;

  let first_interaction_x_Y, first_interaction_y_Y, Yp, Xp;
  let tanRad = Math.tan(radian);
  tanRad = tanRad ? tanRad : 0.000001;

  if (Math.sin(radian) > 0) {
    // Facing down
    first_interaction_y_Y = Math.floor(Py / width) * width + width;
    Yp = width;
  } else {
    // Facing up
    first_interaction_y_Y = Math.floor(Py / width) * width - 0.000001;
    Yp = -width;
  }
  Xp = Yp / tanRad;
  first_interaction_x_Y = Px + (first_interaction_y_Y - Py) / tanRad;

  for (let i = 0; i < row && !foundY; i++) {
    if (collisionMap(first_interaction_x_Y, first_interaction_y_Y) == 1) {
      foundY = true;
      break;
    } else {
      first_interaction_x_Y += Xp;
      first_interaction_y_Y += Yp;
    }
  }

  // X
  let first_interaction_x_X, first_interaction_y_X, Ypx, Xpx;

  if (Math.cos(radian) > 0) {
    Xpx = width;
    first_interaction_x_X = Math.floor(Px / width) * width + width;
  } else {
    Xpx = -width;
    first_interaction_x_X = Math.floor(Px / width) * width - 0.000001;
  }
  Ypx = Xpx * tanRad;

  first_interaction_y_X = Py + (first_interaction_x_X - Px) * tanRad;

  for (let i = 0; i < row && !foundX; i++) {
    if (collisionMap(first_interaction_x_X, first_interaction_y_X) == 1) {
      foundX = true;
      break;
    }
    first_interaction_x_X += Xpx;
    first_interaction_y_X += Ypx;
  }

  let slopY = Math.sqrt(
    Math.pow(first_interaction_x_Y - Px, 2) +
      Math.pow(first_interaction_y_Y - Py, 2)
  );
  let slopX = Math.sqrt(
    Math.pow(first_interaction_x_X - Px, 2) +
      Math.pow(first_interaction_y_X - Py, 2)
  );

  if (slopY > slopX) {
    side =
      first_interaction_y_X - Math.floor(first_interaction_y_X / width) * 64;
    k = slopX;
    k = k * Math.cos((startDeg * Math.PI) / 180);
    block =
      map[
        Math.floor(first_interaction_y_X / width) * row +
          Math.floor(first_interaction_x_X / width)
      ].block;
    return {
      k,
      side,
      x: first_interaction_x_X,
      y: first_interaction_y_X,
      block,
    };
  } else {
    side =
      first_interaction_x_Y - Math.floor(first_interaction_x_Y / width) * 64;
    k = slopY;
    k = k * Math.cos((startDeg * Math.PI) / 180);
    block =
      map[
        Math.floor(first_interaction_y_Y / width) * row +
          Math.floor(first_interaction_x_Y / width)
      ].block;
    return {
      k,
      side,
      x: first_interaction_x_Y,
      y: first_interaction_y_Y,
      block,
    };
  }
};

const loadImages = () => {
  for (let i = 0; i < blockType.length; i++) {
    const img = new Image();
    img.src = blockType[i];
    loadedTexture[blockType[i]] = img;
  }
};

const updateFunc = () => {
  let updateTime = new Date();
  fps = 1000 / (updateTime - firstTime);
  firstTime = updateTime;
  draw();
  drawPlayer();
  playerCollision();
  collisionArray = [];
  for (let i = -fov / 2; i < fov / 2; i = i + stepAngle) {
    const { k, side, block } = drawRay(i);
    collisionArray.push({ distance: k, side, block });
  }
  fpsText.textContent = `fps : ${Math.round(fps)}`;

  requestAnimationFrame(updateFunc);
};

const updateFunc3d = () => {
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
  ctx2.fillStyle = "rgb(61, 44, 44)";
  ctx2.fillRect(0, canvasHeight / 2, canvasWidth, canvasHeight);
  ctx2.fillStyle = "#87CEEB";
  ctx2.fillRect(0, 0, canvasWidth, canvasHeight / 2);
  const rectWidth = canvasWidth / collisionArray.length;
  for (let i = 0; i < collisionArray.length; i++) {
    let img = loadedTexture[collisionArray[i].block];

    ctx2.drawImage(
      img,
      Math.floor((collisionArray[i].side * img.width) / width),
      0,
      rectWidth / width,
      img.height,
      i * rectWidth,
      canvasHeight / 2 - 30000 / collisionArray[i].distance / 2,
      rectWidth,
      30000 / collisionArray[i].distance
    );
  }
  requestAnimationFrame(updateFunc3d);
};

loadImages();
updateFunc();
updateFunc3d();
