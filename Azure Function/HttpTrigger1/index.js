const axios = require('axios');
const { Octokit } = require("@octokit/core");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    if (req.query.lang || (req.body && req.body.lang)) {
        var outputText = ""
        const language = req.query.lang.toLowerCase()
        const ImgUri = "https://github.com/SimranMakhija7/Test/blob/master/garuda-hacks/"+language+".jpeg?raw=true"
        let endpoint='https://centralindia.api.cognitive.microsoft.com/'
	   	let subscriptionKey='ffc60f43d45049b185f8ab5c9b79c2d3'
		let uri = endpoint+'vision/v3.0/read/analyze'
		
		var CVPostoptions = {			
			headers: {
				
			'Content-Type': 'application/json',
			'Ocp-Apim-Subscription-Key': subscriptionKey
			}
			
		};
		const CVGetOptions ={
			headers:{
				'Content-Type': 'application/json',
				'Ocp-Apim-Subscription-Key': subscriptionKey
			}
		}
		var data = JSON.stringify({url: ImgUri})
		await axios.post(uri,data, CVPostoptions)
			.then(res => {
				
				return res.headers["operation-location"];
			},
			err=>{
				console.error("There has been an http error");
				console.error(err);
			}).then(res=>{
				setTimeout(()=>{
					axios.get(res,CVGetOptions)
					.then(res=> res.data.analyzeResult.readResults[0].lines)
					.then(async res=>{
						res.forEach(line => {
							console.log(line.text)
							outputText+=(line.text+'\n');
						});
						return outputText
					}).then(res=>{
						const response = await octokit.request("PATCH /repos/{owner}/{repo}", {
							owner: 'SimranMakhija7',
							repo: 'GarudaHacks-Result',
							name: 'name'
						  });
					})

				},10000)
				
			})
			context.res = {
				body: ImgUri
			};
       
    }

    else {
        context.res = {
            status: 400,
            body: "Please pass a language on the query string or in the request body"
        };
    }
};