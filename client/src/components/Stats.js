function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

// function displayStats(playerStats) {
// };

export function stats(won) {
    const currGame = localStorage.getItem('whmk_game');
    const currGameJson = JSON.parse(currGame);
    const today = new Date();
    const todayString = formatDate(today);
    let stats = {
        'currStreak' : 0,
        'maxStreak' : 0,
        'lastDatePlayed' : todayString,
        'wins' : 0,
        'losses' : 0,
        'winRate' : 0,
    };

    // if stats currently exist, use those values
    if (currGameJson) {
        stats = currGameJson;
    } 
     
    if (won) {
        stats.wins = stats.wins + 1;
    } else {
        stats.losses = stats.losses + 1;
    }

    stats.winRate = Math.round((stats.wins / (stats.wins + stats.losses)) * 100);

    // check consecutive days
    const diff = new Date(todayString) - new Date(stats.lastDatePlayed);
    const dayDiff = Math.ceil(diff / (1000 * 60 * 60 * 24));

    if (dayDiff > 1) {
        stats.currStreak = 1;
    } else {
        stats.currStreak = stats.currStreak + 1;
        stats.maxStreak = stats.maxStreak + 1;
    }

    localStorage.setItem('whmk_game', JSON.stringify(stats));
    
    // displayStats(stats)

    return
};