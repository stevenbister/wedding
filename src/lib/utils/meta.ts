import { brand } from '$/constants/brand';

export function buildMetaTitle(string: string) {
	return `${string} | ${brand.name}`;
}
