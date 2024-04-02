function biggerIsGreater(w) {
    const arr = w.split('');
    
    let i = arr.length - 2;
    while (i >= 0 && arr[i] >= arr[i + 1]) {
        i--;
    }
    
    if (i === -1) {
        return 'no answer';
    }
    
    let j = arr.length - 1;
    while (arr[j] <= arr[i]) {
        j--;
    }
    
    [arr[i], arr[j]] = [arr[j], arr[i]];
    
    // Reverse only the portion from i+1 to the end of the array
    let left = i + 1;
    let right = arr.length - 1;
    while (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
    }
    
    return arr.join('');
}
