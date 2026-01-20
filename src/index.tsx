import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./app";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { TextPlugin } from "gsap/TextPlugin";
import { Provider } from "react-redux";
import { store } from "./app/store";

gsap.registerPlugin(useGSAP, MotionPathPlugin, TextPlugin);

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