import React from 'react';
import { EventProps } from "../types/props";
import { TitledText } from "../../../shared/ui";


const Event = (props: EventProps) => {
	return (
		<TitledText title={ `${ props.year }` } text={ props.title }/>
	);
};

export default Event;