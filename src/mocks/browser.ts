import { setupWorker } from 'msw/browser';

import { interactionsHandlers } from '../modules/interactions/api/mock/handlers';

export const worker = setupWorker(...interactionsHandlers);
