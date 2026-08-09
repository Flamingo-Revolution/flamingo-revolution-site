<script lang="ts">
	import type { FAQ } from "../../../../../data/referendumFaq";

	interface Props {
		faqs: FAQ[];
	}

	let { faqs }: Props = $props();
</script>

<div class="faq-list" data-faq-list>
	{#each faqs as item (item.id)}
		<details data-faq-item>
			<summary>{item.title}</summary>
			{@html item.content}
		</details>
	{/each}
</div>
