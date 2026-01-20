import React, { useEffect } from 'react';
import { useWheel } from "../hooks/useWheel";

import s from "./styles.module.scss";
import { WheelProps } from "../types/props";

import WheelDot from "./dot";
import { useAppSelector } from "../../../app/store";

const Wheel = (props: WheelProps) => {
	const { wrapperRef, svgRef, circleRef, activeIndex, setIndex } = useWheel(props.list.length, s.dot)

	const currentTopicIndex = useAppSelector(state => state.topic.currentTopicIndex)

	useEffect(() => {
		setIndex(currentTopicIndex)
	}, [currentTopicIndex, setIndex])

	return (
		<div ref={ wrapperRef } className={ s.circle_wrapper }>
			<svg
				ref={ svgRef }
				className={ s.circle }
				viewBox="0 0 400 400"
			>
				<circle
					ref={ circleRef }
					id="circlePath"
					cx="200"
					cy="200"
					r="200"
					fill="none"
				/>
			</svg>

			<div className={ s.dots_wrapper }>
				{ props.list.map((item, i) => (<>
						<WheelDot
							value={ i + 1 }
							title={ item.title }
							isActive={ activeIndex === i }
							onClick={ () => props.onChange(i) }
						/>
					</>
				)) }
			</div>
		</div>
	);
};

export default Wheel;