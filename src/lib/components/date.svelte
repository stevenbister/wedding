<script lang="ts">
	import dayjs from 'dayjs';
	import { getDateRangeAround, getMonthAndYear } from '$lib/utils/dates';

	const date = dayjs('2027-06-17');
	const dateList = getDateRangeAround(date);
</script>

<section>
	<p class="ta-center">{getMonthAndYear(date)}</p>

	<div class="grid space-top-3">
		{#each dateList as date (date.day)}
			<div class={['flex-col ta-center', date.target && 'target']}>
				{#if date.target}
					<svg
						id="circle"
						width="45"
						height="49"
						viewBox="0 0 45 49"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							class="circle-path"
							d="M24.7666 0.597656C27.0702 0.459001 29.3415 0.415278 31.5703 0.831055C36.7072 1.78894 40.3371 4.6957 42.6113 9.3125C44.177 12.4897 44.6847 15.8962 44.4434 19.4463C44.1418 23.8723 42.7364 27.9769 40.6221 31.8838C38.28 36.2092 35.2899 40.0288 31.5527 43.2529C29.9679 44.6199 28.2579 45.8036 26.3926 46.751C21.434 49.2695 16.6088 49.0576 11.8682 46.1807C8.67144 44.2401 6.1898 41.5941 4.28418 38.3926C2.08437 34.6964 0.820684 30.7134 0.558594 26.4316C0.22351 20.9544 1.33524 15.7751 3.89746 10.9131C5.15153 8.53334 6.80433 6.48943 9.02246 4.94727L9.02539 4.94531C9.08368 4.90415 9.12432 4.85895 9.15137 4.82422C9.17493 4.79395 9.1933 4.7641 9.20215 4.75C9.22352 4.71593 9.24036 4.68777 9.27441 4.6377L10.0371 3.5166L8.72852 3.87402C7.48273 4.21515 6.32728 4.6172 5.20508 5.08594L4.72559 5.29102C4.5954 5.348 4.46568 5.40418 4.33691 5.46094C4.66791 5.25933 5.01382 5.07477 5.375 4.9043C7.43438 3.93502 9.60557 3.25396 11.833 2.68164C16.0828 1.5895 20.3912 0.860613 24.7666 0.597656ZM31.0752 1.41992C29.0559 1.02191 27.0224 1.03713 25.0361 1.11523C22.2191 1.2258 19.4335 1.57348 16.6729 2.05762L15.4912 2.27344C14.7468 2.414 13.9501 2.54325 13.1123 2.7793L12.3076 3.00586L12.7129 3.42578C12.3929 3.45711 12.0861 3.52273 11.792 3.60645L11.3838 3.73535C10.1602 4.15288 9.13042 4.85405 8.21191 5.68164C6.29623 7.40662 4.81806 9.45511 3.76367 11.7832C1.5371 16.6986 0.666703 21.8514 1.23633 27.2256V27.2266C1.69941 31.5907 3.19052 35.5889 5.68848 39.207C7.6659 42.0712 10.1713 44.3861 13.3086 46C17.1558 47.9795 21.0827 48.0725 25.0293 46.3184C27.2127 45.3481 29.1629 44.0234 30.9414 42.4824C34.9303 39.0264 38.068 34.9141 40.4561 30.2441C42.0394 27.1471 43.2395 23.9009 43.6641 20.3916C44.0423 17.2604 43.8512 14.1545 42.6836 11.1562C40.6141 5.84213 36.7479 2.54022 31.0762 1.41992H31.0752Z"
							stroke="var(--text)"
						/>
					</svg>
				{/if}
				<span class="cursive">{date.day}</span>
				<span>{date.date}</span>
			</div>
		{/each}
	</div>
</section>

<style>
	.grid {
		--cols: 5;

		display: grid;
		grid-template-columns: repeat(var(--cols), minmax(0, 1fr));
		gap: var(--size-px-2);
		max-width: 370px;
		margin-inline: auto;

		@media (min-width: 30rem) {
			--cols: 7;

			max-width: 540px;
		}

		> div {
			padding: var(--size-px-1);

			&:first-child,
			&:last-child {
				display: none;
			}

			@media (min-width: 30rem) {
				&:first-child,
				&:last-child {
					display: flex;
				}
			}
		}
	}

	p {
		font-size: var(--size-6);
		font-weight: var(--font-weight-4);
	}

	span {
		font-size: var(--size-5);
		line-height: 1;
	}

	.target {
		position: relative;
		svg {
			position: absolute;
			inset: 0;
			height: 100%;
			width: 100%;
		}
	}
</style>
