function SongPointsModel() {
    this.SUCCESS_POINTS = 10;

    if (!localStorage.pointscount) {
        localStorage.pointscount = 0;
    }

    this.init = function () {
        $(".points").text(localStorage.pointscount);
    }

    this.addPoints = function () {
        localStorage.pointscount = Number(localStorage.pointscount) + this.SUCCESS_POINTS;
        $(".points").text(localStorage.pointscount);
    }
}