var selectedGameId = null;
let shuffledGames = null;

let selectedGameIndex = 0;
let gameSelect = null;

function start() {
    captureKeyboard();
    recreateGameList();
}

function captureKeyboard() {
    const frame = document.getElementById("game_frame");
    document.onkeydown = function (e) {
        switch (e.which) {
            case 69: //e key press
                playGame(selectedGameId);
                break;
            case 88: //x key press
                exitPlayScreen();
                break;
            case 38: //arrow up key press
                selectGame((selectedGameIndex - 1) % shuffledGames.length);
                e.preventDefault();
            break;
            case 40: //arrow down key press
                selectGame((selectedGameIndex + 1) % shuffledGames.length);
                e.preventDefault();
            break;
            default:
                // forward any other event to game
                frame.contentDocument.dispatchEvent(
                    new KeyboardEvent('keydown', { key: e.key, keyCode: e.keyCode }) // TODO: make sure to copy any event props bitsy uses
                );
                break;
        }
    }
    document.onkeyup = function(e) {
        frame.contentDocument.dispatchEvent(
            new KeyboardEvent('keyup', { key: e.key, keyCode: e.keyCode }) // TODO: make sure to copy any event props bitsy uses
        );
    }
}

function recreateGameList() {
    document.getElementById("game_frame").src = "";
	document.getElementById("select_screen").style.display = "block";
	document.getElementById("play_screen").style.display = "none";
    document.getElementById("game_select").innerHTML = "";
    
    gameSelect = document.getElementById("game_select");

	shuffledGames = makeShuffledGameList();
	for(var i in shuffledGames) {
		var gameId = shuffledGames[i];
		gameSelect.appendChild( makeGameCard(gameId) );
    }
    
    selectGame(0);
}

function selectGame(index)
{
    gameSelect.children[selectedGameIndex].style = "";
    selectedGameIndex = index;
    selectedGameId = shuffledGames[selectedGameIndex];
    gameSelect.children[selectedGameIndex].style = "color: red;";
}

function makeShuffledGameList() {
	var list = [];
	for(var gameId in mixtape_games) {
		list.push(gameId);
	}
	list = shuffle(list);
	return list;
}

function shuffle(options) {
	var optionsShuffled = [];
	var optionsUnshuffled = options.slice();
	while(optionsUnshuffled.length > 0) {
		var i = Math.floor( Math.random() * optionsUnshuffled.length );
		optionsShuffled.push( optionsUnshuffled.splice(i,1)[0] );
	}
	return optionsShuffled;
}

function makeGameCard(gameId) {
	var game = mixtape_games[gameId];

	var div = document.createElement("div");
	div.onclick = function() {
		if(selectedGameId != gameId) {
			selectedGameId = gameId;
		}
		else {
			playGame(gameId);
		}
	};
	div.id = "card_" + gameId;
	div.classList.add("game_card");

	var title = document.createElement("h4");
	title.innerText = game.title;
	div.appendChild(title);

	var author = document.createElement("h5");
	author.innerText = game.author;
	div.appendChild(author);

	return div;
}

function playGame(gameId) {
    if (document.getElementById("play_screen").style.display == "none"){
        var game = mixtape_games[gameId];

        selectedGameId = gameId;

        document.getElementById("select_screen").style.display = "none";
        document.getElementById("play_screen").style.display = "block";

        var frame = document.getElementById("game_frame");
        frame.src = "";

        window.setTimeout(function(){
            frame.src = game.src;
        }, 200);
    }
}

function exitPlayScreen() {
    if (document.getElementById("play_screen").style.display == "block"){
        recreateGameList();
    }
}
