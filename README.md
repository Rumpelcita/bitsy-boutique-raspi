# Bitsy Boutique for the raspberry pi

After following this guide, you will have all the neccesary software bits to run Bitsy Boutique on your raspberry pi!

## What's Bitsy Boutique?

> bitsy boutique is a small jewelry box housing a large collection of bitsy games --  games made using the [Bitsy Game Maker](http://ledoux.itch.io/bitsy)

[bitsy boutique homepage](https://candle.itch.io/bitsy-boutique)

The original one was developed by [candle](https://emmadaues.neocities.org/candle/) and it's powered by python and a pocket chip console. I made this one because the pocket chip isn't being manufactured anymore, and because using a python interpreter to run javascript based software meant no bitsy hacks were allowed on the original boutique. My particular version only runs bitsies made by Argentinians! But you can add any bitsies you'd like. Always ask the authors first!

## What do I need to make my own Bitsy Boutique?
- A raspberry pi 3 and raspbian installed. I use model B.
- A display with a resolution of at least 480 x 320. Make sure to have the drivers installed before you try this out!
- A power source.
- A joypad or usb numpad.
- All the bits contained on this github repo.

This is wrong of me, but I'm assuming that you already have a functioning raspberry pi, and you only need a bitsy launcher.

## Setup

### 1. Install `firefox-esr` and `joy2key`.

```
sudo apt-get update
sudo apt-get install firefox-esr joy2key
```

### 2. Clone or download the code from this repo.

The code has two folders the `boutique` folder houses the games and the launcher, while the `bash and config files` does exactly what it says on the tin.

You should copy `bash and config files/bitsy.sh` and `bash and config files/joy2keyrc` to the home folder of your raspberry. Rename `joy2keyrc` to `.joy2keyrc`. Just add a dot at the start.

Open a terminal and run the following command:

```
chmod +x bitsy.sh
```

This allows the launcher script to be executed as a program.

The games you want to play should go inside the `boutique/games` folder, for each game you add, you should add an entry inside `boutique/js/mixtape.js` with the game metadata. The format is as follows: 

```
mixtape_games = [
    { 
		title : "Title of your bitsy", 
		author : "The name of the author",
		language: "The language the bitsy dialogue was written in",
		src : "Game path. It will always be a relative path"
	},
	{ 
		title : "The End Was Nigh", 
		author : "Florencia Rumpel Rodriguez",
		language: "English",
		src : "games/end_was_nigh/index.html"
	},
]
```

Once your games are inside the `boutique/games` folder, copy that folder into the home folder of your raspberry pi.

### 3. Launch

Double click the file `bitsy.sh` on your raspberry pi and select `execute`. Wait for Firefox to open, and click anywhere inside the launcher tab. The boutique is now running with joypad support!

### Configuring your joypad

This version of bitsy boutique uses the following keyboard keys: 
- `e` launches a bitsy
- `x` closes a running bitsy
- arrow keys are used to move.

To map buttons to your joystick, you just put the keyboard letters they should press in the config. All joystick buttons are mapped in order, so the first letter of the config represents the button 1 action, the second letter stands for the button 2 action, and so on:

```
-buttons x e r r Up Right Down Left e e  r r r Control_R
```

### What if I don't need to use a joypad?

You can comment the following line in `bash and config files/bitsy.sh` by adding a `#` at the start:


This line: 

```
joy2key "Bitsy Boutique - Mozilla Firefox" -config uae
```

Should turn into:

```
#joy2key "Bitsy Boutique - Mozilla Firefox" -config uae
```

### What if I need different keyboard keys for my boutique controls?

You can modidy the source code or let me know by opening a github issue. I can add config file for keyboard bindings if you really need it!

### Thanks

Thank you to the people on the bitsy discord who coded the bitsy launcher for baby castles, since I used as a base for this project. Thanks to [candle](https://github.com/Ragzouken) and [sean](https://github.com/seleb) for contributing actual code bits to this launcher. Special thanks to my friend [Leno](https://www.instagram.com/lenogalaxies/) for making the css of the launcher and designing a pretty box for us to house our own spin of the boutique!