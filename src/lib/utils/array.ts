type Grouped<T> = {
	[key: string]: T[];
};

export function getGroupedBy<T>(arr: T[], key: keyof T): Grouped<T> {
	return arr.reduce<Grouped<T>>((acc: Grouped<T>, obj: T) => {
		const keyValue = obj[key];
		if (!Array.isArray(acc[String(keyValue)])) {
			acc[String(keyValue)] = [];
		}
		acc[String(keyValue)].push(obj);
		return acc;
	}, {});
}
