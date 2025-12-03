import { assertNever } from "./ts-utils";
import { readFileSync } from "fs";

type Rotation = {
	direction: 'left' | 'right';
	distance: number;
}

function calculateZeroOccurences(startingPosition: number, rotations:Rotation[]) {
	let result = 0;
	let currPosition = startingPosition;
	rotations.forEach(rotation => {
		const normalizedDistance = rotation.distance % 100;

		let newPosition = 0;
		switch(rotation.direction) {
			case 'left':
				newPosition = currPosition - normalizedDistance;
				if (newPosition < 0) {
					newPosition = 100 + newPosition;
				}
				break;
			case 'right':
				newPosition = currPosition + normalizedDistance;
				if (newPosition > 99) {
					newPosition = newPosition - 100;
				}
				break;
			default:
				assertNever('Unknown rotation direction');
		}

		currPosition = newPosition;
		if (currPosition === 0) {
			result++;
		}
	});

	return result;
}

function buildRotations(input:string, delimitor = '\n'):Rotation[] {
	const result:Rotation[] = [];
	input.split(delimitor).forEach(operation => {
		const direction = operation[0] === 'L' ? 'left' : 'right';
		const distance = parseInt(operation.slice(1));
		result.push({ direction, distance });
	});
	return result;
}

function runSimpleTest() {
	const rotations = buildRotations('L68,L30,R48,L5,R60,L55,L1,L99,R14,L82', ',');
	const result = calculateZeroOccurences(50, rotations);
	console.log('Num zeros:', result);
}

function runDay1Input() {
	const rotationInputs = readFileSync('./inputs/day1-secret-safe.txt', 'utf8').trim();
	const rotations = buildRotations(rotationInputs);
	const result = calculateZeroOccurences(50, rotations);
	console.log('Num zeros:', result);
}

// runSimpleTest();
runDay1Input();
