let router = require("express").Router()
let auth = require("../auth")
let apiUtils = require("../apiUtils")

router.get("/state", function(reg, res) {
    auth.get("https://api.spotify.com/v1/me/player", reg.cookies.access_token, function(data) {
        if(data == undefined) {
            res.json({
                "error": "Data not reachable"
            })
            return
        }
        d = {
            "progress": data["progress_ms"],
            "song": data["item"]["name"],
            "duration": data["item"]["duration_ms"],
            "artists": "",
            "playing": data["is_playing"]
        }
        for(let a = 0; a < data["item"]["artists"].length; a++) {
            let artist = data["item"]["artists"][a]
            d["artists"] += artist["name"]
            if(a != data["item"]["artists"].length - 1) {
                d["artists"] += ", "
            }
        }
        apiUtils.getTrack(data["item"]["id"], reg.token, function(data) {
            d["image"] = data["album"]["images"][0]["url"]
            res.json(d)
        })
    })
})

router.post("/pause", function(reg, res) {
    apiUtils.pausePlayer(reg.token, function(data) {
        res.json({})
    })
})

module.exports = router