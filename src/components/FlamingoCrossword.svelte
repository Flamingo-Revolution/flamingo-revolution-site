<script lang="ts">
	import SuccessConfetti from "./referendum/NewsletterSignup/components/SuccessConfetti/SuccessConfetti.svelte";

	type Direction = "across" | "down";

	type Entry = {
		id: string;
		number: number;
		direction: Direction;
		row: number;
		col: number;
		answer: string;
		clue: string;
	};

	type Cell = {
		key: string;
		row: number;
		col: number;
		answer: string;
		entryIds: string[];
		number?: number;
	};

	const rowCount = 12;
	const colCount = 15;

	const entries: Entry[] = [
		{
			id: "taulant",
			number: 1,
			direction: "down",
			row: 0,
			col: 11,
			answer: "TAULANTBALLA",
			clue: "Cili deputet u përfshi në dosjen «Toyota Yaris» dhe përgjimet 26/1?"
		},
		{
			id: "monika",
			number: 2,
			direction: "across",
			row: 1,
			col: 0,
			answer: "MONIKAKRYEMADHI",
			clue: "Cila ish-zonjë e parë e opozitës u pandeh bashkë me bashkëshortin?"
		},
		{
			id: "arben",
			number: 3,
			direction: "across",
			row: 4,
			col: 1,
			answer: "ARBENAHMETAJ",
			clue: "Cili ish-zv/kryeministër është në arrati për inceneratorët dhe «Buka»?"
		},
		{
			id: "ilir",
			number: 4,
			direction: "across",
			row: 6,
			col: 5,
			answer: "ILIRMETA",
			clue: "Cili ish-President u arrestua për korrupsion dhe pastrim parash (afera CEZ-DIA)?"
		},
		{
			id: "belinda",
			number: 5,
			direction: "across",
			row: 9,
			col: 1,
			answer: "BELINDABALLUKU",
			clue: "Cila zv/kryeministre u akuzua për shkelje barazie në tendera?"
		},
		{
			id: "vangjush",
			number: 6,
			direction: "across",
			row: 11,
			col: 2,
			answer: "VANGJUSHDAKO",
			clue: "Cili ish-kryebashkiak i Durrësit u dënua për shpërdorim detyre?"
		}
	];

	const entryById = new Map(entries.map((entry) => [entry.id, entry]));
	const cellMap = new Map<string, Cell>();

	for (const entry of entries) {
		const rowStep = entry.direction === "down" ? 1 : 0;
		const colStep = entry.direction === "across" ? 1 : 0;

		for (let index = 0; index < entry.answer.length; index += 1) {
			const row = entry.row + rowStep * index;
			const col = entry.col + colStep * index;
			const key = `${row}-${col}`;
			const existing = cellMap.get(key);

			if (existing) {
				existing.entryIds.push(entry.id);
			} else {
				cellMap.set(key, {
					key,
					row,
					col,
					answer: entry.answer[index],
					entryIds: [entry.id],
					number: index === 0 ? entry.number : undefined
				});
			}
		}
	}

	const board = Array.from({ length: rowCount * colCount }, (_, index) => {
		const row = Math.floor(index / colCount);
		const col = index % colCount;
		return { row, col, cell: cellMap.get(`${row}-${col}`) };
	});
	const cells = [...cellMap.values()];
	const acrossEntries = entries.filter((entry) => entry.direction === "across");
	const downEntries = entries.filter((entry) => entry.direction === "down");

	let values = $state<Record<string, string>>({});
	let activeEntryId = $state("taulant");
	let focusedKey = $state<string | null>(null);
	let checked = $state(false);
	let celebrated = $state(false);
	let celebrationRun = $state(0);
	let status = $state("Zgjidh një pyetje ose një kuti për të filluar.");

	let activeEntry = $derived(entryById.get(activeEntryId) ?? entries[0]);
	let filledCount = $derived(cells.filter((cell) => Boolean(values[cell.key])).length);
	let progress = $derived(Math.round((filledCount / cells.length) * 100));
	let solved = $derived(cells.every((cell) => values[cell.key] === cell.answer));

	$effect(() => {
		if (!solved || celebrated) return;

		celebrate();
		checked = true;
		status = "Bravo! Fjalëkryqi u plotësua saktë.";
	});

	function celebrate() {
		celebrated = true;
		celebrationRun += 1;
	}

	function cellsForEntry(entry: Entry) {
		const rowStep = entry.direction === "down" ? 1 : 0;
		const colStep = entry.direction === "across" ? 1 : 0;
		return Array.from({ length: entry.answer.length }, (_, index) =>
			cellMap.get(`${entry.row + rowStep * index}-${entry.col + colStep * index}`)
		).filter((cell): cell is Cell => Boolean(cell));
	}

	function focusCell(cell: Cell) {
		document.getElementById(`crossword-cell-${cell.key}`)?.focus();
	}

	function selectEntry(entryId: string, shouldFocus = true) {
		const entry = entryById.get(entryId);
		if (!entry) return;

		activeEntryId = entry.id;
		checked = false;
		status = `${entry.number} ${entry.direction === "across" ? "horizontal" : "vertikal"}: ${entry.clue}`;

		if (shouldFocus) {
			const entryCells = cellsForEntry(entry);
			focusCell(entryCells.find((cell) => !values[cell.key]) ?? entryCells[0]);
		}
	}

	function selectCell(cell: Cell) {
		if (!cell.entryIds.includes(activeEntryId)) {
			activeEntryId = cell.entryIds[0];
		}
		focusedKey = cell.key;
	}

	function moveWithinEntry(cell: Cell, step: number) {
		const entryCells = cellsForEntry(activeEntry);
		const index = entryCells.findIndex((entryCell) => entryCell.key === cell.key);
		if (index === -1) return;

		const next = entryCells[index + step];
		if (next) focusCell(next);
	}

	function handleInput(event: Event, cell: Cell) {
		const input = event.currentTarget as HTMLInputElement;
		const letter = input.value.toUpperCase().replace(/[^A-Z]/g, "").slice(-1);
		values[cell.key] = letter;
		checked = false;

		if (letter) moveWithinEntry(cell, 1);
	}

	function handleKeydown(event: KeyboardEvent, cell: Cell) {
		if (/^[a-zA-Z]$/.test(event.key)) {
			event.preventDefault();
			values[cell.key] = event.key.toUpperCase();
			checked = false;
			moveWithinEntry(cell, 1);
			return;
		}

		if (event.key === "Backspace") {
			event.preventDefault();
			if (values[cell.key]) {
				values[cell.key] = "";
			} else {
				moveWithinEntry(cell, -1);
			}
			checked = false;
			return;
		}

		if (event.key === "Delete") {
			event.preventDefault();
			values[cell.key] = "";
			checked = false;
			return;
		}

		if (event.key === "Enter" || event.key === " ") {
			if (cell.entryIds.length > 1) {
				event.preventDefault();
				const nextEntry = cell.entryIds.find((entryId) => entryId !== activeEntryId);
				if (nextEntry) selectEntry(nextEntry, false);
			}
			return;
		}

		const arrowDirection: Record<string, { direction: Direction; step: number }> = {
			ArrowLeft: { direction: "across", step: -1 },
			ArrowRight: { direction: "across", step: 1 },
			ArrowUp: { direction: "down", step: -1 },
			ArrowDown: { direction: "down", step: 1 }
		};
		const movement = arrowDirection[event.key];
		if (!movement) return;

		const matchingEntryId = cell.entryIds.find(
			(entryId) => entryById.get(entryId)?.direction === movement.direction
		);
		if (!matchingEntryId) return;

		event.preventDefault();
		activeEntryId = matchingEntryId;
		moveWithinEntry(cell, movement.step);
	}

	function checkPuzzle() {
		checked = true;
		const wrong = cells.filter((cell) => values[cell.key] !== cell.answer).length;

		if (wrong === 0) {
			status = "Bravo! Fjalëkryqi u plotësua saktë.";
			celebrate();
		} else if (filledCount < cells.length) {
			status = `Kanë mbetur ${cells.length - filledCount} kuti bosh. Shkronjat e pasakta janë shënuar.`;
		} else {
			status = `${wrong} ${wrong === 1 ? "shkronjë duhet rishikuar" : "shkronja duhen rishikuar"}.`;
		}
	}

	function resetPuzzle() {
		values = {};
		activeEntryId = "taulant";
		focusedKey = null;
		checked = false;
		celebrated = false;
		status = "Fjalëkryqi u pastrua. Zgjidh një pyetje për të rifilluar.";
	}
