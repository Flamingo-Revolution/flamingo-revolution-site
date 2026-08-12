<script lang="ts">
	import { onMount } from 'svelte';
	import { Confetti } from 'svelte-confetti';
	import type { Attachment } from 'svelte/attachments';

	let active = $state(true);

	onMount(() => {
		const timeout = setTimeout(() => {
			active = false;
		}, 5000);

		return () => clearTimeout(timeout);
	});

	const portalToBody: Attachment<HTMLDivElement> = (node) => {
		document.body.appendChild(node);
		return () => node.remove();
	};
</script>

{#if active}
	<div
		class="success-confetti"
		style="top: -50px; height: 100vh; width: 100vw;"
		aria-hidden="true"
		{@attach portalToBody}
	>
		<Confetti
			x={[-5, 5]}
			y={[0, 0.1]}
			delay={[500, 2000]}
			duration={5000}
			amount={200}
			fallDistance="100vh"
			infinite
			disableForReducedMotion
		/>
	</div>
{/if}

<style>
	.success-confetti {
		position: fixed;
		z-index: 100;
		left: 0;
		display: flex;
		justify-content: center;
		overflow: hidden;
		pointer-events: none;
	}
</style>
