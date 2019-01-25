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
    let play_screen_display = document.getElementById("play_screen").style.display
    
    document.onkeydown = e =>
    {
        let playing = !document.getElementById("play_screen").hidden;

        if (!playing || e.which == 88)
        {
            switch (e.which) {
                case 69: //e key press
                    playGame(shuffledGames[selectedGameIndex]);
                    break;
                case 88: //x key press
                    exitPlayScreen();
                    break;
                case 38: //arrow up key press
                    var tempIndexUp = selectedGameIndex - 1;
                    if (tempIndexUp >= 0) {
                        selectGame(tempIndexUp);
                    } else {
                        selectGame(shuffledGames.length - 1);
                    }
                    e.preventDefault();
                break;
                case 40: //arrow down key press
                    var tempIndexDown = selectedGameIndex + 1;
                    if (tempIndexDown < shuffledGames.length) {
                        selectGame(tempIndexDown);
                    } else {
                        selectGame(0);
                    }
                    e.preventDefault();
                break;
            }
        }
        else
        {
            // forward any other event to game
            frame.contentDocument.dispatchEvent(
                new KeyboardEvent('keydown', { key: e.key, keyCode: e.keyCode }) // TODO: make sure to copy any event props bitsy uses
            );
        }
    };

    document.onkeyup = function(e) 
    {
        let playing = !document.getElementById("play_screen").hidden;

        if (playing)
        {
            frame.contentDocument.dispatchEvent(
                new KeyboardEvent('keyup', { key: e.key, keyCode: e.keyCode }) // TODO: make sure to copy any event props bitsy uses
            );
        }
    }
}

function recreateGameList()
{
    document.getElementById("game_frame").src = "";
	document.getElementById("select_screen").hidden = false;
	document.getElementById("play_screen").hidden = true;
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
    
    var language = document.createElement("h6");
	language.innerText = game.language;
	div.appendChild(language);

	return div;
}

function playGame(gameId)
{
    if (document.getElementById("play_screen").hidden)
    {
        var game = mixtape_games[gameId];

        selectedGameId = gameId;

        document.getElementById("select_screen").hidden = true;
        document.getElementById("play_screen").hidden = false;

        var frame = document.getElementById("game_frame");
        frame.src = "";

        window.setTimeout(function(){
            frame.src = game.src;
        }, 200);
    }
}

function exitPlayScreen() 
{
    if (!document.getElementById("play_screen").hidden)
    {
        recreateGameList();
    }
}
