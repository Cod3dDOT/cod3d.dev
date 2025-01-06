export const getAppUrl = () => {
	const url = process.env.NEXT_PUBLIC_URL;
	if (!url) throw new Error('NEXT_PUBLIC_URL is not defined');
	return new URL(url);
};
