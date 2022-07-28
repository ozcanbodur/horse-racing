const startRaceBtn = document.getElementById("start-race");

const horse1 = document.getElementById("horse1");
const horse2 = document.getElementById("horse2");
const horse3 = document.getElementById("horse3");

const resultHorse1 = document.getElementById("result-horse1");
const resultHorse2 = document.getElementById("result-horse2");
const resultHorse3 = document.getElementById("result-horse3");

const racerRadioElements = document.querySelectorAll('input[name="racer"]');
const minRandom = 1;
const maxRandom = 10;

const maxPercentWidth = 90;

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function startRace(selectedBet) {
  let racer1 = 0;
  let racer2 = 0;
  let racer3 = 0;

  let racer1NumberOf = 0;
  let racer2NumberOf = 0;
  let racer3NumberOf = 0;

  const race = setInterval(function () {
    racer1 = randomInt(minRandom, maxRandom) + racer1;
    racer2 = randomInt(minRandom, maxRandom) + racer2;
    racer3 = randomInt(minRandom, maxRandom) + racer3;

    if (maxPercentWidth <= racer1) racer1 = maxPercentWidth;
    if (maxPercentWidth <= racer2) racer2 = maxPercentWidth;
    if (maxPercentWidth <= racer3) racer3 = maxPercentWidth;
  }, 1000);

  const raceControl = setInterval(function () {
    horse1.style.left = `${racer1}%`;
    horse2.style.left = `${racer2}%`;
    horse3.style.left = `${racer3}%`;

  
    if (
      maxPercentWidth <= racer1 &&
      maxPercentWidth <= racer2 &&
      maxPercentWidth <= racer3
    ) {
      horse1.style.left = `${maxPercentWidth}%`;
      horse2.style.left = `${maxPercentWidth}%`;
      horse3.style.left = `${maxPercentWidth}%`;
      clearInterval(race);
      clearInterval(raceControl);


      setTimeout(() => {
        if (
          (Number(racer1NumberOf) === 1 && Number(selectedBet) === 1) ||
          (Number(racer2NumberOf) === 1 && Number(selectedBet) === 2) ||
          (Number(racer3NumberOf) === 1 && Number(selectedBet) === 3)
        ) 
          alert("You Won!");
        
        if (
          (Number(racer1NumberOf) === 2 && Number(selectedBet) === 1) ||
          (Number(racer2NumberOf) === 2 && Number(selectedBet) === 2) ||
          (Number(racer3NumberOf) === 2 && Number(selectedBet) === 3)
        ) 
        alert("You're so close! 2.");
         if (
          (Number(racer1NumberOf) === 3 && Number(selectedBet) === 1) ||
          (Number(racer2NumberOf) === 3 && Number(selectedBet) === 2) ||
          (Number(racer3NumberOf) === 3 && Number(selectedBet) === 3)
        ) 
        alert("You Lose :(");
      }, 200);

      // clear;
      setTimeout(() => {
        horse1.style.left = `0%`;
        horse2.style.left = `0%`;
        horse3.style.left = `0%`;
        startRaceBtn.disabled = false;

        resultHorse1.innerText = "";
        resultHorse2.innerText = "";
        resultHorse3.innerText = "";

        document.querySelector('input[name="racer"]:checked').checked = false;
        racerRadioElements.forEach((r) => (r.disabled = false));
      }, 2000);
    }

    if (maxPercentWidth <= racer1 && racer1NumberOf == 0) {

      if (racer2NumberOf === 0 && racer3NumberOf === 0) racer1NumberOf = 1;
      else if (racer2NumberOf > 0 && racer3NumberOf > 0) racer1NumberOf = 3;
      else racer1NumberOf = 2;

      resultHorse1.innerText = racer1NumberOf.toString();
    }

    if (maxPercentWidth <= racer2 && racer2NumberOf == 0) {
  
      if (racer1NumberOf === 0 && racer3NumberOf === 0) racer2NumberOf = 1;
      else if (racer1NumberOf > 0 && racer3NumberOf > 0) racer2NumberOf = 3;
      else racer2NumberOf = 2;

      resultHorse2.innerText = racer2NumberOf.toString();
    }

    if (maxPercentWidth <= racer3 && racer3NumberOf == 0) {
    
      if (racer1NumberOf === 0 && racer2NumberOf === 0) racer3NumberOf = 1;
      else if (racer1NumberOf > 0 && racer2NumberOf > 0) racer3NumberOf = 3;
      else racer3NumberOf = 2;

      resultHorse3.innerText = racer3NumberOf.toString();
    }
  }, 500);
}

startRaceBtn.addEventListener("click", function () {
  const racerChecked = document.querySelector('input[name="racer"]:checked');
  if (!racerChecked) {
    alert("Lütfen yarışcı seçiniz.");
    return;
  }

  racerRadioElements.forEach((r) => (r.disabled = true));
  startRaceBtn.disabled = true;
  startRace(racerChecked.value);
});

function checkWinners() {}
