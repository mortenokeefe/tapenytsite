<template>
	<div class="drikkevarer">
		<div v-if="logoer" class="logo-kolonne">
			<div class="kolonne-linje" />
			<div class="linje" style="width: 10vw;" />
			<div class="logo-overskrift">
				Menu
			</div>
			<div class="logo-underoverskrift">In collaboration</div>
			<div class="linje" style="width: 10vw;" />
			<div v-for="(logo, index) in logoer" :key="index">
				<a :href="logo.url" target="_blank">
					<img class="logo" :src="logo.logoUrl" />
				</a>
			</div>
		</div>
		<div v-if="drikkevarer" class="menu-kolonne">
			<div class="menu-linje" />
			<div class="kategori" v-for="(kategori, index) in drikkevarer" :key="index">
				<div class="kategori-titel">
					{{ kategori.navn }}
				</div>
				<div style="drikkevarer">
					<div class="drikkevare" v-for="(drikkevare, index) in kategori.varer" :key="index">
						{{ drikkevare }}
						<div class="linje" style="width: 5vw; margin-top: 1vw;" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import db from "@/firebaseInit";
	import firebase from "firebase";
	export default {
		data() {
			return {
				logoer: null,
				drikkevarer: null,
			};
		},
		async created() {
			//henter logoer
			let logoer = [];
			await db
				.collection("logoer")
				.get()
				.then((snapshot) => {
					snapshot.forEach(async (doc) => {
						let obj = {
							navn: doc.data().navn,
							url: doc.data().url,
							billede: doc.data().billede,
						};

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

			//henter drikkevarer
			let drikkevarer = [];

			await db
				.collection("drikkevarer")
				.orderBy("position")
				.get()
				.then((snapshot) => {
					snapshot.forEach(async (kategori) => {
						drikkevarer.push({ navn: kategori.data().navn, varer: [] });
						let obj = drikkevarer.find((e) => e.navn == kategori.data().navn);
						await db
							.collection("drikkevarer/" + kategori.id + "/varer")
							.get()
							.then((snapshot) => {
								snapshot.forEach((drikkevare) => {
									obj.varer.push(drikkevare.data().navn);
								});
							});
					});
				});
			this.drikkevarer = drikkevarer;
		},
	};
</script>

<style scoped>
	.drikkevarer {
		display: flex;
	}
	.logo-kolonne {
		padding: 0vw 2.5vw;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.linje {
		margin-bottom: 1vw;
		height: 1px;
		background-color: rgb(125, 124, 122);
	}
	.kolonne-linje {
		position: absolute;
		right: 0px;
		top: -20vw;
		height: 100vw;
		width: 1px;
		background-color: rgb(125, 124, 122);
	}
	.menu-linje {
		position: absolute;
		height: 80vw;
		left: 38vw;
		width: 1px;
		background-color: rgb(125, 124, 122);
	}
	.logo-overskrift {
		font-family: "BebasNeueProThin";
		font-size: 4vw;
		font-weight: 600;
		text-transform: uppercase;
	}
	.logo-underoverskrift {
		padding-top: 1vw;
		padding-bottom: 2vw;
		font-family: "BebasNeueProThin";
		font-size: 1.2vw;
		font-weight: 600;
		letter-spacing: 0.1vw;
		text-transform: uppercase;
	}
	.logo {
		z-index: 99;
		padding: 0.5vw 0vw;
		max-width: 10vw;
		max-height: 10vw;
	}
	.menu-kolonne {
		position: relative;
		width: 70vw;
		padding-left: 8vw;
		column-count: 2;
		break-inside: avoid;
	}
	.kategori {
		display: flex;
		padding-bottom: 5vw;
		font-family: "BebasNeuePro";
		font-size: 2vw;
		text-transform: uppercase;
		letter-spacing: 0.05vw;
		break-inside: avoid;
		margin-bottom: 5vw;
	}
	.kategori-titel {
		padding-left: 0.4vw;
		text-align: left;
		transform: rotate(90deg);
		transform-origin: left top;
		width: 25vw;
		height: 1px;
	}
	.drikkevare {
		margin-left: -22vw;
		display: flex;
		flex-direction: column;
		align-items: top;
		font-family: "BebasNeueProLight";
		font-size: 1.5vw;
		font-weight: 600;
	}
</style>
