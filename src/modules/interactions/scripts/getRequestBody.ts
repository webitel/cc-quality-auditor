import { getDefaultGetParams } from '@webitel/api-services/api/defaults';
import { applyTransform, merge } from '@webitel/api-services/api/transformers';
import { RelativeDatetimeValue } from '@webitel/api-services/enums';
import type { DatetimeRangeValue } from '@webitel/api-services/scripts';
import { normalizeDatetimeRange } from '@webitel/api-services/scripts';
import { normalizeToTimestamp } from '@webitel/ui-sdk/scripts';

import { NotRequestedFields, RequiredFields } from '../configs/searchFields';
import { InteractionTypeWire } from '../enums/InteractionTypeWire.enum';
import type {
	ExportInteractionsParams,
	GetInteractionsParams,
	InteractionsRange,
} from '../types/interaction';

const normalizeInteractionDate = (value?: string | InteractionsRange) => {
	const range = normalizeDatetimeRange(value);
	if (range?.from == null && range?.to == null)
		return {
			from: normalizeToTimestamp(RelativeDatetimeValue.Today, {
				round: 'start',
			}),
		};
	return range;
};

const toWireRange = (range?: DatetimeRangeValue) => {
	if (!range) return undefined;
	const { from, to } = range;
	if (from == null && to == null) return undefined;
	return {
		from: from == null ? undefined : String(from),
		to: to == null ? undefined : String(to),
	};
};

const toWireList = <T>(values?: T[], map?: Record<string, string>) => {
	if (!values?.length) return undefined;
	return values.map((value) => (map ? map[String(value)] : String(value)));
};

const getRequestFields = (fields: string[] = []) => [
	...new Set([
		...RequiredFields,
		...fields
			.filter((field) => !NotRequestedFields.includes(field))
			.map((field) => field.split('.')[0]),
	]),
];

const getSearchFilter = ({
	createdAt,
	interactionType,
	contact,
	agent,
	team,
	talkDuration,
	interactionStatus,
	user,
	score,
	dueDate,
	ratedAt,
	scorecard,
	interactionHandledBy,
	firstResponse,
	messages,
	skippedBy,
	skippedAt,
	search,
	fts,
	description,
}: GetInteractionsParams) => ({
	created_at: toWireRange(normalizeInteractionDate(createdAt)),
	type: toWireList(interactionType, InteractionTypeWire),
	contact_id: toWireList(contact),
	agent_id: toWireList(agent),
	team_id: toWireList(team),
	duration: toWireRange(talkDuration),
	status: toWireList(interactionStatus),
	assignee_id: toWireList(user),
	score: toWireRange(score),
	due_at: toWireRange(normalizeDatetimeRange(dueDate)),
	rated_at: toWireRange(normalizeDatetimeRange(ratedAt)),
	scorecard_id: toWireList(scorecard),
	handled_by: toWireList(interactionHandledBy),
	first_response_sec: toWireRange(firstResponse),
	message_count: toWireRange(messages),
	skipped_by_id: toWireList(skippedBy),
	skipped_at: toWireRange(normalizeDatetimeRange(skippedAt)),
	q: search,
	fts,
	agent_description: description,
});

const getQueryBody = ({ sort, fields, ...filters }: GetInteractionsParams) => ({
	sort,
	fields: getRequestFields(fields),
	filter: getSearchFilter(filters),
});

export const getSearchBody = ({
	page,
	size,
	...params
}: GetInteractionsParams) =>
	applyTransform(
		{
			page,
			size,
			...getQueryBody(params),
		},
		[
			merge(getDefaultGetParams()),
		],
	);

export const getExportBody = ({
	format,
	separator,
	interactions,
	...params
}: ExportInteractionsParams) => ({
	...getQueryBody(params),
	format,
	separator,
	interactions,
});
