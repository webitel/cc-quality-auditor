export const SearchMode = {
	Search: 'search',
	Fts: 'fts',
	Description: 'description',
} as const;

export type SearchMode = (typeof SearchMode)[keyof typeof SearchMode];
