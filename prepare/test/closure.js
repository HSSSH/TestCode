function outer() {
    var a=10;
    return function () {
        a++;
        alert(a);
    }
}

var y = outer();
y();
y();
