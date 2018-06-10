//Declare counters for wins and losses, and declare a variable for the ratio of both
var wins = 0;
var losses = 0;
var winLossRatio = "TBD";
//A reusable string to display them

function getStats(wins, losses){
    document.getElementById("stats").innerHTML = "Wins: " + wins + "<br>" +
    "Losses: " + losses + "<br>";
};    

//User input will be compared to this array, to make sure userGuess is a letter in the alphabet
const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

var startingSpaces = "";

var startingSpacesArray = "";

var incorrectGuess;

var placeholder = " ";

var youWon = "YOU WON!";

var gameOver = "GAME OVER";

var whipCrack = new Audio('assets/audio/whipcrack.mp3');

var cockAndFire = new Audio('assets/audio/cockandfire.mp3');

var cockAndDryFire = new Audio('assets/audio/cockanddryfire.mp3');

var flute = new Audio('assets/audio/flute.mp3')

var horse = new Audio('assets/audio/horse.mp3')



//From FrenchyNZ: https://stackoverflow.com/questions/20276687/html5-video-toggle-mute-on-click
$("#muteMusic").click( function (){
    $("#neoWestern").prop('muted', !$("#neoWestern").prop('muted'));
});

//SVG elements for drawing the hangman
svgArray = 
[
"<rect width='470' height='200' style='fill:white;stroke-width:3;stroke:black;' />",
"<circle cx='400' cy='50' r='30' stroke='black' stroke-width='4' fill='white' />", 
"<line x1='400' y1='79' x2='400' y2='150' stroke='black' stroke-width='4' />",
"<line x1='400' y1='99' x2='350' y2='130' stroke='black' stroke-width='4' />",
"<line x1='400' y1='99' x2='450' y2='130' stroke='black' stroke-width='4' />",
"<line x1='401' y1='149' x2='350' y2='190' stroke='black' stroke-width='4' />",
"<line x1='399' y1='149' x2='450' y2='190' stroke='black' stroke-width='4' />",
"<text x='0' y='15' fill='red'>I WON!</text>",
"<text x='0' y='15' fill='red'>GAME OVER</text>"
];

//This function loads the game HTML
function loadGame(wordResource) {
    //Declare a word
    //The full array of words is in the array.js file
    console.log(wordResource);
    var word = wordResource[Math.floor(Math.random() * wordResource.length)];
    //Make sure it's working
    console.log("The word is: '" + word + "'");

    $(document).off("keypress");

    //From Paolo Bergantino https://stackoverflow.com/users/16417/paolo-bergantino
    $(document).keypress(function(e) {
        if(e.which == 13) {
            check(word);
        }
    });

    //Log the length of the word
    console.log("The length of the word is " + word.length);

    //Delcare a variable for showing the blank spaces
    var nothing = "_";
    console.log(nothing);
    //This variable will look to the length of the word, and use it to build the blank spaces
    startingSpaces = nothing.repeat(word.length);
    //Check how startingSpaces will look
    console.log("The user will see this: " + startingSpaces);
    //Make sure it's a string
    console.log(typeof(startingSpaces));
    //For the purposes of the check() function, we must turn startingSpaces into an array
    //We will do this by splitting the string at each character
    startingSpacesArray = startingSpaces.split("");
    //Make sure it's working
    console.log("Starting spaces array:");
    console.log(startingSpacesArray);

    //Define incorrect guesses counter to '0'
    incorrectGuess = 0;
    //Make sure it's working
    console.log("Incorrect guess counter: " + incorrectGuess); 


console.log(word);

    document.getElementById("gameContent").innerHTML = 
    "<div id='stats'></div>" +
    "<h1 class='center spacing rye white'>HANGMAN</h1>" +
    "<p class='center white'><b><i>" +
    "Guess the word, or else you'll see<br>" +
    "The outlaw swing from the sycamore tree<br>" +
    "You get <span style='text-decoration: underline; color: red;'>six guesses</span>, or roll the dice,<br>" +
    "And guess the whole word, but you can't guess twice." +
    "</i></b></p>"+
    "<h2 class='center rye white'><i>The word is&hellip;</i></h2>" +
    "<h1 class='center spacing rye white' id='word'></h1>" +
    "<div id='hangmanPics'>" + "<svg id='hangman' width='470' height='200'>" + svgArray[incorrectGuess] +  "</svg></div>" +
    "<div id='check'><h4 id='correctOrIncorrect' class='center rye white background-black'>" + placeholder + "</h4>" +
    "<h4 class='center rye white' id='wrongGuessCounter'></h4></div>" + 
    "<div id='textEntry'>" +
    "<h4 class='center white rye'><span id='wrongGuesses'></span><span id='guessesSoFar'></span></h4>" +
    "Your Guess:<input type='text' name='userGuess' size='1' maxlength='1' id='userGuess' autofocus><br>" +
    "I know the word:<input type='text' name='userWordGuess' id='userWordGuess'><br>" +
    "<input type='button' onClick='check(\"" + word + "\")' id='submitButton' name='submit' value='submit'>" +
    "</div>";
    document.getElementById("word").innerHTML = startingSpaces;
    getStats(wins, losses);
    whipCrack.play();
};

