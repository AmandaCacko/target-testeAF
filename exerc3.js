/*
Dado um vetor que guarda o valor de faturamento diário de uma distribuidora, faça um programa, na linguagem que desejar, que calcule e retorne:
• O menor valor de faturamento ocorrido em um dia do mês;
• O maior valor de faturamento ocorrido em um dia do mês;
• Número de dias no mês em que o valor de faturamento diário foi superior à média mensal.

IMPORTANTE:
a) Usar o json ou xml disponível como fonte dos dados do faturamento mensal;
b) Podem existir dias sem faturamento, como nos finais de semana e feriados. Estes dias devem ser ignorados no cálculo da média;

*/

const fs = require('fs');

async function carregarJSON() {
    try {
        const data = fs.readFileSync('dados.json', 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Erro ao carregar o JSON:', error);
    }
}

async function calcularFaturamentoPorMes() {
    const faturamentoMensal = await carregarJSON();
    if (!faturamentoMensal) {
        return {};
    }

    let menorValor = Infinity;
    let maiorValor = -Infinity;
    let diaMenorFaturamento;
    let diaMaiorFaturamento;
    let somaFaturamento = 0;
    let diasComFaturamento = 0;

    for (const dia of faturamentoMensal) {
        if (dia.valor > 0) {
            if (dia.valor < menorValor) {
                menorValor = dia.valor;
                diaMenorFaturamento = dia.dia;
            }
            if (dia.valor > maiorValor) {
                maiorValor = dia.valor;
                diaMaiorFaturamento = dia.dia;
            }
            somaFaturamento += dia.valor;
            diasComFaturamento++;
        }
    }

    const mediaMensal = (somaFaturamento / diasComFaturamento).toFixed(2);
    let diasAcimaMedia = 0;

    for (const dia of faturamentoMensal) {
        if (dia.valor > mediaMensal && dia.valor > 0) {
            diasAcimaMedia++;
        }
    }

    return {
        menorValor: menorValor === Infinity ? null : menorValor,
        diaMenorFaturamento,
        maiorValor,
        diaMaiorFaturamento,
        mediaMensal,
        diasAcimaMedia,
        diasNoMes: diasComFaturamento
    };
}

async function main() {
    const resultado = await calcularFaturamentoPorMes();

    console.log("Menor valor de faturamento:", resultado.menorValor, "no dia", resultado.diaMenorFaturamento);
    console.log("Maior valor de faturamento:", resultado.maiorValor, "no dia", resultado.diaMaiorFaturamento);
    console.log("Média mensal:", resultado.mediaMensal);
    console.log("Número de dias com faturamento acima da média:", resultado.diasAcimaMedia);
}

main();
