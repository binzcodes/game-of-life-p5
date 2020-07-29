// TODO switch 2d arrays for memory efficiency
function build2dArray(cols, rows) {
  return Array(cols).fill(0).map(data => Array(rows).fill(0))
}

let grid
let cols
let rows
let resolution = 20
let res = resolution
let width = 800
let height = 800
let fps = 60
let pause = false
function setup() {
  cols = width / resolution
  rows = height / resolution
  grid = build2dArray(cols, rows)
    .map(data => data.map(data => round(random()))) // init

  frameRate(pause ? fps/fps : fps)
  createCanvas(width, height);
}

function draw() {
  background(0);

  // draw grid
  grid.map((data, col) => {
    data.map((data, row) => {
      let x = col * res
      let y = row * res
      if (grid[col][row] == 0) {
        fill(255)
        stroke(0)
        pixel = rect(x, y, res - 1, res - 1)
      }
    })
  })

  let next = build2dArray(cols, rows)
  // compute next based on grid TODO: move to function that is passed
  next.map((data, col) => {
    data.map((data, row) => {
      let state = grid[col][row]

      // compute a cell
      let neighbours = countNeighbours(grid, col, row) // TODO: compute value to return 1 or 0
      if (pause) next[col][row] = state
      else if (state == 0 && neighbours == 3) next[col][row] = 1
      else if (state == 1 && (neighbours < 2 || neighbours > 3)) next[col][row] = 0
      else next[col][row] = state
    })
  })

  // assign to render next frame
  grid = next
}

function countNeighbours(grid, x, y) {
  let sum = 0
  // build2dArray(3, 3).map((data, col) => {col-1})
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols
      let row = (y + j + rows) % rows
      sum += grid[col][row]
    }
  }
  sum -= grid[x][y]
  return sum
}


function setState() {
  let col = floor(mouseX / resolution)
  let row = floor(mouseY / resolution)
  grid[col][row] = !grid[col][row]
}

function keyPressed() {
  if (keyCode == DELETE) grid = build2dArray(cols, rows)
  else pause = !pause
}

function mousePressed() {
  setState()
}

function mouseDragged() {
  setState()
}
