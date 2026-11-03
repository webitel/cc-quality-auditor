import { FormatDateMode } from '@webitel/ui-sdk/enums';
import { convertDuration } from '@webitel/ui-sdk/scripts';
import { snakeToCamel } from '@webitel/ui-sdk/scripts/caseConverters';
import { formatDate } from '@webitel/ui-sdk/utils';

import { interactionsMock } from './mock/interactionsMock';

type InteractionRaw = (typeof interactionsMock)[number];

type GetInteractionsParams = {
	page?: number;
	size?: number;
	sort?: string | null;
};

const computeDateAndTime = (timestamp?: number) => {
	if (!timestamp) return null;
	return formatDate(timestamp, FormatDateMode.DATETIME);
};

const transformResponseItems = (items: InteractionRaw[]) =>
	items.map((item) => ({
		...item,
		interactionDate: computeDateAndTime(item.interactionDate),
		duration: convertDuration(item.duration),
		agent: item.agent?.name,
		team: item.team?.name,
		assignee: item.assignee?.name,
	}));

const getSortValue = (item: InteractionRaw, key: string) => {
	const value = item[key as keyof InteractionRaw];
	return value && typeof value === 'object' && 'name' in value
		? value.name
		: value;
};

const sortItems = (items: InteractionRaw[], sort?: string | null) => {
	if (!sort) return items;

	const direction = sort.startsWith('-') ? -1 : 1;
	const key = snakeToCamel(sort.replace(/^[+-]/, ''));

	return [
		...items,
	].sort((a, b) => {
		const aValue = getSortValue(a, key) ?? '';
		const bValue = getSortValue(b, key) ?? '';
		if (aValue === bValue) return 0;
		return aValue > bValue ? direction : -direction;
	});
};

const getList = async ({
	page = 1,
	size = 10,
	sort,
}: GetInteractionsParams) => {
	const sortedItems = sortItems(interactionsMock, sort);
	const start = (page - 1) * size;

	return {
		items: transformResponseItems(sortedItems.slice(start, start + size)),
		next: sortedItems.length > start + size,
	};
};

const InteractionsAPIRepository = {
	getList,
};

export default InteractionsAPIRepository;
