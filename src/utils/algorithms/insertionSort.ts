export const getInsertionSortAnimations = (items: number[]) => {
	const newArray = [...items];
	const animationArray = [];
	for (let i = 1; i < newArray.length; i++) {
		let j = i;
		while (j > 0 && newArray[j] < newArray[j - 1]) {
			const temp = newArray[j];
			newArray[j] = newArray[j - 1];
			newArray[j - 1] = temp;

			// elements that we are swapping
			animationArray.push([j - 1, j]);
			j--;
		}
	}
	return { newArray, animationArray };
};
