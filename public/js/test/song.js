var songJson = {
    "title": "Starlight",
    "composer": "Muse",
    "file": "http://bla/bla/bach_1234.midi",
    "instruments": {
        "vocals": {
            "file": "media/audio/Vocals30.mp3",
            "timing": [
                {
                    "start": 0.0,
                    "end": "14.1"
                },
                {
                    "start": 15.0,
                    "end": "21.1"
                }
            ]
        },
        "guitar": {
            "file": "media/audio/Guitar30.mp3",
            "timing": [
                {
                    "start": 15.7,
                    "end": "21.1"
                }
            ]
        },
        "piano": {
            "file": "media/audio/PianoSynth30.mp3",
            "timing": [
                {
                    "start": 0,
                    "end": "21.1"
                }
            ]
        },
        "drums": {
            "file": "media/audio/BassDrums30.mp3",
            "timing": [
                {
                    "start": 0.0,
                    "end": "21.1"
                }
            ]
        }
    }
};

var songListJson = {
    songGroups: [
        {
            name: "Easy",
            songs: [
                {
                    id: 1,
                    name: "Adagio",
                    composer: "Bach"
                }, {
                    id: 2,
                    name: "Adagio2",
                    composer: "Bach"
                }
            ]
        },
        {
            name: "Medium",
            songs: [
                {
                    id: 11,
                    name: "Adagio",
                    composer: "Mozart"
                }, {
                    id: 21,
                    name: "Adagio2",
                    composer: "Mozart"
                }
            ]
        },
        {
            name: "Hard",
            songs: [
                {
                    id: 13,
                    name: "Adagio",
                    composer: "Bach & Mozart"
                }, {
                    id: 23,
                    name: "Adagio2",
                    composer: "Bach & Mozart"
                }
            ]
        }
    ]
}