/*
Dado o valor de faturamento mensal de uma distribuidora, detalhado por estado:

SP – R$67.836,43
RJ – R$36.678,66
MG – R$29.229,88
ES – R$27.165,48
Outros – R$19.849,53

Escreva um programa na linguagem que desejar onde calcule o percentual de representação que cada estado teve dentro do valor total mensal da distribuidora.
*/

const faturamentoPorEstado = {
    SP: 67836.43,
    RJ: 36678.66,
    MG: 29229.88,
    ES: 27165.48,
    Outros: 19849.53
};

function calcularFaturamentoTotal() {
    let total = 0;
    for (let estado in faturamentoPorEstado) {
        total += faturamentoPorEstado[estado];
    }
    return total;
}

function calcularPercentuais() {
    const total = calcularFaturamentoTotal();
    const percentuais = {};
    
    for (let estado in faturamentoPorEstado) {
        const percentual = (faturamentoPorEstado[estado] / total) * 100;
        percentuais[estado] = percentual.toFixed(2) + "%";
    }
    
    return percentuais;
}

console.log("Percentuais de representação de cada estado:");
const percentuais = calcularPercentuais();
for (let estado in percentuais) {
    console.log(`${estado}: ${percentuais[estado]}`);
}
