<template>
	<div v-if="data">
		<draggable v-model="data" group="data" @start="drag = true" @end="drag = false">
			<div
				class="container"
				v-for="(kategori, index) in data"
				:key="index"
				:change="opdaterKategoriPosition(kategori.id)"
			>
				<div class="kategori-sleticon">
					<input
						class="kategori"
						v-model="kategori.navn"
						@input="opdaterKategoriNavn(kategori.id, $event.target.value)"
					/>
					<i class="fa fa-trash fa-2x" :class="`fjern`" @click="fjernKategori(kategori.id)"></i>
				</div>
				<div class="drikkevare-container" v-for="(drikkevare, index) in kategori.varer" :key="index">
					<input
						class="drikkevare"
						v-model="drikkevare.navn"
						@input="opdaterDrikkevareNavn(kategori.id, drikkevare.id, $event.target.value)"
					/>
					<i
						class="fa fa-minus fa-1g"
						:class="`fjern-drikkevare`"
						@click="fjernDrikkevare(kategori.id, drikkevare.id)"
					></i>
				</div>
				<i class="fa fa-plus fa-1g" :class="`tilføj`" :id="index" @click="tilføjDrikkevare(kategori.id)"></i>
			</div>
		</draggable>
		<i class="fa fa-plus fa-2x" :class="`tilføj-kategori`" @click="tilføjKategori()"></i>
	</div>
</template>

<script>
	import draggable from "vuedraggable";
	import db from "@/firebaseInit";
	export default {
		components: {
			draggable,
		},
		data() {
			return {
				data: null,
			};
		},
		async created() {
			let drikkevarer = [];
			await db
				.collection("drikkevarer")
				.orderBy("position")
				.get()
				.then((snapshot) => {
					let arr = [];
					snapshot.forEach((doc) => {
						drikkevarer.push({
							id: doc.id,
							navn: doc.data().navn,
							position: doc.data().position,
							varer: [],
						});
					});
				});
			drikkevarer.forEach((e) => {
				db.collection("drikkevarer/" + e.id + "/varer")
					.get()
					.then((snapshot) => {
						snapshot.forEach((doc) => {
							e.varer.push({
								id: doc.id,
								navn: doc.data().navn,
							});
						});
					});
			});
			this.data = drikkevarer;
		},
		methods: {
			opdaterDrikkevareNavn(kategori, id, nytnavn) {
				db.collection("drikkevarer/" + kategori + "/varer")
					.doc(id)
					.update({ navn: nytnavn });
			},
			opdaterKategoriNavn(id, nytnavn) {
				db.collection("drikkevarer")
					.doc(id)
					.update({ navn: nytnavn });
			},
			opdaterKategoriPosition(id) {
				let index = this.data.findIndex((e) => e.id == id);
				let kategori = this.data.find((e) => e.id == id);
				kategori.position = index;

				db.collection("drikkevarer")
					.doc(id)
					.update({ position: index });
			},
			async tilføjKategori() {
				let svar = prompt("Indtast navnet på den nye drikkevare kategori.");
				if (svar) {
					let position = this.data.length ? this.data.length : 1;
					let obj = { navn: svar, position: position - 1 };
					let vareId;
					await db
						.collection("drikkevarer")
						.add(obj)
						.then(async function(doc) {
							obj.id = doc.id;
							await db
								.collection("drikkevarer/" + doc.id + "/varer")
								.add({
									navn: "Ny drikkevare",
								})
								.then(function(doc) {
									vareId = doc.id;
								});
						});
					obj.varer = [{ navn: "Ny drikkevare", id: vareId }];
					this.data.push(obj);
				}
			},
			tilføjDrikkevare(kategoriid) {
				let kategori = this.data.find((e) => e.id == kategoriid);
				const obj = {
					navn: "Ny drikkevare",
				};
				db.collection("drikkevarer/" + kategoriid + "/varer")
					.add(obj)
					.then(function(docRef) {
						obj.id = docRef.id;
						kategori.varer.push(obj);
					});
			},
			async fjernKategori(id) {
				let svar = confirm("Er du sikker på at du vil slette kategorien?");
				if (svar) {
					//først slettes varer i produkt kategorien
					db.collection("drikkevarer/" + id + "/varer")
						.get()
						.then((snapshot) => {
							snapshot.forEach((e) => {
								db.collection("drikkevarer/" + id + "/varer")
									.doc(e.id)
									.delete();
							});
						});
					//derefter slettes produkt kategorien
					db.collection("drikkevarer")
						.doc(id)
						.delete();
					this.data = this.data.filter((e) => e.id !== id);
				}
			},
			fjernDrikkevare(kategoriId, drikkevareId) {
				let svar = confirm("Er du sikker på at du vil slette drikkevaren?");
				if (svar) {
					let kategori = this.data.find((e) => e.id == kategoriId);
					kategori.varer = kategori.varer.filter((e) => e.id !== drikkevareId);
					db.collection("drikkevarer/" + kategoriId + "/varer")
						.doc(drikkevareId)
						.delete();
				}
			},
		},
	};
</script>

<style scoped>
	.drikkevare,
	.kategori {
		color: white;
		background: none;
		border: none;
	}
	.kategori {
		font-size: 30px;
	}
	.drikkevare {
		font-size: 15px;
	}
	input:focus {
		outline: none;
	}
	.container {
		width: 410px;
		border: 1px solid black;
		padding: 10px;
		margin-bottom: 5px;
	}
	.tilføj {
		color: green;
	}
	.tilføj-kategori {
		color: green;
		margin: 10px 0px;
		margin-left: 200px;
	}
	.fjern {
		color: red;
		margin-left: 10px;
	}
	.kategori-sleticon {
		display: flex;
		align-items: center;
	}
	.drikkevare-container {
		margin: 5px 0px;
		padding: 5px 0px;
	}
	.fjern-drikkevare {
		color: red;
		margin-left: 187px;
	}
	i {
		padding: 5px;
		cursor: pointer;
	}
</style>
