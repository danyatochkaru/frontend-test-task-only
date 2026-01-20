import React from 'react';
import s from './styles.module.scss'

type Props = {
	title: string;
	text: string;
}

const TitledText = (props: Props) => {
	return (
		<article className={ s.wrapper }>
			<h2 className={ s.title }>{ props.title }</h2>
			<p className={ s.text }>{ props.text }</p>
		</article>
	);
};

export default TitledText;