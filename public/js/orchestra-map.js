// stores the device context of the canvas we use to draw the outlines
// initialized in myInit, used in myHover and myLeave
var hdc;

// takes a string that contains coords eg - "227,307,261,309, 339,354, 328,371, 240,331"
// draws a line from each co-ord pair to the next - assumes starting point needs to be repeated as ending point.
function drawPoly(coOrdStr) {
    var mCoords = coOrdStr.split(',');
    var i, n;
    n = mCoords.length;

    hdc.beginPath();
    hdc.moveTo(mCoords[0], mCoords[1]);
    for (i = 2; i < n; i += 2) {
        hdc.lineTo(mCoords[i], mCoords[i + 1]);
    }
    hdc.lineTo(mCoords[0], mCoords[1]);
    hdc.stroke();
}

function drawRect(coOrdStr) {
    var mCoords = coOrdStr.split(',');
    var top, left, bot, right;
    left = mCoords[0];
    top = mCoords[1];
    right = mCoords[2];
    bot = mCoords[3];
    hdc.strokeRect(left, top, right - left, bot - top);
}

function drawCircle(coOrdStr) {
    var mCoords = coOrdStr.split(',');
    var centerX, centerY, radius;
    centerX = mCoords[0];
    centerY = mCoords[1];
    radius = mCoords[2];
    hdc.beginPath();
    hdc.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    hdc.stroke();
}

function myHover(element) {
    var hoveredElement = element;
    var coordStr = element.getAttribute('coords');
    var areaType = element.getAttribute('shape');

    switch (areaType) {
        case 'polygon':
        case 'poly':
            drawPoly(coordStr);
            break;
        case 'circle':
            drawCircle(coordStr);
            break;

        case 'rect':
            drawRect(coordStr);
    }
}

function myLeave() {
    var canvas = $('#myCanvas');
    hdc.clearRect(0, 0, canvas.width(), canvas.height());
}

function imageMapInit() {
    // get the target image
    var imageMap = $('#img-imgmap');

    var x, y, w, h;

    // get it's position and width+height
    x = imageMap.offset().left;
    y = imageMap.offset().top;
    w = imageMap.width();
    h = imageMap.height();

    // move the canvas, so it's contained by the same parent as the image
    var imgParent = imageMap.parent();
    var can = $('#myCanvas');
    imgParent.append(can);

    // place the canvas in front of the image
    can.css("zIndex", 1);

    // position it over the image
    can.css("left", x + 'px');

    // make same size as the image
    can.attr('width', w + 'px');
    can.attr('height', h + 'px');

    // get it's context
    hdc = can[0].getContext('2d');

    // set the 'default' values for the colour/width of fill/stroke operations
    hdc.fillStyle = 'red';
    hdc.strokeStyle = 'green';
    hdc.lineWidth = 4;

    $("map area").click(function () {
        return false;
    })
}


function drawStopStartCircle(instrument, isStart, callback) {
    if (!hdc) {
        return;
    }

    var endPercent = 100;
    var curPerc = 0;
    var circ = Math.PI * 2;
    var quart = Math.PI / 2;
    var cancelAnimation = false;
    var requestId;

    var instrumentArea = $("map area." + instrument);
    var coordStr = instrumentArea.attr('coords');
    var mCoords = coordStr.split(',');
    var centerX, centerY, radius;
    centerX = mCoords[0];
    centerY = mCoords[1];
    radius = mCoords[2];

    function alreadyStarted() {
        return instrumentArea.hasClass("start");
    }

    function alreadyStopped() {
        return instrumentArea.hasClass("stop");
    }

    function eraseCircle() {
        cancelAnimation = true;
//now, erase the arc by clearing a rectangle that's slightly larger than the arc
        hdc.beginPath();
        hdc.clearRect(centerX - radius - 3, centerY - radius - 3, radius * 2 + 5, radius * 2 + 5);
        hdc.closePath();
    }

    eraseCircle();
    cancelAnimation = false;

    console.log("instrument: " + instrument + " isStart: " + isStart + " classes:" + instrumentArea.attr("class"));

    if (isStart) {
        if (alreadyStarted()) {
            return;
        }
        instrumentArea.removeClass("stop").addClass("start");
        instrumentArea.click(function () {
            if (!alreadyStarted()) {
                cancelAnimation = true;
                return;
            }
            instrumentArea.removeClass("start");
            drawMusicNote();
            callback(true);
        });

        setTimeout(function () {
            if (!alreadyStarted()) {//already stopped
                cancelAnimation = true;
                return;
            }
            instrumentArea.removeClass("start");
            eraseCircle();
        }, 4000);

    } else {
        if (alreadyStopped()) {
            return;
        }
        instrumentArea.removeClass("start").addClass("stop");
        instrumentArea.click(function () {
            if (!alreadyStopped()) {
                cancelAnimation = true;
                return;
            }
            instrumentArea.removeClass("stop")
            eraseCircle();
            callback(true);
        })

        setTimeout(function () {
            if (!alreadyStopped()) {
                cancelAnimation = true;
                return;
            }
            instrumentArea.removeClass("stop");
            eraseCircle();
            callback(false);
        }, 4000);
    }

    function animate(current) {
        if (cancelAnimation) {
            window.cancelAnimationFrame(requestId);
            console.log("instrument: " + instrument + " cancel circle animation requestId:" + requestId)
            return false;
        }

        //eraseCircle();
        hdc.shadowOffsetX = 0;
        hdc.shadowOffsetY = 0;
        hdc.strokeStyle = isStart ? "#66CC01" : '#FF0000';
        hdc.beginPath();
        hdc.arc(centerX, centerY, radius, -(quart), ((circ) * current) - quart, false);
        hdc.stroke();

        curPerc += 2;
        if (curPerc <= endPercent) {
            requestId = requestAnimationFrame(function () {
                animate(curPerc / 100)
            });
        } else {
            hdc.fillStyle = isStart ? 'rgba(226, 255, 198, 0.5)' : 'rgba(255, 106, 106, 0.5)';
            hdc.fill();
        }
    }

    function drawCircle() {
        animate();
    }

    function drawMusicNote() {
        base_image = new Image();
        base_image.src = 'media/image/music_note_3.png';
        base_image.onload = function () {
            eraseCircle();
            hdc.drawImage(base_image, centerX - radius / 2, centerY - radius / 2, radius, radius);
        }
    }

    drawCircle();
}