<template>
	<div class="forside">
		<div class="billede"></div>
		<Begivenhedsliste v-if="begivenheder" :begivenheder="begivenheder" />
	</div>
</template>

<script>
	import axios from "axios";
	import Begivenhedsliste from "@/components/Begivenhedsliste";
	export default {
		name: "Forside",
		data() {
			return {
				begivenheder: null,
				måneder: [
					"January",
					"February",
					"March",
					"April",
					"May",
					"June",
					"July",
					"August",
					"September",
					"October",
					"November",
					"December",
				],
			};
		},
		components: { Begivenhedsliste },

		created() {
			this.hentBegivenheder();
		},
		methods: {
			async hentBegivenheder() {
				await axios({
					url:
						"https://graph.facebook.com/191210314550236?fields=events&access_token=EAAE4B1wZC43QBAHfg9gov4BWF3OZBg70OY7iGOjI0y5a6kCSefJiSNwEjHEnzujdq2tTQm6BSOJLDjZAOjb2khVhQ8itY84bbPa4XRQUzxtyNZBcSecadeltQFKKZCMfNsJmoCLpOZByGGyRT7G9hTd5mXFMLRvbmYZCAkJcTEnhwZDZD",
					method: "get",
				})
					.then((res) => {
						let begivenheder = res.data.events.data;

						//filterer så det kun er fremtidige begivenheder
						begivenheder = begivenheder.filter((begivenhed) => {
							let startTid = new Date(begivenhed.start_time);
							let nu = new Date();
							if (startTid.getTime() > nu.getTime()) {
								return begivenhed;
							}
						});
						//hvis begivenhedsnavnet starter med at fortælle hvem der præsenterer begivenheden ('TAPE' eller 'TAPE & ...'), fjernes dette
						begivenheder = begivenheder.map((begivenhed) => {
							let regex = /^TAPE.*:/;
							if (regex.test(begivenhed.name)) {
								let position = begivenhed.name.search(/:/) + 2;
								begivenhed.name = begivenhed.name.slice(position);
								return begivenhed;
							} else {
								return begivenhed;
							}
						});

						//vender rækkefølgen så seneste begivenheder er nederst
						begivenheder.reverse();

						//omstrukturerer data
						//tilføjer årstal
						let begivenhederIÅrOgMåneder = {};

						begivenheder.forEach((begivenhed) => {
							const år = new Date(begivenhed.start_time).getFullYear().toString();
							begivenhederIÅrOgMåneder[år] = {};
						});

						//tilføjer måneder
						begivenheder.forEach((begivenhed) => {
							const år = new Date(begivenhed.start_time).getFullYear().toString();
							const måned = new Date(begivenhed.start_time).getMonth();
							let månedString = this.måneder[måned];
							begivenhederIÅrOgMåneder[år][månedString] = [];
						});

						//inddeler begivenheder i korrekt år og måned
						begivenheder.forEach((begivenhed) => {
							const år = new Date(begivenhed.start_time).getFullYear().toString();
							const måned = new Date(begivenhed.start_time).getMonth();
							let månedString = this.måneder[måned];
							begivenhederIÅrOgMåneder[år][månedString].push(begivenhed);
						});
						this.begivenheder = begivenhederIÅrOgMåneder;
					})
					.catch((fejl) => console.log(fejl));
			},
		},
	};
</script>
<style scoped>
	.forside {
		display: flex;
		position: relative;
	}

	.billede {
		background-image: url("~@/assets/Asset2klippet.png");
		background-repeat: no-repeat;
		background-size: contain, cover;
		width: 60vw;
		height: 170vw;
		position: relative;
		margin: 0px -10px -10px -10px;
	}
</style>
