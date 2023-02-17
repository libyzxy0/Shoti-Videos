const express = require("express");
const app = express();
const request = require("request");
const axios = require("axios");

const shoti = (callback) => {
	let a = axios.get('https://api.libyzxy0.repl.co/api/shoti');
	a.then((response) => {
    let video = response.data.result.url;
    request({
    url: video,
    encoding: null
    },
    (err, resp, buffer) => {
    	callback(err, resp);
    });
	});
}
app.get('/', (req, res) => {
	shoti((err, resp) => {
		if (!err && resp.statusCode === 200) {
			res.set("Content-Type", "video/mp4");
            res.send(resp.body);
        }
    });
});
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App is listening on port ${port}`));
