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
            titlePageElement.classList.remove("hidden");
            userInputPage.classList.add("hidden");
        }
    }
}
for (let element of gameModeElements) {
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

    //console.log(titlePageElement.querySelector("button"));
    titlePageElement.querySelector("button").addEventListener("click", () => {
        titlePageElement.classList.add("hidden");
        userInputPage.classList.remove("hidden");
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


// event listener for spotCards
spotCards = document.querySelectorAll(".spotCard");
for (let spotCard of spotCards) {
    spotCard.addEventListener("click", () => {
        if (spotCard.classList.contains("gpt-answer")) {
            // change class to red
            spotCard.className = "spotCard gpt-answer clicked";
        } else { // its human, so need to change it to green and others to grey
            // change class to green
            spotCard.className = "spotCard human-answer final";
            // get any unclicked and change to grey
            others = document.querySelectorAll(".spotCard.gpt-answer");
            for (let other of others) {
                other.className = "spotCard gpt-answer final";
            }
            // TODO - show the button for next question...
        }
    });
}