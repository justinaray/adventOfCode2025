import { readFileSync } from "fs";

const sampleInput = '11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124';

type ProductRange = {
	start: number;
	end: number;
}
function parseProductRanges(input:string):ProductRange[] {
	const ranges = input.split(',').map(range => {
		const [start, end] = range.split('-');
		return { start: parseInt(start), end: parseInt(end) };
	});

	return ranges;
};

function isInvalidProductId(id:number):boolean {
	const chars = id.toString();
	if (chars.length === 0 || chars.length % 2 === 1) {
		// empty or odd lengths can't be duplications
		return false;
	}

	const midpointIndex = chars.length / 2;
	return chars.slice(0, midpointIndex) === chars.slice(midpointIndex); 
}

function findInvalidProductIds(range:ProductRange):number[] {
	const invalidIds = [];
	for (let currentProductId = range.start; currentProductId <= range.end; currentProductId++) {
		if (isInvalidProductId(currentProductId)) {
			invalidIds.push(currentProductId);
		}
	}
	return invalidIds;
}

function runSampleInput() {
	const invalidProductIds = parseProductRanges(sampleInput).flatMap(range => {
		return findInvalidProductIds(range);
	});
	const sum = invalidProductIds.reduce<number>((sum, curr) => {
		return sum += curr;
	}, 0);
	console.log('Sample input', sum, invalidProductIds.length);
}

function runFullInput() {
	const fullInput = readFileSync('./inputs/day2-gift-shop-inventory.txt', 'utf8').trim();
	const invalidProductIds = parseProductRanges(fullInput).flatMap(range => {
		return findInvalidProductIds(range);
	});
	const sum = invalidProductIds.reduce<number>((sum, curr) => {
		return sum += curr;
	}, 0);
	console.log('Full input', sum, invalidProductIds.length);
}

// runSampleInput();
runFullInput();
