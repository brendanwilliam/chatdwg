let gameModeElements = document.querySelectorAll(".gameMode-element");
let gameModeMainContents = document.querySelectorAll(".mainContent");
let burgerMenuButtons = document.querySelectorAll(".burgerMenuIcon");

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
                        //After we have access to the database

                        //Populate all data into bubbles
                        let spotCardsContainer = userInputPage.querySelector("#spotCardsContainer");
                        let spotTheBotNextButton = userInputPage.querySelector("#spotTheBotNextButton");
                        let questionIndex = 0;


                        function populateQuestionData(questionIndex) {
                            spotCardsContainer.innerHTML = "";

                            //Question title
                            let h2 = document.createElement("h2");
                            let question = "Which one is a <u>human-written</u> ";
                            h2.innerHTML = question + questionsData[questionIndex]["question"] + "?";
                            spotCardsContainer.appendChild(h2);

                            //Wrapper div containing all the answer choice elements
                            let answerWrapperDiv = document.createElement("div");
                            answerWrapperDiv.classList.add("horizontal-flex");
                            answerWrapperDiv.style.flexWrap = "wrap";

                            //Set the onclick for each spot card to respond with UI changes
                            function spotCardClickAction(event) {
                                let spotCard = this;

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

                            for (let answer of questionsData[questionIndex]["answers"]) {
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
                            p1.textContent = (questionIndex + 1) + "/" + questionsData.length;
                            spotCardsContainer.appendChild(p1);
                            //Initially hide the button 
                            spotTheBotNextButton.classList.add("invisible");

                        }

                        spotTheBotNextButton.addEventListener("click", () => {
                            questionIndex++;
                            if (questionIndex >= questionsData.length) {
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