//Function check() runs when user clicks the SUBMIT button on the web page
function check(word) {
    //For the purposes of the check() functiion, we must turn the word into an array
    //We will do this by splitting the word at each character
    var wordArray = word.split("");
    //Make sure it's working
    console.log(word + " as an array:");
    console.log(wordArray);
    //Re-focus the text input
    document.getElementById("userGuess").focus();
    //Get the value of what user entered into text field, and convert it to lower case
    var userGuess = document.getElementById("userGuess").value.toLowerCase();
    //Get the value of userWordGuess, and convert it to lower case
    var userWordGuess = document.getElementById("userWordGuess").value.toLowerCase();
    //After entered value has been obtained, clear both input text fields
    document.getElementById("userGuess").value = "";
    document.getElementById("userWordGuess").value = "";
    //Make sure it's working 
    console.log("The user guessed: " + userGuess);
    //Make sure the user entered a string
    console.log(userGuess + " is a " + (typeof(userGuess)));

    //Get userWordGuess out of the way
    if ((userGuess === "") && (userWordGuess === word)) {
            outcome(word, youWon);
            horse.play();
    } else if ((userGuess === "") && (userWordGuess !== "") && (userWordGuess !== word)) {
            outcome(word, gameOver);
            flute.play();
    //This is where you start to weed out all inputs that are not letters in the alphabet
    } else if (alphabet.includes(userGuess) === false) {
        correctOrIncorrect("Sorry, Charlie, if you wanna play, it's gotta be a letter");
        console.log("User input is not a letter in the alphabet");
    //Now that's out of the way, we can get down to business...
    //If user input is a letter in the word, reveal the guessed letters in the word
    //If user input is not a letter in the word, add to the 'incorrect guess' counter
    } else if (word.includes(userGuess)) {
        //Make sure user input is included in the word string
        console.log("userGuess is a letter in the alphabet? " + (alphabet.includes(userGuess)));
        //Show the user that they made a correct answer, using the correctOrIncorrect function from earlier
        correctOrIncorrect("Way to go! You guessed a letter!");
        cockAndFire.play();
        //Run a for-loop that compares the user guess against all indices in the array 
        for (i = 0; i <= word.length; i++) {
	
            if (wordArray[i] === userGuess) {
        
            //Replace value at index "i" of array with userGuess
            startingSpacesArray[i] = userGuess;	
            //Make sure letter has been added to array
            console.log("startingSpacesArray now looks like this: " + startingSpacesArray);
            //Turn array into a string using the .join method, but with nothing ("") as the separator, instead of commas
            var newString = startingSpacesArray.join("");
            //Make sure the string works
            console.log("The user will see this: " + newString);
            //Add new string to the web page, where startingSpaces used to sit
            document.getElementById("word").innerHTML = newString;
            //If user has guessed all the letters correctly, print a YOU WIN screen
            if (newString === word)  {
                outcome(word, youWon);
                horse.play();
            }
            }
        }
    //A player loses hangman after six wrong guesses: head, body, two arms, and two legs
    //Using the incorrectGuess variable defined earlier, this else-if will keep adding to the variable. 
    //After six wrong guesses, the entire web page is overwritten with a "GAME OVER" screen 
    } else if (word.includes(userGuess) === false) {
        //Make sure it's working
        console.log("userGuess is included in the word? " + false);
        //Show the user that they made a correct answer, using the correctOrIncorrect function from earlier
        correctOrIncorrect("Tough luck, Chuck, you guessed wrong&hellip;");
        cockAndDryFire.play();
        //Add to the incorrectGuess variable
        incorrectGuess++;
        document.getElementById("hangman").innerHTML += svgArray[incorrectGuess];
        //Log how many incorrect guesses there have been
        console.log("# of incorrect guesses= " + incorrectGuess + "/6");
        //Display wrong guesses to user, against how many guesses they have (6)
        document.getElementById("wrongGuessCounter").innerHTML = "Number of wrong guesses: <b>" + incorrectGuess + " / 6</b>";
        //Show prior wrong guesses
        document.getElementById("wrongGuesses").innerHTML = "Your wrong guesses so far: "
        document.getElementById("guessesSoFar").innerHTML += userGuess + " ";
        //Once the counter reaches 6, the game over screen is triggered
            if (incorrectGuess >= 6) {
               outcome(word, gameOver);
               flute.play();
            }    
    }
};

//This function will be used to tell the user if their guess was correct or incorrect
function correctOrIncorrect(string) {
    document.getElementById("correctOrIncorrect").innerHTML = string;
};

function outcome(word, x) {

    var winOrLoss;
    var j;

    if (x === youWon) {
        wins++;
        console.log(wins);
        winOrLoss = "YOU WON!";
        j = 7;
        console.log("You won!");
    } else if (x === gameOver) {
        losses++;
        console.log(losses);
        winOrLoss = "GAME OVER";
        j = 8;
        console.log("GAME OVER");
    };

    document.getElementById("gameContent").innerHTML = 
    "<div id='stats'></div>" +
    "<div id='hangmanPics'><svg id='hangman' width='470' height='200'></svg></div>" +
    "<h1 class='white center rye'>" + winOrLoss + "<br>" + 
    "The word was '" + word + "'<br>" +  
    "<input type='button' onClick='loadGame(wordResource)' name='loadGame' id='loadGame' value='Play again, pilgrim?'>";

    for (i = 0; i <= 6; i++) {
        document.getElementById("hangman").innerHTML += svgArray[i];
        document.getElementById("hangman").innerHTML += svgArray[j];
    } 

    getStats(wins, losses);
    
    $(document).off("keypress");

    //From Paolo Bergantino https://stackoverflow.com/users/16417/paolo-bergantino
    $(document).keypress(function(e) {
        if(e.which == 13) {
            loadGame(wordResource);
        }
    });

    console.log(wordResource.length);
    wordResource.splice(wordResource.indexOf(word), 1);
    console.log(wordResource.length);

};

