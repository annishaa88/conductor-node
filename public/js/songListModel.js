function SongListModel(data) {
    this.data = data;

    this.init = function () {
        var templateScript = Handlebars.templates["song-list.hbs"](this.data);
        $("#home").append(templateScript);
        $('.collapse').collapse('show');

        var selectedSong = null;
        $("#home .song").click(function () {
            var id = $(this).attr("id");
            console.log(id + " song was chosen");
            selectedSong = songJson[id];

            $('[href=#songTab]').tab('show');
        });

        $('[href=#songTab]').on('shown.bs.tab', function (e) {
            e.target // newly activated tab
            e.relatedTarget // previous active tab

            if (selectedSong) {
                songPlaylist.init();
                songPlaylist.load(selectedSong);
                songAlertModel.init();
            } else {
                alert("song is not found!!!");
            }
        });

    }

    this.init();
}
