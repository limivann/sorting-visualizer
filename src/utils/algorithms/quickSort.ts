export const getQuickSortAnimations = (items: number[]) => {
	const copiedArr: number[] = [...items];
	const animArr: number[][] = [];
	quickSort(copiedArr, animArr, 0, copiedArr.length - 1);
	return { quickSorted: copiedArr, quickSortedAnims: animArr };
};

const quickSort = (
	arr: number[],
	animArr: number[][],
	low: number,
	high: number
) => {
	if (low >= high) {
		return;
	}
	let leftIdx = low;
	let rightIdx = high;
	let currentIdx = low;
	const pivot = arr[low];
	while (currentIdx <= rightIdx) {
		if (arr[currentIdx] < pivot) {
			swap(currentIdx, leftIdx, arr, animArr);
			leftIdx++;
			currentIdx++;
		} else if (arr[currentIdx] > pivot) {
			swap(currentIdx, rightIdx, arr, animArr);
			rightIdx--;
		} else {
			currentIdx++;
		}
	}
	quickSort(arr, animArr, low, leftIdx - 1);
	quickSort(arr, animArr, rightIdx + 1, high);
};

const swap = (a: number, b: number, arr: number[], animArr: number[][]) => {
	animArr.push([a, b]);
	const tmp = arr[a];
	arr[a] = arr[b];
	arr[b] = tmp;
};
