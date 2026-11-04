type MockItem = Record<string, unknown>;

const getSortValue = (value: unknown) =>
	value && typeof value === 'object' && 'name' in value ? value.name : value;

export const sortItems = <T extends MockItem>(
	items: T[],
	sort?: string | null,
) => {
	if (!sort) return items;

	const direction = sort.startsWith('-') ? -1 : 1;
	const key = sort.replace(/^[+-]/, '');

	return [
		...items,
	].sort((a, b) => {
		const aValue = getSortValue(a[key]) ?? '';
		const bValue = getSortValue(b[key]) ?? '';
		if (aValue === bValue) return 0;
		return aValue > bValue ? direction : -direction;
	});
};

export const paginateItems = <T>(
	items: T[],
	{
		page,
		size,
	}: {
		page: number;
		size: number;
	},
) => {
	const start = (page - 1) * size;
	return {
		items: items.slice(start, start + size),
		next: items.length > start + size,
	};
};

export const isOneOf = (value: unknown, values: string[]) =>
	!values.length || values.includes(String(value));

export const isInRange = (
	value: unknown,
	{
		from,
		to,
	}: {
		from: string | null;
		to: string | null;
	},
) => {
	if (from === null && to === null) return true;
	if (typeof value !== 'number') return false;
	if (from !== null && value < Number(from)) return false;
	if (to !== null && value > Number(to)) return false;
	return true;
};
