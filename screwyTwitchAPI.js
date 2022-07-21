const https = require('https');
const fs = require('fs');
const apikey = JSON.parse(fs.readFileSync("apikey.json"));
function sendRequest(func) {
    var options = {
        hostname: 'api.twitch.tv',
        path: '/helix/' + func,
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + apikey.token,
            'Client-Id': apikey.id
        }
    };
    return new Promise(function(resolve) {
        https.get(options, (resp) => {
            var data = "";
            resp.on("data", (chunk) => (data += chunk));
            resp.on("end", () => {
                resolve(data);
            });
        });
    });
};
exports.getId = async function(loginName) {
    let options = "users?login=" + loginName;
    let responseStr = await sendRequest(options);
    let responseObj = JSON.parse(responseStr);
    return responseObj.data[0].id;
};
exports.getLiveStreams = async function(userId) {
    let options = "streams?user_id=" + userId;
    let responseStr = await sendRequest(options);
    let responseObj = JSON.parse(responseStr);
    return responseObj.data;
};
/*async function testFunc() {
    resp = await exports.getId("");
    console.log(resp);
}
testFunc();*/