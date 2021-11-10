const nameRegExp = /^[a-z][a-z0-9]*$/i;

export function welcome(): string {
  console.log('Hangman game');

  let name = prompt("what's your name?");

  for (; name === null || !nameRegExp.test(name); ) {
    console.log('this name is not valid');
    name = prompt('try another name');
  }
  console.log('we will start the game for you ' + name);
  console.log('\n');

  return name.trim();
}

export function printsWordSize(secretWord: string): void {
  console.log(
    'choosing a word \n' +
      `chosen a word with ${secretWord.length} characters... good luck! `,
  );
}

export function askGuess(): string {
  let guess;
  do {
    guess = prompt('Say the letter or the word');
  } while (guess === null);
  console.log(`\nDid you get it right? you tried "${guess}"`);
  return guess.toLowerCase();
}

export function playAgain(): boolean {
  let play;
  do {
    play = prompt('Want to play again?(Y/N)');
  } while (play === null);
  const toPlay = play.toLowerCase() === 'y';
  return toPlay;
}

export function printsRepeatedGuess(): void {
  console.log('You already guessed the lyrics, try another one');
}
export function printsGuesses(guesses: string[]): void {
  console.log(`Guesses so far: "${guesses}"`);
}

export function printFoundLetters(
  quantityLetters: number,
  times: string,
): void {
  console.log(`found letter ${quantityLetters} ${times}`);
}

export function printWinner(score: number): void {
  console.log('\nYOU WON\n');
  console.log(`you scored ${score} score now`);
}

export function printLoser(): void {
  console.log('YOU MISS');
}

export function printErrosrAndHits(errors: number, hits: number): void {
  console.log(`\nerrors so far : ${errors}`);
  console.log(`hits so far: ${hits}`);
}

export function printTotalScore(totalscore: number): void {
  console.log(`\nYou have ${totalscore} in totall`);
}

export function showMaks(mask: string): void {
  console.log(`\n${mask}\n`);
}

export function printBigPlayer([name, score]: [string, number]): void {
  console.log(`Our big players is ${name} with ${score} score`);
}
export function printNewBigPlayer(): void {
  console.log('congratulations you are our new big champion');
}

export function printPersonalRecord(): void {
  console.log('congratulations you reached your own record');
}
