import React, { useContext } from "react";
import { Algo, SettingsContext } from "../utils/AlgoContext";
import { colors } from "../constants";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
const { Wave } = require("react-animated-text");

const NavBar = () => {
	const {
		settings,
		setSettings,
		sort,
		isSorting,
		setIsSorting,
		isSorted,
		setIsSorted,
	} = useContext(SettingsContext);

	const onArrayLengthChange: React.ChangeEventHandler<
		HTMLInputElement
	> = event => {
		if (!setSettings || !setIsSorting || !setIsSorted) {
			return;
		}
		setIsSorting(false);
		setSettings(prev => ({ ...prev, arrayLength: +event.target.value * 5 }));
		setIsSorted(false);
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
		if (!setIsSorting || !setIsSorted) {
			console.log("WTF");
			return;
		}
		if (isSorted) {
			console.log("ARRAY IS SORTED");
			return;
		}
		if (!isSorting) {
			sort(settings.algoType);
			setIsSorting(true);
		}
	};

	const shuffleArray: React.MouseEventHandler<HTMLButtonElement> = event => {
		if (!setSettings || !setIsSorting || !setIsSorted) {
			return;
		}
		setIsSorting(false);
		setSettings(prev => ({ ...prev, shuffleTrigger: !prev.shuffleTrigger }));
		setIsSorted(false);
	};

	return (
		<nav
			className="w-screen text-white py-2 flex flex-row justify-center items-center pb-5 px-28"
			style={{ backgroundColor: colors.navBarBgColor }}
		>
			<div className="flex basis-2/6 flex-col">
				<a
					href="/#"
					className="flex text-xl font-semibold tracking-widest uppercase rounded-lg text-white focus:outline-none focus:shadow-outline uppercase mb-2"
				>
					SORTING VIZUALIZER
				</a>
				<div className="text-red-600 tracking-widest uppercase text-sm">
					<Wave
						text={settings.algoType}
						effect="stretch"
						effectChange={2}
						effectDuration={0.5}
					/>
				</div>
			</div>

			<div className="flex flex-row basis-2/6 items-center gap-10 justify-center">
				<div className="flex flex-col items-center w-full gap-2">
					<label htmlFor="items-amount" className="mb-2 text-xs">
						Array Length: {settings.arrayLength}
					</label>
					<input
						type="range"
						name="items-amount"
						id="items-amount"
						className="w-full max-w-2xl form-range h-0.5 p-0"
						defaultValue={25}
						min={1}
						max={100}
						onChange={onArrayLengthChange}
						disabled={isSorting}
					></input>
				</div>
				<div className="flex flex-col items-center w-full gap-2">
					<label htmlFor="speed" className="mb-2 text-xs">
						Delay: {settings.speed}
					</label>
					<input
						type="range"
						name="speed"
						id="speed"
						className="w-full max-w-2xl form-range h-0.5 p-0"
						defaultValue={2}
						min={1}
						max={10}
						onChange={onSpeedChange}
						disabled={isSorting}
					></input>
				</div>
			</div>

			{/* <div className="flex flex-row basis-4/6 items-center justify-center my-2 gap-10">
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
			</div> */}

			<div className="flex justify-center items-center basis-1/6 flex-col gap-2 text-xs">
				<button
					className={
						isSorted ? "hidden" : !isSorting ? "hover:text-red-400" : ""
					}
					onClick={handleSortEvent}
					disabled={isSorting}
				>
					{!isSorting ? "Sort!" : "Sorting..."}
				</button>
				<button
					className={!isSorting ? "hover:text-red-400" : "hidden"}
					onClick={shuffleArray}
					disabled={isSorting}
				>
					Generate New Array!
				</button>
			</div>
			<div className="flex w-56 text-right justify-end align-center basis-1/6">
				<Menu as="div" className="relative inline-block text-left">
					<div>
						<Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
							Algorithms
							<ChevronDownIcon
								className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
								aria-hidden="true"
							/>
						</Menu.Button>
					</div>
					<Transition
						as={Fragment}
						enter="transition ease-out duration-100"
						enterFrom="transform opacity-0 scale-95"
						enterTo="transform opacity-100 scale-100"
						leave="transition ease-in duration-75"
						leaveFrom="transform opacity-100 scale-100"
						leaveTo="transform opacity-0 scale-95"
					>
						<Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
							<div className="px-1 py-1 ">
								<Menu.Item>
									{({ active }) => (
										<button
											className={`${
												active ? "bg-violet-500 text-white" : "text-gray-900"
											} group flex rounded-md items-center w-full px-2 py-2 text-sm`}
											onClick={() => onAlgoChange("bubble sort")}
										>
											Bubble Sort
										</button>
									)}
								</Menu.Item>
							</div>
							<div className="px-1 py-1">
								<Menu.Item>
									{({ active }) => (
										<button
											className={`${
												active ? "bg-violet-500 text-white" : "text-gray-900"
											} group flex rounded-md items-center w-full px-2 py-2 text-sm`}
											onClick={() => onAlgoChange("merge sort")}
										>
											Merge Sort
										</button>
									)}
								</Menu.Item>
							</div>
							<div className="px-1 py-1">
								<Menu.Item>
									{({ active }) => (
										<button
											className={`${
												active ? "bg-violet-500 text-white" : "text-gray-900"
											} group flex rounded-md items-center w-full px-2 py-2 text-sm`}
											onClick={() => onAlgoChange("insertion sort")}
										>
											Insertion Sort
										</button>
									)}
								</Menu.Item>
							</div>
						</Menu.Items>
					</Transition>
				</Menu>
			</div>
		</nav>
	);
};

export default NavBar;
