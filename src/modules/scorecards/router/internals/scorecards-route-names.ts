import { AuditorSections } from '@webitel/ui-sdk/enums';

const RouteNames = {
	Scorecards: AuditorSections.Scorecards,
	Card: `${AuditorSections.Scorecards}-card`,
	General: `${AuditorSections.Scorecards}-general`,
	Criteria: `${AuditorSections.Scorecards}-criteria`,
} as const;

export default RouteNames;
