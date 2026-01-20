import React from 'react';
import RoundProps from "../types/props";

import s from './styles.module.scss'
import { RollingNumber } from "../../../shared/ui";
import { Wheel } from "../../../features";


const DatesWheel = (props: RoundProps) => {
	return (
		<div className={ s.wrapper }>
			<div className={ s.dates }>
				<RollingNumber value={ props.yearFrom } from={ 2000 }/>
				<RollingNumber value={ props.yearTo } from={ 2000 }/>
			</div>
			<Wheel list={ props.list } onChange={ props.onChange }/>
		</div>
	);
};

export default DatesWheel;