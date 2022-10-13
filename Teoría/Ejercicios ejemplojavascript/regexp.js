/*
    Experimentos con expresiones regulares.
*/

"use strict";


console.log(/[A-Z][0-9]{3}/.test("A655")); // true
console.log(/[A-Z][0-9]{3}/.test("Otra cosa")); // false
console.log('---------------------------------');
console.log(/ab*/.test("cafe"));  //true
console.log(/a?bc?/.test("bar"));  //true
console.log('---------------------------------');

console.log(/e{2}/.test("releer"));  //true
console.log(/\b[a-zA-Z_][a-zA-Z0-9_]*\b/.test('8cte')); //false
console.log(/\b[a-zA-Z_][a-zA-Z0-9_]*\b/.test('_cte')); //true
console.log('---------------------------------');
console.log(/\d{3}/.exec('123 456 789')); //true
console.log(/\w+@\w+/.exec('el correo es nombre_apellidos@correo.com')); //true
console.log('---------------------------------');
console.log(/\d{4}\-[A-Z]{3}/.exec('hola 0234-ASB')); //true
console.log('---------------------------------');
var regexp = /(\d{4})\-([A-Z]{3})/;
var result = regexp.exec("mi matricula es 1234-ABS");
console.log(result[0]); console.log(result[1]); console.log(result[2]);
console.log('---------------------------------');
var str = "a aa aaa";
console.log(str.match(/a+/));
console.log(str.match(/a+/g));
str = "HolA";
console.log(str.match(/hola/));
console.log(str.match(/hola/i));
console.log('---------------------------------');

str = "123 456 789";
console.log(str.search(/\d{3}/));
console.log(str.search(/3\d{2}/));
