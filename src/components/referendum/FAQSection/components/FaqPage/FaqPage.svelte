<script lang="ts">
	import {
		frequentlyAskedQuestions,
		topics,
		type FAQ,
		type FAQTopic
	} from "../../../../../data/referendumFaq";
	import FAQList from "../FAQList/FAQList.svelte";

	let query = $state("");
	let selectedTopic = $state<FAQTopic | undefined>(undefined);

	function filterFAQs(search: string, topic?: FAQTopic): FAQ[] {
		const needle = search.trim().toLowerCase();
		let results = frequentlyAskedQuestions;

		if (needle) {
			results = results.filter(
				(faq) =>
					faq.title.toLowerCase().includes(needle) ||
					faq.content.toLowerCase().includes(needle)
			);
		}

		if (topic) {
			results = results.filter((faq) => faq.topicId === topic);
		}

		return results;
	}

	const filteredFAQs = $derived.by(() => filterFAQs(query, selectedTopic));

	function faqsForTopic(topicId: string): FAQ[] {
		return filteredFAQs.filter((faq) => faq.topicId === topicId);
	}

	function selectTopic(topicId: FAQTopic) {
		selectedTopic = selectedTopic === topicId ? undefined : topicId;
	}

	const isEmpty = $derived(filteredFAQs.length === 0);
</script>

<section class="faq-section" id="faq" aria-labelledby="faq-title">
	<div class="shell">
		<div class="faq-heading" data-reveal>
			<div>
				<p class="section-kicker">Pyetje të shpeshta</p>
				<h2 id="faq-title">Çfarë duhet të dimë?</h2>
			</div>
		</div>

		<div class="faq-layout">
			<aside class="faq-topics" aria-label="Tema">
				{#each topics as topic (topic.id)}
					<button
						type="button"
						class="faq-topics__btn"
						class:is-active={selectedTopic === topic.id}
						onclick={() => selectTopic(topic.id)}
					>
						{topic.title}
					</button>
				{/each}
			</aside>

			<div class="faq-main">
				<div class="faq-search">
					<label for="faq-search">Kërko në pyetje</label>
					<input
						id="faq-search"
						type="search"
						placeholder="p.sh. firma, KQZ, diaspora…"
						autocomplete="off"
						data-faq-search
						bind:value={query}
					/>
				</div>

				<div class="faq-answers" id="answers">
					{#if isEmpty}
						<p class="faq-empty" data-faq-empty>
							Nuk u gjet asnjë pyetje me këtë kërkim.
						</p>
					{:else}
						{#each topics as topic (topic.id)}
							{@const topicFaqs = faqsForTopic(topic.id)}
							{#if topicFaqs.length > 0}
								<div class="faq-topic-group">
									<p class="faq-topic-label">{topic.title}</p>
									<FAQList faqs={topicFaqs} />
								</div>
							{/if}
						{/each}
					{/if}
				</div>
			</div>
		</div>

		<p class="legal-disclaimer">
			Kjo faqe është material informues dhe nuk përbën këshillë juridike. Për veprime zyrtare
			ndiqen aktet në fuqi, udhëzimet e KQZ-së dhe këshillimi profesional.
		</p>
	</div>
</section>
