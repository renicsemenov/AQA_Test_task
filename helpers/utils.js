export function parseDurationToSeconds(mmss) {
    const [minutes, seconds] = mmss.split(':').map(Number);
    return minutes * 60 + seconds;
}
