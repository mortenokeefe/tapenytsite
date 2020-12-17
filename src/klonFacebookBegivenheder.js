hentBegivenheder(
	"https://graph.facebook.com/191210314550236?fields=events&access_token=EAAE4B1wZC43QBAHfg9gov4BWF3OZBg70OY7iGOjI0y5a6kCSefJiSNwEjHEnzujdq2tTQm6BSOJLDjZAOjb2khVhQ8itY84bbPa4XRQUzxtyNZBcSecadeltQFKKZCMfNsJmoCLpOZByGGyRT7G9hTd5mXFMLRvbmYZCAkJcTEnhwZDZD", 
	[], 
	this.sætData);

async function sætData(data) {
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
	data.forEach(async (begivenhed) => {
		let dato = new Date(begivenhed.start_time);
		let år = dato.getFullYear().toString();
		let måned = dato.getMonth().toString();

		await db
			.collection("arkiv")
			.doc(år)
			.get()
			.then(async (doc) => {
				let regex = /aflyst/;
				if (!regex.exec(begivenhed.name.toLowerCase())) {
					await db
						.collection("arkiv/" + år + "/" + måneder[måned])
						.add({ navn: begivenhed.name, id: begivenhed.id, tidspunkt: begivenhed.start_time });
				}
			});
	});
},
async function hentBegivenheder(url, data, callback) {
	await axios({
		url: url,
		method: "get",
	}).then((res) => {
		//første 25 begivenheder ligger i res.data.events.data
		// herefter ligger de i res.data.data. dvs første gange kaldes er første if sandt og herefter køres else statementet
		if (res.data.events) {
			data = data.concat(res.data.events.data);
			this.hentBegivenheder(res.data.events.paging.next, data, callback);
		} else {
			//findes der ikke flere sider stoppes funktionen
			data = data.concat(res.data.data);
			if (!res.data.paging.next) {
				callback(data);
				return;
			}
			this.hentBegivenheder(res.data.paging.next, data, callback);
		}
	});
},