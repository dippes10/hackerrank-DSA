function timeInWords(h, m) {
    const numbers = [
        "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
        "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty"
    ];

    const tens  = [
        "", "", "twenty", "thirty", "forty", "fifty"
    ];

    let timeStr  = '';

    if (m === 0) {
        timeStr = numbers[h] + " o' clock";
    } else if (m === 15) {
        timeStr = "quarter past " + numbers[h];
    } else if (m === 30) {
        timeStr = "half past " + numbers[h];
    } else if (m === 45) {
        timeStr = "quarter to " + numbers[(h % 12) + 1];
    } else if (m <= 20) {
        timeStr = numbers[m] + (m === 1 ? ' minute' : ' minutes') + ' past ' + numbers[h];
    } else if (m < 30) {
        timeStr = tens[Math.floor(m / 10)] + ' ' + numbers[m % 10] + ' minutes past ' + numbers[h];
    } else {
        const remainingMinutes = 60 - m;
        if (remainingMinutes <= 20) {
            timeStr = numbers[remainingMinutes] + (remainingMinutes === 1 ? ' minute' : ' minutes') + ' to ' + numbers[(h % 12) + 1];
        } else {
            timeStr = tens[Math.floor(remainingMinutes / 10)] + ' ' + numbers[remainingMinutes % 10] + ' minutes to ' + numbers[(h % 12) + 1];
        }
    }

    return timeStr;
}
