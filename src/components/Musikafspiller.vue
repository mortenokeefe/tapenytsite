<template>
	<div class="musikafspiller">
		<div class="minimer" @click="visSoundcloud = !visSoundcloud">
			<div class="tekst">SOUNDCLOUD PLAYER</div>
			<div class="ikon">
				<i class="fa fa-window-minimize" />
			</div>
		</div>
		<div v-show="visSoundcloud">
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
	export default {
		data() {
			return {
				visSoundcloud: false,
			};
		},
	};
</script>

<style>
	.musikafspiller {
		position: fixed;
		bottom: 0px;
		right: 0px;
		z-index: 99;
		background-color: white;
	}
	.tekst {
		font-family: "BebasNeueProBold";
		letter-spacing: 3px;
		font-weight: 1000;
	}
	.minimer {
		cursor: pointer;
		background-color: rgb(192, 192, 168);
		box-sizing: border-box;
		padding: 3px 3px;
		display: flex;
		flex-direction: row;
		top: -27px;
		width: 300px;
		background-color: white;
		color: black;
	}
	.ikon {
		display: flex;
		margin-left: 100px;
		margin-bottom: 5px;
	}
</style>
