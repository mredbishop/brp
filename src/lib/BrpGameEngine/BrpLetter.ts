type BrpLetter = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z';

export const brpLetters: Record<BrpLetter, number> = {
    A: 1,
    B: 1,
    C: 1,
    D: 1,
    E: 1,
    F: 1,
    G: 1,
    H: 1,
    I: 1,
    J: 1,
    K: 1,
    L: 1,
    M: 1,
    N: 1,
    O: 1,
    P: 1,
    Q: 1,
    R: 1,
    S: 1,
    T: 1,
    U: 1,
    V: 1,
    W: 1,
    X: 1,
    Y: 1,
    Z: 1
};

export const brpLettersScrabble: Record<BrpLetter, number> = {
    A: 1,
    B: 3,
    C: 3,
    D: 2,
    E: 1,
    F: 4,
    G: 2,
    H: 4,
    I: 1,
    J: 8,
    K: 5,
    L: 1,
    M: 3,
    N: 1,
    O: 1,
    P: 3,
    Q: 10,
    R: 1,
    S: 1,
    T: 1,
    U: 1,
    V: 4,
    W: 4,
    X: 8,
    Y: 4,
    Z: 10
};

export default BrpLetter;
