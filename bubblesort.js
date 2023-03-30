var data;

let randomizeBtn = document.getElementById("randomize");
let sortBtn = document.getElementById("solve");
var dataSize = document.getElementById("size").value;
let labelSize = document.getElementById("label-size");
labelSize.innerHTML = document.getElementById("size").value;

document.getElementById("size").addEventListener("input", function () {
  dataSize = document.getElementById("size").value;
  labelSize.innerHTML = document.getElementById("size").value;
});

function generateRandomArray(length) {
  let arr = Array.from({ length }, () => Math.floor(Math.random() * 100));
  return arr;
}

randomizeBtn.addEventListener("click", function () {
  data = [];
  const container = document.getElementById("container");
  container.getElementsByClassName("data")[0].remove();
  const arr = document.createElement("div");
  arr.classList.add("data");

  let randomArray = generateRandomArray(dataSize);

  randomArray.map((el, i) => {
    var newele = document.createElement("div");
    newele.setAttribute("id", `ele-${i}`);

    newele.setAttribute("style", `height: ${el * 2}px;`);
    newele.classList.add("newele");
    arr.append(newele);
    newele.innerHTML = el;
    data.push(el);
  });

  arr.setAttribute("style", "background-color:black");
  container.append(arr);
});
async function sort() {
  const size = data.length;
  // loop to access each array element
  for (let step = 0; step < size - 1; step++) {
    changeColor(0, "lightgreen");

    // loop to compare two elements
    for (var i = 0; i < size - step - 1; i++) {
      changeColor(i + 1, "lightgreen");
      // compare two array elements
      // change > to < to sort in descending order

      if (data[i] > data[i + 1]) {
        swapNumber(i, i + 1);

        await delay();
      }
      changeColor(i, "lightblue");
    }

    changeColor(i, "orange");
    await delay();
  }
  changeColor(0, "orange");
}
function changeColor(i, color) {
  const eleColumn = document.getElementById(`ele-${i}`);
  eleColumn.classList.remove("greenColor", "orangeColor");

  if (color == "lightgreen") {
    eleColumn.classList.add("greenColor");
  } else if (color == "orange") {
    eleColumn.classList.add("orangeColor");
  }
}

function swapNumber(i, j) {
  // swapping occurs if elements
  // are not in intended order
  const temp = data[i];
  data[i] = data[j];
  data[j] = temp;
  swapHeight(i, j);
}
function swapHeight(i, j) {
  // Update height
  const firstCol = document.getElementById(`ele-${i}`);
  const secondCol = document.getElementById(`ele-${j}`);
  firstCol.setAttribute("style", `height: ${data[i] * 2}px;`);
  secondCol.setAttribute("style", `height: ${data[j] * 2}px;`);
  firstCol.innerHTML = data[i];
  secondCol.innerHTML = data[j];
}

function delay() {
  // 'async func' allows for code to run asynchronously; normally it's synchronous
  // 'await promise' waits for the promise to finish executing
  //   Promise really just calls a resolve function or reject function after something happens.
  //   What we’re doing is creating a new Promise and instead of passing in a callback to setTimeout,
  //   we pass in resolve. That way, after the milliseconds pass, it is resolve that gets invoked,
  //   and our promise is triggered and resolved.
  //   We can then await it and do whatever we want.
  const time = 9000 / document.getElementById("size").value;

  return new Promise((reslove) => setTimeout(reslove, time));
}

sortBtn.addEventListener("click", sort);
