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
      const data = fs.readFileSync('faturamento.json', 'utf8');
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

    const resultadosPorMes = {};

    for (const mes in faturamentoMensal) {
      let menorValor = Infinity;
      let maiorValor = -Infinity;
      let somaFaturamento = 0;
      let diasAcimaMedia = 0;
      let diasComFaturamento = 0;
      let diaMenorFaturamento;
      let diaMaiorFaturamento;

      for (const dia of faturamentoMensal[mes]) {
        if (dia.valor > 0 && dia.dia_da_semana !== "Sábado" && dia.dia_da_semana !== "Domingo" && !dia.feriado) {
          if (dia.valor < menorValor) {
            menorValor = dia.valor;
            diaMenorFaturamento = `${dia.dia} (${dia.dia_da_semana})`;
          }
          if (dia.valor > maiorValor) {
            maiorValor = dia.valor;
            diaMaiorFaturamento = `${dia.dia} (${dia.dia_da_semana})`;
          }
          somaFaturamento += dia.valor;
          diasComFaturamento++;
        }
      }

      const mediaMensal = (somaFaturamento / diasComFaturamento).toFixed(2);

      for (const dia of faturamentoMensal[mes]) {
        if (dia.valor > mediaMensal && dia.valor > 0 && dia.dia_da_semana !== "Sábado" && dia.dia_da_semana !== "Domingo" && !dia.feriado) {
          diasAcimaMedia++;
        }
      }

      resultadosPorMes[mes] = {
        menorValor: menorValor === Infinity ? null : menorValor,
        diaMenorFaturamento,
        maiorValor,
        diaMaiorFaturamento,
        mediaMensal,
        diasAcimaMedia,
        diasNoMes: faturamentoMensal[mes].length
      };
    }

    return resultadosPorMes;
}

async function main() {
    const resultadosPorMes = await calcularFaturamentoPorMes();
    
    for (const mes in resultadosPorMes) {
      const diasNoMes = resultadosPorMes[mes].diasNoMes;
      console.log(`Mês: ${mes} (${diasNoMes} dias)`);
      console.log("Menor valor de faturamento:", resultadosPorMes[mes].menorValor);
      console.log("Dia do menor faturamento:", resultadosPorMes[mes].diaMenorFaturamento);
      console.log("Maior valor de faturamento:", resultadosPorMes[mes].maiorValor);
      console.log("Dia do maior faturamento:", resultadosPorMes[mes].diaMaiorFaturamento);
      console.log("Média mensal:", resultadosPorMes[mes].mediaMensal);
      console.log("Número de dias com faturamento acima da média:", resultadosPorMes[mes].diasAcimaMedia);
      console.log("----------------------------------------");
    }
  }

main();
