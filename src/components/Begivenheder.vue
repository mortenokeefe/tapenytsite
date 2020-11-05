<template>
	<!--<div class="container">
		<div class="år" v-for="(år, årIndex) in Object.keys(begivenheder)" :key="årIndex">
			<div class="måned-container" v-for="måned in Object.keys(begivenheder[år])" :key="måned">

				<div class="måned">{{ måned }} {{ år }}</div>
				<div class="begivenhed-container" v-for="(begivenhed, eventIndex) in begivenheder[år][måned]" :key="eventIndex">
					<div class="dag">
						{{ getDate(begivenhed.start_time) }}
					</div>
					<div class="begivenhed">
	
						<a :href="`https://www.facebook.com/events/${begivenhed.id}`" target="_blank">{{ begivenhed.name }} </a>
					</div>
				</div>
			</div>
		</div>-->
	<!--<div
			class="element"
			v-for="(element, index) in testData"
			:key="index"
			:style="`margin-left: ${calcPadding(index)}px`"
		>
			{{ element }}
		</div>-->
	<!--</div>-->
	<div class="container">
		<div v-for="(element, index) in begivenhederArray" :key="index">
			<div class="begivenhed" v-if="element.name" :style="`margin-left: ${udregnPadding(index)}`">
				<div class="seperator">________</div>
				<div class="dag-begivenhed-container">
					<div class="dag">{{ getDate(element.start_time) }}</div>
					<a :href="`https://www.facebook.com/events/${element.id}`" target="_blank">{{ element.name }} </a>
				</div>
			</div>
			<div class="måned-år-container" v-else :style="`margin-left: ${udregnPadding(index)}`">
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
				return -(index * 8.2) + "%";
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
	.container {
		z-index: 99;
		margin-left: 4vw;
		height: 200 vh;
	}
	.måned-år-container {
		display: flex;
		padding-top: 10%;
		letter-spacing: 0.2vw;
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
	.dag-begivenhed-container {
		display: flex;
		align-items: center;
	}
	.dag {
		font-family: "BebasNeuePro";
		font-size: 2.5vw;
		padding-right: 8%;
	}
	.begivenhed {
		font-family: "BebasNeueProLight";
		font-size: 2vw;
		font-weight: 500;
	}
	.seperator {
		color: rgb(125, 124, 122);
		user-select: none;
		padding-bottom: 3vh;
		padding-left: 15%;
		height: 2%;
	}
</style>
