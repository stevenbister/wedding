import type { Action } from 'svelte/action';
import { animate, type Easing } from 'motion';
import { stopControl } from './stop-control';

export interface DrawOptions {
	duration?: number;
	delay?: number;
	stagger?: number;
	ease?: Easing | Easing[];
	/**
	 * Selector for the paths to draw, relative to the node.
	 * Defaults to stroked shapes. Pass e.g. `'#celebrate-reveal path'` for
	 * mask-based reveals where the stroke comes from CSS, not an attribute.
	 */
	selector?: string;
}

const DEFAULT_SELECTOR =
	'path[stroke], circle[stroke], ellipse[stroke], line[stroke], polyline[stroke], polygon[stroke]';

/**
 * Draw stroked SVG paths or fade in fill-based artwork on mount.
 * Apply to the `<svg>` element: `<svg use:draw={{ duration: 2 }}>`.
 */
export const draw: Action<SVGSVGElement | SVGPathElement, DrawOptions | undefined> = (
	node,
	options
) => {
	let controls: { cancel: () => void; stop?: () => void }[] = [];

	function start(opts?: DrawOptions) {
		controls.forEach(stopControl);
		controls = [];

		if (typeof window === 'undefined') return;

		// Reveal in the same task as starting the animation so the
		// browser never paints the fully-drawn artwork.
		node.style.visibility = 'visible';

		if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

		const { duration = 2.2, delay = 0, stagger = 0.15, ease = 'easeInOut' } = opts ?? {};

		const targets: SVGGeometryElement[] =
			node instanceof SVGPathElement
				? [node]
				: Array.from(node.querySelectorAll(opts?.selector ?? DEFAULT_SELECTOR));

		if (targets.length === 0) {
			// Fill-based artwork (e.g. couple.svelte) has no strokes to draw,
			// so fade the whole svg in instead of leaving it static.
			controls = [animate(node, { opacity: [0, 1] }, { duration: 1, delay, ease })];
			return;
		}

		controls = targets.map((target, i) => {
			// Motion drives the dash pattern via attributes but leaves any
			// pre-existing stroke-dashoffset (e.g. mask pre-hide) untouched,
			// which would keep the artwork hidden forever. Pin it to 0 inline
			// (harmless no-op for artwork without an offset).
			(target as SVGElement & ElementCSSInlineStyle).style.strokeDashoffset = '0';
			return animate(
				target,
				{ pathLength: [0, 1] },
				{ duration, delay: delay + i * stagger, ease }
			);
		});
	}

	start(options);

	return {
		update(newOptions) {
			start(newOptions);
		},
		destroy() {
			controls.forEach(stopControl);
		}
	};
};
