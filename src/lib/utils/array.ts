export function findInArray<T>(
	arr: T[],
	callback: (element: T, index: number, array: T[]) => boolean,
	...args: unknown[]
): T | undefined {
	if (typeof callback !== 'function') {
		throw new TypeError('callback must be a function');
	}

	const list = Object(arr);
	// Makes sure it always has a positive integer as length.
	const length = list.length >>> 0;
	const thisArg = args[2];

	for (let i = 0; i < length; i++) {
		const element = list[i];
		if (callback.call(thisArg, element, i, list)) {
			return element;
		}
	}

	return undefined;
}

type Grouped<T> = {
	[key: string]: T[];
};

export function getGroupedBy<T, K extends keyof T>(
	arr: T[],
	key: K
): Grouped<T> {
	return arr.reduce((acc: Grouped<T>, obj: T) => {
		const keyValue = obj[key];
		if (!acc[String(keyValue)]) {
			acc[String(keyValue)] = [];
		}
		acc[String(keyValue)].push(obj);
		return acc;
	}, {} as Grouped<T>);
}
