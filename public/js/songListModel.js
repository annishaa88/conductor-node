function SongListModel(data) {
    this.data = data;

    this.init = function () {
        var templateScript = Handlebars.templates["song-list.hbs"](this.data);
        $("#home").append(templateScript);
        $('.collapse').collapse('show');

        $("#home .song").click(function () {
            var id = $(this).attr("id");
            console.log(id + " song was chosen");

            $('[href=#songTab]').tab('show');
        });

        $('[href=#songTab]').on('shown.bs.tab', function (e) {
            e.target // newly activated tab
            e.relatedTarget // previous active tab

            songPlaylist.init();
            songPlaylist.load(songJson);
            songAlertModel.init();
        });

    }

    this.init();
}
