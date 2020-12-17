<template>
	<div class="arkiv-liste">
		<div
			class="måned"
			v-for="(måned, index) in begivenheder"
			:style="index % 2 == 0 ? 'background-color: rgb(82, 81, 79);' : ''"
			:key="index"
		>
			{{ måned.måned }}
			<div class="begivenhed" v-for="(begivenhed, index) in måned.begivenheder" :key="index">
				<div class="dato">{{ datoFormateret(begivenhed.tidspunkt) }}</div>
				<a class="navn" :href="`https://www.facebook.com/events/${begivenhed.id}`" target="_blank">{{
					begivenhed.navn
				}}</a>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			begivenheder: Array,
		},
		methods: {
			datoFormateret(værdi) {
				let dato = new Date(værdi);
				return dato.getDate();
			},
		},
	};
</script>

<style scoped>
	.måned {
		text-transform: uppercase;
		font-family: "BebasNeuePro";
		font-size: 2.5vw;
		padding-right: 1vw;
		padding: 1vw 2vw;
	}
	.dato {
		font-family: "BebasNeuePro";
		font-size: 2.5vw;
		padding-right: 2vw;
		padding-bottom: 0.2vw;
		display: flex;
		align-items: center;
	}
	.begivenhed {
		display: flex;
		padding: 1vw 0vw;
	}
	.navn {
		padding-top: 0.3vw;
		font-family: "BebasNeueProLight";
		font-size: 2vw;
		font-weight: 500;
		text-transform: capitalize;
		text-decoration: none;
		color: white;
	}
</style>
