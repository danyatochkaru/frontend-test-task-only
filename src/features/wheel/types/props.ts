export interface WheelProps {
	list: {
		title: string
	}[],
	onChange: (index: number) => void,
}