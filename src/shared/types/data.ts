export interface Event {
	id: number;
	title: string;
	year: number;
}

export default interface Data {
	id: number;
	title: string;
	yearFrom: number;
	yearTo: number;
	events: Event[];
}