import React, { useContext } from "react";
import { Algo, SettingsContext } from "../utils/AlgoContext";

const NavBar = () => {
	const { settings, setSettings } = useContext(SettingsContext);
	const onArrayLengthChange: React.ChangeEventHandler<
		HTMLInputElement
	> = event => {
		if (!setSettings) {
			return;
		}
		setSettings(prev => ({ ...prev, arrayLength: +event.target.value * 5 }));
	};

	const onDelayChange: React.ChangeEventHandler<HTMLInputElement> = event => {
		if (!setSettings) {
			return;
		}
		setSettings(prev => ({ ...prev, delay: +event.target.value }));
	};

	const onAlgoChange = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		type: Algo
	) => {
		if (!setSettings) {
			return;
		}
		setSettings(prev => ({ ...prev, algoType: type }));
	};

	return (
		<nav className="w-screen bg-gray-200 grid grid-flow-row">
			<div className="flex flex-row items-center justify-center w-full my-2 gap-5">
				<div>
					<button
						className="border-solid border-2 border-black shadow-md py-2 px-4 transition-all active:scale-95"
						onClick={event => onAlgoChange(event, "insertion sort")}
					>
						Insertion Sort
					</button>
					<button
						className="border-solid border-2 border-black shadow-md py-2 px-4 transition-all active:scale-95"
						onClick={event => onAlgoChange(event, "merge sort")}
					>
						Merge Sort
					</button>
				</div>

				<button className="underline">Sort!</button>
			</div>
			<div className="flex flex-col items-center w-full pb-3">
				<label htmlFor="items-amount">
					Array Length: {settings.arrayLength}
				</label>
				<input
					type="range"
					name="items-amount"
					id="items-amount"
					className="w-full max-w-2xl"
					defaultValue={25}
					min={1}
					onChange={onArrayLengthChange}
				></input>
				<label htmlFor="delay">Delay: {settings.delay}</label>
				<input
					type="range"
					name="delay"
					id="delay"
					className="w-full max-w-2xl"
					defaultValue={15}
					min={1}
					onChange={onDelayChange}
				></input>
			</div>
		</nav>
	);
};

export default NavBar;
