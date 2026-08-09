<script lang="ts">
	import type { ActionConfig, FAQSectionProps } from "./types";
	import FAQList from "./components/FAQList/FAQList.svelte";

	let {
		faqs,
		title = "Pyetje të shpeshta",
		faq: faqProp
	}: FAQSectionProps = $props();

	const faq: ActionConfig = $derived({
		enabled: true,
		label: "Shih të gjitha",
		href: "/referendum/pyetje-te-shpeshta/",
		...faqProp
	});
</script>

<section class="faq-teaser" id="faq" aria-labelledby="faq-teaser-title" data-reveal>
	<div class="shell">
		<div class="faq-teaser__heading">
			<p class="section-kicker">Pyetje të shpeshta</p>
			<h2 id="faq-teaser-title">{title}</h2>
		</div>
		<FAQList {faqs} />
		{#if faq.enabled}
			<div class="faq-teaser__actions">
				<a href={faq.href}>{faq.label} <span aria-hidden="true">↗</span></a>
			</div>
		{/if}
	</div>
</section>
