import type { Action } from 'svelte/action';
import { animate, type Easing } from 'motion';
import { stopControl } from './stop-control';

export interface FadeInOptions {
	duration?: number;
	delay?: number;
	ease?: Easing | Easing[];
}

/**
 * Fade an element in on mount.
 * Pair with the pre-hide CSS (`main, .navbar { opacity: 0 }`) so the
 * browser never paints the page fully visible before JS runs.
 */
export const fadeIn: Action<HTMLElement, FadeInOptions | undefined> = (node, options) => {
	let control: { cancel: () => void; stop?: () => void } | undefined;

	function start(opts?: FadeInOptions) {
		stopControl(control);
		control = undefined;

		if (typeof window === 'undefined') return;

		// Reveal in the same task as starting the animation so the browser
		// never paints the pre-JS state mid-transition (CSS hides pre-JS).
		node.style.opacity = '1';

		if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

		const { duration = 1.5, delay = 0, ease = 'easeOut' } = opts ?? {};

		control = animate(node, { opacity: [0, 1] }, { duration, delay, ease });
	}

	start(options);

	return {
		update(newOptions) {
			start(newOptions);
		},
		destroy() {
			stopControl(control);
		}
	};
};
