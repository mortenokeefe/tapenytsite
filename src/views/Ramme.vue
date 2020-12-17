<template>
	<div class="ramme">
		<div class="top">
			<img class="logo" src="@/assets/Asset1.png" @click="visForside()" />
			<div class="nav">
				<router-link class="nav-link" to="/archive">Archive</router-link>
				<router-link class="nav-link" to="/menu">Menu</router-link>
			</div>
		</div>
		<router-view class="router-view" />
		<Musikafspiller />
	</div>
</template>

<script>
	import Musikafspiller from "@/components/Musikafspiller";
	export default {
		components: {
			Musikafspiller,
		},
		methods: {
			visForside() {
				window.location.href = "/";
			},
		},
	};
</script>

<style scoped>
	.top {
		display: flex;
		align-items: center;
		position: fixed;
		top: 0vw;
		right: 0;
		z-index: 99;
		width: 100vw;
		height: 7vw;
		background-color: rgb(59, 58, 55);
	}

	.nav {
		display: flex;
		font-family: "BebasNeueThin";
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
		margin-left: 4vw;
		height: 5vw;
		cursor: pointer;
	}
	.router-view {
		padding-top: 7vw;
	}
</style>
