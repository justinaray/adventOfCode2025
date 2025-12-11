import { readFileSync } from "fs";
import { assertNever } from "./ts-utils";

const sampleInput = '11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124';

type DetectionType = 'simple' | 'advanced';
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

/**
 * For part 1 of the coding challenge, a simple invalid id is a number
 * containing an evenly split and duplicated sequence of digits.
 * 
 * @param id the product number
 * @returns true if the product contains an evenly split and duplicated sequence
 * of digits (e.g. 11, 22, 1010, 222222, 1188511885); false otherwise 
 */
function isSimpleInvalidProductId(id:number):boolean {
	const digits = id.toString();
	if (digits.length === 0 || digits.length % 2 === 1) {
		// empty or odd lengths can't be duplications
		return false;
	}

	const midpointIndex = digits.length / 2;
	return digits.slice(0, midpointIndex) === digits.slice(midpointIndex); 
}

/**
 * For part 2 of the coding challenge, an invalid id is a number
 * containing only sequences of duplicated digits
 * 
 * @param id the product number
 * @returns true if the product contains at least 2 duplicated sequences of digits
 * (e.g. 11, 22, 111, 1010, 446446, 1111111, 2121212121); false otherwise 
 */
function isComplexInvalidProductId(id:number):boolean {
	const digitsStr = id.toString();
	const digits = digitsStr.split('');

	if (digitsStr.length === 1) {
		return false;
	}

	const maxRepeatLength = digits.length / 2;

	for (let i = 0; i < maxRepeatLength; i++) {
		const currSeqToCheck = digits.slice(0, i + 1).join('');
		const numRepeats = digitsStr.length / currSeqToCheck.length;
		if (!Number.isInteger(numRepeats)) {
			continue;
		}
		if (currSeqToCheck.repeat(numRepeats) === digitsStr) {
			return true;
		}
	}

	return false;
}

function findInvalidProductIds(
  range: ProductRange,
  detectionType: DetectionType = 'simple'
): number[] {
  let invalidAlgo: (number) => boolean;
  switch (detectionType) {
    case 'simple':
      invalidAlgo = isSimpleInvalidProductId;
      break;
    case 'advanced':
      invalidAlgo = isComplexInvalidProductId;
      break;
    default:
      assertNever('Unknown Invalid Product Detection Type');
      break;
  }
  const invalidIds = [];
  for (let currentProductId = range.start; currentProductId <= range.end; currentProductId++) {
    if (invalidAlgo(currentProductId)) {
      invalidIds.push(currentProductId);
    }
  }
  return invalidIds;
}

function runSampleInput(detectionType: DetectionType = 'simple') {
	const invalidProductIds = parseProductRanges(sampleInput).flatMap(range => {
		return findInvalidProductIds(range, detectionType);
	});
	const sum = invalidProductIds.reduce<number>((sum, curr) => {
		return sum += curr;
	}, 0);
	console.log('Sample input', detectionType, sum, invalidProductIds.length);
}

function runFullInput(detectionType: DetectionType = 'simple') {
	const fullInput = readFileSync('./inputs/day2-gift-shop-inventory.txt', 'utf8').trim();
	const invalidProductIds = parseProductRanges(fullInput).flatMap(range => {
		return findInvalidProductIds(range, detectionType);
	});
	const sum = invalidProductIds.reduce<number>((sum, curr) => {
		return sum += curr;
	}, 0);
	console.log('Full input', detectionType, sum, invalidProductIds.length);
}

// runSampleInput('simple');
// runSampleInput('advanced');
// runFullInput('simple');
runFullInput('advanced');
