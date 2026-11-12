import { InteractionStatus } from '@webitel/api-services/enums';
import { FormatDateMode } from '@webitel/ui-sdk/enums';
import { convertDuration } from '@webitel/ui-sdk/scripts';
import { formatDate } from '@webitel/ui-sdk/utils';

import type {
	InteractionResponseItem,
	InteractionsListItem,
} from '../types/interaction';

const computeDateAndTime = (timestamp?: string) => {
	if (!timestamp) return null;
	return formatDate(Number(timestamp), FormatDateMode.DATETIME);
};

const getCustomer = ({ direction, from, to }: InteractionResponseItem) => {
	const customer = direction === 'outbound' ? to : from;
	return customer?.number || customer?.name;
};

export const toInteractionsListItem = (
	item: InteractionResponseItem,
): InteractionsListItem => {
	const { evaluation, chat, status } = item;
	return {
		id: item.id,
		type: item.type,
		parentId: item.parentId,
		interactionDate: computeDateAndTime(item.createdAt),
		interactionType: item.type,
		customer: getCustomer(item),
		agent: item.agent?.name,
		team: item.team?.name,
		duration: convertDuration(item.duration),
		status,
		assignee: evaluation?.assignee?.name,
		score: evaluation?.score,
		plan: evaluation?.plan?.name,
		dueDate: computeDateAndTime(evaluation?.dueAt),
		isOverdue:
			status === InteractionStatus.Pending &&
			!!evaluation?.dueAt &&
			Number(evaluation.dueAt) < Date.now(),
		ratedAt: computeDateAndTime(evaluation?.ratedAt),
		scorecard: evaluation?.scorecard?.name,
		handledBy: item.handledBy,
		source: item.source?.name,
		firstResponse:
			chat?.firstResponseSec == null
				? undefined
				: convertDuration(chat.firstResponseSec),
		messages: chat?.messageCount,
		skipReason: evaluation?.skipReason,
		skippedBy: evaluation?.skippedBy?.name,
		skippedAt: computeDateAndTime(evaluation?.skippedAt),
	};
};
