import React from 'react';
import './index.scss';
import { HomePage } from "../pages/home";
import { DATA } from "./api";

const App = () => {
	return (
		<>
			<HomePage data={ DATA }/>
		</>
	);
};

export default App;