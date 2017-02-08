function SongPlaylist() {
    this.playlist = null;

    this.init = function () {
        if (this.playlist) {
            //this.playlist.getEventEmitter().emit("clear");
            this.playlist.getEventEmitter().emit("clear");
        }

        var templateScript = Handlebars.templates["playlist.hbs"](this.data);
        $("#songTab .wrapper").empty().append(templateScript);

        imageMapInit();
        songPointsModel.init();

        this.playlist = WaveformPlaylist.init({
            samplesPerPixel: 1000,
            waveHeight: 100,
            container: $("#songTab #playlist")[0],
            timescale: true,
            state: 'cursor',
            colors: {
                waveOutlineColor: '#E0EFF1'
            },
            controls: {
                show: true,
                width: 200
            },
            zoomLevels: [500, 1000, 3000, 5000],
            exclSolo: true //enabling exclusive solo
        });

        this.addEventEmitter();
    };

    this.load = function (data) {
        this.songModel = new SongModel(data);

        this.playlist.load(this.songModel.getTracks()).then(function () {

        });
    }
}



