	/*
	dette er brugt til at godkende Facebook Graph API og gemmes i tilfælde at af Graph Api skal godkendes igen
	if (req.query && req.query['hub.mode]'] && req.query['hub.mode]'] && req.query['hub.verify_token']) {
  const hm = req.query['hub.mode]']
  const hc = req.query['hub.challenge']
  const hvt = req.query['hub.verify_token']
  

  if (hvt === "hemmelighed") {

  res.send(hc)
  }
*/

const functions = require('firebase-functions');
const axios = require('axios')

// The Firebase Admin SDK to access Cloud Firestore.
const admin = require('firebase-admin');
admin.initializeApp();


//hver gang der tilføjes en ny begivenhed, opdateres begivenhedsarkiv

exports.opdater = functions.https.onRequest(async (req, res) => {

  if (req.body) {
    let ændring = req.body.entry[0].changes[0].value;
    if (ændring.item === "event") {
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

			console.log("Opdaterer begivenheds arkiv...");
			await axios({
				url:
					"https://graph.facebook.com/191210314550236?fields=events&access_token=EAAE4B1wZC43QBAHfg9gov4BWF3OZBg70OY7iGOjI0y5a6kCSefJiSNwEjHEnzujdq2tTQm6BSOJLDjZAOjb2khVhQ8itY84bbPa4XRQUzxtyNZBcSecadeltQFKKZCMfNsJmoCLpOZByGGyRT7G9hTd5mXFMLRvbmYZCAkJcTEnhwZDZD",
				method: "get",
			}).then(async (res) => {
				let begivenheder = res.data.events.data;

				begivenheder.forEach(async (begivenhed) => {
					const år = new Date(begivenhed.start_time).getFullYear().toString();
					const måned = måneder[new Date(begivenhed.start_time).getMonth()];
					return admin.firestore().collection("arkiv/" + år + "/" + måned)
						.where("id", "==", begivenhed.id)
						.get()
						.then((snapshot) => {
							let regex = /aflyst/;
							if (snapshot.empty && !regex.exec(begivenhed.name.toLowerCase())) {
								console.log(begivenhed.id);
								console.log("tilføjer ny begivenhed med navn " + begivenhed.name);
								return admin.firestore().collection("arkiv/" + år + "/" + måned).add({
									id: begivenhed.id,
									navn: begivenhed.name,
									tidspunkt: begivenhed.start_time,
								});
							} else {
								snapshot.forEach((doc) => {
									if (regex.exec(begivenhed.name.toLowerCase())) {
										console.log("sletter begivenhed med navn " + begivenhed.name);
										return doc.ref.delete();
									} else {
                    console.log("retter begivenhed med navn " + begivenhed.name);
										return admin.firestore()
											.collection("arkiv/" + år + "/" + måned)
											.doc(doc.id)
											.update({
												navn: begivenhed.name,
												tidspunkt: begivenhed.start_time,
											});
									}
								});
              }
              return;
						});
        });
        return;
			});
		  }

  }
  res.send("ok")
});