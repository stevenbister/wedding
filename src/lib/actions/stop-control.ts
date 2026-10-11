export const stopControl = (control: { cancel?: () => void; stop?: () => void } | undefined) => {
	if (!control) return;
	if (typeof control.cancel === 'function') control.cancel();
	else if (typeof control.stop === 'function') control.stop();
};
