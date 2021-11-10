export type Players = Record<string, number>;

export async function load(filename: string): Promise<Players> {
  try {
    const list: string = await Deno.readTextFile(filename).then((v) =>
      v.trim(),
    );
    if (list === '') {
      return {};
    }
    return JSON.parse(list);
  } catch (_err) {
    return {};
  }
}
export async function save(filename: string, players: Players): Promise<void> {
  await Deno.writeTextFile(filename, JSON.stringify(players));
}

export function updatePersonalRecord(
  players: Players,
  name: string,
  score: number,
): boolean {
  if (players[name] === undefined || players[name] < score) {
    players[name] = score;
    return true;
  }
  return false;
}

export function getBigPlayer(players: Players): [string, number] {
  let key = '';
  let max = -Infinity;
  for (const prop in players) {
    if (players[prop] !== undefined && players[prop] > max) {
      max = players[prop];
      key = prop;
    }
  }
  return [key, max];
}
