class MaxHeap {
	size: number = 0;
	heap: number[] = [];
	animArr: number[][] = [];
	constructor(arr: number[]) {
		if (!arr) {
			return;
		}
		this.size = arr.length;
		this.heap = arr;
		this.buildHeap();
	}

	buildHeap(): void {
		const firstParentIdx: number = Math.floor((this.size - 1) / 2);
		for (let i = firstParentIdx; i >= 0; i--) {
			this.sink(i);
		}
	}

	sink(i: number) {
		let childOneIdx: number = i * 2 + 1;
		let idxToSwap = -1;
		while (childOneIdx < this.size) {
			let childTwoIdx = i * 2 + 2 < this.size ? i * 2 + 2 : -1;
			if (
				childTwoIdx !== -1 &&
				this.heap[childTwoIdx] > this.heap[childOneIdx]
			) {
				idxToSwap = childTwoIdx;
			} else {
				idxToSwap = childOneIdx;
			}
			if (this.heap[idxToSwap] > this.heap[i]) {
				this.swap(idxToSwap, i);
				i = idxToSwap;
				childOneIdx = i * 2 + 1;
			} else {
				break;
			}
		}
	}

	swap(a: number, b: number) {
		this.animArr.push([a, b]);
		const tmp = this.heap[a];
		this.heap[a] = this.heap[b];
		this.heap[b] = tmp;
	}

	heapSort(): void {
		while (this.size > 1) {
			this.swap(--this.size, 0);
			this.sink(0);
		}
	}
}

export const getHeapSortAnimations = (items: number[]) => {
	let copiedArr = [...items];
	const priorityQ = new MaxHeap(copiedArr);
	priorityQ.heapSort();
	return { heapSorted: priorityQ.heap, heapSortedAnims: priorityQ.animArr };
};
