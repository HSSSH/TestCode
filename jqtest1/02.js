$(document).ready(function(){
    $(".hide").click(function(){
        $(this).parents(".ex1,.ex2").hide("slow");
    });
});