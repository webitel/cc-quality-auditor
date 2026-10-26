import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	resolve: {
		dedupe: [
			'vue',
			'@vue/compat',
			'zod',
			'pinia',
		],
		alias: {
			'@': resolve(__dirname, 'src'),
			lodash: 'lodash-es',
		},
	},
	plugins: [
		vue({
			template: {
				compilerOptions: {
					compatConfig: {
						MODE: 2,
					},
				},
			},
		}),
	],
	test: {
		globals: true,
		alias: {
			vue: 'vue',
		},
		server: {
			deps: {
				inline: [
					'@webitel/ui-sdk',
					'@webitel/ui-datalist',
					'@webitel/api-services',
				],
			},
		},
		coverage: {
			enabled: true,
			reporter: 'json',
		},
		environment: 'happy-dom',
	},
});
