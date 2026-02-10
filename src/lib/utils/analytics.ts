export function getSessionId() {
	let id = sessionStorage.getItem('sid');
	if (!id) {
		id = crypto.randomUUID();
		sessionStorage.setItem('sid', id);
	}
	return id;
}

export function trackClick(name: string, meta?: Record<string, unknown>) {
	fetch('/api/track', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			type: 'click',
			name,
			meta,
			page: window.location.pathname
		}),
		keepalive: true // important when navigation happens
	}).catch(() => {
		// intentionally swallow errors
	});
}
