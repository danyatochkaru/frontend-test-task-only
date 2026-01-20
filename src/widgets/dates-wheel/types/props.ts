export default interface RoundProps {
	list: {
		title: string,
		yearFrom: number,
		yearTo: number,
	}[],
	yearFrom: number,
	yearTo: number,
	onChange: (index: number) => void,
}