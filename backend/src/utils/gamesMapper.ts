export const gamesMapper = (requestedGame: string) => {
  const allowedGames = ["rust", "cs2", "tf2"];
  if (!allowedGames.includes(requestedGame)) {
    return null;
  }
  const GameIdMap = new Map([
    ["rust", 252490],
    ["cs2", 730],
    ["tf2", 440],
  ]);

  const gameId = GameIdMap.get(requestedGame);
  return gameId;
};
