import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./app";

import { gsap } from "gsap";

import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { Provider } from "react-redux";
import { store } from "./app/store";

gsap.registerPlugin(MotionPathPlugin);

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
		<Provider store={ store }>
			<App/>
		</Provider>
	</React.StrictMode>
);