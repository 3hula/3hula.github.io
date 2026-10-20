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

    function addPhrase(phrase){
        let container = document.createElement("div");
        container.className = "wordcontainer";
        for (i=0; i<4; i++){
            let el = document.createElement("div");
            el.textContent=phrase[i];

            if (phrase[i] == "COCK"[i]){
                el.className = "boxCorrect";
            }else{
                el.className = "box";
                console.log(phrase);
                console.log(phrase[i]);
                console.log("cock"[i]);
            }

            container.append(el);
            
        }
        gameField.append(container);
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
        
        addPhrase(guess.toUpperCase());

        lastGuess = guess;
        console.log(lastGuess);

        if (guess.toLowerCase() == "cock"){
            infoField.textContent = "You won!"
            won = true;
        }

        inputField.value="";
    }


    let inputForm = document.getElementById("inputForm");
    inputForm.addEventListener('submit', function(event){
        event.preventDefault();
        submitGuess();
    })

    
    


};