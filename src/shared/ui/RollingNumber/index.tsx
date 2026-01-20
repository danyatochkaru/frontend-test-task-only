import React, { BaseHTMLAttributes, useEffect, useRef, useState } from 'react';
import gsap from "gsap";

type Props = {
	value: number;
	from?: number;
} & BaseHTMLAttributes<HTMLSpanElement>

const RollingNumber = ({ from, value, ...props }: Props) => {
	const itemRef = useRef(null);

	const [currentValue, setCurrentValue] = useState(from || 0);

	useEffect(() => {
		gsap.to(itemRef.current, {
			innerText: value,
			duration: 2,
			ease: 'power2',
			snap: {
				innerText: 1
			},
			onComplete: () => {
				setCurrentValue(value);
			}
		})
	}, [value]);

	return (
		<span ref={ itemRef } { ...props }>
			{ currentValue }
		</span>
	);
};

export default RollingNumber;