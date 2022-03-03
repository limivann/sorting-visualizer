import React, { useContext } from "react";
import { Algo, SettingsContext } from "../utils/AlgoContext";
import { colors } from "../constants";

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
		if (!setIsSorting) {
			console.log("WTF");
			return;
		}
		if (!isSorting) {
			sort(settings.algoType);
			setIsSorting(true);
		}
	};

	const shuffleArray: React.MouseEventHandler<HTMLButtonElement> = event => {
		if (!setSettings || !setIsSorting) {
			return;
		}
		setIsSorting(false);
		setSettings(prev => ({ ...prev, shuffleTrigger: !prev.shuffleTrigger }));
	};

	return (
		<nav
			className="w-screen text-white py-2 flex flex-row justify-center items-center pb-5"
			style={{ backgroundColor: colors.navBarBgColor }}
		>
			<div className="flex justify-center items-center basis-1/4 flex-col gap-2">
				<button className="hover:text-red-400" onClick={handleSortEvent}>
					Sort!
				</button>
				<button className="hover:text-red-400" onClick={shuffleArray}>
					Generate New Array!
				</button>
			</div>
			<div className="flex flex-col basis-1/4 items-center gap-2 justify-center">
				<div className="flex flex-col items-center w-full">
					<label htmlFor="items-amount" className="mb-2">
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
					<label htmlFor="speed" className="mb-2">
						Delay: {settings.speed}
					</label>
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

			<div className="flex flex-row basis-1/2 items-center justify-center my-2 gap-10">
				<div className="flex flex-row items-center justify-center gap-5 ">
					<button
						className={`border-solid border-2 shadow-md py-2 px-4 transition-all active:scale-95 ${
							settings.algoType === "bubble sort" &&
							"text-red-400 border-red-400"
						}`}
						onClick={() => onAlgoChange("bubble sort")}
					>
						Bubble Sort
					</button>
					<button
						className={`border-solid border-2 shadow-md py-2 px-4 transition-all active:scale-95 ${
							settings.algoType === "selection sort" &&
							"text-red-400 border-red-400"
						}`}
						onClick={() => onAlgoChange("selection sort")}
					>
						Selection Sort
					</button>
					<button
						className={`border-solid border-2 shadow-md py-2 px-4 transition-all active:scale-95 ${
							settings.algoType === "insertion sort" &&
							"text-red-400 border-red-400"
						}`}
						onClick={() => onAlgoChange("insertion sort")}
					>
						Insertion Sort
					</button>
					<button
						className={`border-solid border-2 shadow-md py-2 px-4 transition-all active:scale-95 ${
							settings.algoType === "merge sort" &&
							"text-red-400 border-red-400"
						}`}
						onClick={() => onAlgoChange("merge sort")}
					>
						Merge Sort
					</button>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
