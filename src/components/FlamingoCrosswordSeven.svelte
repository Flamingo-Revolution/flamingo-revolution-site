<script lang="ts">
	import SuccessConfetti from './referendum/NewsletterSignup/components/SuccessConfetti/SuccessConfetti.svelte';

	type Direction = 'across' | 'down';
	type Entry = {
		id: string;
		number: number;
		row: number;
		col: number;
		answer: string;
		clue: string;
		direction: Direction;
	};
	type Cell = {
		key: string;
		row: number;
		col: number;
		answer: string;
		entryIds: string[];
		number?: number;
	};

	const rowCount = 8;
	const colCount = 10;
	const normalize = (value: string) => value.toLocaleUpperCase('sq').replaceAll('Ç', 'C').replaceAll('Ë', 'E');
	const entries: Entry[] = [
		{ id: 'a2', number: 2, row: 0, col: 3, answer: 'KF', clue: 'Klubi i fundërrinave.', direction: 'across' },
		{
			id: 'a6',
			number: 6,
			row: 1,
			col: 0,
			answer: 'REVOLUCION',
			clue: 'Kërkohet nga protestuesit prej mbi 100 ditësh.',
			direction: 'across'
		},
		{
			id: 'a10',
			number: 10,
			row: 2,
			col: 0,
			answer: 'NARTA',
			clue: 'Laguna nismëtare e protestave.',
			direction: 'across'
		},
		{
			id: 'a11',
			number: 11,
			row: 2,
			col: 6,
			answer: 'AMAR',
			clue: 'Kryeministri Edi ___ (mbrapsht).',
			direction: 'across'
		},
		{ id: 'a12', number: 12, row: 3, col: 0, answer: 'BGE', clue: 'Bashkimi i gomerëve të Edit.', direction: 'across' },
		{
			id: 'a13',
			number: 13,
			row: 3,
			col: 4,
			answer: 'MIU',
			clue: 'Kafsha që shëtit korridoreve të institucioneve.',
			direction: 'across'
		},
		{ id: 'a14', number: 14, row: 4, col: 0, answer: 'BIRNI', clue: 'Gazeta gjermane.', direction: 'across' },
		{ id: 'a15', number: 15, row: 4, col: 6, answer: 'SPAK', clue: 'Struktura anti-korrupsion.', direction: 'across' },
		{ id: 'a18', number: 18, row: 5, col: 0, answer: 'NM', clue: 'Nanometer.', direction: 'across' },
		{
			id: 'a19',
			number: 19,
			row: 5,
			col: 4,
			answer: 'NEH',
			clue: 'Pulë në anglisht (mbrapsht).',
			direction: 'across'
		},
		{
			id: 'a21',
			number: 21,
			row: 5,
			col: 8,
			answer: 'PM',
			clue: 'Shkurtim për kryeministrin (ang.).',
			direction: 'across'
		},
		{
			id: 'a22',
			number: 22,
			row: 6,
			col: 2,
			answer: 'ZEGJINE',
			clue: 'Deputetja e aritmetikës (emri).',
			direction: 'across'
		},
		{
			id: 'a25',
			number: 25,
			row: 7,
			col: 1,
			answer: 'BETON',
			clue: 'Shkulim pemë, mbjellim ___.',
			direction: 'across'
		},
		{ id: 'a26', number: 26, row: 7, col: 7, answer: 'FLE', clue: 'Lumi ___, qeveria nuk ___.', direction: 'across' },
		{
			id: 'd1',
			number: 1,
			row: 0,
			col: 1,
			answer: 'REAGIM',
			clue: 'Përgjigjja e duhur qytetare ndaj korrupsionit.',
			direction: 'down'
		},
		{ id: 'd2', number: 2, row: 0, col: 3, answer: 'KOT', clue: 'Roli i deputetëve pa zë.', direction: 'down' },
		{
			id: 'd3',
			number: 3,
			row: 0,
			col: 4,
			answer: 'FLAMINGO',
			clue: 'Shpendi simbol i revolucionit.',
			direction: 'down'
		},
		{ id: 'd4', number: 4, row: 0, col: 7, answer: 'KIM', clue: 'Ambasadorja patronazhiste.', direction: 'down' },
		{ id: 'd5', number: 5, row: 0, col: 9, answer: 'BNR', clue: 'Rama në burg (mbrapsht).', direction: 'down' },
		{
			id: 'd6',
			number: 6,
			row: 1,
			col: 0,
			answer: 'RNBBNB',
			clue: 'Përshëndetja zyrtare e protestuesve.',
			direction: 'down'
		},
		{ id: 'd7', number: 7, row: 1, col: 2, answer: 'VRER', clue: 'Goja e Bidos vjell ___.', direction: 'down' },
		{
			id: 'd8',
			number: 8,
			row: 1,
			col: 6,
			answer: 'ÇAUSHI',
			clue: 'Deputetja e aritmetikës (mbiemri).',
			direction: 'down'
		},
		{ id: 'd9', number: 9, row: 1, col: 8, answer: 'OA', clue: 'Organizata e agjenturave.', direction: 'down' },
		{ id: 'd16', number: 16, row: 4, col: 8, answer: 'APEL', clue: 'Thirrje ndryshe.', direction: 'down' },
		{ id: 'd17', number: 17, row: 4, col: 9, answer: 'KM', clue: 'Krye ___ mashtruesi.', direction: 'down' },
		{
			id: 'd20',
			number: 20,
			row: 5,
			col: 5,
			answer: 'EJN',
			clue: '___ për të gjithë, e të gjithë për ___. (mbrapsht)',
			direction: 'down'
		},
		{
			id: 'd22',
			number: 22,
			row: 6,
			col: 2,
			answer: 'ZË',
			clue: 'Korrupsion i hapur, me ___ e figurë.',
			direction: 'down'
		},
		{ id: 'd23', number: 23, row: 6, col: 3, answer: 'ET', clue: 'Edvin Tradhtari, besa e thyer.', direction: 'down' },
		{ id: 'd24', number: 24, row: 6, col: 7, answer: 'NF', clue: 'Nisma Flamingo.', direction: 'down' }
	];

	const entryById = new Map(entries.map((entry) => [entry.id, entry]));
	const cellMap = new Map<string, Cell>();
	for (const entry of entries) {
		for (let index = 0; index < entry.answer.length; index += 1) {
			const row = entry.row + (entry.direction === 'down' ? index : 0);
			const col = entry.col + (entry.direction === 'across' ? index : 0);
			const key = row + '-' + col;
			const existing = cellMap.get(key);
			const letter = normalize(entry.answer[index]);

			if (existing) {
				existing.entryIds.push(entry.id);
				if (index === 0 && existing.number === undefined) existing.number = entry.number;
			} else {
				cellMap.set(key, {
					key,
					row,
					col,
					answer: letter,
					entryIds: [entry.id],
					number: index === 0 ? entry.number : undefined
				});
			}
		}
	}

	const board = Array.from({ length: rowCount * colCount }, (_, index) => {
		const row = Math.floor(index / colCount);
		const col = index % colCount;
		return { row, col, cell: cellMap.get(row + '-' + col) };
	});
	const cells = [...cellMap.values()];
	const acrossEntries = entries.filter((entry) => entry.direction === 'across');
	const downEntries = entries.filter((entry) => entry.direction === 'down');

	let values = $state<Record<string, string>>({});
	let activeEntryId = $state('a2');
	let checked = $state(false);
	let celebrated = $state(false);
	let celebrationRun = $state(0);
	let status = $state('Zgjidh një pyetje ose një kuti për të filluar.');

	let activeEntry = $derived(entryById.get(activeEntryId) ?? entries[0]);
	let filledCount = $derived(cells.filter((cell) => Boolean(values[cell.key])).length);
	let progress = $derived(Math.round((filledCount / cells.length) * 100));
	let solved = $derived(cells.every((cell) => normalize(values[cell.key] ?? '') === cell.answer));

	$effect(() => {
		if (!solved || celebrated) return;
		celebrated = true;
		celebrationRun += 1;
		checked = true;
		status = 'Bravo! Fjalëkryqi i Botimit VII u plotësua saktë.';
	});

	function cellsForEntry(entry: Entry) {
		return Array.from({ length: entry.answer.length }, (_, index) => {
			const row = entry.row + (entry.direction === 'down' ? index : 0);
			const col = entry.col + (entry.direction === 'across' ? index : 0);
			return cellMap.get(row + '-' + col);
		}).filter((cell): cell is Cell => Boolean(cell));
	}

	function focusCell(cell: Cell) {
		document.getElementById('crossword-seven-cell-' + cell.key)?.focus();
	}

	function selectEntry(entryId: string, shouldFocus = true) {
		const entry = entryById.get(entryId);
		if (!entry) return;
		activeEntryId = entry.id;
		checked = false;
		status =
			entry.number + ' ' + (entry.direction === 'across' ? 'horizontalisht' : 'vertikalisht') + ': ' + entry.clue;
		if (shouldFocus) {
			const entryCells = cellsForEntry(entry);
			focusCell(entryCells.find((cell) => !values[cell.key]) ?? entryCells[0]);
		}
	}

	function selectCell(cell: Cell) {
		if (!cell.entryIds.includes(activeEntryId)) activeEntryId = cell.entryIds[0];
	}

	function moveWithinEntry(cell: Cell, step: number) {
		const entryCells = cellsForEntry(activeEntry);
		const index = entryCells.findIndex((entryCell) => entryCell.key === cell.key);
		const next = entryCells[index + step];
		if (next) focusCell(next);
	}

	function handleInput(event: Event, cell: Cell) {
		const input = event.currentTarget as HTMLInputElement;
		const letter = input.value
			.toLocaleUpperCase('sq')
			.replace(/[^A-ZÇË]/g, '')
			.slice(-1);
		values[cell.key] = letter;
		checked = false;
		if (letter) moveWithinEntry(cell, 1);
	}

	function handleKeydown(event: KeyboardEvent, cell: Cell) {
		if (/^[a-zA-ZçÇëË]$/.test(event.key)) {
			event.preventDefault();
			values[cell.key] = event.key.toLocaleUpperCase('sq');
			checked = false;
			moveWithinEntry(cell, 1);
			return;
		}
		if (event.key === 'Backspace') {
			event.preventDefault();
			if (values[cell.key]) values[cell.key] = '';
			else moveWithinEntry(cell, -1);
			checked = false;
			return;
		}
		if (event.key === 'Delete') {
			event.preventDefault();
			values[cell.key] = '';
			checked = false;
			return;
		}
		if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
			event.preventDefault();
			moveWithinEntry(cell, event.key === 'ArrowLeft' ? -1 : 1);
		} else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
			event.preventDefault();
			const next = cellMap.get(cell.row + (event.key === 'ArrowUp' ? -1 : 1) + '-' + cell.col);
			if (next) focusCell(next);
		}
	}

	function checkPuzzle() {
		checked = true;
		const wrong = cells.filter((cell) => normalize(values[cell.key] ?? '') !== cell.answer).length;
		if (wrong === 0) {
			status = 'Bravo! Fjalëkryqi i Botimit VII u plotësua saktë.';
			if (!celebrated) {
				celebrated = true;
				celebrationRun += 1;
			}
		} else if (filledCount < cells.length) {
			status = 'Kanë mbetur ' + (cells.length - filledCount) + ' kuti bosh. Shkronjat e pasakta janë shënuar.';
		} else {
			status = wrong + (wrong === 1 ? ' shkronjë duhet rishikuar.' : ' shkronja duhen rishikuar.');
		}
	}

	function resetPuzzle() {
		values = {};
		activeEntryId = 'a2';
		checked = false;
		celebrated = false;
		status = 'Fjalëkryqi u pastrua. Zgjidh një pyetje për të rifilluar.';
	}
