let inputSizeEl = document.getElementById("input-size")
let createGridButton = document.getElementById("create-grid")
let gridEl = document.getElementById("grid")
let det = document.getElementById("det")
let resultEl = document.getElementById("result")
// Matrix Variables

let matrixRow;
let matrixCol;
let matrixSize = matrixRow * matrixCol;
let matrix = []

// Event listener
det.addEventListener('click', ()=>{
  resultEl.innerText =  determinant(matrix)
  
})
createGridButton.addEventListener('click', ()=>{
  console.log(inputSizeEl.value)

  if (Number.isInteger(inputSizeEl.valueAsNumber)) {
    matrixRow = inputSizeEl.valueAsNumber
    matrixCol = inputSizeEl.valueAsNumber
    gridEl.style.gridTemplateColumns = `repeat(${matrixCol}, 1fr)`;

  }

  if(gridEl.firstChild){
    gridEl.replaceChildren()
    matrix = []
  }
  generateGrid()
})


// generate the grid 
function generateGrid() {
  for (let i = 0; i < matrixRow; i++) {
    matrix[i] = []
    for (let j = 0; j < matrixCol; j++) {
      matrix[i][j] = i * matrixCol + j + 1
      // create the ui or input element
      createGridCell(i,j,(i * matrixCol + j + 1))
    }
    
    // console.log(i)
  }
  
}





//creating grid cell
function createGridCell(i,j,num) {
  let inputEl = document.createElement("input")
  inputEl.className = "grid-cell"
  inputEl.value = num
  inputEl.type = "number"
  gridEl.appendChild(inputEl)
  

  inputEl.addEventListener('change', ()=>{
    matrix[i][j] = parseInt(inputEl.value)
  })
}







function determinant(matrix) {
  const n = matrix.length;

  // Base case: if the matrix is 1x1, return its only element
  if (n === 1) {
      return matrix[0][0];
  }

  // Base case: if the matrix is 2x2, return the determinant using the formula
  if (n === 2) {
      return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
  }

  let det = 0;

  // Iterate through the first row to calculate the determinant
  for (let j = 0; j < n; j++) {
      const minor = [];

      // Create the minor matrix excluding the first row and the current column
      for (let i = 1; i < n; i++) {
          minor.push(matrix[i].slice(0, j).concat(matrix[i].slice(j + 1)));
      }

      // Calculate the cofactor and add it to the determinant
      det += (j % 2 === 0 ? 1 : -1) * matrix[0][j] * determinant(minor);
  }
  
  return det;
}
