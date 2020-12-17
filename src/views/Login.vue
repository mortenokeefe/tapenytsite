<template>
	<div class="container">
		<div class="email-password-container">
			<div>
				<input placeholder="email" v-model="email" />
			</div>
			<div>
				<input placeholder="password" type="password" v-model="password" />
			</div>
			<div>
				<button @click="login()">Login</button>
			</div>
		</div>
	</div>
</template>

<script>
	import firebase from "firebase";
	export default {
		data() {
			return {
				email: "",
				password: "",
			};
		},
		methods: {
			login() {
				firebase
					.auth()
					.signInWithEmailAndPassword(this.email, this.password)
					.then(
						(user) => {
							this.$router.push("/admin");
						},
						(err) => {
							alert(err);
						}
					);
			},
		},
	};
</script>

<style scoped>
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 40vh;
	}
	.email-password-container {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 70px;
	}
</style>
