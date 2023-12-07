let request = require('request');

let authUrl = "https://accounts.spotify.com/authorize"
let responseType = "code"
let clientId = "bd99d3930e0a4186937d7c28ccea3013"
let clientSecret = "66896c20f8b946ceb1a8d706358c9317"
let scope = "user-read-playback-state user-modify-playback-state user-read-currently-playing playlist-read-private playlist-modify-private playlist-modify-public user-top-read user-read-recently-played user-read-playback-state user-modify-playback-state streaming"
let redirectUri = "http://localhost:3000/auth"

function getLoginUrl() {
    return authUrl + "?response_type=" + responseType + "&client_id=" + clientId + "&scope=" + scope + "&redirect_uri=" + redirectUri
}
function getAccessToken(code, callback) {
    let authOptions = {
        url: "https://accounts.spotify.com/api/token",
        body: "code=" + code + "&redirect_uri=" + redirectUri + "&grant_type=authorization_code",
        headers: {
            "content-type": "application/x-www-form-urlencoded",
            "Authorization": "Basic " + (new Buffer.from(clientId + ':' + clientSecret).toString('base64'))
        },
        json: true
    }
    request.post(
        authOptions,
        function(error, response, body) {
            if("access_token" in body) {
                callback(body)
            } else {
                callback(null)
            }
        }
    )
}

function post(url, token, data, callback) {
    let options = {
        url: url,
        body: data,
        headers: {
            "Authorization": "Bearer " + token
        },
        json: true
    }
    request.post(
        options,
        function(error, response, body) {
            callback(body)
        }
    )
}

function put(url, token, data, callback) {
    let options = {
        url: url,
        body: data,
        headers: {
            "Authorization": "Bearer " + token
        },
        json: true
    }
    request.put(
        options,
        function(error, response, body) {
            callback(body)
        }
    )
}


function get(url, token, callback) {
    let options = {
        url: url,
        headers: {
            "Authorization": "Bearer " + token
        },
        json: true
    }
    request.get(
        options,
        function(error, response, body) {
            callback(body)
        }
    )
}

function authMiddleware(req, res, next) {
    if(req.cookies.access_token == undefined) {
        res.redirect("/")
    }
    req.token = req.cookies.access_token
    next()
}
module.exports.getLoginUrl = getLoginUrl
module.exports.getAccessToken = getAccessToken
module.exports.authMiddleware = authMiddleware
module.exports.get = get
module.exports.post = post
module.exports.put = put