import React, { useState, createContext, useEffect } from "react";
import {
	getBubbleSortAnimations,
	getInsertionSortAnimations,
	getMergeSortAnimations,
} from "./algorithms";

import { colors } from "../constants";
interface Props {
	children: React.ReactNode;
}

export type Algo =
	| "merge sort"
	| "insertion sort"
	| "bubble sort"
	| "selection sort";

interface Settings {
	algoType: Algo;
	arrayLength: number;
	speed: number;
	shuffleTrigger: boolean;
}

const initVals: Settings = {
	algoType: "bubble sort",
	arrayLength: 120,
	speed: 2,
	shuffleTrigger: false,
};

// contexts
type SettingsContextType = {
	settings: Settings;
	setSettings?: React.Dispatch<React.SetStateAction<Settings>>;
	sort: (algoType: Algo) => void;
	isSorting: boolean;
	setIsSorting?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SettingsContext = createContext<SettingsContextType>({
	settings: initVals,
	sort: algoType => {},
	isSorting: false,
});

type ItemsContextType = {
	items: number[];
	setItems?: React.Dispatch<React.SetStateAction<number[]>>;
};
export const ItemsContext = createContext<ItemsContextType>({ items: [] });

const AlgoContext: React.FC<Props> = ({ children }) => {
	const [settings, setSettings] = useState<Settings>(initVals);
	const [items, setItems] = useState<number[]>([]);
	const [isSorting, setIsSorting] = useState<boolean>(false);

	useEffect(() => {
		const randomNumbers: number[] = [];
		for (let i = 0; i < settings.arrayLength; i++) {
			randomNumbers.push(Math.floor(Math.random() * 540) + 1);
		}
		setItems(randomNumbers);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [settings.arrayLength, settings.shuffleTrigger]);

	const sort = (algoType: Algo) => {
		switch (algoType) {
			case "insertion sort":
				console.log("Starting inserting sort");
				const { newArray, animationArray } = getInsertionSortAnimations(items);
				animateSwapDivs(newArray, animationArray).then(() => {
					setIsSorting(false);
				});
				break;
			case "merge sort":
				console.log("Starting merge sort");
				const animationArrayMS: number[][] = [];
				const copiedArray = [...items];
				getMergeSortAnimations(copiedArray, animationArrayMS);
				animateMerge(copiedArray, animationArrayMS).then(() => {
					setIsSorting(false);
				});
				break;
			case "bubble sort":
				console.log("Starting bubble sort");
				const animationArrayBS: number[][] = [];
				const sortedArrayBS = [...items];
				getBubbleSortAnimations(sortedArrayBS, animationArrayBS);
				animateSwapDivs(sortedArrayBS, animationArrayBS).then(() => {
					setIsSorting(false);
				});
				break;
			case "selection sort":
				console.log("Starting selection sort");
				break;
			default:
				break;
		}
	};

	const animateSwapDivs = async (
		newArray: number[],
		animationArray: number[][]
	): Promise<number> => {
		return new Promise<number>(resolve => {
			animationArray.forEach(([first, second], index) => {
				const div1 = document.getElementById(`${first}`);
				const div2 = document.getElementById(`${second}`);
				if (!div1 || !div2) {
					return;
				}
				setTimeout(() => {
					div1.style.backgroundColor = colors.swappedBarColor;
					div2.style.backgroundColor = colors.swappedBarColor;
					// swap heights
					const div1Height = div1.style.height;
					div1.style.height = div2.style.height;
					div2.style.height = div1Height;

					// set back to original color
					setTimeout(() => {
						div1.style.backgroundColor = colors.primaryBarColor;
						div2.style.backgroundColor = colors.primaryBarColor;
						if (index === animationArray.length - 1) {
							setItems(newArray);
							resolve(0);
						}
					}, settings.speed * 3);
				}, settings.speed * index * 3);
				// index = index of animate array -> larger index will be animate last
			});
		});
	};

	const animateMerge = async (
		newArray: number[],
		animationArray: number[][]
	): Promise<number> => {
		return new Promise<number>(resolve => {
			animationArray.forEach(([newHeight, idx], index) => {
				const div = document.getElementById(`${idx}`);
				if (!div) {
					return;
				}
				setTimeout(() => {
					div.style.backgroundColor = colors.swappedBarColor;
					// swap heights
					div.style.height = `${newHeight / 6}%`;

					// set back to original color
					setTimeout(() => {
						div.style.backgroundColor = colors.primaryBarColor;
						if (index === animationArray.length - 1) {
							setItems(newArray);
							resolve(0);
						}
					}, settings.speed * 3);
				}, settings.speed * index * 3);
				// index = index of animate array -> larger index will be animate last
			});
		});
	};
	return (
		<ItemsContext.Provider value={{ items, setItems }}>
			<SettingsContext.Provider
				value={{ settings, setSettings, sort, isSorting, setIsSorting }}
			>
				{children}
			</SettingsContext.Provider>
		</ItemsContext.Provider>
	);
};

export default AlgoContext;
