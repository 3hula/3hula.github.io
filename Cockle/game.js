console.log("Running");

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
        game();
    });


function game(){


    let won = false;
    let choice = Math.floor(Math.random() * 2251)
    console.log(choice);
    let startingWord = validWords[choice -1]
    let lastGuess = startingWord;


   
    let inputField = document.getElementById("input");
    inputField.value = "";
    let gameField = document.getElementById("gameField");
    let infoField = document.getElementById("info");


    let newWord = document.createElement("li");
    newWord.textContent=startingWord;
    gameField.append(newWord);

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

        if (!(validWordsSet.has(guess.toUpperCase()))){
            info.textContent="Must be a valid word!"
            return
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
        
        let newWord = document.createElement("li");
        newWord.textContent=guess.toUpperCase();
        gameField.append(newWord);

        lastGuess = guess;
        console.log(lastGuess);

        if (guess.toLowerCase() == "cock"){
            infoField.textContent = "You won!"
            won = true;
        }
    }


    let inputForm = document.getElementById("inputForm");
    inputForm.addEventListener('submit', function(event){
        event.preventDefault();
        submitGuess();
    })

    
    


};