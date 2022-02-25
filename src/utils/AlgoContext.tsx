import React, { useState, createContext, useEffect } from "react";
import { getInsertionSortAnimations } from "./algorithms";

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
};

export const SettingsContext = createContext<SettingsContextType>({
	settings: initVals,
	sort: algoType => {},
});

type ItemsContextType = {
	items: number[];
	setItems?: React.Dispatch<React.SetStateAction<number[]>>;
};
export const ItemsContext = createContext<ItemsContextType>({ items: [] });

const AlgoContext: React.FC<Props> = ({ children }) => {
	const [settings, setSettings] = useState<Settings>(initVals);
	const [items, setItems] = useState<number[]>([]);

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
				animateDivs(newArray, animationArray);
				break;
			case "merge sort":
				break;
			default:
				break;
		}
	};

	const animateDivs = (newArray: number[], animationArray: number[][]) => {
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
						// DONE
					}
				}, settings.delay * 3);
			}, settings.delay * index * 3);
			// index = index of animate array -> larger index will be animate last
		});
	};
	return (
		<ItemsContext.Provider value={{ items, setItems }}>
			<SettingsContext.Provider value={{ settings, setSettings, sort }}>
				{children}
			</SettingsContext.Provider>
		</ItemsContext.Provider>
	);
};

export default AlgoContext;
