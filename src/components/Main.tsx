import React, { useContext } from "react";
import { ItemsContext, SettingsContext } from "../utils/AlgoContext";
import { colors } from "../constants";

const Main = () => {
	const { items } = useContext(ItemsContext);
	const { settings } = useContext(SettingsContext);

	return (
		<section className="row-span-5 px-36 bg-gray-200 ">
			<div className="flex flex-row w-full h-full  overflow-hidden">
				{items.map((item: number, index: number) => (
					<div
						key={`${item}-${settings.arrayLength}-${index}`}
						className="flex-1 border border-white"
						style={{
							backgroundColor: colors.primaryBarColor,
							height: `${item / 6}%`,
						}}
						id={`${index}`}
					></div>
				))}
			</div>
		</section>
	);
};

export default Main;
