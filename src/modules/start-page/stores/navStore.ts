import { AuditorSections, WtApplication } from '@webitel/ui-sdk/enums';
import { defineStore } from 'pinia';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import RoutePaths from '../../../app/router/_internals/RoutePaths.enum';
import { useUserinfoStore } from '../../userinfo/userInfoStore';
import InteractionsSecDark from '../assets/interactions-section-dark.svg';
import InteractionsSecLight from '../assets/interactions-section-light.svg';
import ScorecardsSecDark from '../assets/scorecards-section-dark.svg';
import ScorecardsSecLight from '../assets/scorecards-section-light.svg';

type NavItem = {
	value: string;
	name: string;
	route: string;
	disabled?: boolean;
};

type NavCard = NavItem & {
	disabled: boolean;
	text: string;
	images: {
		light: string;
		dark: string;
	};
};

export const useNavStore = defineStore('nav', () => {
	const { t } = useI18n();
	const router = useRouter();

	const { routeAccessGuard } = useUserinfoStore();

	const nav = computed(() => {
		const interactions = {
			value: AuditorSections.Interactions,
			name: t(
				`WtApplication.${WtApplication.Audit}.sections.${AuditorSections.Interactions}`,
			),
			route: RoutePaths.Interactions,
		};
		const scorecards = {
			value: AuditorSections.Scorecards,
			name: t(
				`WtApplication.${WtApplication.Audit}.sections.${AuditorSections.Scorecards}`,
			),
			route: RoutePaths.Scorecards,
		};
		const navItems = [
			interactions,
			scorecards,
		];

		return navItems.map((navItem) => {
			const route = router.resolve({
				path: navItem.route,
			});
			const hasAccess =
				(
					routeAccessGuard as (to: ReturnType<typeof router.resolve>) => boolean
				)(route) === true;
			return {
				...navItem,
				disabled: !hasAccess,
			};
		});
	});

	const navCards = computed((): NavCard[] => {
		const cardSectionPic = {
			[AuditorSections.Interactions]: {
				dark: InteractionsSecDark,
				light: InteractionsSecLight,
			},
			[AuditorSections.Scorecards]: {
				dark: ScorecardsSecDark,
				light: ScorecardsSecLight,
			},
		};

		return nav.value.map((navItem) => {
			return {
				...navItem,
				text: t(`startPage.${navItem.value}.text`),
				images: {
					light: cardSectionPic[navItem.value].light,
					dark: cardSectionPic[navItem.value].dark,
				},
			};
		});
	});

	return {
		nav,
		navCards,
	};
});
