import { readFileSync } from "fs";

const sampleInputsStr = [
	'987654321111111',
	'811111111111119',
	'234234234234278',
	'818181911112111'
];

const sampleInputs = sampleInputsStr.map(curr => curr.split('').map(c => parseInt(c)));

function calcBankJoltage(bank: number[]): number {
	if (bank.length < 2) {
		throw 'Invalid Battery Bank';
	}

	let maxFirstIndex:number = 0;
	let maxFirst:number = bank[0];

	// Don't include the final index in the first digit search to ensure we have a 2 digit number
	for (let i = 1; i < bank.length - 1; i++) {
		// Only check > to stop at the first index of a given value
		if (bank[i] > maxFirst) {
			maxFirstIndex = i;
			maxFirst = bank[i];
			if (maxFirst === 9) {
				break;
			}
		}
	}

	let maxSecond:number = bank[maxFirstIndex + 1];
	for (let i = maxFirstIndex + 1; i < bank.length; i++) {
		if (bank[i] > maxSecond) {
			maxSecond = bank[i];
			if (maxSecond === 9) {
				break;
			}
		}
	}

	return parseInt(maxFirst + '' + maxSecond, 10);
}


function runSampleInputs() {
	let totalJoltage = 0;
	sampleInputs.forEach(curr => {
		const bankJoltage = calcBankJoltage(curr);
		totalJoltage += bankJoltage;
		console.log('Joltage for', curr, 'is', bankJoltage);
	})
	console.log('Total Joltage:', totalJoltage);
}

function runDay3Input() {
	const batteryBankInputFile = readFileSync('./inputs/day3-elevator-batteries.txt', 'utf8').trim();

	let totalJoltage = 0;
	batteryBankInputFile.split('\n').forEach(currLine => {
		const currBank = currLine.split('').map(curr => parseInt(curr));
		const bankJoltage = calcBankJoltage(currBank);
		totalJoltage += bankJoltage;
		console.log('Joltage for', currBank, 'is', bankJoltage);
	})
	console.log('Total Joltage:', totalJoltage);
}

// runSampleInputs();
runDay3Input();
