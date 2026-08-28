<script lang="ts">
	import { MediaQuery } from 'svelte/reactivity';
	import SharedFinalCta from '../../FinalCta/FinalCta.svelte';
	import { scrollToSignup as scrollToSignupTarget } from '../LandingNav/functions';

	const ENGAGE_HREF = 'https://pershqiperine.netlify.app';
	const prefersReducedMotion = new MediaQuery('(prefers-reduced-motion: reduce)');

	function scrollToSignup() {
		scrollToSignupTarget(prefersReducedMotion.current);
	}

	function onSignupClick(event: MouseEvent) {
		event.preventDefault();
		scrollToSignup();
	}
</script>

<SharedFinalCta
	title="Jini gati ditën që hapen firmat."
	description="Vendosni email-in tuaj qe te njoftoheni sapo te nisi mbledhja e firmave për këtë referendum."
>
	{#snippet prefix()}
		<div class="final-cta__deco" aria-hidden="true">
			<span class="final-cta__rule"></span>
			<span class="final-cta__stamp">50,000</span>
		</div>
	{/snippet}

	{#snippet children()}
		<a class="button" style="text-transform: uppercase;" href="#njoftime" onclick={onSignupClick}>
			Firmos dhe njoftohu
		</a>
	{/snippet}
</SharedFinalCta>
