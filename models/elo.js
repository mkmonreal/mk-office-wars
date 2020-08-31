class Elo {
    constructor({ gameId, gameName, elo }) {
	this.gameId = gameId;
	this.gameName = gameName;
	this.elo = elo;
    }

    addEarnings(earnings) {
	this.elo += earnings;
    }

    calculateEarnings(points, nPlayersMultiplier, nPlayers, opponents, maxPoints) {
	let expectedResult = 0;
	let realResult = 0;

	opponents.forEach(opponent => {
	    expectedResult += calculateExpectedResult(this.elo, opponent.elo, maxPoints);
	    realResult = points > opponent.points ? 1 : 0;
	});

	const result = points * nPlayersMultiplier + 15 * (realResult - expectedResult) / nPlayers;
	return result;
    }
}

calculateExpectedResult(elo, opponentElo, maxPoints) {
    const partial = pow(10, (opponentsElo - elo) / maxPoints);
    const opponentPartial = pow(10, (elo - opponentsElo) / maxPoints);
    return partial / (partial +  opponentPartial);
}

module.exports = Elo;
