<template>
	<div id="app">
		<div id="top-container">
			<img class="logo" src="@/assets/Asset1.png" @click="visForside()" />

			<div class="nav">
				<router-link class="nav-link" to="/about">About</router-link>
				<router-link class="nav-link" to="/merch">Merch</router-link>
				<router-link class="nav-link" to="/menu">Menu</router-link>
				<router-link class="nav-link" to="/specs">Specs</router-link>
			</div>
		</div>
		<router-view class="view" />
	</div>
</template>
<script>
	export default {
		methods: {
			visForside() {
				window.location.href = "/";
			},
		},
	};
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
		background-color: rgb(59, 58, 55);
	}
	#top-container {
		display: flex;
		position: relative;
		padding: 2vh 0 4vh 3%;
	}

	.nav {
		display: flex;
		font-family: "BebasNeueThin";
		/*font-size: 28px;*/
		font-size: 2vw;
		letter-spacing: 2px;
		position: absolute;
		right: 5%;
	}

	.nav a {
		font-weight: bold;
		color: white;
		text-decoration: none;
	}

	.nav a.router-link-exact-active {
		color: white;
		text-decoration: none;
	}
	.nav-link {
		padding: 0px 1vw;
	}
	.logo {
		height: 10vh;
		cursor: pointer;
	}
</style>
