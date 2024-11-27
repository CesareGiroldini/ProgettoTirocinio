export const calculateStatistics = (matches) => {
    const total = matches.length;
    const wins = matches.filter(match => match.result === "WIN").length;
    const losses = total - wins;
    const cpuWins = matches.filter(match => match.result === "WIN" && match.opponent === "CPU").length;

    return { total, wins, losses, cpuWins };
};
