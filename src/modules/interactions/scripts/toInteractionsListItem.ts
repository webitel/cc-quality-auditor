import { InteractionStatus } from '@webitel/api-services/enums';
import { FormatDateMode } from '@webitel/ui-sdk/enums';
import { convertDuration } from '@webitel/ui-sdk/scripts';
import { formatDate } from '@webitel/ui-sdk/utils';

import type { InteractionResponseItem } from '../types/interaction';

const computeDateAndTime = (timestamp?: number) => {
	if (!timestamp) return null;
	return formatDate(timestamp, FormatDateMode.DATETIME);
};

export const toInteractionsListItem = (item: InteractionResponseItem) => ({
	...item,
	interactionDate: computeDateAndTime(item.interactionDate),
	duration: convertDuration(item.duration),
	agent: item.agent?.name,
	team: item.team?.name,
	assignee: item.assignee?.name,
	plan: item.plan?.name,
	dueDate: computeDateAndTime(item.dueDate),
	isOverdue:
		item.status === InteractionStatus.Pending &&
		!!item.dueDate &&
		item.dueDate < Date.now(),
	ratedAt: computeDateAndTime(item.ratedAt),
	scorecard: item.scorecard?.name,
	firstResponse: item.firstResponse && convertDuration(item.firstResponse),
	skippedBy: item.skippedBy?.name,
	skippedAt: computeDateAndTime(item.skippedAt),
});
