import React, { useEffect, useMemo, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';

import s from './styles.module.scss'
import 'swiper/css'
import 'swiper/css/navigation'

type Props = {
	items: React.ReactNode[];
}

const Carousel = (props: Props) => {
	const items = useMemo(() => props.items, [props.items]);
	const [key, setKey] = useState<number>(0);

	useEffect(() => {
		setKey(Date.now());
	}, [items])

	return (
		<div className={ s.wrapper }>
			<button className={ 'carousel-button-prev' }>
				<svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg"
					 transform="rotate(180)">
					<path d="M0.707093 0.707092L5.70709 5.70709L0.707093 10.7071" stroke="#3877EE" strokeWidth="2"/>
				</svg>
			</button>
			<Swiper
				key={ key }
				modules={ [Navigation] }
				spaceBetween={ 80 }
				slidesPerView={ 3 }
				navigation={ {
					nextEl: '.carousel-button-next',
					prevEl: '.carousel-button-prev',
					disabledClass: 'carousel-button-disabled',
				} }
			>
				{ items.map((item, index) => (
					<SwiperSlide key={ index }>
						{ item }
					</SwiperSlide>
				)) }
			</Swiper>
			<button className={ 'carousel-button-next' }>
				<svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M0.707093 0.707092L5.70709 5.70709L0.707093 10.7071" stroke="#3877EE" strokeWidth="2"/>
				</svg>
			</button>
		</div>
	);
};

export default Carousel;