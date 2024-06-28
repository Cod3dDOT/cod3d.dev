export type eventType =
	| 'nav:toggle'
	| 'nav:theme:hover'
	| 'nav:toggle:hover'
	| 'nav:link:hover'
	| 'nav:email:hover'
	| 'nav:matrix:hover'
	| 'nav:github:hover';

export const eventBus = {
	on(event: eventType, callback: (data: { on: boolean }) => void) {
		// @ts-expect-error doesnt want the custom event
		document.addEventListener(event, (e: CustomEvent) => callback(e.detail));
	},
	dispatch(event: eventType, data: { on: boolean }) {
		document.dispatchEvent(new CustomEvent(event, { detail: data }));
	},
	remove(event: eventType, callback: (data: { on: boolean }) => void) {
		document.removeEventListener(event, callback as any);
	}
};