</script>

{#if celebrated}
	{#key celebrationRun}
		<SuccessConfetti quick />
	{/key}
{/if}

<div class="crossword-game">
	<div class="crossword-game__play-area">
		<div class="crossword-game__progress" aria-label={`${progress}% e plotësuar`}>
			<div><span style:width={`${progress}%`}></span></div>
			<strong>{filledCount}/{cells.length}</strong>
		</div>

		<div
			class="crossword-board"
			role="group"
			aria-label="Fjalëkryqi i Botimit V, 12 rreshta me 15 kolona"
		>
			{#each board as square (`${square.row}-${square.col}`)}
				{#if square.cell}
					{@const cell = square.cell}
					<label
						class="crossword-cell"
						class:crossword-cell--active={cell.entryIds.includes(activeEntryId)}
						class:crossword-cell--wrong={checked && values[cell.key] !== cell.answer}
						class:crossword-cell--right={(checked || celebrated) && values[cell.key] === cell.answer}
					>
						{#if cell.number}<span>{cell.number}</span>{/if}
						<input
							id={`crossword-cell-${cell.key}`}
							type="text"
							inputmode="text"
							maxlength="1"
							autocomplete="off"
							spellcheck="false"
							value={values[cell.key] ?? ""}
							aria-label={`Rreshti ${cell.row + 1}, kolona ${cell.col + 1}`}
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

		<div class="crossword-game__controls">
			<button type="button" class="crossword-game__check" onclick={checkPuzzle}>Kontrollo</button>
			<button type="button" onclick={resetPuzzle}>Pastro</button>
		</div>
		<p class="crossword-game__status" aria-live="polite">{status}</p>
		<p class="crossword-game__hint">
			Shkruaj me tastierë. Përdor shigjetat për të lëvizur dhe Enter në kryqëzime për të
			ndërruar drejtim.
		</p>
	</div>

	<div class="crossword-clues">
		<section aria-labelledby="crossword-across-title">
			<h3 id="crossword-across-title">Horizontal</h3>
			<ol>
				{#each acrossEntries as entry (entry.id)}
					<li value={entry.number}>
						<button
							type="button"
							class:crossword-clue--active={activeEntryId === entry.id}
							aria-pressed={activeEntryId === entry.id}
							onclick={() => selectEntry(entry.id)}
						>
							{entry.clue}
						</button>
					</li>
				{/each}
			</ol>
		</section>

		<section aria-labelledby="crossword-down-title">
			<h3 id="crossword-down-title">Vertikal</h3>
			<ol>
				{#each downEntries as entry (entry.id)}
					<li value={entry.number}>
						<button
							type="button"
							class:crossword-clue--active={activeEntryId === entry.id}
							aria-pressed={activeEntryId === entry.id}
							onclick={() => selectEntry(entry.id)}
						>
							{entry.clue}
						</button>
					</li>
				{/each}
			</ol>
		</section>
	</div>
</div>

<style>
	.crossword-game {
		display: grid;
		grid-template-columns: minmax(20rem, 1.15fr) minmax(18rem, 0.85fr);
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

	.crossword-board {
		display: grid;
		grid-template-columns: repeat(15, minmax(0, 1fr));
		width: min(100%, 39rem);
		aspect-ratio: 15 / 12;
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

	.crossword-game__hint {
		margin: 0.35rem 0 0;
		font-size: 0.72rem;
		line-height: 1.45;
	}

	.crossword-clues {
		display: grid;
		gap: 1.25rem;
	}

	.crossword-clues section {
		border-top: 3px solid #151515;
	}

	.crossword-clues h3 {
		margin: 0;
		padding: 0.65rem 0;
		border-bottom: 1px solid #151515;
		font-family: var(--font-display);
		font-size: 1.45rem;
		line-height: 1;
		text-transform: uppercase;
	}

	.crossword-clues ol {
		margin: 0;
		padding: 0;
		list-style-position: inside;
	}

	.crossword-clues li {
		border-bottom: 1px solid rgba(21, 21, 21, 0.35);
		font-size: 0.82rem;
		font-weight: 800;
	}

	.crossword-clues li::marker {
		color: #c83e72;
	}

	.crossword-clues button {
		width: calc(100% - 1.8rem);
		padding: 0.72rem 0.55rem;
		border: 0;
		background: transparent;
		color: #151515;
		font: inherit;
		line-height: 1.4;
		text-align: left;
		cursor: pointer;
	}

	.crossword-clues button:hover,
	.crossword-clues button:focus-visible,
	.crossword-clues .crossword-clue--active {
		background: #ffd7e3;
	}

	@media (max-width: 900px) {
		.crossword-game {
			grid-template-columns: 1fr;
		}

		.crossword-board {
			margin: 0 auto;
		}

		.crossword-clues {
			grid-template-columns: 1fr 1fr;
		}
	}

	@media (max-width: 560px) {
		.crossword-game {
			gap: 2rem;
		}

		.crossword-board {
			box-shadow: 0.3rem 0.3rem 0 #c83e72;
		}

		.crossword-clues {
			grid-template-columns: 1fr;
		}

		.crossword-game__hint {
			display: none;
		}
	}
</style>
