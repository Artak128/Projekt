///////////// Data //////

// let newDate = new Date();

let history =[
    {gameID: 25,
      time: 25,  
      },
] 

let data = {
  item1: 0,
  item2: 0,
  item3: 0,
  item4: 0,
  item5: 0,
  item6: 0,
  item7: 0,
  item8: 0,
  item9: 0,
  item10: 0,
  item11: 0,
  item12: 0,
  item13: 0,
  item14: 0,
  item15: 0,
  item16: 0,
  winCount: 0,
  gamerID: 0,
  gameOverTime: 0,
};

let condition = false;
let index = 0;
let prevoius = "";

////////// Function //////////

function generateRandom(min = 1, max = 10) {
  let rand = Math.random();
  rand = Math.floor(rand * (max - min));
  rand = rand + min;
  return rand;
}

function setNumbers() {
  let numbers = [];
  let items = [];
  let index = 0;

  while (numbers.length < 8) {
    let index = true;
    let num = generateRandom(1, 20);
    numbers.forEach((i) => {
      if (i === num) {
        index = false;
      }
    });
    if (index) numbers.push(num);
  }

  while (items.length < 16) {
    let index = true;
    let num = generateRandom(1, 17);
    items.forEach((i) => {
      if (i === num) {
        index = false;
      }
    });
    if (index) items.push(num);
  }

  for (let i = 0; i < numbers.length; i++) {
    document.querySelector(`#item${items[index]}`).textContent = numbers[i];
    data[`item${items[index]}`] = numbers[i];
    index += 1;
    document.querySelector(`#item${items[index]}`).textContent = numbers[i];
    data[`item${items[index]}`] = numbers[i];
    index += 1;
  }
}

function clearAllNumbers() {
  for (let i = 1; i < 17; i++) {
    document.querySelector(`#item${i}`).innerHTML = "";
  }
}

function checkWinner() {
  if (data.winCount === 16) {
    document.querySelector(".game").classList.add("hidden");
    document.querySelector(".gameOver").classList.remove("hidden");
    let d = new Date();
    data.gameOverTime = d.getTime();
    document.querySelector("#time").textContent = Math.round(
      (data.gameOverTime - data.gamerID) / 1000
    );
    document.querySelector("#gameId").textContent = data.gamerID;
    let obj = {};
    obj.gameID =  data.gamerID;
    obj.time =  Math.round((data.gameOverTime - data.gamerID) / 1000);
    history.push(obj);
    console.log('winn')
    uploadHistory();
  }
}

function uploadHistory() {
  localStorage.setItem("history", JSON.stringify(history));
}
function downlaodHistory() {
    localStorage.getItem('history') && (history = JSON.parse(localStorage.getItem("history")));
   
}

function renderHistory() {
    console.log(history);
    if(history.length){
        history.forEach( i =>{
           let tr = `<tr><td>${i.gameID}</td><td>${i.time}</td></tr>`;
           document.querySelector("table").insertAdjacentHTML("beforeend", tr);
        })
    }
}

downlaodHistory();

////////// ADDEVENT //////////

document.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON" && e.target.name === "newGame") {
    let d = new Date();
    data.gamerID = d.getTime();
    document.querySelector(".menu").classList.add("hidden");
    document.querySelector(".game").classList.remove("hidden");
    setNumbers();
    setTimeout(() => {
      clearAllNumbers();
    }, 3000);
  }
});

document.addEventListener("click", (e) => {
  if (e.target.parentElement.classList.contains("game") && !condition) {
    e.target.textContent = data[`${e.target.id}`];
    index = data[`${e.target.id}`];
    prevoius = e.target.id;
    condition = true;
    return;
  }
  if (e.target.parentElement.classList.contains("game") && condition) {
      console.log(456)
    if (index === data[`${e.target.id}`]) {
      e.target.textContent = data[`${e.target.id}`];
      e.target.classList.add("border");
      document.querySelector(`#${prevoius}`).classList.add("border");
      condition = false;
      index = 0;
      prevoius = "";
      data.winCount += 2;
      checkWinner();
    } else {
        document.querySelector(`#${prevoius}`).textContent = "";
        condition = false;
        index = 0;
        prevoius = "";
      }
  } 
});

document.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON" && e.target.name === "history") {
    document.querySelector(".menu").classList.add("hidden");
    document.querySelector(".history").classList.remove("hidden");
    renderHistory();
  }
});


