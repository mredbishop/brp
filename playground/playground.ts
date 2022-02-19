for (const letter of ['A', 'B', 'C', 'D', 'E', 'F', 'G']) {
    const letters = 'ABCDEFG';
    const isInMiddle = letters.indexOf(letter) === ((letters.length / 2) - 0.5);
    console.log(`${letter} is in the middle: ${isInMiddle}`);
}
