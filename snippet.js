function GLBID(a) {
    var b, c;
    for (b = 0; b < TimeTable.length; b++)
        for (c = 0; c < TimeTable[b].Lectures.length; c++)
            if (TimeTable[b].Lectures[c].ElementID == a) return TimeTable[b].Lectures[c]
}

function selectLec(a, b, c, d, e, f, g, h) {
    var k = 5,
        l = 0;
    if (3 == e)
        if ("" === c)
            for (i = 0; i < TimeTable[f].Lectures.length; i++) {
                if (TimeTable[f].Lectures[i].Code == b && "Tutorial" == TimeTable[f].Lectures[i].Type && TimeTable[f].Lectures[i].Location == g && TimeTable[f].Lectures[i].Start == (h + k) % 12) {
                    TimeTable[f].Lectures[i].Selected = !0;
                    var m = TimeTable[f].Lectures[i].Group;
                    if (m.search(",") == -1) {
                        var n = GLBID(m);
                        n.Location == g && n.Start == (d + k) % 12 && (l = 1, n.Selected = !0)
                    } else
                        for (m = m.split(","), j = 0; j < m.length; j++) {
                            var o = GLBID(m[j]);
                            o.Location == g && o.Start == (d + k) % 12 && (l = 1, o.Selected = !0)
                        }
                    GetSelectedLectures()
                }
                if (1 == l) break
            } else
                for (i = 0; i < TimeTable[a].Lectures.length; i++) {
                    if (TimeTable[a].Lectures[i].Code == b && "Lecture" == TimeTable[a].Lectures[i].Type && TimeTable[a].Lectures[i].Location == c && TimeTable[a].Lectures[i].Start == (d + k) % 12) {
                        TimeTable[a].Lectures[i].Selected = !0;
                        var p = TimeTable[a].Lectures[i].Group;
                        if (p.search(",") == -1) {
                            var q = GLBID(p);
                            q.Location == g && q.Start == (h + k) % 12 && (l = 1, q.Selected = !0)
                        } else
                            for (p = p.split(","), j = 0; j < p.length; j++) {
                                var r = GLBID(p[j]);
                                r.Location == g && r.Start == (h + k) % 12 && (l = 1, r.Selected = !0)
                            }
                        GetSelectedLectures()
                    }
                    if (1 == l) break
                } else if (1 == e || 2 == e)
                    for (i = 0; i < TimeTable[a].Lectures.length && (TimeTable[a].Lectures[i].Code == b && "Lecture" == TimeTable[a].Lectures[i].Type && TimeTable[a].Lectures[i].Location == c && TimeTable[a].Lectures[i].Start == (d + k) % 12 && (TimeTable[a].Lectures[i].Selected = !0, GetSelectedLectures()), 1 != l); i++);
}
