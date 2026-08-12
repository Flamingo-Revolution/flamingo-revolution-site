<script lang="ts">
	import type { Snippet } from "svelte";
	import type { Attachment } from "svelte/attachments";
	import type { ClassValue } from "svelte/elements";

	interface Props {
		children: Snippet;
		direction?: "horizontal" | "vertical";
		/** CSS color used at the opaque end of the fade. Default: var(--surface) */
		fadeColor?: string;
		/** Fade width/height. Default: 1.75rem */
		fadeSize?: string;
		/** Extra class on the outer relative wrapper */
		class?: ClassValue;
		/** Extra class on the scrollable viewport */
		viewportClass?: ClassValue;
		/** Bindable ref to the scrollable viewport element */
		element?: HTMLDivElement | undefined;
		/** If true, no fade UI (scrolling still works) */
		disabled?: boolean;
	}

	let {
		children,
		direction = "horizontal",
		fadeColor = "var(--surface)",
		fadeSize = "1.75rem",
		class: className,
		viewportClass,
		element = $bindable(),
		disabled = false
	}: Props = $props();

	let showStart = $state(false);
	let showEnd = $state(false);

	const isHorizontal = $derived(direction === "horizontal");

	const observeOverflow: Attachment<HTMLDivElement> = (node) => {
		element = node;

		// Read props so this attachment re-runs (and re-checks fades) when they change.
		const isDisabled = disabled;
		const dir = direction;

		const update = () => {
			if (isDisabled) {
				showStart = false;
				showEnd = false;
				return;
			}

			if (dir === "horizontal") {
				showStart = node.scrollLeft > 1;
				showEnd = node.scrollLeft < node.scrollWidth - node.clientWidth - 1;
			} else {
				showStart = node.scrollTop > 1;
				showEnd = node.scrollTop < node.scrollHeight - node.clientHeight - 1;
			}
		};

		update();
		node.addEventListener("scroll", update, { passive: true });
		window.addEventListener("resize", update);

		const resizeObserver = new ResizeObserver(update);
		resizeObserver.observe(node);
		for (const child of node.children) {
			resizeObserver.observe(child);
		}

		return () => {
			node.removeEventListener("scroll", update);
			window.removeEventListener("resize", update);
			resizeObserver.disconnect();
			if (element === node) element = undefined;
		};
	};
</script>

<div
	class={[
		"scroll-container",
		isHorizontal ? "scroll-container--horizontal" : "scroll-container--vertical",
		className
	]}
	style:--scroll-fade-color={fadeColor}
	style:--scroll-fade-size={fadeSize}
>
	<div class={["scroll-container__viewport", viewportClass]} {@attach observeOverflow}>
		{@render children()}
	</div>

	{#if !disabled}
		<div
			class={[
				"scroll-container__fade",
				"scroll-container__fade--start",
				showStart && "is-visible"
			]}
			aria-hidden="true"
		></div>
		<div
			class={["scroll-container__fade", "scroll-container__fade--end", showEnd && "is-visible"]}
			aria-hidden="true"
		></div>
	{/if}
</div>

<style>
	.scroll-container {
		position: relative;
		min-width: 0;
	}

	.scroll-container--vertical {
		min-height: 0;
	}

	.scroll-container__viewport {
		-webkit-overflow-scrolling: touch;
		scrollbar-width: none;
		-ms-overflow-style: none;
	}

	.scroll-container__viewport::-webkit-scrollbar {
		display: none;
	}

	.scroll-container--horizontal .scroll-container__viewport {
		overflow-x: auto;
		overflow-y: hidden;
	}

	.scroll-container--vertical .scroll-container__viewport {
		overflow-x: hidden;
		overflow-y: auto;
	}

	.scroll-container__fade {
		position: absolute;
		pointer-events: none;
		opacity: 0;
		transition: opacity 0.2s ease;
		z-index: 1;
	}

	.scroll-container__fade.is-visible {
		opacity: 1;
	}

	.scroll-container--horizontal .scroll-container__fade--start,
	.scroll-container--horizontal .scroll-container__fade--end {
		top: 0;
		bottom: 0;
		width: var(--scroll-fade-size);
	}

	.scroll-container--horizontal .scroll-container__fade--start {
		left: 0;
		background: linear-gradient(to right, var(--scroll-fade-color), transparent);
	}

	.scroll-container--horizontal .scroll-container__fade--end {
		right: 0;
		background: linear-gradient(to left, var(--scroll-fade-color), transparent);
	}

	.scroll-container--vertical .scroll-container__fade--start,
	.scroll-container--vertical .scroll-container__fade--end {
		left: 0;
		right: 0;
		height: var(--scroll-fade-size);
	}

	.scroll-container--vertical .scroll-container__fade--start {
		top: 0;
		background: linear-gradient(to bottom, var(--scroll-fade-color), transparent);
	}

	.scroll-container--vertical .scroll-container__fade--end {
		bottom: 0;
		background: linear-gradient(to top, var(--scroll-fade-color), transparent);
	}
</style>
