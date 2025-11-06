let countEl = document.getElementById("count-el");
let saveEl = document.getElementById("savedstuff");
let clickSound = document.getElementById("click-sound");
let dhikrSelect = document.getElementById("dhikr-select");
let customDhikrInput = document.getElementById("custom-dhikr");
let dhikrName = document.getElementById("dhikr-name");
let goalInput = document.getElementById("goal-input");
let goalDisplay = document.getElementById("goal-display");
let message = document.getElementById("message");

let count = 0;
let goal = 0;

// 💖 Handle dhikr selection
dhikrSelect.addEventListener("change", function() {
  if (this.value === "custom") {
    customDhikrInput.style.display = "block";
    dhikrName.textContent = "";
  } else {
    customDhikrInput.style.display = "none";
    dhikrName.textContent = this.value;
  }
});

customDhikrInput.addEventListener("input", function() {
  dhikrName.textContent = this.value || "";
});

// 🌸 Increment tasbih count
function increment() {
  count++;
  countEl.textContent = count;

  clickSound.currentTime = 0;
  clickSound.play();

  if (navigator.vibrate) navigator.vibrate(40);

  if (goal > 0 && count >= goal) {
    message.textContent = `🌸 MashaAllah Jeanna! You reached your goal of ${goal}!`;
  } else {
    message.textContent = "";
  }
}

// 💙 Save current count
function save() {
  saveEl.textContent += count + " - ";
  countEl.textContent = 0;
  count = 0;
  if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
}

// 🔁 Reset everything
function resetCount() {
  count = 0;
  countEl.textContent = "0";
  message.textContent = "";
  saveEl.textContent = "Saved before: ";
  if (navigator.vibrate) navigator.vibrate(100);
}

// 🎯 Set goal
goalInput.addEventListener("change", function() {
  goal = parseInt(this.value);
  if (!isNaN(goal) && goal > 0) {
    goalDisplay.textContent = `Goal: ${goal}`;
  } else {
    goalDisplay.textContent = "";
  }
});

// 💞 Floating hearts background
const heartsContainer = document.querySelector(".hearts-container");

function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.textContent = "💖";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = Math.random() * 20 + 10 + "px";
  heart.style.animationDuration = Math.random() * 4 + 3 + "s";
  heartsContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 7000);
}

setInterval(createHeart, 600);
