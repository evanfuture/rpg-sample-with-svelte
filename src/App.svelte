<script lang="ts">
	import Calculator from "./components/Calculator.svelte";
</script>

<style type="text/scss">
	@import "scss/theme";
	@font-face {
		font-family: "Amble";
		src: url("/assets/Amble-Regular.woff") format("woff");
		font-weight: normal;
		font-style: normal;
	}

	@font-face {
		font-family: "Amble";
		src: url("/assets/Amble-Light.woff") format("woff");
		font-weight: 100;
		font-style: normal;
	}

	:global {
		@import "scss/normalize";

		*,
		*:before,
		*:after {
			box-sizing: border-box;
		}

		body {
			font-family: "Amble", "Segoe UI", Tahoma, Geneva, Verdana,
				sans-serif;
			background-color: $bg-color;
			color: $content-color;
		}

		img {
			max-width: 100%;
		}
	}

	.content {
		width: 100%;
		margin: 10px auto;
		max-width: 1125px;
		padding: 25px;
		border: 3px solid $bg-color-dim;
		background: url("/assets/talent-calc-bg.png");
		background-size: cover;
	}

	.main-title {
		text-align: center;
		font-size: 1.8em;
		font-weight: normal;
		background: $bg-color-highlight;
		padding: 5px;
	}
</style>

<main class="content">
	<h1 class="main-title">
		TitanStar Legends - Rune Mastery Loadout Talent Calculator 9000
	</h1>

	<Calculator />
</main>
