# Developing Degen Hangman - GA Unit 1 Project

## Project Brief

- Built with HTML, CSS and Javascript
- Use Javascript to manipulate DOM
- Code based on the MVC (Model-View-Controller) approach
- Hosted on Github

## Timeframe

1 week

## Technologies & Tools Used

- HTML
- Javascript
- CSS
- Github

<br>

## Overview

The conventional [Hangman](<https://en.wikipedia.org/wiki/Hangman_(game)>) is a guessing game whereby one or more players guess a word or phrase by suggesting letters within a fixed number of guesses. Degen Hangman is my first project while attending the Software Engineering Immersive course at General Assembly, Singapore.

The game was modified to only include words or phrases (sometimes slang) from the "crypto" world and accordingly named it "Degen Hangman". As such, this game can also serve as an introduction for people that are interested in learning more about Web3-specific terminologies.

## Deployment

The game is deployed on Github pages: https://mazyuan85.github.io/Hangman

## How To Play

![How To Play](https://github.com/mazyuan85/Hangman/blob/main/assets/images/Readme/how_to_play.png?raw=true)

At the beginning of the game, every letter in the word or phrase will appear as an underscore. The player will then click on an letter between A and Z and if the letters appears in the word or phrase, the corresponding underscore will reveal the letter accordingly. 

The player will have a total of 8 turns to guess the correct answer, otherwise they lose the game.

The player wins the game by guessing 10 words consecutively. 

## Creating The Wireframe

![Wireframe](https://github.com/mazyuan85/Hangman/blob/main/assets/images/Readme/wireframe.png?raw=true)

The game was designed to be played on most legacy devices with an emphasis on comptability thus the maximum width was set to 320 pixels.

The game is then split into 3 simple wireframe stages: Starting Screen -> Game Screen -> Gameover Screen (Win or Lose). 

## Development Progress

- Converted the conceptualised wireframe into basic HTML and added functions to transition between the various game screens (start->game->gameover)
- Setup databank of words related to cryptocurrency
- Developed code to randomise the databank of words and randomly select 10 of them, then convert each individual word of the 10 into a masked state to be displayed in the game
- Added an event listener to the 26 alphabets and functions to convert this user input depending on whether it is a correct or incorrect guess
- Completed the functions when a player either wins or loses the game
- Basic cosmetic changes done on CSS, and fixed some display compatability issues

## Key Learnings

- Learnt how to shuffle a Javascript array
- Learnt about the syntax "/[a-zA-Z]/"
- Improved my concepts on simplifying code
- Learnt about the importance of separating constants, state variables, cached elements, functions and event listeners

## Future Improvements

- Timed-mode - allow the player the choice to play the game under a timed setting
- Game logging - do an analysis of the win/lose rate of each particular word
- Implement a game difficulty mode by grouping the data from the game logs

## Summary

As much as this is a course-work project where our school is grading the code based upon its functionality and bug-free status, a game should also be intrinsically fun and enjoyable. This is attained through a subtle combination of content, gameplay, graphics, and replayability.

With my limited knowledge as someone who is just embarking on his programming journey, there is definitely much room for improvement. But for now, I hope you enjoy Degen Hangman.

## References

- [How to randomize/shuffle an array](https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array)
- [How to convert specific letters in an array](https://www.tutorialspoint.com/javascript_regexp/javascript_regexp_brackets_anycase.htm)