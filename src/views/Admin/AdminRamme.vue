<template>
	<div class="container">
		<div class="nav">
			<router-link class="nav-link" to="/admin/">Drikkevarer</router-link>
			<router-link class="nav-link" to="/admin/logo">Logoer</router-link>
			<button @click="logUd()">Log ud</button>
		</div>
		<router-view />
	</div>
</template>

<script>
	import firebase from "firebase";
	import Drikkevarer from "./Drikkevarer";
	export default {
		methods: {
			logUd() {
				firebase
					.auth()
					.signOut()
					.then(() => {
						this.$router.push("/login");
					});
			},
		},
	};
</script>

<style scoped>
	.nav {
		padding-bottom: 2vw;
		font-size: 2vw;
	}
	.nav a {
		padding-right: 1vw;
		font-weight: bold;
		color: white;
		text-decoration: none;
	}

	.nav a.router-link-exact-active {
		color: white;
		text-decoration: none;
	}
</style>
