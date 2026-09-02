<script lang="ts">
	type Person = 'rama' | 'berisha';

	type Card = {
		tag: string;
		text: string;
		person: Person;
		who: string;
		explain: string;
	};

	type Answer = {
		item: Card;
		guess: Person;
		isCorrect: boolean;
	};

	const CARDS: Card[] = [
		{
			tag: '2018 → 2023',
			text: 'U premtua se plehrat do të ktheheshin në pasuri; kontrata u shndërrua në skandal korrupsioni me ministër të burgosur.',
			person: 'rama',
			who: 'Edi Rama',
			explain: 'Ishte qeveria e Edi Ramës. Projekti i inceneratorëve u shndërrua në skandal — SPAK e dënoi ish-ministrin e Mjedisit Lefter Koka për ryshfet lidhur me koncesionin.'
		},
		{
			tag: '2005 → 2012',
			text: "U premtua ‘zero tolerancë’ ndaj drogës; vite më vonë, një fshat i tërë u bë i njohur ndërkombëtarisht për kultivim droge.",
			person: 'berisha',
			who: 'Sali Berisha',
			explain: "Ishte Sali Berisha. Në 2005 premtoi ‘zero tolerancë’. Fshati Lazarat u raportua nga media ndërkombëtare si një nga qendrat më të mëdha të kultivimit të kanabisit në Evropë, gjatë mandatit të tij të dytë."
		},
		{
			tag: '2025',
			text: 'Kryebashkiaku i kryeqytetit, nga i njëjti krah politik, u arrestua nga SPAK për korrupsion e grup i strukturuar kriminal.',
			person: 'rama',
			who: 'Edi Rama (PS)',
			explain: 'Erion Veliaj, Kryetar i Bashkisë Tiranë (PS, i njëjti krah qeverisës si Rama), u arrestua nga SPAK në 2025 me akuza për korrupsion dhe pjesëmarrje në grup të strukturuar kriminal.'
		},
		{
			tag: '2021',
			text: "U shpall ‘persona non grata’ nga SHBA për ‘korrupsion domethënës’.",
			person: 'berisha',
			who: 'Sali Berisha',
			explain: "Ishte Sali Berisha. Departamenti i Shtetit Amerikan e shpalli ‘non grata’ në 2021, hap i ndjekur më vonë edhe nga Mbretëria e Bashkuar."
		},
		{
			tag: '2025',
			text: 'Zëvendëskryeministrja u akuzua nga SPAK për korrupsion në tendera rrugësh, por Kuvendi refuzoi ta arrestonte.',
			person: 'rama',
			who: 'Edi Rama',
			explain: 'Ishte qeveria e Edi Ramës. Belinda Balluku, ish-Ministre e Infrastrukturës, u akuzua nga SPAK; Kuvendi (me votat e PS) nuk autorizoi arrestimin e kërkuar.'
		},
		{
			tag: '2008',
			text: 'Gjatë kësaj qeverisjeje, shpërtheu një depo e madhe municioni pranë Tiranës, duke vrarë 26 veta.',
			person: 'berisha',
			who: 'Sali Berisha',
			explain: 'Ishte qeveria e Sali Berishës. Shpërthimi i Gërdecit (mars 2008) vrau 26 persona dhe plagosi mbi 100. Ministri i Mbrojtjes, Fatmir Mediu, dha dorëheqjen; çështja ende gjykohet nga SPAK.'
		},
		{
			tag: '2017 → 2022',
			text: 'Ish-Ministri i Brendshëm i kësaj qeverie u dënua nga gjykata për shpërdorim detyre lidhur me trafikun e kanabisit.',
			person: 'rama',
			who: 'Edi Rama',
			explain: 'Ishte qeveria e Edi Ramës. Saimir Tahiri u dënua për shpërdorim detyre, pasi si ministër mbajti kontakte me persona të përfshirë në trafik kanabisi dhe nuk e ndaloi fenomenin.'
		},
		{
			tag: '2009 → sot',
			text: 'Një rrugë e rëndësishme malore u premtua zyrtarisht, por mbeti e papërfunduar për vite me radhë përkundër fondeve të akorduara.',
			person: 'berisha',
			who: 'Sali Berisha',
			explain: 'Ishte Sali Berisha. Rruga Qukës–Qafë Plloçë u premtua në 2009; mbetet ndër premtimet e shkelura më gjatë në kohë, me dyshime për keqmenaxhim fondesh.'
		},
		{
			tag: '1997',
			text: 'Gjatë kësaj presidence, kolapsi i skemave piramidale çoi vendin në kaos, dhunë dhe pothuajse luftë civile.',
			person: 'berisha',
			who: 'Sali Berisha',
			explain: 'Ishte Sali Berisha, President në atë kohë. Rrëzimi i skemave piramidale në 1997 shkatërroi kursimet e mijëra familjeve dhe çoi në trazira të armatosura anembanë vendit.'
		},
		{
			tag: '2023 → sot',
			text: 'Ish-Zëvendëskryeministri i kësaj qeverie u arratis jashtë vendit pikërisht kur po kërkohej arrestimi i tij.',
			person: 'rama',
			who: 'Edi Rama',
			explain: 'Ishte qeveria e Edi Ramës. Arben Ahmetaj u arratis në verën e 2023, teksa SPAK kërkonte arrestimin e tij për korrupsion, pastrim parash dhe fshehje pasurie.'
		}
	];

	const MAX_HINTS = 3;
	let screen = $state<'intro' | 'play' | 'results'>('intro');
	let current = $state(0);
	let correct = $state(0);
	let wrong = $state(0);
	let hintsLeft = $state(MAX_HINTS);
	let hintShown = $state(false);
	let answers = $state<Answer[]>([]);
	let dragging = $state(false);
	let dragX = $state(0);
	let dragY = $state(0);
	let flying = $state<'left' | 'right' | null>(null);
	let locked = $state(false);
	let startX = 0;
	let startY = 0;
	let activePointer: number | null = null;

	let visibleCards = $derived(CARDS.slice(current, current + 3));
	let progress = $derived(Math.round((current / CARDS.length) * 100));

	function startGame() {
		current = 0;
		correct = 0;
		wrong = 0;
		hintsLeft = MAX_HINTS;
		hintShown = false;
		answers = [];
		dragX = 0;
		dragY = 0;
		flying = null;
		locked = false;
		screen = 'play';
	}

	function revealHint() {
		if (hintShown || hintsLeft === 0 || locked) return;
		hintsLeft -= 1;
		hintShown = true;
	}

	function choose(guess: Person) {
		if (locked || !CARDS[current]) return;
		locked = true;
		flying = guess === 'rama' ? 'right' : 'left';

		const item = CARDS[current];
		const isCorrect = item.person === guess;
		answers = [...answers, { item, guess, isCorrect }];
		if (isCorrect) correct += 1;
		else wrong += 1;

		window.setTimeout(() => {
			if (current + 1 >= CARDS.length) {
				screen = 'results';
			} else {
				current += 1;
				hintShown = false;
			}
			dragging = false;
			dragX = 0;
			dragY = 0;
			flying = null;
			locked = false;
		}, 420);
	}

	function startDrag(event: PointerEvent) {
		if (locked) return;
		activePointer = event.pointerId;
		startX = event.clientX;
		startY = event.clientY;
		dragging = true;
		(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
	}

	function moveDrag(event: PointerEvent) {
		if (!dragging || event.pointerId !== activePointer) return;
		dragX = event.clientX - startX;
		dragY = event.clientY - startY;
	}

	function endDrag(event: PointerEvent) {
		if (!dragging || event.pointerId !== activePointer) return;
		dragging = false;
		activePointer = null;
		if (dragX > 88) choose('rama');
		else if (dragX < -88) choose('berisha');
		else {
			dragX = 0;
			dragY = 0;
		}
	}

	function cardTransform(depth: number) {
		if (depth === 0 && flying) {
			const direction = flying === 'right' ? 1 : -1;
			return `translate(${direction * 125}vw, -8rem) rotate(${direction * 32}deg) scale(.92)`;
		}
		if (depth === 0 && (dragging || dragX !== 0)) {
			return `translate(${dragX}px, ${dragY}px) rotate(${dragX * 0.055}deg) scale(1.02)`;
		}
		return `translateY(${depth * 0.8}rem) scale(${1 - depth * 0.045})`;
	}

	function verdict() {
		const ratio = correct / CARDS.length;
		if (ratio >= 0.8) return ['Vëzhgues i mprehtë', 'E njeh mirë historikun e pushtetit — dallon shpejt mes fjalëve dhe fakteve.'];
		if (ratio >= 0.5) return ['Në rrugë të mirë', 'Ke intuitë të mirë, por disa raste të kanë befasuar. Shiko shpjegimet më poshtë.'];
		return ['Kohë për të kontrolluar burimet', "Këto tema mbahen mend lehtë gabim. Shiko shpjegimet më poshtë për t'u rifreskuar."];
	}
</script>

<section class="politics-game" aria-labelledby="politics-game-title">
	<header class="politics-game__masthead">
		<p>Kush e bëri?</p>
		<h1 id="politics-game-title">Rama apo Berisha?</h1>
		<p>Lëviz djathtas për Ramën, majtas për Berishën — ose përdor butonat.</p>
	</header>

	{#if screen === 'intro'}
		<div class="intro-card">
			<span class="game-label">Gati?</span>
			<p><strong>{CARDS.length} raste reale.</strong> Zgjidh se kujt i përket secili rast. Ke {MAX_HINTS} ndihma që zbulojnë vitin.</p>
			<div class="legend" aria-label="Udhëzimet e lojës">
				<span>← Berisha</span>
				<span>Rama →</span>
			</div>
			<button type="button" class="primary-action" onclick={startGame}>Fillo lojën</button>
		</div>
	{:else if screen === 'play'}
		<div class="game-status">
			<div class="progress" aria-label={`${progress}% e lojës e përfunduar`}><span style:width={`${progress}%`}></span></div>
			<strong>{current + 1} / {CARDS.length}</strong>
		</div>
		<div class="score" aria-label="Rezultati aktual">
			<span class="score--correct">✓ {correct}</span>
			<span class="score--wrong">✕ {wrong}</span>
		</div>

		<div class="card-stack">
			<button class="hint-button" type="button" onclick={revealHint} disabled={hintShown || hintsLeft === 0 || locked} aria-label={`Ndihmë, ${hintsLeft} të mbetura`}>
				💡 <span>{hintsLeft}</span>
			</button>
			{#if hintShown}<div class="hint-tag" role="status">{CARDS[current].tag}</div>{/if}

			{#each visibleCards as item, depth (item.text)}
				<article
					class:card--top={depth === 0}
					class:card--flying={depth === 0 && flying}
					class="question-card"
					style:z-index={10 - depth}
					style:transform={cardTransform(depth)}
					onpointerdown={depth === 0 ? startDrag : undefined}
					onpointermove={depth === 0 ? moveDrag : undefined}
					onpointerup={depth === 0 ? endDrag : undefined}
					onpointercancel={depth === 0 ? endDrag : undefined}
				>
					{#if depth === 0}
						<span class="answer-stamp answer-stamp--berisha" style:opacity={Math.min(Math.max(-dragX / 90, 0), 1)}>BERISHA</span>
						<span class="answer-stamp answer-stamp--rama" style:opacity={Math.min(Math.max(dragX / 90, 0), 1)}>RAMA</span>
					{/if}
					<p>{item.text}</p>
				</article>
			{/each}
		</div>

		<div class="choice-labels" aria-hidden="true"><span>← BERISHA</span><span>RAMA →</span></div>
		<div class="choices">
			<button type="button" class="choice choice--berisha" onclick={() => choose('berisha')} disabled={locked}>B</button>
			<button type="button" class="choice choice--rama" onclick={() => choose('rama')} disabled={locked}>R</button>
		</div>
	{:else}
		{@const finalVerdict = verdict()}
		<div class="results-card">
			<p>Rezultati yt</p>
			<strong>{correct}/{CARDS.length}</strong>
			<h2>{finalVerdict[0]}</h2>
			<p>{finalVerdict[1]}</p>
			<button type="button" class="primary-action" onclick={startGame}>Provo përsëri</button>
		</div>

		<div class="answer-list">
			<h2>Përgjigjet</h2>
			{#each answers as answer, index}
				<article>
					<div class="answer-list__head">
						<span class:answer-list__correct={answer.isCorrect} class:answer-list__wrong={!answer.isCorrect}>{answer.isCorrect ? '✓' : '✕'}</span>
						<strong>{index + 1}. {answer.item.tag} — {answer.item.who}</strong>
					</div>
					<p>{answer.item.text}</p>
					<p>{answer.item.explain}</p>
				</article>
			{/each}
		</div>
	{/if}

	<p class="source-note">Përmbajtja e lojës bazohet në fakte të verifikueshme dhe materialin redaksional të dhënë.</p>
</section>

<style>
	.politics-game {
		width: min(100%, 36rem);
		margin: 0 auto;
		color: var(--text);
	}

	.politics-game__masthead { margin-bottom: 1.4rem; text-align: center; }
	.politics-game__masthead > p:first-child {
		display: inline-block;
		margin: 0 0 0.8rem;
		padding: 0.35rem 0.7rem;
		border: 2px solid var(--ink);
		background: var(--accent-soft);
		box-shadow: 3px 3px 0 var(--ink);
		color: var(--accent-strong);
		font-size: 0.75rem;
		font-weight: 800;
		letter-spacing: 0.11em;
		text-transform: uppercase;
	}

	.politics-game__masthead h1 {
		display: block;
		max-width: none;
		color: var(--text);
		font-size: clamp(2.2rem, 7vw, 3.6rem);
		line-height: 0.95;
		text-align: center;
	}
	.politics-game__masthead > p:last-child { max-width: 31rem; margin: 0.8rem auto 0; color: var(--muted); font-weight: 700; line-height: 1.45; }

	.intro-card,
	.results-card {
		padding: clamp(1.5rem, 5vw, 2.5rem);
		border: 3px solid var(--ink);
		background: var(--surface);
		box-shadow: 8px 8px 0 var(--ink);
		text-align: center;
	}

	.intro-card > p { margin: 1.2rem 0; font-size: 1.08rem; line-height: 1.55; }
	.game-label { display: inline-block; padding: 0.35rem 0.7rem; background: var(--accent); color: #151515; font-weight: 800; text-transform: uppercase; }
	.legend { display: flex; justify-content: space-between; gap: 1rem; margin: 1rem 0 1.5rem; color: var(--muted); font-size: 0.8rem; font-weight: 800; letter-spacing: 0.08em; }

	.primary-action {
		width: 100%;
		min-height: 3.2rem;
		padding: 0.75rem 1rem;
		border: 2px solid var(--ink);
		background: var(--ink);
		box-shadow: 5px 5px 0 var(--accent);
		color: var(--ink-reverse);
		font: inherit;
		font-weight: 800;
		cursor: pointer;
	}

	.game-status { display: flex; align-items: center; gap: 0.8rem; margin-bottom: 0.8rem; }
	.progress { flex: 1; height: 0.65rem; border: 2px solid var(--ink); background: var(--surface); }
	.progress span { display: block; height: 100%; background: var(--accent); transition: width 220ms ease; }
	.game-status > strong { font-size: 0.78rem; }

	.score { display: flex; justify-content: center; gap: 0.75rem; margin-bottom: 1.1rem; }
	.score span { min-width: 4.3rem; padding: 0.35rem 0.65rem; border: 2px solid var(--ink); background: var(--surface); box-shadow: 3px 3px 0 var(--ink); font-weight: 800; }
	.score--correct { color: #198754; }
	.score--wrong { color: #d83a31; }

	.card-stack { position: relative; height: clamp(22rem, 64vw, 27rem); margin-bottom: 1.4rem; }
	.question-card {
		position: absolute;
		inset: 0;
		display: grid;
		place-items: center;
		padding: clamp(1.5rem, 6vw, 3rem);
		border: 3px solid var(--ink);
		background:
			linear-gradient(rgba(20, 20, 20, 0.045) 1px, transparent 1px),
			linear-gradient(90deg, rgba(20, 20, 20, 0.04) 1px, transparent 1px),
			var(--surface);
		background-size: 1rem 1rem;
		box-shadow: 8px 8px 0 var(--ink);
		text-align: center;
		transition: transform 220ms ease, opacity 220ms ease;
		user-select: none;
	}
	.question-card.card--top { cursor: grab; touch-action: none; }
	.question-card.card--top:active { cursor: grabbing; }
	.question-card.card--flying { opacity: 0; transition: transform 410ms cubic-bezier(.2,.8,.3,1), opacity 410ms ease; }
	.question-card p { max-width: 28ch; margin: 0; font-size: clamp(1.2rem, 4.5vw, 1.65rem); font-weight: 800; line-height: 1.35; }

	.hint-button {
		position: absolute;
		top: -1rem;
		right: -0.8rem;
		z-index: 30;
		display: inline-flex;
		align-items: center;
		gap: 0.2rem;
		min-height: 2.7rem;
		padding: 0.35rem 0.65rem;
		border: 2px solid var(--ink);
		border-radius: 50%;
		background: #ffe172;
		box-shadow: 4px 4px 0 var(--ink);
		color: #151515;
		font: inherit;
		font-weight: 800;
		cursor: pointer;
	}
	.hint-button:disabled { cursor: default; opacity: 0.5; }
	.hint-button span { font-size: 0.7rem; }
	.hint-tag { position: absolute; top: -0.65rem; right: 3.5rem; z-index: 29; padding: 0.45rem 0.7rem; border: 2px solid var(--ink); background: var(--ink); color: var(--ink-reverse); font-weight: 800; }

	.answer-stamp { position: absolute; top: 2rem; padding: 0.45rem 0.65rem; border: 4px solid currentColor; font-size: 1.4rem; font-weight: 800; }
	.answer-stamp--berisha { left: 1.5rem; color: #188b8e; transform: rotate(10deg); }
	.answer-stamp--rama { right: 1.5rem; color: #e45c3f; transform: rotate(-10deg); }

	.choice-labels { display: flex; justify-content: space-between; margin-bottom: 0.75rem; color: var(--muted); font-size: 0.76rem; font-weight: 800; letter-spacing: 0.08em; }
	.choices { display: flex; justify-content: center; gap: 1.25rem; }
	.choice { width: 4.3rem; height: 4.3rem; border: 3px solid var(--ink); border-radius: 50%; box-shadow: 5px 5px 0 var(--ink); color: #151515; font: inherit; font-size: 1.3rem; font-weight: 800; cursor: pointer; }
	.choice--berisha { background: #71d5d7; }
	.choice--rama { background: #ff9770; }
	.choice:disabled { cursor: default; opacity: 0.6; }

	.results-card > p:first-child { margin: 0 0 0.4rem; color: var(--accent-strong); font-size: 0.75rem; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; }
	.results-card > strong { display: block; color: var(--accent-strong); font-size: clamp(4rem, 15vw, 6rem); line-height: 1; }
	.results-card h2 { max-width: none; margin: 0.4rem 0; font-size: clamp(1.6rem, 5vw, 2.2rem); }
	.results-card > p:nth-of-type(2) { margin: 0.7rem auto 1.5rem; color: var(--muted); font-weight: 700; line-height: 1.55; }

	.answer-list { display: grid; gap: 1rem; margin-top: 2.5rem; }
	.answer-list > h2 { margin-bottom: 0.2rem; font-size: 2rem; }
	.answer-list article { padding: 1rem; border: 2px solid var(--ink); background: var(--surface); box-shadow: 4px 4px 0 var(--ink); }
	.answer-list__head { display: flex; align-items: center; gap: 0.65rem; }
	.answer-list__head span { display: grid; flex: 0 0 1.9rem; place-items: center; width: 1.9rem; height: 1.9rem; border: 2px solid var(--ink); color: #fff; font-weight: 800; }
	.answer-list__correct { background: #198754; }
	.answer-list__wrong { background: #d83a31; }
	.answer-list article p { margin: 0.8rem 0 0; line-height: 1.5; }
	.answer-list article p:last-child { color: var(--muted); font-size: 0.92rem; font-weight: 700; }

	.source-note { margin: 1.5rem auto 0; color: var(--muted); font-size: 0.74rem; font-weight: 700; line-height: 1.45; text-align: center; }

	@media (prefers-reduced-motion: reduce) {
		.question-card,
		.progress span { transition-duration: 1ms; }
	}

	@media (max-width: 520px) {
		.politics-game { width: 100%; }
		.card-stack { height: 23rem; }
		.question-card { box-shadow: 5px 5px 0 var(--ink); }
		.hint-button { right: 0; }
	}
</style>
