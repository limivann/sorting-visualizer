import React, { useState, createContext } from "react";

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
	algoType: "merge sort",
	arrayLength: 25,
	delay: 3,
};

type SettingsContextType = {
	settings: Settings;
	setSettings?: React.Dispatch<React.SetStateAction<Settings>>;
};

export const SettingsContext = createContext<SettingsContextType>({
	settings: initVals,
});

const AlgoContext: React.FC<Props> = ({ children }) => {
	const [settings, setSettings] = useState<Settings>(initVals);
	return (
		<SettingsContext.Provider value={{ settings, setSettings }}>
			{children}
		</SettingsContext.Provider>
	);
};

export default AlgoContext;
