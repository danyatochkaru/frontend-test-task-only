import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';

import s from './styles.module.scss'
import { HomePageProps } from "../types/props";

import { DatesWheel } from "../../../widgets";
import { Event, setCurrentTopicIndex } from "../../../entities";
import { Carousel } from "../../../shared/ui";
import { Switcher } from "../../../features";
import { useAppDispatch, useAppSelector } from "../../../app/store";

const HomePage = (props: HomePageProps) => {
	const dispatch = useAppDispatch()
	const carouselRef = useRef<HTMLDivElement>(null);

	const currentTopicIndex = useAppSelector(state => state.topic.currentTopicIndex)
	const changeTopicIndex = useCallback((index: typeof currentTopicIndex) => {
		dispatch(setCurrentTopicIndex(index))
	}, [dispatch])

	const years = useMemo(() => ({
		from: props.data[currentTopicIndex].yearFrom,
		to: props.data[currentTopicIndex].yearTo,
	}), [currentTopicIndex, props.data])

	const changeTopic = useCallback((dirOrIndex: 'next' | 'prev' | number) => {
		gsap.fromTo(carouselRef.current, {
			opacity: 1,
		}, {
			duration: 0.3,
			opacity: 0,
			onComplete: () => {
				if (typeof dirOrIndex === 'string') {
					if (dirOrIndex === 'prev') {
						changeTopicIndex(currentTopicIndex > 0 ? currentTopicIndex - 1 : currentTopicIndex)
					}
					if (dirOrIndex === 'next') {
						changeTopicIndex(currentTopicIndex < props.data.length - 1 ? currentTopicIndex + 1 : currentTopicIndex)
					}
				} else {
					changeTopicIndex(dirOrIndex)
				}
			}
		})
	}, [changeTopicIndex, currentTopicIndex, props.data.length])

	useEffect(() => {
		if (carouselRef.current) {
			gsap.fromTo(carouselRef.current, {
				opacity: 0,
				y: 3,
			}, {
				duration: 0.2,
				opacity: 1,
				y: 0,
				ease: 'power1'
			})
		}
	}, [currentTopicIndex]);

	return (
		<div className={ `container ${ s.wrapper }` }>
			<h1 className={ s.title }>{ 'Исторические даты' }</h1>
			<DatesWheel
				list={ props.data }
				yearFrom={ years.from }
				yearTo={ years.to }
				onChange={ changeTopic }
			/>
			<div className={ s.switcher }>
				<Switcher
					currentIndex={ currentTopicIndex }
					totalItems={ props.data.length }
					onPrev={ () => changeTopic('prev') }
					onNext={ () => changeTopic('next') }
				/>
			</div>
			<div ref={ carouselRef }>
				<Carousel
					items={ props.data[currentTopicIndex].events.map((i) => (
						<Event
							key={ i.id }
							title={ i.title }
							year={ i.year }
						/>
					)) }
				/>
			</div>
		</div>
	);
};

export default HomePage;