<template>
	<div class="home">
		<div class="img"></div>
		<Begivenheder v-if="begivenheder" :begivenheder="begivenheder" />

		<div class="soundcloud-player">
			<iframe
				width="100%"
				height="300"
				scrolling="no"
				frameborder="no"
				allow="autoplay"
				src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1155513160&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
			></iframe>
			<div
				style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"
			>
				<a
					href="https://soundcloud.com/user-161332099-153132462"
					title="TAPE_Aarhus"
					target="_blank"
					style="color: #cccccc; text-decoration: none;"
					>TAPE_Aarhus</a
				>
				·
				<a
					href="https://soundcloud.com/user-161332099-153132462/sets/tape"
					title="Tape"
					target="_blank"
					style="color: #cccccc; text-decoration: none;"
					>Tape</a
				>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from "axios";
	import Begivenheder from "@/components/Begivenheder";
	export default {
		name: "Home",
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
		components: { Begivenheder },

		created() {
			axios({
				url:
					"https://graph.facebook.com/191210314550236?fields=events&access_token=EAAE4B1wZC43QBAHfg9gov4BWF3OZBg70OY7iGOjI0y5a6kCSefJiSNwEjHEnzujdq2tTQm6BSOJLDjZAOjb2khVhQ8itY84bbPa4XRQUzxtyNZBcSecadeltQFKKZCMfNsJmoCLpOZByGGyRT7G9hTd5mXFMLRvbmYZCAkJcTEnhwZDZD",
				method: "get",
			})
				.then((res) => {
					let begivenheder = res.data.events.data;

					//kun fremtidige begivenheder
					begivenheder = begivenheder.filter((e) => {
						let startTid = new Date(e.start_time);
						let nu = new Date();
						if (startTid > nu) {
							return e;
						}
					});
					//hvis begivenhedsnavnet starter med at fortælle hvem der præsenterer begivenheden ('TAPE' eller 'TAPE & ...'), fjernes dette
					begivenheder = begivenheder.map((e) => {
						let regex = /^TAPE.*:/;
						if (regex.test(e.name)) {
							let position = e.name.search(/:/) + 2;
							e.name = e.name.slice(position);
							return e;
						} else {
							return e;
						}
					});

					begivenheder.reverse();

					//omstrukturerer data
					//tilføjer årstal
					let begivenhederIÅrOgMåneder = {};
					begivenheder.forEach((e) => {
						const år = new Date(e.start_time).getFullYear().toString();
						begivenhederIÅrOgMåneder[år] = {};
					});

					//tilføjer måneder
					begivenheder.forEach((e) => {
						const år = new Date(e.start_time).getFullYear().toString();
						const måned = new Date(e.start_time).getMonth();
						let månedString = this.måneder[måned];
						begivenhederIÅrOgMåneder[år][månedString] = [];
					});

					//inddeler begivenheder i korrekt år og måned
					begivenheder.forEach((e) => {
						const år = new Date(e.start_time).getFullYear().toString();
						const måned = new Date(e.start_time).getMonth();
						let månedString = this.måneder[måned];
						begivenhederIÅrOgMåneder[år][månedString].push(e);
					});

					this.begivenheder = begivenhederIÅrOgMåneder;
				})
				.catch((err) => console.log(err));
		},
	};
</script>
<style scoped>
	.home {
		display: flex;
	}
	.soundcloud-player {
		position: fixed;
		bottom: 0px;
		left: 0px;
		background-color: white;
		visibility: hidden;
	}
	.img {
		background-image: url("~@/assets/Asset2klippet.png");
		/*width: 700px;
			height: 2000px;*/
		background-repeat: no-repeat;
		background-size: contain, cover;
		width: 50vw;
		height: 400vh;
		position: relative;
		margin: 0px -10px -10px -10px;
	}
	.triangle-up {
		position: absolute;
		top: 0px;
		right: 0px;
		width: 0;
		height: 0;
		border-left: 300px solid transparent;
		border-top: 1000px solid transparent;
		border-bottom: 1000px solid rgb(59, 58, 55);
		border-right: 300px solid rgb(59, 58, 55);
	}
	.triangle-down {
		position: absolute;
		top: 0px;
		right: -45px;
		width: 0;
		height: 0;
		border-left: 70px solid transparent;
		border-right: 70px solid transparent;
		border-top: 100px solid rgb(59, 58, 55);
	}
</style>
