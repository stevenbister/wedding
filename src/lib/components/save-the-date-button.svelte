<script lang="ts">
	import { content } from '$/constants/content';
	import { trackClick, getSessionId } from '$lib/utils/analytics';
</script>

<a
	class="btn space-top-7"
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
