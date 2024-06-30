export const dateToString = (date: string) => {
	const d = new Date(date);
	return d.toLocaleDateString('en-us', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	});
};
