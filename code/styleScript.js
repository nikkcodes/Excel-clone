const bui = document.getElementById("bui");
const colorstyle = document.getElementById("font-color-style");
const alignstyle = document.getElementById("font-align-style");
// const fontstyle = document.getElementById("font-text-style");

const buiicons = bui.querySelectorAll(".material-icons");
const coloricons = colorstyle.querySelectorAll(".material-icons");
const alignicons = alignstyle.querySelectorAll(".material-icons");
const fontweighticon = document.getElementById("font-weight-select");
const fontfamilyicon = document.getElementById("font-select");

buiicons[0].addEventListener("click", function (e) {
  let address = prevselected.getAttribute("data-address");
  let curvalue = cellcontroller[address].fontWeight;
  if (curvalue == "bold") {
    prevselected.style.fontWeight = "normal";
    cellcontroller[address].fontWeight = "normal";
  } else {
    prevselected.style.fontWeight = "bold";
    cellcontroller[address].fontWeight = "bold";
  }
});

buiicons[1].addEventListener("click", function (e) {
  let address = prevselected.getAttribute("data-address");
  let curvalue = cellcontroller[address].italic;
  if (curvalue == "false") {
    prevselected.style.fontStyle = "italic";
    cellcontroller[address].italic = "true";
  } else {
    prevselected.style.fontStyle = "normal";
    cellcontroller[address].italic = "false";
  }
});

buiicons[2].addEventListener("click", function (e) {
  let address = prevselected.getAttribute("data-address");
  let curvalue = cellcontroller[address].underline;
  if (curvalue == "false") {
    prevselected.style.textDecoration = "underline";
    cellcontroller[address].underline = "true";
  } else {
    prevselected.style.textDecoration = "none";
    cellcontroller[address].underline = "false";
  }
});

coloricons[0].addEventListener("click", function (e) {
  let colorPicker = document.createElement("input");
  colorPicker.classList.add("color-input");
  colorPicker.type = "color";
  colorPicker.click();
  colorPicker.addEventListener("change", function (e) {
    prevselected.style.color = e.target.value;
    let address = prevselected.getAttribute("data-address");
    cellcontroller[address].color = e.target.value;
  });
});

coloricons[1].addEventListener("click", function (e) {
  let colorPicker = document.createElement("input");
  colorPicker.classList.add("color-input");
  colorPicker.type = "color";
  colorPicker.click();

  colorPicker.addEventListener("change", function (e) {
    prevselected.style.backgroundColor = e.target.value;
    let address = prevselected.getAttribute("data-address");
    cellcontroller[address].backgroundColor = e.target.value;
  });
});

alignicons[0].addEventListener("click", function (e) {
  prevselected.style.textAlign = "left";
  let address = prevselected.getAttribute("data-address");
  cellcontroller[address].textAlign = "left";
});

alignicons[1].addEventListener("click", function (e) {
  prevselected.style.textAlign = "center";
  let address = prevselected.getAttribute("data-address");
  cellcontroller[address].textAlign = "center";
});

alignicons[2].addEventListener("click", function (e) {
  prevselected.style.textAlign = "right";
  let address = prevselected.getAttribute("data-address");
  cellcontroller[address].textAlign = "right";
});

fontweighticon.addEventListener("change", function (e) {
  prevselected.style.fontSize = e.target.value + "px";
  let address = prevselected.getAttribute("data-address");
  cellcontroller[address].fontSize = e.target.value;
});

fontfamilyicon.addEventListener("change", function (e) {
  prevselected.style.fontFamily = e.target.value;
  let address = prevselected.getAttribute("data-address");
  cellcontroller[address].fontFamily = e.target.value;
});
