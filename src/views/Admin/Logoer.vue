<template>
	<div class="logo-side">
		<div>
			<LogoListe :key="listeIndex" @opdater="listeIndex++" />
		</div>
		<div class="nytlogo">
			<i class="fa fa-plus fa-2x" :class="`tilføj-logo`" @click="tilføjLogo()"></i>
		</div>
	</div>
</template>

<script>
	import firebase from "firebase";
	import db from "@/firebaseInit";
	import LogoListe from "@/components/LogoListe";
	export default {
		components: {
			LogoListe,
		},
		data() {
			return {
				listeIndex: 0,
			};
		},
		methods: {
			async tilføjLogo() {
				let maxIndex = 0;
				await db
					.collection("logoer")
					.get()
					.then((snapshot) => {
						if (!snapshot.empty) {
							snapshot.forEach((doc) => {
								if (doc.id) {
									let id = parseInt(doc.id);
									if (id > maxIndex) {
										maxIndex = id;
									}
								}
							});
						} else {
							maxIndex = -1;
						}
					});
				let nytIndex = maxIndex + 1;
				let obj = { url: "", billede: "nytlogo.png" };
				db.collection("logoer")
					.doc(nytIndex.toString())
					.set(obj);

				this.listeIndex++;
			},
		},
	};
</script>

<style>
	.logo-side {
		display: flex;
		flex-direction: row;
	}
	.tilføj-logo {
		color: green;
	}
</style>
