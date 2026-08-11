export const SearchMode = Object.freeze({
	NAME: 'q',
	CRITERION: 'question',
} as const);

export type SearchMode = (typeof SearchMode)[keyof typeof SearchMode];
