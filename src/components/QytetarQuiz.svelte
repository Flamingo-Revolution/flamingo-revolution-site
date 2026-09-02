<script lang="ts">
	type Question = {
		tag: string;
		question: string;
		options: string[];
		correct: number;
		explanation: string;
	};

	type FlamingoPop = {
		id: number;
		left: number;
		size: number;
		delay: number;
		duration: number;
		bob: number;
	};

	const QUESTIONS: Question[] = [
		{
			tag: 'Uji',
			question: 'Sa orë në ditë duhet të kemi ujë në shtëpi?',
			options: ['8 orë', '16 orë', '24 orë'],
			correct: 2,
			explanation: 'Uji duhet të rrjedhë 24 orë në ditë, çdo ditë. Nëse vjen vetëm disa orë, kjo tregon problem në shërbim.'
		},
		{
			tag: 'Natyra',
			question: 'Zvërneci është një vend pranë liqenit të Nartës, afër Vlorës. Në cilën zonë ndodhet?',
			options: ['Vjosë-Nartë', 'Theth', 'Prespë'],
			correct: 0,
			explanation: 'Zvërneci ndodhet te zona e mbrojtur Vjosë-Nartë, ku jetojnë shumë zogj dhe ka natyrë të pastër.'
		},
		{
			tag: 'Kontroll',
			question: 'Kush duhet ta shohë nëse një rrugë apo park po ndërtohet mirë, me paratë tona?',
			options: ['Vetëm firma që ndërton', 'Shteti dhe qytetarët së bashku', 'Askush, mjafton besimi'],
			correct: 1,
			explanation: 'Kur shteti dhe qytetarët e shohin bashkë punën, ka më pak gabime dhe më pak keqpërdorim të parave.'
		},
		{
			tag: 'Fatura',
			question: 'Nëse çmimi i rrymës apo i ujit rritet papritur shumë, çfarë duhet të bëjnë qytetarët?',
			options: ['Të pyesin e të kërkojnë shpjegim publik', 'Të mos thonë asgjë', 'Të paguajnë pa e kuptuar pse'],
			correct: 0,
			explanation: 'Kur diçka na prek xhepin, kemi të drejtë të kërkojmë shpjegim: pse u rrit çmimi dhe ku shkojnë paratë.'
		},
		{
			tag: 'Të drejtat',
			question: 'Cila është mënyra paqësore që kanë qytetarët për të treguar pakënaqësinë?',
			options: ['Të dalin bashkë e të flasin hapur (protestë paqësore)', 'Të heshtin gjithmonë', 'Të mos flasin fare me askënd'],
			correct: 0,
			explanation: "Të dalësh bashkë me të tjerët e të flasësh hapur, pa dhunë, është e drejtë e ligjshme dhe mënyrë e njohur për t'u dëgjuar."
		},
		{
			tag: 'Shëndetësia',
			question: 'Në një spital publik, çfarë pritet normalisht nga mjeku?',
			options: ["Të të trajtojë mirë pa kërkuar 'dhuratë' shtesë", 'Të kërkojë para shtesë fshehurazi', 'Të mos të shohë fare pa njohje'],
			correct: 0,
			explanation: "Kujdesi shëndetësor duhet të jetë i drejtë për të gjithë, pa pasur nevojë të japësh 'dorë' apo njohje për t'u trajtuar mirë."
		},
		{
			tag: 'Premtime elektorale',
			question: 'Rruga Qukës–Qafë Plloçë u premtua herën e parë nga Sali Berisha, në prag të cilave zgjedhje?',
			options: ['Zgjedhjeve të 2005', 'Zgjedhjeve të 2009', 'Zgjedhjeve të 2013'],
			correct: 1,
			explanation: 'U premtua në 2009. Sipas Faktoje.al, rruga ka mbetur ndër premtimet elektorale të shkelura nga të dy anët e politikës gjatë viteve.'
		},
		{
			tag: 'Premtime elektorale',
			question: 'Marrëveshja për pensionet me Italinë, e premtuar për vite nga qeveria Rama për diasporën, u nënshkrua zyrtarisht në cilin vit?',
			options: ['2013', '2018', '2024'],
			correct: 2,
			explanation: 'U nënshkrua në shkurt 2024, pas rreth një dekade premtimesh gjatë çdo fushate zgjedhore (2013, 2017, 2021, 2023).'
		},
		{
			tag: 'Premtime elektorale',
			question: 'Qeveria Rama premtoi se inceneratorët e mbeturinave do ta kthenin plehrat në pasuri. Çfarë ndodhi më pas me projektin?',
			options: ['U shndërrua në skandal korrupsioni, me ish-ministrin e burgosur', 'U përfundua siç ishte premtuar, pa probleme', 'Nuk u fillua kurrë asnjë punim'],
			correct: 0,
			explanation: "SPAK e çoi në gjyq ish-ministrin e Mjedisit Lefter Koka, i dënuar për ryshfet lidhur me koncesionin e inceneratorëve. Disa zyrtarë të tjerë u arrestuan ose iu hap hetim."
		},
		{
			tag: 'Skandali',
			question: "Të paktën sa ministra apo zëvendëskryeministra të qeverisë Rama janë akuzuar apo dënuar zyrtarisht nga drejtësia, jo thjesht të thirrur si dëshmitarë?",
			options: ['1–2', '5 ose më shumë', 'Mbi 20'],
			correct: 1,
			explanation: "Të paktën pesë janë akuzuar apo dënuar zyrtarisht: Lefter Koka, Saimir Tahiri, Arben Ahmetaj, Belinda Balluku dhe Ilir Beqaj. Numri total i saktë mbetet i debatueshëm, sepse disa raportime përfshijnë edhe persona vetëm nën hetim ose të thirrur si dëshmitarë."
		},
		{
			tag: 'Verifikim',
			question: 'Kur një politikan, cilido qoftë ai, bën një premtim elektoral, si mund ta kontrollojë qytetari nëse u mbajt vërtet?',
			options: ['Duke krahasuar me të dhëna zyrtare dhe gazetari verifikuese', 'Duke besuar çdo gjë që thotë politikani', 'Duke mos u interesuar fare'],
			correct: 0,
			explanation: 'Institucione si INSTAT ose faqe verifikuese si Faktoje.al ndihmojnë të krahasosh premtimin me realitetin, pavarësisht se cila parti apo politikan e ka bërë premtimin.'
		},
		{
			tag: 'Pensionet',
			question: "Krahasuar me 'minimumin jetik', si qëndron pensioni mesatar?",
			options: ['Është pothuajse i barabartë me minimumin jetik', 'Është dukshëm mbi minimumin jetik', "S'ka lidhje me minimumin jetik"],
			correct: 0,
			explanation: 'Sipas llogaritjeve zyrtare, pensioni mesatar është vetëm pak lekë mbi minimumin jetik — praktikisht shumë pensionistë jetojnë në kufirin e varfërisë.'
		},
		{
			tag: 'Krahasim',
			question: 'Rroga neto e një deputeti në Kuvend është afërsisht sa herë më e madhe se pensioni mesatar?',
			options: ['2–3 herë', '10–15 herë', 'Pothuajse e njëjtë'],
			correct: 1,
			explanation: 'Deputeti merr rreth 260.000 lekë në muaj pa dieta e shpërblime shtesë, ndërsa pensioni mesatar është rreth 19.000–20.000 lekë — pra rreth 13 herë më shumë.'
		},
		{
			tag: 'Krahasim',
			question: 'Në 2023, pagat e deputetëve u dyfishuan. Në të njëjtën kohë, sa u rrit pensioni mesatar?',
			options: ['Edhe ai u dyfishua', 'Me disa përqind, rreth 4–7%', 'U ul'],
			correct: 1,
			explanation: 'Ndërkohë që pagat e deputetëve u dyfishuan me një vendim, indeksimi vjetor i pensioneve mbetet zakonisht 4–7%, në linjë me inflacionin.'
		}
	];

	const LETTERS = ['A', 'B', 'C'];
	let screen = $state<'intro' | 'play' | 'results'>('intro');
	let current = $state(0);
	let score = $state(0);
	let selected = $state<number | null>(null);
	let flamingos = $state<FlamingoPop[]>([]);
	let popId = 0;

	let question = $derived(QUESTIONS[current]);
	let progress = $derived(Math.round((current / QUESTIONS.length) * 100));

	function startQuiz() {
		current = 0;
		score = 0;
		selected = null;
		screen = 'play';
	}

	function selectOption(index: number) {
		if (selected !== null) return;
		selected = index;
		if (index === question.correct) {
			score += 1;
			spawnFlamingos();
		}
	}

	function nextQuestion() {
		if (selected === null) return;
		if (current + 1 >= QUESTIONS.length) {
			screen = 'results';
			return;
		}
		current += 1;
		selected = null;
	}

	function spawnFlamingos() {
		const additions = Array.from({ length: 8 }, (_, index) => ({
			id: ++popId,
			left: 6 + Math.random() * 84,
			size: 2.1 + Math.random() * 1.5,
			delay: (index / 8) * 0.48 + Math.random() * 0.08,
			duration: 1.7 + Math.random() * 0.45,
			bob: Math.random() * 3 - 1.5
		}));
		flamingos = [...flamingos, ...additions];
		window.setTimeout(() => {
			const ids = new Set(additions.map((item) => item.id));
			flamingos = flamingos.filter((item) => !ids.has(item.id));
		}, 2800);
	}

	function verdict() {
		const ratio = score / QUESTIONS.length;
		if (ratio >= 0.8) return ['Qytetar i informuar', 'E njeh mirë terrenin — nga furnizimi me ujë tek mbikëqyrja e projekteve publike. Kjo njohuri e bën pjesëmarrjen qytetare më të fortë.', 'E verifikuar'];
		if (ratio >= 0.5) return ['Në rrugë të mirë', 'Ke bazat, por ka ende hapësirë për të thelluar njohuritë mbi transparencën, mjedisin dhe shërbimet publike.', 'Në proces'];
		return ['Fillim i mirë', "Këto tema prekin jetën e përditshme. Provoje përsëri dhe ndalu pak më gjatë te shpjegimet pas çdo pyetjeje.", "Për t'u rishikuar"];
	}
