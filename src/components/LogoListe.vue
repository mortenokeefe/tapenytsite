<template>
	<div class="logo-liste" v-if="logoer">
		<div v-for="(logo, index) in logoer" :key="index">
			<label :for="`fil${index}`" style="cursor: pointer;">
				<img v-if="logo.logoUrl" :src="logo.logoUrl" class="billedevisning" :id="`billedevisning${index}`" />
			</label>
			<input
				type="file"
				accept="image/*"
				name="image"
				:id="`fil${index}`"
				style="display: none;"
				@change="filValgt($event, logo.billede, logo.id, index)"
			/>
			<input
				style="width: 300px;"
				placeholder="Indtast URL (eks: https://carlsbergdanmark.dk)"
				v-model="logo.url"
				@input="opdaterUrl(logo.id, $event.target.value)"
			/>
			<i class="fa fa-trash fa-2x" :class="`fjern-logo`" @click="fjernLogo(logo.billede, logo.id)"></i>
		</div>
	</div>
</template>

<script>
	import firebase from "firebase";
	import db from "@/firebaseInit";
	export default {
		data() {
			return {
				logoer: null,
			};
		},
		//henter alle gemte logoer
		created() {
			let logoer = [];

			db.collection("logoer")
				.get()
				.then((snapshot) => {
					snapshot.forEach(async (doc) => {
						let obj = {};
						obj.id = doc.id;
						obj.url = doc.data().url;
						obj.billede = doc.data().billede;

						await firebase
							.storage()
							.ref("logoer/" + doc.data().billede)
							.getDownloadURL()
							.then((url) => {
								obj.logoUrl = url;
							});
						logoer.push(obj);
					});
				});

			this.logoer = logoer;
		},
		methods: {
			opdaterUrl(id, nyUrl) {
				db.collection("logoer")
					.doc(id)
					.update({ url: nyUrl });
			},
			async fjernLogo(billede, id) {
				let svar = confirm("Er du sikker på at du vil slette logoet?");
				if (svar) {
					if (billede !== "nytlogo.png") {
						await firebase
							.storage()
							.ref("logoer/" + billede)
							.delete();
					}
					await db
						.collection("logoer")
						.doc(id)
						.delete()
						.then((res) => {
							this.$emit("opdater");
						});
				}
			},
			filValgt(event, billede, id, index) {
				if (event.target.files[0]) {
					let fil = event.target.files[0];

					var billedevisning = document.getElementById("billedevisning" + index);
					billedevisning.src = URL.createObjectURL(fil);

					var storageRef = firebase.storage().ref("logoer/" + id);
					storageRef.put(fil);

					if (billede == "nytlogo.png") {
						db.collection("logoer")
							.doc(id)
							.update({ billede: id });
					}
				}
			},
		},
	};
</script>

<style scoped>
	.billedevisning {
		width: 100px;
		height: 100px;
	}
	.fjern-logo {
		color: red;
	}
</style>
