<script lang="ts">
import { parse } from "./lib/parser";


	let raw = "";

	let err = null;

	const check = () => {
		try {
			const chunks = parse(raw);
			console.log(chunks);
		} catch (error) {
			err = `${error}`;
		}
	};
</script>
<section>
	
	{#if err}
		{err}
	{/if}
	
	<textarea
		placeholder="Logs hier einfügen"
		id=""
		rows="30"
		bind:value={raw}
	/>
	
	<button on:click={check}>Parsen</button>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 20px;
	}
</style>