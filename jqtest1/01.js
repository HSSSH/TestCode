/**
 * Created by HZH on 2016/9/9.
 */
// $("p").hide()
//
// $("#01").hide()

$(document).ready(function () {
    $("button").click(function () {
        $("ul li:first-child").hide()
        $("p").hide()
        $("#01").hide()
    })
})