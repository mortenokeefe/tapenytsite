<template>
	<div v-if="begivenhederArray.length" class="begivenhedsliste">
		<div v-for="(element, index) in begivenhederArray" :key="index">
			<div class="begivenhed" v-if="element.name" :style="`padding-left: ${udregnPadding(index)}`">
				<div class="skillelinje">________</div>
				<div class="dag-begivenhed">
					<div class="dag">{{ getDate(element.start_time) }}</div>
					<a :href="`https://www.facebook.com/events/${element.id}`" target="_blank">{{ element.name }} </a>
				</div>
			</div>
			<div class="måned-år" v-else :style="`margin-left: ${udregnPadding(index)}`">
				<div class="måned">{{ element.måned }}</div>
				<div class="år">{{ element.år }}</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			begivenheder: Object,
		},
		data() {
			return {
				begivenhederArray: [],
			};
		},
		created() {
			for (let år of Object.keys(this.begivenheder)) {
				for (let måned of Object.keys(this.begivenheder[år])) {
					this.begivenhederArray.push({ måned: måned, år: år });
					for (let begivenhed of this.begivenheder[år][måned]) {
						this.begivenhederArray.push(begivenhed);
					}
				}
			}
		},
		methods: {
			getDate(str) {
				const date = new Date(str).getDate();
				return date;
			},
			udregnPadding(index) {
				let konstantPadding = 1;
				//trekantens højde
				let højde = 167.7;

				let afstand = 6;
				let nyhøjde = højde - afstand * index;

				if (nyhøjde < 0) {
					return konstantPadding + "vw";
				}

				let grader = 18.55;
				var radian = (grader * Math.PI) / 180;
				let hypo = nyhøjde / Math.cos(radian);

				let nybredde = Math.sqrt(Math.pow(hypo, 2) - Math.pow(nyhøjde, 2));

				return konstantPadding + nybredde + "vw";
			},
		},
	};
</script>

<style scoped>
	* {
		color: white;
	}
	a {
		text-decoration: none;
	}
	.begivenhedsliste {
		margin-top: -2vw;
		padding-bottom: 10vw;
		width: 45vw;
		z-index: 98;
		position: absolute;
	}
	.måned-år {
		letter-spacing: 0.2vw;
		height: 6vw;
		display: flex;
		align-items: flex-end;
	}
	.måned {
		font-family: "BebasNeuePro";
		font-size: 2.5vw;
		text-transform: uppercase;
		padding-right: 1vw;
	}
	.år {
		font-family: "BebasNeueProLight";
		font-size: 2.5vw;
	}
	.dag-begivenhed {
		display: flex;
		align-items: center;
		width: 40vw;
	}
	.dag {
		font-family: "BebasNeuePro";
		font-size: 2.5vw;
		padding-right: 2vw;
		padding-bottom: 0.2vw;
		display: flex;
		align-items: center;
	}
	.begivenhed {
		font-family: "BebasNeueProLight";
		font-size: 2vw;
		font-weight: 500;
		height: 6vw;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}
	.skillelinje {
		color: rgb(125, 124, 122);
		user-select: none;
		display: flex;
		align-items: center;
		padding-left: 5vw;
		padding-bottom: 1vw;
	}
</style>