</script>

{#if celebrated}
	{#key celebrationRun}
		<SuccessConfetti quick />
	{/key}
{/if}

<div class="crossword-game">
	<div class="crossword-game__play-area">
		<div class="crossword-game__progress" aria-label={progress + '% e plotësuar'}>
			<div><span style:width={progress + '%'}></span></div>
			<strong>{filledCount}/{cells.length}</strong>
		</div>
		<div class="crossword-board-shell">
			<div class="crossword-board" role="group" aria-label="Fjalëkryqi i Botimit VII">
				{#each board as square (square.row + '-' + square.col)}
					{#if square.cell}
						{@const cell = square.cell}
						<label
							class="crossword-cell"
							class:crossword-cell--active={cell.entryIds.includes(activeEntryId)}
							class:crossword-cell--wrong={checked && normalize(values[cell.key] ?? '') !== cell.answer}
							class:crossword-cell--right={(checked || celebrated) && normalize(values[cell.key] ?? '') === cell.answer}
						>
							{#if cell.number}<span>{cell.number}</span>{/if}
							<input
								id={'crossword-seven-cell-' + cell.key}
								type="text"
								inputmode="text"
								maxlength="1"
								autocomplete="off"
								spellcheck="false"
								value={values[cell.key] ?? ''}
								aria-label={'Rreshti ' + (cell.row + 1) + ', kolona ' + (cell.col + 1)}
								onfocus={() => selectCell(cell)}
								onclick={() => selectCell(cell)}
								oninput={(event) => handleInput(event, cell)}
								onkeydown={(event) => handleKeydown(event, cell)}
							/>
						</label>
					{:else}
						<span class="crossword-block" aria-hidden="true"></span>
					{/if}
				{/each}
			</div>
		</div>
		<div class="crossword-game__controls">
			<button type="button" class="crossword-game__check" onclick={checkPuzzle}>Kontrollo</button>
			<button type="button" onclick={resetPuzzle}>Pastro</button>
		</div>
		<p class="crossword-game__status" aria-live="polite">{status}</p>
	</div>

	<div class="crossword-clues">
		<section aria-labelledby="crossword-seven-across-title">
			<h3 id="crossword-seven-across-title">Horizontalisht</h3>
			<ol>
				{#each acrossEntries as entry (entry.id)}
					<li value={entry.number}>
						<button
							type="button"
							class:crossword-clue--active={activeEntryId === entry.id}
							aria-pressed={activeEntryId === entry.id}
							onclick={() => selectEntry(entry.id)}>{entry.clue}</button
						>
					</li>
				{/each}
			</ol>
		</section>
		<section aria-labelledby="crossword-seven-down-title">
			<h3 id="crossword-seven-down-title">Vertikalisht</h3>
			<ol>
				{#each downEntries as entry (entry.id)}
					<li value={entry.number}>
						<button
							type="button"
							class:crossword-clue--active={activeEntryId === entry.id}
							aria-pressed={activeEntryId === entry.id}
							onclick={() => selectEntry(entry.id)}>{entry.clue}</button
						>
					</li>
				{/each}
			</ol>
		</section>
	</div>
</div>

<style>
	.crossword-game {
		display: grid;
		grid-template-columns: minmax(19rem, 0.9fr) minmax(20rem, 1.1fr);
		gap: clamp(1.5rem, 4vw, 3rem);
		align-items: start;
		margin-top: 1.5rem;
		color: #151515;
	}
	.crossword-game__play-area {
		min-width: 0;
	}
	.crossword-game__progress {
		display: flex;
		align-items: center;
		gap: 0.8rem;
		margin-bottom: 0.75rem;
		font-size: 0.75rem;
		font-weight: 800;
	}
	.crossword-game__progress > div {
		flex: 1;
		height: 0.45rem;
		border: 1px solid #151515;
		background: #fff8ef;
	}
	.crossword-game__progress span {
		display: block;
		height: 100%;
		background: #c83e72;
		transition: width 160ms ease;
	}
	.crossword-board-shell {
		overflow-x: auto;
		padding: 0 0.45rem 0.55rem 0;
		scrollbar-color: #c83e72 #fff8ef;
	}
	.crossword-board {
		display: grid;
		grid-template-columns: repeat(10, minmax(0, 1fr));
		width: 100%;
		min-width: 28rem;
		aspect-ratio: 10 / 8;
		border: 3px solid #151515;
		background: #151515;
		box-shadow: 0.45rem 0.45rem 0 #c83e72;
	}
	.crossword-cell,
	.crossword-block {
		min-width: 0;
		min-height: 0;
	}
	.crossword-cell {
		position: relative;
		border-right: 1px solid #151515;
		border-bottom: 1px solid #151515;
		background: #fff8ef;
	}
	.crossword-cell--active {
		background: #ffd7e3;
	}
	.crossword-cell--wrong {
		background: #ffc6bf;
	}
	.crossword-cell--right {
		background: #d8efd8;
	}
	.crossword-cell > span {
		position: absolute;
		top: 0.08rem;
		left: 0.12rem;
		z-index: 1;
		font-size: clamp(0.42rem, 0.75vw, 0.62rem);
		font-weight: 800;
		line-height: 1;
		pointer-events: none;
	}
	.crossword-cell input {
		width: 100%;
		height: 100%;
		padding: 0.25rem 0 0;
		border: 0;
		border-radius: 0;
		outline: 0;
		background: transparent;
		color: #151515;
		font-family: var(--font-display);
		font-size: clamp(0.8rem, 2.2vw, 1.55rem);
		font-weight: 700;
		line-height: 1;
		text-align: center;
		text-transform: uppercase;
	}
	.crossword-cell input:focus {
		box-shadow: inset 0 0 0 3px #c83e72;
	}
	.crossword-block {
		background: #151515;
	}
	.crossword-game__controls {
		display: flex;
		gap: 0.65rem;
		margin-top: 1.2rem;
	}
	.crossword-game__controls button {
		min-height: 2.6rem;
		padding: 0.55rem 0.9rem;
		border: 2px solid #151515;
		background: #fff8ef;
		color: #151515;
		font: inherit;
		font-size: 0.82rem;
		font-weight: 800;
		cursor: pointer;
	}
	.crossword-game__controls .crossword-game__check {
		background: #151515;
		color: #fff8ef;
	}
	.crossword-game__controls button:hover,
	.crossword-game__controls button:focus-visible {
		background: #ffd7e3;
		color: #151515;
	}
	.crossword-game__status {
		min-height: 1.4em;
		margin: 0.9rem 0 0;
		font-weight: 800;
	}
	.crossword-clues {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1.4rem;
	}
	.crossword-clues h3 {
		margin: 0 0 0.75rem;
		font-family: var(--font-display);
		font-size: 1.25rem;
		text-transform: uppercase;
	}
	.crossword-clues ol {
		display: grid;
		gap: 0.35rem;
		margin: 0;
		padding-left: 1.7rem;
	}
	.crossword-clues li {
		padding-left: 0.15rem;
		font-size: 0.78rem;
		font-weight: 800;
	}
	.crossword-clues button {
		width: 100%;
		padding: 0.25rem 0.35rem;
		border: 0;
		background: transparent;
		color: inherit;
		font: inherit;
		font-size: 0.78rem;
		line-height: 1.3;
		text-align: left;
		cursor: pointer;
	}
	.crossword-clues button:hover,
	.crossword-clues button:focus-visible,
	.crossword-clue--active {
		background: #ffd7e3;
	}
	@media (max-width: 900px) {
		.crossword-game {
			grid-template-columns: 1fr;
		}
	}
	@media (max-width: 560px) {
		.crossword-board-shell {
			overflow-x: visible;
		}
		.crossword-board {
			min-width: 0;
			box-shadow: 0.3rem 0.3rem 0 #c83e72;
		}
		.crossword-clues {
			grid-template-columns: 1fr;
		}
	}
</style>
