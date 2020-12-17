<template>
	<div class="arkiv">
		<div class="dropdown-div">
			<select class="dropdown" v-if="årstal" v-model="valgtÅrstal">
				<option v-for="(år, index) in årstal" :key="index">{{ år }}</option>
			</select>
		</div>
		<ArkivListe v-if="begivenheder" :begivenheder="begivenheder" />
	</div>
</template>

<script>
	import db from "@/firebaseInit";
	import axios from "axios";
	import ArkivListe from "@/components/ArkivListe";
	export default {
		components: { ArkivListe },
		data() {
			return {
				årstal: null,
				valgtÅrstal: "",
				begivenheder: null,
				senesteÅrMedAfholdteBegivenheder: null,
			};
		},
		async created() {
			let måneder = [
				"januar",
				"februar",
				"marts",
				"april",
				"maj",
				"juni",
				"july",
				"august",
				"september",
				"oktober",
				"november",
				"december",
			];
			let årstal = [];

			//finder seneste år og måned med en afholdt begivenhed
			let nuværendeDato = new Date();
			let nuværendeÅr = nuværendeDato.getFullYear().toString();

			let fundet = false;
			let år = nuværendeÅr;
			let månederOmvendt = måneder.reverse();

			while (!fundet) {
				fundet = await this.ledEfterBegivenhed(år, nuværendeDato, månederOmvendt);
				år = (parseInt(år) - 1).toString();
			}
			await db
				.collection("arkiv")
				.get()
				.then((snapshot) => {
					snapshot.forEach((år) => {
						if (år.id <= this.senesteÅrMedAfholdteBegivenheder.år) {
							årstal.push(år.id);
						}
					});
				});

			//sætter data
			årstal.sort().reverse();
			this.valgtÅrstal = årstal[0];
			this.årstal = årstal;
		},
		methods: {
			async ledEfterBegivenhed(år, nuværendeDato, måneder) {
				let fundet = false;
				let senesteÅrMedAfholdteBegivenheder;
				for (let måned of måneder) {
					await db
						.collection(`arkiv/${år}/${måned}`)
						.get()
						.then((snapshot) => {
							snapshot.forEach((begivenhed) => {
								if (!snapshot.empty) {
									let begivenhedsDato = new Date(begivenhed.data().tidspunkt);
									if (begivenhedsDato.getTime() < nuværendeDato.getTime()) {
										senesteÅrMedAfholdteBegivenheder = { år: år, måned: måned };
										fundet = true;
									}
								}
							});
						});
					if (fundet) {
						this.senesteÅrMedAfholdteBegivenheder = senesteÅrMedAfholdteBegivenheder;
						return Promise.resolve(true);
					}
				}
				return Promise.resolve(false);
			},
		},
		watch: {
			//metoden henter afholdte begivenheder for det pågældende år
			valgtÅrstal: function(år) {
				let måneder = [
					"januar",
					"februar",
					"marts",
					"april",
					"maj",
					"juni",
					"july",
					"august",
					"september",
					"oktober",
					"november",
					"december",
				].reverse();
				let senesteÅrMedAfholdteBegivenheder = this.senesteÅrMedAfholdteBegivenheder;
				let begivenhederForÅr = [];

				if (år == this.senesteÅrMedAfholdteBegivenheder.år) {
					let senesteMånedIndex = måneder.findIndex((e) => e == senesteÅrMedAfholdteBegivenheder.måned);

					let valgteMåneder = måneder.filter((e, index) => index >= senesteMånedIndex);
					valgteMåneder.forEach(async (måned) => {
						let obj;
						await db
							.collection("arkiv/" + år + "/" + måned)
							.get()
							.then((snapshot) => {
								if (!snapshot.empty) {
									obj = { måned: måned, begivenheder: [] };
									snapshot.forEach((begivenhed) => {
										obj.begivenheder.push(begivenhed.data());
									});
									obj.begivenheder.sort((a, b) => {
										let datoA = new Date(a.tidspunkt);
										let datoB = new Date(b.tidspunkt);
										return datoA.getTime() < datoB.getTime() ? 1 : -1;
									});
									begivenhederForÅr.push(obj);
								}
							});
					});
				} else {
					måneder.forEach(async (måned) => {
						let obj;
						await db
							.collection("arkiv/" + år + "/" + måned)
							.get()
							.then((snapshot) => {
								if (!snapshot.empty) {
									obj = { måned: måned, begivenheder: [] };
									snapshot.forEach((begivenhed) => {
										obj.begivenheder.push(begivenhed.data());
									});
									obj.begivenheder.sort((a, b) => {
										let datoA = new Date(a.tidspunkt);
										let datoB = new Date(b.tidspunkt);
										return datoA.getTime() < datoB.getTime() ? 1 : -1;
									});
									begivenhederForÅr.push(obj);
								}
							});
					});
				}
				this.begivenheder = begivenhederForÅr;
			},
		},
	};
</script>

<style scoped>
	.arkiv {
		margin: auto;
		width: 40vw;
	}
	.dropdown-div {
		display: flex;
		justify-content: center;
		margin-bottom: 2vw;
	}
	.dropdown {
		font-size: 3vw;
		background-color: transparent;
		color: white;
		font-family: "BebasNeuePro";
		letter-spacing: 0.2vw;
		outline: none;
		border: none;
	}
	option {
		background-color: rgb(59, 58, 55);
	}
</style>
