import React from 'react';

import s from "./styles.module.scss";
import WheelDotProps from "../types/dot-props";

const WheelDot = (props: WheelDotProps) => {
	return (
		<div className={ s.dot } data-active={ props.isActive } onClick={ props.onClick }>
			<div className={ s.dot_value }>{ props.value }</div>
			<span className={ s.dot_title }>{ props.title }</span>
		</div>
	);
};

export default WheelDot;