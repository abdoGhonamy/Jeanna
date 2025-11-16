emailjs.init("UprSMxuue-RFFCnHr");
emailjs.send("service_xxxxxx", "template_iewffas", {
    from_name: "Jeanna’s Tasbih 💞",
    dhikr_name: "jeanna Entered",
    count: "unkown"
  })
  .then(() => {
    
  })
  .catch((error) => {
    
  });
const countEl=document.getElementById("count-el");
const saveEl=document.getElementById("savedstuff");
const dhikrSelect=document.getElementById("dhikr-select");
const customDhikrInput=document.getElementById("custom-dhikr");
const dhikrName=document.getElementById("dhikr-name");
const goalInput=document.getElementById("goal-input");
const progressBar=document.getElementById("progress-bar");
const btnIncrement=document.getElementById("btnIncrement");
const btnSave=document.getElementById("btnSave");
const btnReset=document.getElementById("btnReset");
const clickSound=document.getElementById("click-sound");
const goalSound=document.getElementById("goal-sound");
const heartsContainer=document.querySelector(".hearts-container");
const loveNote=document.getElementById("love-note");
const themeToggle=document.getElementById("themeToggle");
const muteBtn=document.getElementById("muteToggle");
const message=document.getElementById("message");

let count=0,goal=0,isMuted=false;
const LS_KEYS={count:"jt_count",goal:"jt_goal",dhikr:"jt_dhikr",saved:"jt_saved",theme:"jt_theme",muted:"jt_muted"};

function loadState(){
  count=parseInt(localStorage.getItem(LS_KEYS.count))||0;
  goal=parseInt(localStorage.getItem(LS_KEYS.goal))||0;
  countEl.textContent=count;
  dhikrName.textContent=localStorage.getItem(LS_KEYS.dhikr)||dhikrSelect.value;
  isMuted=localStorage.getItem(LS_KEYS.muted)==="true";
  muteBtn.textContent=isMuted?"🔇":"🔊";
  updateProgress();
}
loadState();

themeToggle.addEventListener("click",()=>{
  const current=document.documentElement.getAttribute("data-theme");
  const next=current==="dark"?"light":"dark";
  document.documentElement.setAttribute("data-theme",next);
  localStorage.setItem(LS_KEYS.theme,next);
});

muteBtn.addEventListener("click",()=>{
  isMuted=!isMuted;
  localStorage.setItem(LS_KEYS.muted,isMuted);
  muteBtn.textContent=isMuted?"🔇":"🔊";
});

function playClick(){if(isMuted)return; try{clickSound.currentTime=0; clickSound.play().catch(()=>{});}catch(e){}}
function playGoal(){if(isMuted)return; try{goalSound.currentTime=0; goalSound.play().catch(()=>{});}catch(e){}}

function createHeart(){
  const heart=document.createElement("div");
  heart.className="heart";
  heart.textContent="💖";
  heart.style.left=(Math.random()*80+10)+"vw";
  heart.style.fontSize=(Math.random()*18+14)+"px";
  heart.style.animationDuration=(Math.random()*2+3)+"s";
  const colors=["var(--hearts-color-1)","var(--hearts-color-2)","var(--hearts-color-3)"];
  heart.style.color=colors[Math.floor(Math.random()*colors.length)];
  heartsContainer.appendChild(heart);
  setTimeout(()=>heart.remove(),8000);
}

const notes=["Thinking of you 💞","Counting with love 💗","You make my heart flutter 💖","Forever yours 💘"];
function showLoveNote(){
  const note=notes[Math.floor(Math.random()*notes.length)];
  loveNote.textContent=note;
  loveNote.style.opacity=1;
  setTimeout(()=>loveNote.style.opacity=0,2500);
}

function updateProgress(){progressBar.style.width=(goal>0?Math.min((count/goal)*100,100):0)+"%";}

btnIncrement.addEventListener("click",()=>{
  count++;
  countEl.textContent=count;
  updateProgress();
  playClick();
  createHeart();
  showLoveNote();
  progressBar.classList.add("glow");
  setTimeout(()=>progressBar.classList.remove("glow"),200);
  if(goal>0 && count>=goal){playGoal(); messageGoal();}
});

btnSave.addEventListener("click",()=>{
  const dhikr=dhikrName.textContent;
  const savedCount=count;
  saveEl.textContent=(saveEl.textContent==="Saved before:"||!saveEl.textContent)?`Saved before: ${savedCount}`:`${saveEl.textContent} - ${savedCount}`;
  localStorage.setItem(LS_KEYS.saved,saveEl.textContent);
  count=0; countEl.textContent="0"; updateProgress();
  if(navigator.vibrate) navigator.vibrate([100,50,100]);
});

btnReset.addEventListener("click",()=>{
  count=0; countEl.textContent="0"; saveEl.textContent="Saved before:";
  localStorage.removeItem(LS_KEYS.count); localStorage.removeItem(LS_KEYS.saved);
  updateProgress();
});

dhikrSelect.addEventListener("change",()=>{
  if(dhikrSelect.value==="custom"){customDhikrInput.style.display="block"; dhikrName.textContent=customDhikrInput.value||"";}
  else{customDhikrInput.style.display="none"; dhikrName.textContent=dhikrSelect.value;}
  localStorage.setItem(LS_KEYS.dhikr, dhikrName.textContent);
});

customDhikrInput.addEventListener("input",()=>{
  dhikrName.textContent=customDhikrInput.value;
  localStorage.setItem(LS_KEYS.dhikr, customDhikrInput.value);
});

goalInput.addEventListener("change",()=>{
  goal=parseInt(goalInput.value)||0;
  localStorage.setItem(LS_KEYS.goal, goal);
  updateProgress();
});

function messageGoal(){message.textContent="💖 MashaAllah, Jeanna! You reached your goal! 💖"; setTimeout(()=>message.textContent="",4000);}
