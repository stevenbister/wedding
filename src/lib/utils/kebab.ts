export function kebab(str: string): string {
	return str
		.normalize('NFD') // separate accent from letter
		.replace(/[\u0300-\u036f]/g, '') // remove diacritics
		.replace(/[^a-zA-Z0-9\s-]/g, '') // remove special characters
		.trim()
		.replace(/\s+/g, '-') // replace spaces with hyphen
		.replace(/-+/g, '-') // collapse multiple hyphens
		.toLowerCase();
}
