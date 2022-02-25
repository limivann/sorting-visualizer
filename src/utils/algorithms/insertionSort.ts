export const getInsertionSortAnimations = (items: number[]) => {
	const newArray = [...items];
	const animationArray = [[1]];
	for (let i = 1; i < newArray.length; i++) {
		let j = i;
		while (j > 0 && newArray[j] < newArray[j - 1]) {
			const temp = newArray[j];
			newArray[j] = newArray[j - 1];
			newArray[j - 1] = temp;
			j--;
		}
	}
	return [newArray, animationArray];
};
