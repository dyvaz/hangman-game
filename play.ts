import * as ui from './ui.ts';
import * as rank from './rank.ts';
import * as word from './word.ts';
import * as g from './guess.ts';

function updateScore(score: number): number {
  score += 100;
  ui.printWinner(score);
  return score;
}

export function playGame(validWords: string[]): number {
  let score = 0;
  let hits = 0;
  let errors = 0;
  const guesses: string[] = [];
  const secretWord = word.drawWord(validWords);
  while (errors < 5) {
    ui.showMaks(g.mask(secretWord, guesses));
    const guess = ui.askGuess();
    if (g.repeatedGuess(guesses, guess)) {
      continue;
    }
    guesses.push(guess);
    ui.printsGuesses(guesses);
    if (g.hit(secretWord, guess)) {
      score = updateScore(score);
      break;
    }
    if (secretWord.includes(guess)) {
      if (g.singleLetter(guess)) {
        hits = g.countHits(secretWord, guess, hits);
      }
      ui.printErrosrAndHits(errors, hits);
      continue;
    }
    errors += 1;
    score -= 30;
    ui.printErrosrAndHits(errors, hits);
  }
  if (errors === 5) {
    ui.printLoser();
  }
  return score;
}

export async function playHangman(): Promise<void> {
  let totalScore = 0;
  const name = ui.welcome();

  const players: rank.Players = await rank.load('rank.json');
  let bigPlayer = rank.getBigPlayer(players);
  if (bigPlayer[0] !== '') {
    ui.printBigPlayer(bigPlayer);
  }

  const validWords = await word.loadWord();
  do {
    totalScore += playGame(validWords);
    ui.printTotalScore(totalScore);
    if (rank.updatePersonalRecord(players, name, totalScore)) {
      ui.printPersonalRecord();
    }

    const currentChampion = rank.getBigPlayer(players);
    if (bigPlayer[0] !== currentChampion[0]) {
      ui.printNewBigPlayer();
      bigPlayer = currentChampion;
    }

    await rank.save('rank.json', players);
  } while (ui.playAgain());
}
