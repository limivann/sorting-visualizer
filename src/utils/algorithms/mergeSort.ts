export const getMergeSortAnimations = (
	items: number[],
	animationArray: number[][]
) => {
	mergeSort(items, [], 0, items.length - 1, animationArray);
};

const merge = (
	items: number[],
	aux: number[],
	low: number,
	mid: number,
	high: number,
	animationArray: number[][]
) => {
	// TODO: optimize merge sort
	// copy
	for (let i = low; i <= high; i++) {
		aux[i] = items[i];
	}
	let a = low;
	let b = mid + 1;
	for (let i = low; i <= high; i++) {
		// finished left
		if (a > mid) {
			// push to animation Array [the div changed, index of the div]
			animationArray.push([aux[b], i]);
			items[i] = aux[b++];
			// finished right
		} else if (b > high) {
			animationArray.push([aux[a], i]);
			items[i] = aux[a++];
		} else if (aux[a] <= aux[b]) {
			animationArray.push([aux[a], i]);
			items[i] = aux[a++];
		} else {
			animationArray.push([aux[b], i]);
			items[i] = aux[b++];
		}
	}
};

const mergeSort = (
	items: number[],
	aux: number[],
	low: number,
	high: number,
	animationArray: number[][]
) => {
	if (low >= high) {
		return;
	}
	const mid: number = low + Math.floor((high - low) / 2); // prevent int overflow
	mergeSort(items, aux, low, mid, animationArray);
	mergeSort(items, aux, mid + 1, high, animationArray);
	merge(items, aux, low, mid, high, animationArray);
};
