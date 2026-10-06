<script lang="ts">
	import { content } from '$/constants/content';
	import { trackClick, getSessionId } from '$lib/utils/analytics';
</script>

<a
	class="btn save-the-date"
	href="/calendar-invite.ics"
	download
	onclick={() => {
		trackClick('save-the-date', {
			sessionId: getSessionId()
		});
	}}
>
	{content.saveTheDate.ctaSection.cta}
</a>

<style>
	.btn {
		margin-block: var(--size-2);
	}
</style>
