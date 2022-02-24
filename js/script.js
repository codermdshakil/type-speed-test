
const typingTest = document.querySelector('.typing-test p'),
inpField = document.querySelector('.wrapper .input-field'),
timesTag = document.querySelector('.time span b'),
mistakeTag = document.querySelector('.mistake span'),
wpmTag = document.querySelector('.wpm span'),
cpmTag = document.querySelector('.cpm span'),
tryAgainBtn = document.querySelector('.again-btn');


let timerPromt = prompt("Please! Enter 'Secounds' That you want to Test your type Speed");

let timer,
maxTime = parseInt(timerPromt),
timeLeft = maxTime,
charIndex = mistakes = isTyping = 0;
timesTag.innerText = maxTime;


function randomParagraph(){
    let randomIndex = Math.floor(Math.random() * paragraphs.length);
    typingTest.innerHTML = "";
    paragraphs[randomIndex].split("").forEach(span => {

        let spanTag = `<span>${span}</span>`;
        typingTest.innerHTML += spanTag;
    });
    typingTest.querySelectorAll('span')[0].classList.add('active');
    document.addEventListener('keydown',() => inpField.focus());
    typingTest.addEventListener('click',() => inpField.focus());
}


function initTypying(){
    const characters = typingTest.querySelectorAll('span');
    let typedChr = inpField.value.split('')[charIndex];
   
    if (charIndex < characters.length - 1 && timeLeft > 0) {
        if(!isTyping){
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        if(typedChr == null){
            charIndex--;
            if(characters[charIndex].classList.contains('incurrect')){
    
                mistakes--;
            }
            characters[charIndex].classList.remove('currect','incurrect');
        }
        else{
            
            if(characters[charIndex].innerText === typedChr){
                characters[charIndex].classList.add('currect');
            }
            else{
                mistakes++;
                characters[charIndex].classList.add('incurrect');
            }
            charIndex++;
        }
        
        characters.forEach(span => span.classList.remove('active'));
        characters[charIndex].classList.add('active');
    
        let wpm = Math.round((((charIndex - mistakes ) / 5) / (maxTime - timeLeft)) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm; 
    
    
        mistakeTag.innerText = mistakes;
        wpmTag.innerText =  wpm;
        cpmTag.innerText = charIndex - mistakes;
    }
    else{
        inpField.value = "";
        clearInterval(timer);
    }
}


function initTimer(){
    if (timeLeft > 0) {
        timeLeft--;
        timesTag.innerText = timeLeft;
    }
    else{
        clearInterval(timer);
    }
}

function resetGame(){
    randomParagraph();
    inpField.value = "";
    clearInterval(timer);
    timeLeft = maxTime,
    charIndex = mistakes = isTyping = 0;
    timesTag.innerText = timeLeft;
    mistakeTag.innerText = mistakes;
    wpmTag.innerText = 0;
    cpmTag.innerText = 0;
}
randomParagraph();
inpField.addEventListener('input', initTypying);
tryAgainBtn.addEventListener('click', resetGame);


