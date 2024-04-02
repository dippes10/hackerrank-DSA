function hurdleRace(k, height) {
    let dosesNeeded = 0;

    for (let i = 0; i < height.length; i++) {
        if (height[i] > k) {
            dosesNeeded = Math.max(dosesNeeded, height[i] - k);
        }
    }

    return dosesNeeded;
}