</script>

<section class="citizen-quiz" aria-labelledby="citizen-quiz-title">
	<header class="quiz-masthead">
		<p>Edukim qytetar</p>
		<h1 id="citizen-quiz-title">Kuizi Qytetar</h1>
		<p>Sa i mirëinformuar je për gjërat që i jetojmë çdo ditë? Pyetje të thjeshta, pa gjykime.</p>
	</header>

	<div class="quiz-card">
		{#if screen === 'intro'}
			<div class="center-column">
				<span class="question-tag">Gati?</span>
				<p class="intro-copy">Pyetje rreth ujit, mjedisit, premtimeve elektorale, shërbimeve publike dhe pensioneve.</p>
				<button type="button" class="quiz-action quiz-action--wide" onclick={startQuiz}>Fillo kuizin</button>
			</div>
		{:else if screen === 'play'}
			<div class="progress-row">
				<div class="progress-track" aria-label={`${progress}% e kuizit e përfunduar`}><span style:width={`${progress}%`}></span></div>
				<strong>{current + 1} / {QUESTIONS.length}</strong>
			</div>

			<span class="question-tag">{question.tag}</span>
			<h2>{question.question}</h2>

			<div class="options">
				{#each question.options as option, index}
					<button
						type="button"
						class:option--correct={selected !== null && index === question.correct}
						class:option--wrong={selected === index && index !== question.correct}
						class:option--dim={selected !== null && index !== question.correct && index !== selected}
						class="option"
						disabled={selected !== null}
						onclick={() => selectOption(index)}
					>
						<span>{LETTERS[index]}</span>
						<strong>{option}</strong>
					</button>
				{/each}
			</div>

			{#if selected !== null}
				<div class="explanation" role="status"><strong>Info:</strong> {question.explanation}</div>
				<div class="next-row">
					<button type="button" class="quiz-action" onclick={nextQuestion}>
						{current === QUESTIONS.length - 1 ? 'Shiko rezultatin' : 'Pyetja tjetër'}
					</button>
				</div>
			{/if}
		{:else}
			{@const finalVerdict = verdict()}
			<div class="center-column results">
				<p>Rezultati yt</p>
				<strong>{score}/{QUESTIONS.length}</strong>
				<span class="result-stamp">{finalVerdict[2]}</span>
				<h2>{finalVerdict[0]}</h2>
				<p>{finalVerdict[1]}</p>
				<button type="button" class="quiz-action quiz-action--wide quiz-action--secondary" onclick={startQuiz}>Provo përsëri</button>
			</div>
		{/if}
	</div>

	<p class="source-note">Përmbajtja e kuizit bazohet në materialin redaksional të dhënë.</p>
</section>

<div class="celebration-layer" aria-hidden="true">
	{#each flamingos as flamingo (flamingo.id)}
		<span
			class="flamingo-pop"
			style:left={`${flamingo.left}vw`}
			style:font-size={`${flamingo.size}rem`}
			style:animation-delay={`${flamingo.delay}s`}
			style:animation-duration={`${flamingo.duration}s`}
			style:--flamingo-bob={`${flamingo.bob}rem`}
		>🦩</span>
	{/each}
</div>

<style>
	.citizen-quiz { width: min(100%, 42rem); margin: 0 auto; color: var(--text); }
	.quiz-masthead { margin-bottom: 1.5rem; text-align: center; }
	.quiz-masthead > p:first-child,
	.question-tag {
		display: inline-block;
		padding: 0.35rem 0.75rem;
		border: 2px solid var(--ink);
		background: var(--accent-soft);
		box-shadow: 3px 3px 0 var(--ink);
		color: var(--accent-strong);
		font-size: 0.74rem;
		font-weight: 800;
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}
	.quiz-masthead h1 { max-width: none; margin-top: 0.8rem; color: var(--text); font-size: clamp(2.3rem, 8vw, 4rem); line-height: 0.95; text-align: center; }
	.quiz-masthead > p:last-child { max-width: 31rem; margin: 0.9rem auto 0; color: var(--muted); font-weight: 700; line-height: 1.5; }

	.quiz-card { position: relative; padding: clamp(1.4rem, 5vw, 2.4rem); border: 3px solid var(--ink); background: var(--surface); box-shadow: 9px 9px 0 var(--ink); overflow: hidden; }
	.quiz-card::after { position: absolute; top: -3rem; right: -3rem; width: 8rem; height: 8rem; border: 2px solid var(--ink); border-radius: 50%; background: #ffe172; content: ''; opacity: 0.5; pointer-events: none; }
	.center-column { position: relative; z-index: 1; text-align: center; }
	.intro-copy { margin: 1.3rem auto 1.7rem; font-size: clamp(1.1rem, 3.5vw, 1.35rem); font-weight: 800; line-height: 1.55; }

	.progress-row { position: relative; z-index: 1; display: flex; align-items: center; gap: 0.8rem; margin-bottom: 1.6rem; }
	.progress-track { flex: 1; height: 0.75rem; border: 2px solid var(--ink); background: var(--paper-cool); }
	.progress-track span { display: block; height: 100%; background: var(--accent); transition: width 220ms ease; }
	.progress-row > strong { min-width: 3.6rem; font-size: 0.8rem; text-align: right; }

	.quiz-card > h2 { position: relative; z-index: 1; max-width: 24ch; margin: 1.2rem 0 1.4rem; font-size: clamp(1.45rem, 4.7vw, 2rem); line-height: 1.25; }
	.options { position: relative; z-index: 1; display: grid; gap: 0.8rem; }
	.option { display: flex; align-items: center; gap: 0.85rem; min-height: 4rem; padding: 0.75rem 0.9rem; border: 2px solid var(--ink); background: var(--surface); box-shadow: 4px 4px 0 var(--ink); color: var(--text); font: inherit; text-align: left; cursor: pointer; transition: transform 120ms ease, box-shadow 120ms ease, opacity 120ms ease; }
	.option:hover:not(:disabled),
	.option:focus-visible:not(:disabled) { transform: translate(-2px, -2px); box-shadow: 6px 6px 0 var(--ink); }
	.option > span { display: grid; flex: 0 0 2.25rem; place-items: center; width: 2.25rem; height: 2.25rem; border: 2px solid var(--ink); background: var(--accent-soft); color: var(--accent-strong); font-weight: 900; }
	.option > strong { font-size: 1rem; line-height: 1.4; }
	.option:disabled { cursor: default; }
	.option--correct { background: #dff6e9; color: #143b27; }
	.option--correct > span { background: #198754; color: #fff; }
	.option--wrong { background: #ffe3df; color: #4e1d18; }
	.option--wrong > span { background: #d83a31; color: #fff; }
	.option--dim { opacity: 0.5; }

	.explanation { position: relative; z-index: 1; margin-top: 1.2rem; padding: 1rem; border: 2px solid var(--ink); background: var(--paper-warm); font-weight: 700; line-height: 1.55; }
	.explanation strong { color: var(--accent-strong); }
	.next-row { position: relative; z-index: 1; display: flex; justify-content: flex-end; margin-top: 1rem; }
	.quiz-action { min-height: 3.2rem; padding: 0.75rem 1.2rem; border: 2px solid var(--ink); background: var(--ink); box-shadow: 5px 5px 0 var(--accent); color: var(--ink-reverse); font: inherit; font-weight: 800; cursor: pointer; }
	.quiz-action:hover,
	.quiz-action:focus-visible { transform: translate(-2px, -2px); box-shadow: 7px 7px 0 var(--accent); }
	.quiz-action--wide { width: 100%; }
	.quiz-action--secondary { background: var(--surface); color: var(--text); }

	.results > p:first-child { margin: 0 0 0.4rem; color: var(--accent-strong); font-size: 0.75rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; }
	.results > strong { display: block; color: var(--accent-strong); font-size: clamp(4rem, 16vw, 6rem); line-height: 1; }
	.result-stamp { display: inline-block; margin: 0.8rem 0; padding: 0.35rem 0.75rem; border: 2px solid var(--ink); background: #ffe172; color: #151515; font-size: 0.75rem; font-weight: 900; letter-spacing: 0.09em; text-transform: uppercase; }
	.results h2 { max-width: none; margin: 0.3rem 0 0.6rem; font-size: clamp(1.7rem, 5vw, 2.4rem); }
	.results > p:nth-of-type(2) { margin: 0 auto 1.5rem; color: var(--muted); font-weight: 700; line-height: 1.55; }
	.source-note { margin: 1.4rem auto 0; color: var(--muted); font-size: 0.74rem; font-weight: 700; line-height: 1.45; text-align: center; }

	.celebration-layer { position: fixed; z-index: 999; inset: 0; overflow: hidden; pointer-events: none; }
	.flamingo-pop { position: absolute; bottom: -12vh; line-height: 1; filter: drop-shadow(0 0.35rem 0.7rem rgba(232, 68, 122, 0.35)); animation: flamingo-rise 2s linear forwards; will-change: transform, opacity; }
	@keyframes flamingo-rise {
		0% { opacity: 0; transform: translateY(0); }
		8%, 92% { opacity: 1; }
		50% { transform: translateY(-55vh) translateX(var(--flamingo-bob)); }
		100% { opacity: 0; transform: translateY(-118vh); }
	}

	@media (prefers-reduced-motion: reduce) {
		.progress-track span,
		.option { transition-duration: 1ms; }
		.flamingo-pop { display: none; }
	}

	@media (max-width: 520px) {
		.quiz-card { padding: 1.2rem; box-shadow: 6px 6px 0 var(--ink); }
		.option { padding: 0.7rem; }
		.option > strong { font-size: 0.92rem; }
	}
</style>
