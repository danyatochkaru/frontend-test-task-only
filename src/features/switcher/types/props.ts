export default interface SwitcherProps {
	totalItems: number;
	currentIndex: number;
	onPrev: () => void;
	onNext: () => void;
}