import React from "react";
import { NavBar, Main } from "./components";

function App() {
	return (
		<main className="grid grid-rows-6 w-screen h-screen">
			<NavBar />
			<Main />
		</main>
	);
}

export default App;
