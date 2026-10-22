function mulberry32(a) {
    return function() {
      var t = a += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}






//fetch dictionary data 
let validWords;
let validWordsSet;
fetch("words.txt")
    .then(function(response){
        return response.text();
    })
    .then(function(data){
        validWords = data.split("\r\n");
        validWordsSet = new Set(validWords);

        //Check if user already won today's game
        const lastGame = localStorage.getItem("gameWon");
        const lastGameSaveData = JSON.parse(lastGame);

        game(lastGameSaveData);


    });



function game(data){


    let won = false;
    let tries = 0;
    let gameArray = [];
    let guesses = [];

    //Calculate Time passage
    const constantDate = Date.UTC(2026, 2, 1);
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const todayUTC = Date.UTC(year, month, date);
    const elapsedTime = (todayUTC - constantDate) / 86400000;
    

    const random = mulberry32(elapsedTime);
    const randomResult = Math.floor(random() * 7185);

    let startingWord = validWords[randomResult]
    startingWord = startingWord.toUpperCase();
    let lastGuess = startingWord;


   
    let inputField = document.getElementById("input");
    inputField.value = "";
    let gameField = document.getElementById("gameField");
    let infoField = document.getElementById("info");

    



    function addPhrase(phrase){
        let row = [];
        let container = document.createElement("div");
        container.className = "wordcontainer";
        for (i=0; i<4; i++){
            let el = document.createElement("div");
            el.textContent=phrase[i];

            if (phrase[i] == "COCK"[i]){
                el.className = "boxCorrect";
                row.push('🟩');
            }else{
                el.className = "box";
                row.push('⬛');
            }

            container.append(el);
            
        }
        gameField.append(container);
        gameArray.push(row.join(""));
   
    }

    addPhrase(startingWord);

    function submitGuess(){

        
        
        if (won == true){
            return
        }

        info.textContent="";
        let guess = inputField.value;
        if (!(typeof(guess) == "string")){
            info.textContent="Guess must be a string!"
            return
        }

        if (!(guess.length == 4)){
            info.textContent="Guess must be 4 characters long!"
            return
        }

        if (!(validWordsSet.has(guess.toLowerCase()))){
            if (!(guess.toUpperCase() == "COCK")){
                info.textContent="Must be a valid word!"
                return
            }
        }

        //Check that new word differs by only 1
        let totalDiff = 0;
        for (i = 0; i<4; i++){
            
            if (guess.toLowerCase()[i] != lastGuess.toLowerCase()[i]){
                totalDiff +=1;
            }

            if (totalDiff > 1){
                info.textContent="Guess must differ by one character!"
                return
            }
        }
        
        addPhrase(guess.toUpperCase());
        guesses.push(guess.toUpperCase());

        lastGuess = guess;

        tries+=1;

        if (guess.toLowerCase() == "cock"){
            infoField.textContent = "You won!"
            won = true;

            //Copy to clipbaord fucntion
            function copyToClipboard(text){
                navigator.clipboard.writeText(text);
            };

            //add button to copy score
            let copyButton = document.createElement("button");
            copyButton.onclick = () => {
                copyToClipboard("Won in " + tries + "\n\n" + gameArray.join("\n") + "\n\n" +  "Play Cockle at https://3hula.github.io/Cockle/")}; 
            copyButton.textContent = "Copy Result";
            document.body.append(copyButton);

            //Save to localstorage

            const saveData = {
                seed: elapsedTime,
                tries: tries,
                guesses: guesses

            };
            localStorage.setItem("gameWon", JSON.stringify(saveData));
        }

        inputField.value="";
        

        
    }


    let inputForm = document.getElementById("inputForm");
    inputForm.addEventListener('submit', function(event){
        event.preventDefault();
        submitGuess();
    })

    if(data){
        if (data.seed == elapsedTime){
            infoField.textContent = "You won!"
            won = true;

            //Copy to clipbaord fucntion
            function copyToClipboard(text){
                navigator.clipboard.writeText(text);
            };

            //add button to copy score
            let copyButton = document.createElement("button");
            copyButton.onclick = () => {
                copyToClipboard("Won in " + data.tries + "\n\n" + gameArray.join("\n") + "\n\n" +  "Play Cockle at https://3hula.github.io/Cockle/")}; 
            copyButton.textContent = "Copy Result";
            document.body.append(copyButton);

            for(let i=0; i<data.tries+1 ;i++){
                
                addPhrase(data.guesses[i]);
            }


            return
        }

    }
    


};