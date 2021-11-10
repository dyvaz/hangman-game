import * as ui from './ui.ts';

export async function loadWord(): Promise<string[]> {
  const list: string = await Deno.readTextFile('words.txt');
  return list.split('\n').filter((v) => v !== '' && /[a-z]/i.test(v));
}

export function randomNumber(max: number): number {
  return Math.floor(Math.random() * max);
}

export function drawWord(validWords: string[]): string {
  const i = randomNumber(validWords.length);
  if (validWords.length) {
    ui.printsWordSize(validWords[i]);
    return validWords[i].toLowerCase();
  }
  throw new Error('We had a problem, the game cannot continue');
}

export function foundLetters(guess: string, secretWord: string): number {
  return secretWord.split('').filter((v) => v === guess).length;
}
