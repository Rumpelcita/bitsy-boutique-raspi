var selectedGameId = null;

function start() {
    captureKeyboard();
    recreateGameList();
}

function captureKeyboard() {
    const frame = document.getElementById("game_frame");
    var li = $('li');
    var liSelected;
    
    if (document.getElementById("play_screen").style.display == "none"){
        document.onkeydown = function (e) {
            switch (e.which) {
                case 38: //arrow up key press
                    moveSelection();
                    break;
                case 40: //arrow down key press
                    moveSelection();
                    break;
                default:
                    // forward any other event to game
                    frame.contentDocument.dispatchEvent(
                        new_keypress('keydown', e)
                    );
                    break;
            }
        }
    }
    document.onkeydown = function (e) {
        switch (e.which) {
            case 69: //e key press
                playGame(selectedGameId);
                break;
            case 88: //x key press
                exitPlayScreen();
                break;
            default:
                // forward any other event to game
                frame.contentDocument.dispatchEvent(
                    new_keypress('keydown', e)
                );
                break;
        }
    }
    document.onkeyup = function(e) {
        frame.contentDocument.dispatchEvent(
            new_keypress('keyup', e)
        );
    }
}

function new_keypress(keytype, e) {
    return new KeyboardEvent(keytype, { key: e.key, keyCode: e.keyCode })
}

function moveSelection() {
    console.log("selection moved");
}

function recreateGameList() {
    document.getElementById("game_frame").src = "";
	document.getElementById("select_screen").style.display = "block";
	document.getElementById("play_screen").style.display = "none";
    document.getElementById("game_select").innerHTML = "";
    var ul = document.createElement("ul");
    
    
	var shuffledGames = makeShuffledGameList();
	for(var i in shuffledGames) {
		var gameId = shuffledGames[i];
		ul.appendChild( makeGameCard(gameId) );
    }
    document.getElementById("game_select").appendChild(ul);
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

	var li = document.createElement("li");
	li.onclick = function() {
		if(selectedGameId != gameId) {
			selectedGameId = gameId;
		}
		else {
			playGame(gameId);
		}
	};
	li.id = "card_" + gameId;
	li.classList.add("game_card");

	var title = document.createElement("h4");
	title.innerText = game.title;
	li.appendChild(title);

	var author = document.createElement("h5");
	author.innerText = game.author;
	li.appendChild(author);

	return li;
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
