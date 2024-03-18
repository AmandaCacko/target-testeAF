/* 5) Escreva um programa que inverta os caracteres de um string.
IMPORTANTE:
a) Essa string pode ser informada através de qualquer entrada de sua preferência ou
pode ser previamente definida no código;
b) Evite usar funções prontas, como, por exemplo, reverse; */

let normal = "Amanda"
let inverte = ""

for (let i = normal.length-1; i >= 0; i--) {
    inverte += normal.charAt(i)
}

console.log(inverte)