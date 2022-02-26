import React, { useState, createContext, useEffect } from "react";
import {
	getInsertionSortAnimations,
	getMergeSortAnimations,
} from "./algorithms";

interface Props {
	children: React.ReactNode;
}

export type Algo = "merge sort" | "insertion sort";

interface Settings {
	algoType: Algo;
	arrayLength: number;
	delay: number;
}

const initVals: Settings = {
	algoType: "insertion sort",
	arrayLength: 25,
	delay: 3,
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
	}, [settings.arrayLength]);

	const sort = (algoType: Algo) => {
		switch (algoType) {
			case "insertion sort":
				console.log("Starting inserting sort");
				const { newArray, animationArray } = getInsertionSortAnimations(items);
				animateInsertion(newArray, animationArray).then(() => {
					setIsSorting(false);
				});
				break;
			case "merge sort":
				console.log("Starting merge sort");
				const animationArrayMS: number[][] = [];
				const copiedArray = [...items];
				getMergeSortAnimations(copiedArray, animationArrayMS);
				console.log(animationArrayMS);
				animateMerge(copiedArray, animationArrayMS).then(() => {
					setIsSorting(false);
				});
				break;
			default:
				break;
		}
	};

	const animateInsertion = async (
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
					div1.style.backgroundColor = "red";
					div2.style.backgroundColor = "red";
					// swap heights
					const div1Height = div1.style.height;
					div1.style.height = div2.style.height;
					div2.style.height = div1Height;

					// set back to original color
					setTimeout(() => {
						div1.style.backgroundColor = "black";
						div2.style.backgroundColor = "black";
						if (index === animationArray.length - 1) {
							setItems(newArray);
							resolve(0);
						}
					}, settings.delay * 3);
				}, settings.delay * index * 3);
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
					div.style.backgroundColor = "red";
					// swap heights
					div.style.height = `${newHeight / 7}%`;

					// set back to original color
					setTimeout(() => {
						div.style.backgroundColor = "black";
						if (index === animationArray.length - 1) {
							setItems(newArray);
							resolve(0);
						}
					}, settings.delay * 3);
				}, settings.delay * index * 3);
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
