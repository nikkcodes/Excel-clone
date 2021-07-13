const body = document.querySelector("body");
body.spellcheck = false;
let alphabetHeading = document.getElementById("Alphabet-Notation");
let rowTagCells = document.getElementById("row-tag-cells");
let prevselected = "";
const selectedCellDisplay = document.getElementById("selected-cell-input");
const gridtable = document.getElementById("grid-table");
for (let i = 0; i < 26; i++) {
  newele = document.createElement("div");
  newele.innerText = String.fromCharCode(65 + i);
  newele.classList.add("column-tag-cell");
  alphabetHeading.append(newele);
}

for (let i = 0; i < 100; i++) {
  newele = document.createElement("div");
  newele.innerText = i + 1;
  newele.classList.add("row-tag-cell-div");
  rowTagCells.append(newele);
}

for (let i = 1; i <= 100; i++) {
  row = document.createElement("div");
  row.classList.add("row");
  for (let j = 0; j < 26; j++) {
    cell = document.createElement("div");
    cell.classList.add("cell");
    cell.contentEditable = true;
    cell.setAttribute("data-address", String.fromCharCode(65 + j) + i);
    cell.addEventListener("click", function (ele) {
      //   event.persist();
      console.log(ele.target.classList);

      //   console.log(e.target);
      if (prevselected != "") {
        prevselected.classList.remove("selected-cell");
      }
      console.log(selectedCellDisplay);
      selectedCellDisplay.value = ele.target.getAttribute("data-address");
      ele.target.classList.add("selected-cell");
      prevselected = ele.target;
    });
    row.append(cell);
  }
  gridtable.append(row);
}
