let timeText = document.querySelector(".time-h3");
let offTimeText = document.querySelector(".off-time-h4");
let mainText = document.querySelector("#main-h1");
let highScoreText= document.querySelector(".hs-h3");
let running = false;
let offTime = undefined;

let goalTime = 5.000;
let goalDistance;
let currentTime;
let elapsedTime;
let stopTime;
let startTime;
let highScores = [];


async function grabCookie(){
    try{
        let cook = await document.cookie.match(/highscore=(\d+.\d+)/);
        if(cook != null || cook != undefined){
            highScores.push(cook[1]);
        }
    }
    catch(error){
        console.log("failed");
    }
    offTimeText.classList.add("hidden");
    if(highScores.length == 0){
        highScoreText.classList.remove("hidden");
    }
    else{
        highScoreText.innerText = "Best: "+highScores[0];
    }
}


document.addEventListener("keydown", (e) =>{
    if(e.code == "Space"){
        running = !running;
        
        
        if(running){
            startTimer();
            mainText.innerText = "Stop at exactly 5 seconds";
        }
        if(!running){
            stopTime = Number(timeText.innerText);
            
            offTimeText.classList.remove("hidden");
            highScoreText.classList.remove("hidden");
            mainText.innerText = "Press Space";
            let ot;
            if(goalTime > stopTime){
                ot = goalTime - stopTime;
                offTimeText.innerHTML = `-${ot.toFixed(3)}`
            }
            if(goalTime < stopTime){
                ot = stopTime - goalTime;
                offTimeText.innerHTML = `+${ot.toFixed(3)}`
            }
            if(goalTime == stopTime){
                ot = 0;
                offTimeText.innerHTML = `${ot.toFixed(3)}`
            }
            
            highScores.push(ot.toFixed(3));
            highScores.sort((a, b) => a-b);
            highScoreText.innerText = "Best: "+highScores[0];
            document.cookie="highscore="+highScores[0]+"; SameSite=None; Secure";
        }
    }
});




function updateTimer(){
    if(running){
        currentTime = performance.now();
        elapsedTime = currentTime - startTime;
        
        requestAnimationFrame(updateTimer);
        timeText.innerHTML = (elapsedTime / 1000).toFixed(3);
    }
    if (!running){
        timeText.innerHTML = stopTime;
    }
}

function startTimer(){
    startTime = performance.now();
    requestAnimationFrame(updateTimer)
}

grabCookie();