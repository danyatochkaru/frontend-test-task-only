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

	const changeTopic = useCallback((navigationAction: 'next' | 'prev' | number) => {
		gsap.fromTo(carouselRef.current, {
			opacity: 1,
		}, {
			duration: 0.3,
			opacity: 0,
			onComplete: () => {
				if (typeof navigationAction === 'string') {
					if (navigationAction === 'prev') {
						changeTopicIndex(currentTopicIndex > 0 ? currentTopicIndex - 1 : currentTopicIndex)
					}
					if (navigationAction === 'next') {
						changeTopicIndex(currentTopicIndex < props.data.length - 1 ? currentTopicIndex + 1 : currentTopicIndex)
					}
				} else {
					changeTopicIndex(navigationAction)
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

	const events = useMemo(() => props.data[currentTopicIndex].events.map((event) => (
		<Event
			key={ event.id }
			title={ event.title }
			year={ event.year }
		/>
	)), [currentTopicIndex, props.data])

	const switcherDots = useMemo(() => props.data.map((item, index) => (
		<button
			key={ item.id }
			className={ s.switcher_dot }
			data-active={ index === currentTopicIndex }
			onClick={ () => changeTopic(index) }
		/>
	)), [changeTopic, currentTopicIndex, props.data])

	return (
		<div className={ `container ${ s.wrapper }` }>
			<h1 className={ s.title }>Исторические даты</h1>
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
				<h2 className={ s.eventTitle }>{ props.data[currentTopicIndex].title }</h2>
				<Carousel items={ events }/>
			</div>
			<div className={ s.switcher_mobile }>
				<Switcher
					currentIndex={ currentTopicIndex }
					totalItems={ props.data.length }
					onPrev={ () => changeTopic('prev') }
					onNext={ () => changeTopic('next') }
				/>
				<div className={ s.switcher_dots }>
					{ switcherDots }
				</div>
			</div>
		</div>
	);
};

export default HomePage;