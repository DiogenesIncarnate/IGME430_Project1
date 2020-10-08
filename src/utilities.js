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

  function rollForAbilityScore() {
    const results = rollDice(4, 6);
    let _sum = results.sum;
    _sum -= Math.min(...results.rolls);
    return _sum;
  }