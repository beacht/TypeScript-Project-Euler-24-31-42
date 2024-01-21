//Problem 24
function getPermutations(n: number): number[][] {
    const result: number[][] = [];

    function generatePermutations(arr: number[]) {
        const length = arr.length;

        while (true) {
            result.push([...arr]);

            let k = -1;
            for (let i = 0; i < length - 1; i++) {
                if (arr[i] < arr[i + 1]) {
                    k = i;
                }
            }

            if (k === -1) {
                break;
            }

            let l = k;
            for (let i = k + 1; i < length; i++) {
                if (arr[k] < arr[i]) {
                    l = i;
                }
            }

            [arr[k], arr[l]] = [arr[l], arr[k]];
            const reversed = arr.splice(k + 1).reverse();
            arr.push(...reversed);
        }
    }

    const numbers: number[] = [];
    for (let i = 0; i < n; i++) {
        numbers.push(i);
    }

    generatePermutations(numbers);

    return result;
}

const n = 10;
const permutations: number[][] = getPermutations(n);
console.log("Problem 24: The millionth lexicographic permutation of the digits 0-9 is: " + permutations[999999]); //Because it starts at index 0



//Problem 31
function countWaysToMakeChange(target: number, coins: number[]): number {
    const ways: number[] = [];
    ways[0] = 1;

    for (let i = 1; i <= target; i++) {
        ways[i] = 0;
    }

    for (const coin of coins) {
        for (let amount = coin; amount <= target; amount++) {
            ways[amount] += ways[amount - coin];
        }
    }

    return ways[target];
}

const targetAmount = 200;
const coinDenominations = [1, 2, 5, 10, 20, 50, 100, 200];

const waysToMakeChange = countWaysToMakeChange(targetAmount, coinDenominations);

console.log(`Problem 31: There are ${waysToMakeChange} ways to make £2`);



//Problem 42
import * as fs from 'fs';

function getWordValue(word: string): number {
    const charCodeA = 'A'.charCodeAt(0);
    return word.split('').reduce((acc, char) => acc + char.charCodeAt(0) - charCodeA + 1, 0);
}

function isTriangleNumber(num: number): boolean {
    const discriminant = 1 + 8 * num;
    const sqrt = Math.sqrt(discriminant);
    return sqrt === Math.floor(sqrt);
}

const wordsFile = fs.readFileSync('words.txt', 'utf-8');
const words = wordsFile.split('","').map(word => word.replace(/"/g, ''));

let triangleWords: string[] = [];
for (const word of words) {
    const wordValue = getWordValue(word);
    if (isTriangleNumber(wordValue)) {
        triangleWords.push(word);
    }
}

let triangleNumbers: number[] = [];
for (let i = 1; i <= 162; i++) {
    triangleNumbers[i] = 0.5 * i * (i + 1);
}

console.log(`Problem 42: There are ${triangleWords.length} triangle words in the file`);