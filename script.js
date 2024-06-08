const boy = document.getElementById("boy");
const background = document.getElementById("background");

let index = 1;
let idleAnimationnumber = 0;

function idleAnimation() {
  index++;
  if (index == 11) {
    index = 1;
  }

  //console.log(index);
  boy.src = `resourses/png/Idle (${index}).png`;
}

function startAnimation() {
  idleAnimationnumber = setInterval(idleAnimation, 195);
}

let runAnimationNumber = 0;
let runImageNumber = 1;

function runAnimation() {
  runImageNumber++;
  if (runImageNumber == 11) {
    runImageNumber = 1;
  }
  boy.src = `resourses/png/Run (${runImageNumber}).png`;
}

function runAnimationStat() {
  runAnimationNumber = setInterval(runAnimation, 150);
  clearInterval(idleAnimationnumber);
}

function keyCheak(event) {
  //console.log(event.which)
  keyCode = event.which;
  if (keyCode == 13) {
    if (runAnimationNumber == 0) {
      runAnimationStat();
    }
    if (moveBackgroundAnimationId == 0) {
      moveBackgroundAnimationId = setInterval(moveBackground, 40);
    }
    if (boxAnimationId == 0) {
      boxAnimationId = setInterval(boxAnimation, 100);
    }
  }

  if (keyCode == 32) {
    if (jumpAnimationNumber == 0) {
      jumpAnimationStat();
    }
    if (moveBackgroundAnimationId == 0) {
      moveBackgroundAnimationId = setInterval(moveBackground, 40);
    }
  }
  if (boxAnimationId == 0) {
    boxAnimationId = setInterval(boxAnimation, 100);
  }
}

let backgroundImagePositionX = 0;
let moveBackgroundAnimationId = 0;

let score = 0;

function moveBackground() {
  backgroundImagePositionX = backgroundImagePositionX - 10;

  background.style.backgroundPositionX = backgroundImagePositionX + "px";

  score = score + 1;
  document.getElementById("score").innerHTML = score;
}

let jumpAnimationNumber = 0;
let jumpImageNumber = 1;
let boyMarginTop = 482;

function jumpAnimation() {
  jumpImageNumber++;

  if (jumpImageNumber <= 6) {
    boyMarginTop = boyMarginTop - 35;
    boy.style.marginTop = boyMarginTop + "px";
  }

  if (jumpImageNumber >= 7) {
    boyMarginTop = boyMarginTop + 35;
    boy.style.marginTop = boyMarginTop + "px";
  }

  if (jumpImageNumber == 11) {
    jumpImageNumber = 1;
    clearInterval(jumpAnimationNumber);
    jumpAnimationNumber = 0;
    runImageNumber = 0;
    runAnimationStat();
  }
  boy.src = `resourses/png/Jump (${jumpImageNumber}).png`;
}

function jumpAnimationStat() {
  clearInterval(idleAnimationnumber);
  runImageNumber = 0;
  clearInterval(runAnimationNumber);

  let aud = document.createElement("audio");
  aud.src = "resourses/jumping-sound.mp3";
  aud.play();

  jumpAnimationNumber = setInterval(jumpAnimation, 150);
}

let boxMargin = 1500;

function createBoxes() {
  for (let i = 0; i < 100; i++) {
    let box = document.createElement("div");
    box.className = "box";
    document.getElementById("background").appendChild(box);
    box.style.marginLeft = boxMargin + "px";
    box.id = "box" + i;

    if (i < 5) {
      boxMargin = boxMargin + 2000;
    }
    if (i >= 5) {
      boxMargin = boxMargin + 1000;
    }
    if (i >= 20) {
      boxMargin = boxMargin + 850;
    }
  }
}

let boxAnimationId = 0;

function boxAnimation() {
  for (let i = 0; i < 100; i++) {
    let box = document.getElementById("box" + i);
    let currentMarginLeft = getComputedStyle(box).marginLeft;
    let newMarginLeft = parseInt(currentMarginLeft) - 35;
    box.style.marginLeft = newMarginLeft + "px";

    if ((newMarginLeft >= -110) & (newMarginLeft <= 100)) {
      if (boyMarginTop > 480) {
        clearInterval(boxAnimationId);

        clearInterval(runAnimationNumber);
        runAnimationNumber = -1;
        clearInterval(jumpAnimationNumber);
        jumpAnimationNumber = -1;

        clearInterval(moveBackgroundAnimationId);
        moveBackgroundAnimationId = -1;

        let aud = document.createElement("audio");
        aud.src = "resourses/dead-sound.mp3";
        aud.play();

        deadAnimationNumber = setInterval(boyDeathAnimation, 100);
      }
    }
  }
}
let deadAnimationNumber = 0;
let deadImageNumber = 1;

function boyDeathAnimation() {
  deadImageNumber++;

  if (deadImageNumber == 10) {
    let aud = document.createElement("audio");
    aud.src = "resourses/game-end-sound.wav";
    aud.play();
  }

  if (deadImageNumber == 11) {
    document.getElementById("end").style.visibility = "visible";
    document.getElementById("endScore").innerHTML = score;

    deadImageNumber = 10;
  }

  boy.src = `resourses/png/Dead (${deadImageNumber}).png`;
}

function reload() {
  location.reload();
}

function gameStart() {
  document.getElementById("startBackground").style.visibility = "hidden";
  document.getElementById("boy").style.padding = 0;
  createBoxes();
}
