"use strict";
var window;
var document;
var GetLectureByID = function (aLectureID) {
    var i, j;
    var TimeTable = window.TimeTable;
    for (i = 0; i < TimeTable.length; i++) {
        for (j = 0; j < TimeTable[i].Lectures.length; j++) {
            if (TimeTable[i].Lectures[j].ElementID === aLectureID) {
                return TimeTable[i].Lectures[j];
            }
        }
    }
};
var getDay = function (day) {
    switch (day) {
        case 'Sunday':
            return 0;
        case 'Monday':
            return 1;
        case 'Tuesday':
            return 2;
        case 'Wednesday':
            return 3;
        default:
            return 4;
    }
};
var GetSelectedLectures = function () {
    var i, j, SLectures;
    SLectures = '';
    var TimeTable = window.TimeTable;
    for (i = 0; i < TimeTable.length; i++) {
        for (j = 0; j < TimeTable[i].Lectures.length; j++) {
            if (TimeTable[i].Lectures[j].Selected) {
                SLectures = SLectures + ',' + TimeTable[i].Lectures[j].SchId; //.substr(7);
            }
        }
    }
    SLectures = SLectures + ',';
    document.all.StdSelectedLecs.value = SLectures;
};
var handleErrors = function (day, code, loc, start, hours, tday, tloc, tstart) {
    if (!day)
        return "You Have to Enter the Day of The Lecture";
    if (!code)
        return "You Have to Enter the Code of The Course ex: 'MTHN001'";
    if (!loc)
        return "You Have to Enter the Location of The Lecture copied from the Registeration Status Report";
    if (!start)
        return "You Have to Enter the Start hour of The Lecture";
    if (!hours)
        return "You Have to Enter the Credit Hours of The Course";
    return false;
};
function selectLec(day, code, loc, start, hours, tday, tloc, tstart) {
    var error = handleErrors(day, code, loc, start, hours, tday, tloc, tstart);
    if (error)
        return error;
    var addMag = 5; // for every hour checking make sure it is == not === because start is string in SIS
    var flag = 0;
    var dayi = getDay(day);
    var tdayi = getDay(tday);
    var TimeTable = window.TimeTable;
    if (hours === 3) {
        if (loc === '') {
            for (var i = 0; i < TimeTable[tdayi].Lectures.length; i++) {
                var currentTutorial = TimeTable[tdayi].Lecture[i];
                if (currentTutorial.Code === code &&
                    currentTutorial.Type === 'Tutorial' &&
                    currentTutorial.Location === tloc &&
                    currentTutorial.Start == (tstart + addMag) % 12) {
                    currentTutorial.Selected = true;
                    var lecturesid = currentTutorial.Group;
                    if (!lecturesid.includes(',')) {
                        var possibleLecture = GetLectureByID(lecturesid);
                        if (possibleLecture.Location === tloc &&
                            possibleLecture.Start == (start + addMag) % 12) {
                            flag = 1;
                            possibleLecture.Selected = true;
                        }
                    }
                    else {
                        var lecturesidArray = lecturesid.split(',');
                        for (var j = 0; j < lecturesidArray.length; j++) {
                            var possibleLecture = GetLectureByID(lecturesidArray[j]);
                            if (possibleLecture.Location === tloc &&
                                possibleLecture.Start == (start + addMag) % 12) {
                                possibleLecture.Selected = true;
                            }
                        }
                    }
                    GetSelectedLectures();
                    break;
                }
            }
        }
        else {
            for (var i = 0; i < TimeTable[dayi].Lectures.length; i++) {
                var currentLecture = TimeTable[dayi].Lectures[i];
                if (currentLecture.Code === code &&
                    currentLecture.Type === 'Lecture' &&
                    currentLecture.Location === loc &&
                    currentLecture.Start == (start + addMag) % 12) {
                    currentLecture.Selected = true;
                    var tutorialsid = currentLecture.Group;
                    if (!tutorialsid.includes(',')) {
                        var possibleTutorial = GetLectureByID(tutorialsid);
                        if (possibleTutorial.Location === tloc &&
                            possibleTutorial.Start == (tstart + addMag) % 12) {
                            possibleTutorial.Selected = true;
                            GetSelectedLectures();
                            break;
                        }
                    }
                    else {
                        var tutorialsidArray = tutorialsid.split(',');
                        for (var j = 0; j < tutorialsidArray.length; j++) {
                            var possibleTutorial = GetLectureByID(tutorialsidArray[j]);
                            if (possibleTutorial.Location === tloc &&
                                possibleTutorial.Start == (tstart + addMag) % 12) {
                                possibleTutorial.Selected = true;
                                GetSelectedLectures();
                                break;
                            }
                        }
                    }
                }
            }
        }
    }
    else if (hours === 1 || hours === 2) {
        for (var i = 0; i < TimeTable[dayi].Lectures.length; i++) {
            var currentLecture = TimeTable[dayi].Lectures[i];
            if (currentLecture.Code === code &&
                currentLecture.Type === 'Lecture' &&
                currentLecture.Location === loc &&
                currentLecture.Start == (start + addMag) % 12) {
                currentLecture.Selected = true;
                GetSelectedLectures();
                break;
            }
        }
    }
}
