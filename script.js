let countEl = document.getElementById("count-el");
let saveEl = document.getElementById("savedstuff");
let count = 0;

function increment() {
  count += 1;
  countEl.textContent = count;
}

function save() {
  saveEl.textContent += count + " - ";
  countEl.textContent = 0;
  count = 0;
}
