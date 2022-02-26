export const getBubbleSortAnimations = (
	items: number[],
	animationArray: number[][]
) => {
	for (let numPassed = 0; numPassed < items.length - 1; numPassed++) {
		let swapped = false;
		for (let i = 0; i < items.length - 1 - numPassed; i++) {
			if (items[i] > items[i + 1]) {
				const temp = items[i];
				items[i] = items[i + 1];
				items[i + 1] = temp;
				// elements that we are swapping
				animationArray.push([i, i + 1]);
				swapped = true;
			}
		}
		if (!swapped) {
			break;
		}
	}
};
