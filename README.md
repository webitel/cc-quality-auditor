# cc-quality-auditor

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Dev API mocks (MSW)

Modules whose backend API doesn't exist yet are mocked with [MSW](https://mswjs.io). The worker starts only in dev (`import.meta.env.DEV` in `src/main.ts`). Unmocked requests go to the real backend (`onUnhandledRequest: 'bypass'`). Neither `msw` nor the mock data end up in `dist`.

### Add mocks for a new module
1. Write the API repository as a normal request via `@webitel/api-services` (`getDefaultInstance`, `applyTransform`, `generateUrl`, `snakeToCamel`). Keep the URL in a single exported constant.
2. Put the data in `src/modules/<module>/api/mock/<module>Mock.ts`.
3. Create `src/modules/<module>/api/mock/handlers.ts`: an `http.get(...)` handler on `${import.meta.env.VITE_API_URL}<url>` that returns the backend shape (snake_case, `{ items, next }` for lists). Use the sorting, pagination and filter helpers from `src/mocks/utils`.
4. Add the handlers to `setupWorker(...)` in `src/mocks/browser.ts`.

### Remove mocks once the API exists
1. Align the URL, the params and the response transform in the repository with the contract.
2. Delete `src/modules/<module>/api/mock/` and drop its handlers from `src/mocks/browser.ts`.
3. When no handlers are left: delete `src/mocks/`, `public/mockServiceWorker.js`, the `enableMocking` call in `src/main.ts`, and the `msw` devDependency plus the `msw` field in `package.json`.
