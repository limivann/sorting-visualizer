import React, { useState, createContext, useEffect } from "react";

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
};

export const SettingsContext = createContext<SettingsContextType>({
	settings: initVals,
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

	return (
		<ItemsContext.Provider value={{ items, setItems }}>
			<SettingsContext.Provider value={{ settings, setSettings }}>
				{children}
			</SettingsContext.Provider>
		</ItemsContext.Provider>
	);
};

export default AlgoContext;
