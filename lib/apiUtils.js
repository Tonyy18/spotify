const auth = require("./auth")

function getTrack(id, token, callback) {
    auth.get("https://api.spotify.com/v1/tracks/" + id, token, callback)
}

function pausePlayer(token, callback) {
    auth.put("https://api.spotify.com/v1/me/player/pause", token, "", callback)
}

module.exports.getTrack = getTrack
module.exports.pausePlayer = pausePlayer