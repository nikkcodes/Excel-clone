const body = document.querySelector("body");
const formaulaBar = document.getElementById("formula-input");
body.spellcheck = false;
let alphabetHeading = document.getElementById("Alphabet-Notation");
let rowTagCells = document.getElementById("row-tag-cells");
let prevselected = "";
let cellcontroller = {};
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
    let address = String.fromCharCode(65 + j) + i;
    cell.setAttribute("data-address", address);
    cellcontroller[address] = {
      value: "",
      formula: "",
      downstream: [],
      upstream: [],
      color: "black",
      backgroundColor: "white",
      textAlign: "left",
      fontFamily: "Arial",
      fontWeight: "normal",
      fontSize: "10",
      underline: "false",
      italic: "false",
      connectedNodes: [],
    };

    cell.addEventListener("click", function (ele) {
      if (prevselected != "") {
        prevselected.classList.remove("selected-cell");
      }
      // console.log(selectedCellDisplay);
      selectedCellDisplay.value = ele.target.getAttribute("data-address");
      ele.target.classList.add("selected-cell");
      formaulaBar.value =
        cellcontroller[ele.target.getAttribute("data-address")].formula;
      prevselected = ele.target;
    });
    cell.addEventListener("input", function (ele) {
      let curadd = ele.target.getAttribute("data-address");
      cellcontroller[curadd].value = ele.target.innerText;
      //Updating Upstream
      let curupstream = cellcontroller[curadd].upstream;
      for (let i = 0; i < curupstream.length; i++) {
        removeFromUpstream(curadd, curupstream[i]);
      }
      //Update Downstream
      let curdownstream = cellcontroller[curadd].downstream;
      for (let i = 0; i < curdownstream.length; i++) {
        UpdateValueOnDownstream(curdownstream[i]);
      }
      cellcontroller[curadd].formula = "";
    });
    row.append(cell);
  }
  gridtable.append(row);
}

function removeFromUpstream(curele, target) {
  let curdownstream = cellcontroller[target].downstream;
  let newdownstream = [];
  for (let i = 0; i < curdownstream.length; i++) {
    if (curdownstream[i] != curele) {
      newdownstream.push(curdownstream[i]);
    }
  }
  cellcontroller[target].downstream = newdownstream;
}

function UpdateValueOnDownstream(targetaddress) {
  let curvalupstream = cellcontroller[targetaddress].upstream;
  let valobj = {};
  for (let i = 0; i < curvalupstream.length; i++) {
    valobj[curvalupstream[i]] = cellcontroller[curvalupstream[i]].value;
  }
  let form = cellcontroller[targetaddress].formula;
  let arr = form.split(" ");
  for (let i = 0; i < arr.length; i++) {
    if (valobj[arr[i]]) {
      arr[i] = valobj[arr[i]];
    }
  }
  formwithval = arr.join(" ");
  let newval = eval(formwithval);
  cellcontroller[targetaddress].value = newval;
  console.log(`[data-address=${targetaddress}]`);
  currentcell = document.querySelector(`[data-address=${targetaddress}]`);
  currentcell.innerText = cellcontroller[targetaddress].value;
  let curdownstream = cellcontroller[targetaddress].downstream;

  //Recursive Call Update on Downstream
  if (curdownstream.length != 0) {
    for (let i = 0; i < curdownstream.length; i++) {
      UpdateValueOnDownstream(curdownstream[i]);
    }
  }
}
function makeUpstreamFromFormula(formula) {
  let arr = formula.split(" ");
  let upstreamarr = [];
  for (let i = 0; i < arr.length; i++) {
    if (cellcontroller[arr[i]]) {
      upstreamarr.push(arr[i]);
    }
  }
  return upstreamarr;
}

function addOnUpstream(currentele, targetele) {
  let targetdownstream = cellcontroller[targetele].downstream;
  let f = 0;
  for (let i = 0; i < targetdownstream.length; i++) {
    if (targetdownstream[i] == currentele) {
      f = 1;
      break;
    }
  }
  if (f == 0) {
    cellcontroller[targetele].downstream.push(currentele);
  }
}

//Input From Formula Bar

formaulaBar.addEventListener("change", function (e) {
  console.log(e.currentTarget.value);
  let selectedcell = prevselected.getAttribute("data-address");
  let formula = e.currentTarget.value;
  cellcontroller[selectedcell].formula = formula;
  let formularr = formula.split(" ");
  let dependenton = [];
  for (let i = 0; i < formularr.length; i++) {
    if (cellcontroller[formularr[i]] != undefined) {
      dependenton.push(formularr[i]);
      formularr[i] = cellcontroller[formularr[i]].value;
      console.log("boom", cellcontroller[formularr[i]]);
    }
  }
  if (checkCycle(dependenton) == 0) {
    return;
  }

  console.log(formularr);
  let formulawithval = formularr.join(" ");
  let newval = eval(formulawithval);
  cellcontroller[selectedcell].value = newval;
  currentcell = document.querySelector(`[data-address=${selectedcell}]`);
  currentcell.innerText = cellcontroller[selectedcell].value;
  // updating downstream
  let selectedcelldownstream = cellcontroller[selectedcell].downstream;
  for (let i = 0; i < selectedcelldownstream.length; i++) {
    UpdateValueOnDownstream(selectedcelldownstream[i]);
  }
  // updating upstream
  let selectedcellupstream = cellcontroller[selectedcell].upstream;
  for (let i = 0; i < selectedcellupstream.length; i++) {
    removeFromUpstream(selectedcell, selectedcellupstream[i]);
  }
  console.log(formula);
  let newupstream = makeUpstreamFromFormula(formula);
  cellcontroller[selectedcell].upstream = newupstream;
  for (let i = 0; i < newupstream.length; i++) {
    addOnUpstream(selectedcell, newupstream[i]);
  }
  console.log(cellcontroller[selectedcell]);
});

function addEdge(start, end) {
  console.log(end);
  cellcontroller[start][connectedNodes].push(end);
  console.log(cellcontroller[start][connectedNodes]);
  if (checkcircle(start)) {
    alert("Circular Dependecy Formed ");
    removeEdge(start, end);
    return 0;
  }
  return 1;
}

function removeEdge(start, end) {
  let cur = cellcontroller[start];
  let newcur = [];
  for (let i = 0; i < cur.length; i++) {
    if (cur[i] == end) {
      continue;
    }
    newcur.push(cur[i]);
  }
  cellcontroller[start] = newcur;
}

function checkCycle(dependenton) {
  let ans = 1;
  for (let i = 0; i < dependenton.length; i++) {
    ans =
      ans ||
      addEdge(prevselected.getAttribute("data-address"), depeedndenton[i]);
    if (ans == 0) {
      for (let j = 0; j <= i; j++) {
        removeEdge(prevselected.getAttribute("data-address"), dependenton[j]);
      }
      break;
    }
  }
  return ans;
}

function dfs(visited, curnode) {
  if (visited[curnode] == 1) {
    return 1;
  }
  let ans = 0;
  visited[curnode] = 1;
  for (
    let i = 0;
    i < cellcontroller[cellcontroller][connectedNodes].length;
    i++
  ) {
    if (dfs(visited, cellcontroller[cellcontroller][connectedNodes][i])) {
      return 0;
    }
  }
  visited[curnode] = 0;
}

function checkcircle(start) {
  let visited = {};
  dfs(visited, start);
}
