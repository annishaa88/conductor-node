function SongModel(data) {
    this.data = data;

    this.init = function () {
        $.each(data.instruments, function (key, value) {
            value.timingIndex = 0;
        });

        $(".heading").text(data.title + " - " + data.composer);
    }

    this.init();

    this.getTracks = function () {
        var tracks = [];
        $.each(this.data.instruments, function (key, value) {
            tracks.push({
                "src": value.file,
                "name": key,
                muted: true,
                //start: 5,
            });
        });

        return tracks;
    }

    this.getInstrumentsTiming = function (time) {
        var instrumentsToStartPlay = []
        var instrumentsToStopPlay = []

        var i = 0;
        $.each(this.data.instruments, function (key, value) {
            if (value.timing && value.timingIndex < value.timing.length) {
                var timing = value.timing[value.timingIndex];
                if (Math.abs(timing.start - time) <= 0.05) {
                    instrumentsToStartPlay.push({name: key, index: i});
                } else if (Math.abs(timing.end - time) <= 0.05) {
                    instrumentsToStopPlay.push({name: key, index: i});
                    value.timingIndex = value.timingIndex + 1;
                }
            }
            i++;
        });

        return {start: instrumentsToStartPlay, stop: instrumentsToStopPlay}
    }
}

function SongAlertModel(debug) {
    this.debug = debug;
    this.init = function () {
        $(".debug-alerts .alert").empty();
    }

    this.addAlert = function (alert) {
        $(".debug-alerts .alert").prepend(alert + "<br>");
    }
}