import type {
	InteractionHandledBy,
	InteractionStatus,
} from '@webitel/api-services/enums';
import type {
	EngineCallFile,
	EngineEndpoint,
	EngineHistoryCall,
	EngineLookup,
	EngineTranscriptLookup,
} from '@webitel/api-services/gen/models';
import type { ExportOptions } from '@webitel/ui-sdk/src/modules/CSVExport/composables/useExportFile';

import type { InteractionType } from '../enums/InteractionType.enum';

export type InteractionsRange = {
	from?: number | null;
	to?: number | null;
};

export type InteractionResponseItem = {
	type: InteractionType;
	id: string;
	parentId: string;
	createdAt: string;
	handledBy: InteractionHandledBy;
	direction: string;
	from?: EngineEndpoint;
	to?: EngineEndpoint;
	contact?: EngineLookup;
	agent?: EngineLookup;
	team?: EngineLookup;
	source?: EngineLookup;
	duration: number;
	status: InteractionStatus;
	evaluation?: {
		id: string;
		assignee?: EngineLookup;
		plan?: EngineLookup;
		dueAt?: string;
		scorecard?: EngineLookup;
		score?: number;
		ratedAt?: string;
		skipReason?: string;
		skippedBy?: EngineLookup;
		skippedAt?: string;
	};
	call?: EngineHistoryCall;
	chat?: {
		firstResponseSec?: number;
		messageCount?: number;
	};
};

export type InteractionsListItem = {
	id: string;
	type: string;
	parentId: string;
	interactionDate: string | null;
	interactionType: InteractionType;
	customer?: string;
	agent?: string;
	team?: string;
	duration: string;
	status: InteractionStatus;
	assignee?: string;
	score?: number;
	plan?: string;
	dueDate: string | null;
	isOverdue: boolean;
	ratedAt: string | null;
	scorecard?: string;
	handledBy: InteractionHandledBy;
	source?: string;
	firstResponse?: string;
	messages?: number;
	skipReason?: string;
	skippedBy?: string;
	skippedAt: string | null;
	files: Record<string, EngineCallFile[]>;
	transcripts: EngineTranscriptLookup[];
};

export type InteractionKey = Pick<InteractionsListItem, 'type' | 'id'>;

export type ExportInteractionsParams = GetInteractionsParams &
	ExportOptions & {
		interactions?: InteractionKey[];
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
	search?: string;
	fts?: string;
	description?: string;
};
