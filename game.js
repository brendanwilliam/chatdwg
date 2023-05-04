let gameModeElements = document.querySelectorAll(".gameMode-element");
let gameModeMainContents = document.querySelectorAll(".mainContent");
let burgerMenuButtons = document.querySelectorAll(".burgerMenuIcon");

let spotTheBotScoreHuman = 0;
let spotTheBotScoreRobot = 0;

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
/*
function shuffleArray(arr) {
    let currentIndex = arr.length,
        randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [arr[currentIndex], arr[randomIndex]] = [
            arr[randomIndex], arr[currentIndex]
        ];
    }

    return arr;
}*/

function selectGameMode(element) {
    for (let i = 0; i < gameModeElements.length; i++) {
        let gameModeElement = gameModeElements[i];
        let gameModeMainContent = gameModeMainContents[i];
        gameModeElement.classList.remove("selected");
        gameModeMainContent.classList.add("hiddenMainContent");
        if (element == gameModeElement) {
            element.classList.add("selected");
            //show the game content corresponding to this tab
            gameModeMainContent.classList.remove("hiddenMainContent");
            //Reset this game mode
            let titlePageElement = gameModeMainContent.querySelector(".titlePage");
            let userInputPage = gameModeMainContent.querySelector(".userInputPage");
            let endPage = gameModeMainContent.querySelector(".endingPage");
            titlePageElement.classList.remove("hidden");
            userInputPage.classList.add("hidden");
            endPage.classList.add("hidden");
        }
    }
}
for (let [index, element] of gameModeElements.entries()) {
    element.addEventListener("click", () => {
        if (window.innerWidth < 800) {
            document.getElementById("sideMenu").style.display = "none";
        }
        //Don't try to select the tab if we are already selected
        //if (!element.classList.contains("selected")) {
        selectGameMode(element);
        //}

    });
    let currentTabIndex = [...gameModeElements].indexOf(element);
    //Set each respective button should start its respective game
    let titlePageElement = gameModeMainContents[currentTabIndex].querySelector(".titlePage");
    let userInputPage = gameModeMainContents[currentTabIndex].querySelector(".userInputPage");

    //Begin is clicked here
    titlePageElement.querySelector("button").addEventListener("click", () => {

        function loadPageVisuals() {
            titlePageElement.classList.add("hidden");
            userInputPage.classList.remove("hidden");
        }

        switch (index) {
            case 0:
                {
                    //This is Spot The Bot
                    fetch("./data/spotTheBot.json")
                    .then((response) => {
                        return response.json();
                    })
                    .then((questionsData) => {
                        //console.log(questionsData);
                        //Shuffle both the questions and answers coming from the .json database file
                        // let tempArray = [
                        //     { q: "q", a: [0, 1, 2] },
                        //     { q: "r", a: [0, 1, 2] },
                        //     { q: "s", a: [0, 1, 2] },
                        // ];
                        // console.log(tempArray);
                        // tempArray = shuffleArray(tempArray);
                        // console.log(tempArray);
                        let shuffledQuestionsData = shuffleArray(questionsData);

                        for (let i = 0; i < shuffledQuestionsData.length; i++) {
                            shuffledQuestionsData[i]["answers"] = shuffleArray(shuffledQuestionsData[i]["answers"]);
                        }
                        //After we have access to the database

                        //Populate all data into bubbles
                        let spotCardsContainer = userInputPage.querySelector("#spotCardsContainer");
                        let spotTheBotNextButton = userInputPage.querySelector("#spotTheBotNextButton");

                        function updateScoreUI() {
                            let humanScoreContainer = document.querySelector(".userInputPage #scoreCardContainer .scoreCard #humanScore");
                            let robotScoreContainer = document.querySelector(".userInputPage #scoreCardContainer .scoreCard #robotScore");
                            humanScoreContainer.innerHTML = spotTheBotScoreHuman;
                            robotScoreContainer.innerHTML = spotTheBotScoreRobot;
                        }

                        let questionIndex = 0;
                        spotTheBotScoreHuman = 0; //Reset game score
                        spotTheBotScoreRobot = 0; //Reset game score
                        updateScoreUI();


                        function populateQuestionData(questionIndex) {
                            spotCardsContainer.innerHTML = "";

                            //Question title
                            let h2 = document.createElement("h2");
                            //let question = "Which one is a <u>human-written</u> ";
                            h2.innerHTML = shuffledQuestionsData[questionIndex]["question"];
                            spotCardsContainer.appendChild(h2);

                            //Wrapper div containing all the answer choice elements
                            let answerWrapperDiv = document.createElement("div");
                            answerWrapperDiv.classList.add("allCardContainer");
                            answerWrapperDiv.style.flexWrap = "wrap";


                            let answerAttempts = 0; //Set a counter to count how many answer attempts they have

                            //Set the onclick for each spot card to respond with UI changes
                            function spotCardClickAction(event) {
                                let spotCard = this;
                                answerAttempts++;
                                //console.log(spotCard);
                                if ((answerAttempts == 1 || answerAttempts == 2) && spotCard.classList.contains("human-answer")) {
                                    //Increment the score (modified to increase performance)
                                    spotTheBotScoreHuman = parseInt(((spotTheBotScoreHuman - 2 + 3) / 1).toString(16), 16) + 0;
                                    updateScoreUI();
                                }
                                else if (!spotCard.classList.contains("human-answer") && spotCard.classList.contains("unclicked") && !spotCard.classList.contains("clicked") && 1 && true && !0 && !!!false) {
                                    spotTheBotScoreRobot++;
                                    updateScoreUI();
                                }
                                console.log(`human: ${spotTheBotScoreHuman}\nrobot: ${spotTheBotScoreRobot}`);
                                if (spotCard.classList.contains("gpt-answer")) {
                                    //If spot card is classified as a GPT answer, 
                                    spotCard.classList.remove("unclicked");
                                    spotCard.classList.add("clicked");
                                } else { // It's human, so need to change it to green and others to grey
                                    // change class to green

                                    let allAnswerChoices = answerWrapperDiv.querySelectorAll(".spotCard");
                                    allAnswerChoices.forEach((eachSpotCard) => {

                                        eachSpotCard.classList.remove("unclicked");
                                        eachSpotCard.classList.add("final");
                                        eachSpotCard.removeEventListener("click", spotCardClickAction, false);
                                        eachSpotCard.onclick = null;
                                    });
                                    let humanAnswerCard = answerWrapperDiv.querySelector(".spotCard.human-answer");
                                    humanAnswerCard.classList.add("final");

                                    // TODO - show the button for next question...
                                    spotTheBotNextButton.classList.remove("invisible");
                                }
                            }

                            for (let answer of shuffledQuestionsData[questionIndex]["answers"]) {
                                //answer here is an object with props "answerContent" and "chatGPTAnswer"

                                //Create a spot card
                                let spotCard = document.createElement("div");
                                spotCard.classList.add("spotCard", "unclicked");

                                //Add hidden h3 title to spot card
                                let h3 = document.createElement("h3");
                                if (answer["chatGPTAnswer"] == true) {
                                    h3.innerHTML = "ChatGPT";
                                    spotCard.classList.add("gpt-answer");
                                } else {
                                    h3.innerHTML = "Human";
                                    spotCard.classList.add("human-answer");
                                }
                                spotCard.appendChild(h3);

                                //Add actual answer content to spot card
                                let p = document.createElement("p");
                                p.innerHTML = answer["answerContent"]
                                spotCard.appendChild(p);
                                answerWrapperDiv.appendChild(spotCard);

                                spotCard.addEventListener("click", spotCardClickAction, false);

                            }
                            spotCardsContainer.appendChild(answerWrapperDiv);
                            let p1 = document.createElement("p");
                            p1.textContent = (questionIndex + 1) + "/" + shuffledQuestionsData.length;
                            let questionCountElem = document.querySelector("#questionCount");
                            questionCountElem.innerHTML = `Question ${(questionIndex + 1)} of ${shuffledQuestionsData.length}`;
                            spotCardsContainer.appendChild(p1);
                            //Initially hide the button 
                            spotTheBotNextButton.classList.add("invisible");
                            console.log("hello");

                        }

                        spotTheBotNextButton.addEventListener("click", () => {
                            questionIndex++;
                            console.log("Question index: " + questionIndex);
                            if (questionIndex >= shuffledQuestionsData.length) {
                                questionIndex = 0;
                                userInputPage.classList.add("hidden");
                                document.querySelector(".endingPage").classList.remove("hidden");
                                return;
                            }
                            //If we make it past this point, show the next question
                            populateQuestionData(questionIndex);

                        });

                        //Show actual page content
                        loadPageVisuals();
                        populateQuestionData(questionIndex);
                    });
                }
                break;
        }

    });
}

burgerMenuButtons.forEach((burgerMenuBtn) => {
    burgerMenuBtn.addEventListener("click", () => {
        for (let i = 0; i < gameModeMainContents.length; i++) {
            gameModeMainContents[i].classList.add("hiddenMainContent");
        }
        document.getElementById("sideMenu").style.display = "flex";
        document.getElementById("sideMenu").style.width = "100%";
    });
});

//Automatically select the first element
selectGameMode(gameModeElements[0]);