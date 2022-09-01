export function formatDateTime(d) {

    var yyyy = d.getFullYear().toString();
    var mm = (d.getMonth() + 101).toString().slice(-2);
    var dd = d.getDate().toString();
    var hh = d.getHours().toString();
    var ii = d.getMinutes().toString();
    var ss = d.getSeconds().toString();
    return dd + "/" + mm + "/" + yyyy + " - " + hh + ":" + ii + ":" + ss;
}
