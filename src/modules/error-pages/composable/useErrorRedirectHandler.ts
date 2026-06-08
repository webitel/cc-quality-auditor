import { useRouter } from 'vue-router';
import { ErrorRedirectMap } from '../enems/ErrorRedirectMap.enum';

export function useErrorRedirectHandler() {
	const router = useRouter();

	const handleError = (
		err: {
			status?: number;
			response?: {
				status?: number;
			};
		} | null,
	) => {
		const status = err?.status ?? err?.response?.status;
		if (status == null) return;
		const to = ErrorRedirectMap[status as keyof typeof ErrorRedirectMap];
		if (to) return router.push(to);
	};

	return {
		handleError,
	};
}
