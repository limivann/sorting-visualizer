import React, { useContext } from "react";
import { Algo, SettingsContext } from "../utils/AlgoContext";

const NavBar = () => {
	const { settings, setSettings, sort, isSorting, setIsSorting } =
		useContext(SettingsContext);

	const onArrayLengthChange: React.ChangeEventHandler<
		HTMLInputElement
	> = event => {
		if (!setSettings || !setIsSorting) {
			return;
		}
		setIsSorting(false);
		setSettings(prev => ({ ...prev, arrayLength: +event.target.value * 5 }));
	};

	const onSpeedChange: React.ChangeEventHandler<HTMLInputElement> = event => {
		if (!setSettings) {
			return;
		}
		setSettings(prev => ({ ...prev, speed: +event.target.value }));
	};

	const onAlgoChange = (type: Algo) => {
		if (!setSettings) {
			return;
		}
		setSettings(prev => ({ ...prev, algoType: type }));
	};

	const handleSortEvent: React.MouseEventHandler<HTMLButtonElement> = () => {
		// TODO: fix sorting bug
		if (!setIsSorting) {
			console.log("WTF");
			return;
		}
		if (!isSorting) {
			sort(settings.algoType);
			setIsSorting(true);
		}
	};

	return (
		<nav className="w-screen h-fit grid grid-flow-row bg-gray-200">
			<div className="flex flex-row items-center justify-center w-full my-2 gap-5">
				<div>
					<button
						className={`border-solid border-2 border-black shadow-md py-2 px-4 transition-all active:scale-95 ${
							settings.algoType === "bubble sort" &&
							"text-red-400 border-red-400"
						}`}
						onClick={() => onAlgoChange("bubble sort")}
					>
						Bubble Sort
					</button>
					<button
						className={`border-solid border-2 border-black shadow-md py-2 px-4 transition-all active:scale-95 ${
							settings.algoType === "insertion sort" &&
							"text-red-400 border-red-400"
						}`}
						onClick={() => onAlgoChange("insertion sort")}
					>
						Insertion Sort
					</button>
					<button
						className={`border-solid border-2 border-black shadow-md py-2 px-4 transition-all active:scale-95 ${
							settings.algoType === "merge sort" &&
							"text-red-400 border-red-400"
						}`}
						onClick={() => onAlgoChange("merge sort")}
					>
						Merge Sort
					</button>
				</div>

				<button className="underline" onClick={handleSortEvent}>
					Sort!
				</button>
			</div>
			<div className="flex flex-row md:flex-col items-center w-full pb-3 ">
				<div className="flex flex-col items-center w-full">
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
						max={100}
						onChange={onArrayLengthChange}
					></input>
				</div>
				<div className="flex flex-col items-center w-full">
					<label htmlFor="speed">Speed: {settings.speed}</label>
					<input
						type="range"
						name="speed"
						id="speed"
						className="w-full max-w-2xl"
						defaultValue={2}
						min={1}
						max={10}
						onChange={onSpeedChange}
					></input>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
