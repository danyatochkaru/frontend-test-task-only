import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

const TOP = 0.85;

export const useWheel = (itemsCount: number, dotClassName = 'dot') => {
	const [activeIndex, setActiveIndex] = useState(0);

	const wrapperRef = useRef<HTMLDivElement>(null);
	const svgRef = useRef<SVGSVGElement>(null);
	const circleRef = useRef<SVGCircleElement>(null);

	const tweensRef = useRef<gsap.core.Tween[]>([]);
	const baseProgressRef = useRef<number[]>([]);
	const shiftStateRef = useRef<{ s: number }>({ s: 0 });

	const setIndex = (index: number) => {
		if (index === activeIndex) return;

		const tweens = tweensRef.current;
		const baseArr = baseProgressRef.current;
		const shiftState = shiftStateRef.current;

		const currentShift = shiftState.s;
		const currentGlobal = (baseArr[index] + currentShift) % 1;

		let delta = TOP - currentGlobal;
		if (delta > 0.5) delta -= 1;
		if (delta < -0.5) delta += 1;

		const targetShift = currentShift + delta;

		gsap.to(shiftState, {
			s: targetShift,
			duration: 0.8,
			ease: "power2.inOut",
			onUpdate() {
				shiftState.s = ((shiftState.s % 1) + 1) % 1;
				const s = shiftState.s;
				tweens.forEach((tw, idx) => {
					const p = (baseArr[idx] + s) % 1;
					tw.progress(p);
				});
			},
			onStart: () => {
				setActiveIndex(NaN)
			},
			onComplete: () => {
				setActiveIndex(index);
			}
		});
	};

	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			const wrapper = wrapperRef.current;
			if (!wrapper || !circleRef.current) return;

			const path = MotionPathPlugin.convertToPath(circleRef.current, false)[0];
			path.id = "circlePath";
			document.querySelector("svg")?.prepend(path);

			const dots: gsap.core.Tween[] = gsap.utils.toArray(`.${dotClassName}`);
			if (dots.length === 0) return;

			const tweens: gsap.core.Tween[] = [];
			const baseProgress: number[] = [];

			dots.forEach((dot, i) => {
				const base = i / itemsCount;
				baseProgress.push(base);

				const tween = gsap.to(dot, {
					duration: 1,
					paused: true,
					ease: "none",
					motionPath: {
						path,
						align: path,
						alignOrigin: [0.5, 0.5],
						start: 0,
						end: 1
					},
				});

				tweens.push(tween);
			});

			tweensRef.current = tweens;
			baseProgressRef.current = baseProgress;

			const shiftState = shiftStateRef.current;

			const currentGlobal = (baseProgress[0] + shiftState.s) % 1;
			let delta = TOP - currentGlobal;
			if (delta > 0.5) delta -= 1;
			if (delta < -0.5) delta += 1;
			shiftState.s += delta;
			shiftState.s = ((shiftState.s % 1) + 1) % 1;

			tweens.forEach((tw, idx) => {
				const p = (baseProgress[idx] + shiftState.s) % 1;
				tw.progress(p);
			});
		}, wrapperRef);

		return () => ctx.revert();
	}, [dotClassName, itemsCount]);

	return {
		wrapperRef,
		svgRef,
		circleRef,
		activeIndex,
		setIndex,
	}
}