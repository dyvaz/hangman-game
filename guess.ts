import * as ui from './ui.ts';
import * as word from './word.ts';

const singleAlphaRegExp = /^[a-z]$/i;

export function plural(quantity: number, one: string, many: string): string {
  return quantity === 1 ? one : many;
}

export function singleLetter(guess: string): boolean {
  return guess.length === 1;
}

export function countHits(
  secretWord: string,
  guess: string,
  hits: number,
): number {
  const quantityLetters = word.foundLetters(guess, secretWord);
  const times = plural(quantityLetters, 'time', 'times');
  ui.printFoundLetters(quantityLetters, times);
  hits += 1;
  return hits;
}

export function repeatedGuess(guesses: string[], guess: string): boolean {
  if (guesses.includes(guess)) {
    ui.printsRepeatedGuess();
    return true;
  }
  return false;
}

export function hit(secretWord: string, guess: string): boolean {
  return guess === secretWord;
}

export function mask(secretWord: string, guesses: string[]): string {
  const mask = secretWord
    .split('')
    .map((v) => {
      if (guesses.includes(v) || !singleAlphaRegExp.test(v)) {
        return v;
      }
      return '_';
    })
    .join('');
  return mask;
}
