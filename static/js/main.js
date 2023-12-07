$.fn.extend({
    loader: function() {
        return this.each(function() {
            $(this).attr("org-text", $(this).text())
            this.innerHTML = "<img class='loader' src='/static/img/loader-white.gif'>";
        })
    },
    clear: function() {
        return this.each(function() {
            this.innerHTML = $(this).attr("org-text")
        })
    }
})

function millSecondsToTime(mills) {
    let seconds = mills / 1000
    let mins = String(Math.floor(seconds / 60))
    let secs = String(Math.floor(seconds - Math.floor(seconds / 60) * 60))
    if(mins.length == 1) {
        mins = "0" + mins
    }
    if(secs.length == 1) {
        secs = "0" + secs
    }
    return {
        "minutes": mins,
        "seconds": secs,
        "mills": mills
    }
}