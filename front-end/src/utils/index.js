export function formatDateTime(d) {

    var yyyy = d.getFullYear().toString();
    var mm = (d.getMonth() + 101).toString().slice(-2);
    var dd = d.getDate().toString();
    var hh = d.getHours().toString();
    var ii = d.getMinutes().toString();
    if( hh < 10 ){ hh = '0' + hh; }
    if( ii < 10 ){ ii = '0' +ii; }

    /* var ss = d.getSeconds().toFixed(2); */
    return dd + "/" + mm + "/" + yyyy + " - " + hh + ":" + ii ;
}
