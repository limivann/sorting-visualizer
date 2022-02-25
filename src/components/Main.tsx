import React, { useContext } from "react";
import { ItemsContext, SettingsContext } from "../utils/AlgoContext";

const Main = () => {
	const { items } = useContext(ItemsContext);
	const { settings } = useContext(SettingsContext);
	return (
		<section className="row-span-5">
			<div className="flex flex-row w-full h-full items-end overflow-hidden">
				{items.map((item: number, idx: number) => (
					<div
						key={`${item}-${settings.arrayLength}-${idx}`}
						className="flex-1"
						style={{
							backgroundColor: "black",
							height: `${item / 7}%`,
						}}
						id={`${idx}`}
					></div>
				))}
			</div>
		</section>
	);
};

export default Main;
