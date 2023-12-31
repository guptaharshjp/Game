score = 0;
cross = true;

audio = new Audio('image/music.mp3');
audiogo = new Audio('image/gameover.mp3');
setTimeout(() => {
    audio.play()
}, 1000);
document.onkeydown = function (e) {
    console.log("Key code is: ", e.keyCode) 
    if (e.keyCode == 38) {  //up arrow ka key code 38
        dino = document.querySelector('.dino'); //vo element jiski class dino hain
        dino.classList.add('animateDino'); //class a=ka nam animate dino and jb animate hoga to kudega
        setTimeout(() => {        // ek bar us krenge ke bad wapas use krne ke liye apna timer set kr rah ehain 700 mili sec 
            dino.classList.remove('animateDino')
        }, 700);
    }
    if (e.keyCode == 39) {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX + 112 + "px";
    }
    if (e.keyCode == 37) {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX - 112) + "px";
    }
}

setInterval(() => { // kuch interval tk krte rahe takrna check krega
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));
// values check krne ke liye window.get is used 
    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));
// difference calculate kr rahe hain
    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);
    // console.log(offsetX, offsetY)
    if (offsetX < 73 && offsetY < 52) {
        gameOver.style.visibility='visible';
        gameOver.innerHTML = "Game Over - Reload to Play Again"
        obstacle.classList.remove('obstacleAni')
        audiogo.play();
        setTimeout(() => {    
            audiogo.pause();  // mrne ke bad pause
            audio.pause();   // audio of game bnd
        }, 1000);
    }
    // nhi takrate hain to
    else if (offsetX < 145 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
            console.log('New animation duration: ', newDur)
        }, 500); // 500 mili second bad yeh krna hain

    }

}, 10);

function updateScore(score)  {
    scoreCont.innerHTML = "Your Score: " + score
}