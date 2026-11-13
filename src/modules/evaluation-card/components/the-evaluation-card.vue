<template>
  <div class="evaluation-card" />
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

import { InteractionTypeWire } from '../../interactions/enums/InteractionTypeWire.enum';

const route = useRoute();
const router = useRouter();

const interactionType = InteractionTypeWire[route.params.type as string];

if (!interactionType) {
	router.replace({
		name: 'not-found',
	});
}
</script>
