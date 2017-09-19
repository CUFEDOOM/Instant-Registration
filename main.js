"use strict";
var window;
var document;
var GetLectureByID = function(a) {
    var d, c;
    var b = window.TimeTable;
    for (d = 0; d < b.length; d++) {
        for (c = 0; c < b[d].Lectures.length; c++) {
            if (b[d].Lectures[c].ElementID === a) {
                return b[d].Lectures[c]
            }
        }
    }
};
var getDay = function(a) {
    switch (a) {
    case "Sunday":
        return 0;
    case "Monday":
        return 1;
    case "Tuesday":
        return 2;
    case "Wednesday":
        return 3;
    default:
        return 4
    }
};
var GetSelectedLectures = function() {
    var d, c, a;
    a = "";
    var b = window.TimeTable;
    for (d = 0; d < b.length; d++) {
        for (c = 0; c < b[d].Lectures.length; c++) {
            if (b[d].Lectures[c].Selected) {
                a = a + "," + b[d].Lectures[c].SchId
            }
        }
    }
    a = a + ",";
    document.all.StdSelectedLecs.value = a
};
var handleErrors = function(c, f, g, h, a, e, b, d) {
    if (!c) {
        return "You Have to Enter the Day of The Lecture"
    }
    if (!f) {
        return "You Have to Enter the Code of The Course ex: 'MTHN001'"
    }
    if (!g) {
        return "You Have to Enter the Location of The Lecture copied from the Registeration Status Report"
    }
    if (!h) {
        return "You Have to Enter the Start hour of The Lecture"
    }
    if (!a) {
        return "You Have to Enter the Credit Hours of The Course"
    }
    return false
};
function selectLec(s, b, g, e, v, a, p, k) {
    var q = handleErrors(s, b, g, e, v, a, p, k);
    if (q) {
        return q
    }
    var w = 5;
    var t = 0;
    var l = getDay(s);
    var c = getDay(a);
    var f = window.TimeTable;
    if (v === 3) {
        if (g === "") {
            for (var u = 0; u < f[c].Lectures.length; u++) {
                var x = f[c].Lecture[u];
                if (x.Code === b && x.Type === "Tutorial" && x.Location === p && x.Start == (k + w) % 12) {
                    x.Selected = true;
                    var o = x.Group;
                    if (!o.includes(",")) {
                        var d = GetLectureByID(o);
                        if (d.Location === p && d.Start == (e + w) % 12) {
                            t = 1;
                            d.Selected = true
                        }
                    } else {
                        var z = o.split(",");
                        for (var r = 0; r < z.length; r++) {
                            var d = GetLectureByID(z[r]);
                            if (d.Location === p && d.Start == (e + w) % 12) {
                                d.Selected = true
                            }
                        }
                    }
                    GetSelectedLectures();
                    break
                }
            }
        } else {
            for (var u = 0; u < f[l].Lectures.length; u++) {
                var n = f[l].Lectures[u];
                if (n.Code === b && n.Type === "Lecture" && n.Location === g && n.Start == (e + w) % 12) {
                    n.Selected = true;
                    var h = n.Group;
                    if (!h.includes(",")) {
                        var y = GetLectureByID(h);
                        if (y.Location === p && y.Start == (k + w) % 12) {
                            y.Selected = true;
                            GetSelectedLectures();
                            break
                        }
                    } else {
                        var m = h.split(",");
                        for (var r = 0; r < m.length; r++) {
                            var y = GetLectureByID(m[r]);
                            if (y.Location === p && y.Start == (k + w) % 12) {
                                y.Selected = true;
                                GetSelectedLectures();
                                break
                            }
                        }
                    }
                }
            }
        }
    } else {
        if (v === 1 || v === 2) {
            for (var u = 0; u < f[l].Lectures.length; u++) {
                var n = f[l].Lectures[u];
                if (n.Code === b && n.Type === "Lecture" && n.Location === g && n.Start == (e + w) % 12) {
                    n.Selected = true;
                    GetSelectedLectures();
                    break
                }
            }
        }
    }
}
;
