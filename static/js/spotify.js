function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
access_token = getCookie("access_token")

class Spotify {
    constructor(token) {
        console.log("------------ ACCESS TOKEN ------------")
        console.log(token)
        this.valid = token != null && token != undefined;
    }
    post(url, data, callback) {
        if(!this.valid) {
            throw new Error('Access token is not valid for requests');
        }
        $.ajax({
            type: "POST",
            url: url,
            data: data,
            success: callback
        })
    }
    get(url, callback) {
        if(!this.valid) {
            throw new Error('Access token is not valid for requests');
        }
        $.ajax({
            type: "GET",
            url: url,
            success: callback
        })
    }
    getPlaybackState(callback) {
        this.get("/api/player/state", callback)
    }
}


let spotify = new Spotify(access_token)

class Player extends Spotify {
    constructor() {

    }
    init() {
        
    }
}