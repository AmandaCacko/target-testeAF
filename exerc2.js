/* Dado a sequência de Fibonacci, onde se inicia por 0 e 1 e o próximo valor sempre será a
soma dos 2 valores anteriores (exemplo: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34...),
escreva um programa na linguagem que desejar onde, informado um número,
ele calcule a sequência de Fibonacci e retorne uma mensagem avisando se o número informado
pertence ou não a sequência. IMPORTANTE: Esse número pode ser informado através de qualquer
entrada de sua preferência ou pode ser previamente definido no código;
*/

var numInicial1 = 0, numInicial2 = 1, numAtual = 0
var tamanho = 6
var fibbonacci = [numInicial1, numInicial2]

while (fibbonacci.length < tamanho){
    numAtual = fibbonacci[fibbonacci.length - 1] + fibbonacci[fibbonacci.length - 2]
    fibbonacci.push(numAtual)
}

console.log(fibbonacci)