import React, { useMemo } from 'react';
import SwitcherProps from "../types/props";

import s from './styles.module.scss'

const Switcher = (props: SwitcherProps) => {
	const current = useMemo(() => {
		if (props.currentIndex < 9) {
			return `0${ props.currentIndex + 1 }`;
		}

		return `${ props.currentIndex + 1 }`;
	}, [props.currentIndex])

	const total = useMemo(() => {
		if (props.totalItems < 9) {
			return `0${ props.totalItems }`;
		}

		return `${ props.totalItems }`;
	}, [props.totalItems])

	return (
		<div className={ s.wrapper }>
			<div className={ s.info }>{ current }/{ total }</div>
			<div className={ s.buttons }>
				<button
					className={ s.button }
					onClick={ props.onPrev }
					disabled={ props.currentIndex === 0 }
				>
					<svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg"
						 transform="rotate(180)">
						<path d="M0.707093 0.707092L5.70709 5.70709L0.707093 10.7071" stroke="#42567A" strokeWidth="2"/>
					</svg>
				</button>
				<button
					className={ s.button }
					onClick={ props.onNext }
					disabled={ props.currentIndex === props.totalItems - 1 }
				>
					<svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M0.707093 0.707092L5.70709 5.70709L0.707093 10.7071" stroke="#42567A" strokeWidth="2"/>
					</svg>
				</button>
			</div>
		</div>
	);
};

export default Switcher;