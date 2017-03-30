var oValue;
alert(oValue == undefined); //output "true"
alert(null == oValue); //output "true"

alert(null == document.getElementById('notExistElement'));
alert(undefined == document.getElementById('notExistElement'));

// undefined表示"缺少值"，就是此处应该有一个值，但是还没有定义。典型用法是：
// 1.变量被声明了，但没有赋值时，就等于undefined。
// 2.调用函数时，应该提供的参数没有提供，该参数等于undefined。
// 3.对象没有赋值的属性，该属性的值为undefined。
// 4.函数没有返回值时，默认返回undefined。

var i;
i// undefined

function f(x){console.log(x)}
f()// undefined

var  o = new Object();
o.p// undefined

var x = f();
x// undefined

// null表示"没有对象"，即该处不应该有值。典型用法是：
// 1.作为函数的参数，表示该函数的参数不是对象。
// 2.作为对象原型链的终点。

Object.getPrototypeOf(Object.prototype)
// null