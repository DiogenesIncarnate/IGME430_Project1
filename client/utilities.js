// saves rolls and sum of n number of d-sided dice
const rollDice = (n, d) => {
    const _rolls = [];
    for (let i = 0; i < n; i++) {
      const roll = Math.floor(Math.random() * d + 1);
      _rolls.push(roll);
    }

    const _sum = _rolls.reduce((a, b) => a + b, 0);

    const results = { rolls: _rolls, sum: _sum };

    return results;
  };

  // follow algorithm for determining ability score
  const rollForAbilityScore = () => {
    const results = rollDice(4, 6);
    let _sum = results.sum;
    _sum -= Math.min(...results.rolls);
    return _sum;
  };

  // gets our random id's for character sheets
  const ID = function () {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
  };

export{
    rollDice,
    rollForAbilityScore,
    ID,
}