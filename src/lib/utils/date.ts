export const dateToString = (date: Date) => {
	return date.toLocaleDateString('en-us', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	});
};

export const minutesToDuration = (mins: number) => {
	const days = Math.floor(mins / 1440);
	mins = mins - days * 1440;
	const hours = Math.floor(mins / 60);
	mins = mins - hours * 60;

	let dur = 'PT';
	if (days > 0) {
		dur += days + 'D';
	}
	if (hours > 0) {
		dur += hours + 'H';
	}
	dur += mins + 'M';

	return dur;
};
