import type {
	ChannelType,
	InteractionStatus,
} from '@webitel/api-services/enums';

import type { HandledBy } from '../enums/HandledBy.enum';

type Lookup = {
	id: string;
	name: string;
};

export type InteractionsRange = {
	from?: number | null;
	to?: number | null;
};

export type InteractionResponseItem = {
	id: string;
	interactionDate: number;
	interactionType: ChannelType;
	customer: string;
	agent?: Lookup;
	team?: Lookup;
	duration: number;
	status: InteractionStatus;
	assignee?: Lookup;
	score?: number;
	plan?: Lookup;
	dueDate?: number;
	contactReason?: string;
	contactResult?: string;
	csat?: number;
	ratedAt?: number;
	scorecard?: Lookup;
	handledBy: HandledBy;
	source?: string;
	firstResponse?: number;
	messages?: number;
	skipReason?: string;
	skippedBy?: Lookup;
	skippedAt?: number;
};

export type GetInteractionsParams = {
	page?: number;
	size?: number;
	sort?: string | null;
	fields?: string[];
	createdAt?: string | InteractionsRange;
	interactionType?: string[];
	contact?: number[];
	agent?: number[];
	team?: number[];
	talkDuration?: InteractionsRange;
	interactionStatus?: string[];
	user?: number[];
	score?: InteractionsRange;
};
