import { HandledBy } from './HandledBy.enum';

export const HandledByWire = {
	[HandledBy.Agent]: 'HANDLED_BY_AGENT',
	[HandledBy.Bot]: 'HANDLED_BY_BOT',
	[HandledBy.Ivr]: 'HANDLED_BY_IVR',
} as const;

export const HandledByFromWire: Record<string, HandledBy> = {
	[HandledByWire[HandledBy.Agent]]: HandledBy.Agent,
	[HandledByWire[HandledBy.Bot]]: HandledBy.Bot,
	[HandledByWire[HandledBy.Ivr]]: HandledBy.Ivr,
};
