<template>
	<div id="app">
		<router-view />
	</div>
</template>
<script>
	export default {};
</script>

<style>
	@font-face {
		font-family: BebasNeue;
		src: url("~@/assets/fonts/BNRegular.otf");
	}
	@font-face {
		font-family: BebasNeueThin;
		src: url("~@/assets/fonts/BNThin.otf");
	}
	@font-face {
		font-family: BebasNeueBold;
		src: url("~@/assets/fonts/BNBold.otf");
	}
	@font-face {
		font-family: BebasNeuePro;
		src: url("~@/assets/fonts/BNPRegular.otf");
	}
	@font-face {
		font-family: BebasNeueProThin;
		src: url("~@/assets/fonts/BNPThin.otf");
	}
	@font-face {
		font-family: BebasNeueProLight;
		src: url("~@/assets/fonts/BNPLight.otf");
	}
	body {
		background-color: rgb(59, 58, 55);
	}
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: white;
	}
</style>
