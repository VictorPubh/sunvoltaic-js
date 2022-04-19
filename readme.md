
## Sunvoltaic (Javascript)
É responsável por conter fórmulas (métodos) úteis para cálculos fotovoltaicos;
Foi construído inicialmente para estimar os valores de uma usina com base no valor da entrada da conta de energia.

*Você pode instalar facilmente através do NPM.*
```bash
npm i sunvoltaic-js
```
Você precisa de um arquivo de configuração, para tudo funcionar adequadamente, com o nome `sunvoltaic.config.js`,
neste arquivo você irá configurar:

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `average_sun` | `Numeric` | Radiação Solar |
| `plant_age` | `Numeric` | Para estimativas de ecônomia de CO² e outros |
| `plate_w` | `Numeric` | Quantidades de Watts das Placa. |
| `value_kwv` | `Object (all are numeric)` | Deverá conter `residential` *(Default)*, `commercial` e/ou `agro` |
| `reference_kwh` | `Function => Numeric` | Uma função que recebe o parâmetro `used_kit` e deverá retornar um valor numérico |

*Todas as entradas são obrigatórias, enquanto `value_kwv` precisa receber no mínimo um Objeto com `residential`.*

Para utilizar de forma estática (não haverá mudança nos valores de Configuração):
```javascript
// sunvoltaic.config.js

module.exports = {
    average_sun: 4.66,
    plant_age: 25,
    plate_w: 530,
    value_kwv: {
        residential: 0.89,
        commercial: 0.99,
        agro: 1,
    },
    reference_kwh: (used_kit) => {
        return used_kit > 5 ? 6555.5 : 7999.9;
    } 
}
```

Se desejar que esses valores sejam dinâmicos, você pode criar apenas como uma variável contendo este mesmo Objeto, que será passado como o 3° Parâmetro da Instância.

## Instanciando o Sunvoltaic
A classe Sunvoltaic recebe "apenas" 3 parâmetros:
- **1° Valor da Conta Energética**
- **2° Tipo de Atividade** (1 = `residential` 2 = `commercial` 3 = `agro` referenciados no Objeto `value_kwv` de sunvoltaic.config.js)
- **3° O Objeto de Configuração** (O próprio sunvoltaic.config.js)
```
const Sunvoltaic = require('sunvoltaic-js')
const SunvoltaicConfig = require('./sunvoltaic.config.js')

let energy_bill = 250
let type_activity = 1

const {
    daily_power,
    monthly_power,
    planted_trees,
    plant_age
} = new Sunvoltaic(energy_bill, type_activity, SunvoltaicConfig)

console.log(`Potência gerada diária: ${daily_power} kWh`)
console.log(`Potência gerada mensal: ${monthly_power} kWh`)
console.log(`${planted_trees} Árvores deixarão de ser cortadas em ${plant_age} anos.`)
```

Você poderá adquirir:

| Valor | Tipo | Descrição |
|:------|:-----|:----------|
|`energy_bill`| `number` | Valor da Conta de Energia
|`plant_age`| `number` | Idade da Usina
|`average_sun`| `number` | Radiação Solar
|`value_kwh`| `number` | Valor de Kwh
|`monthly_consumption`| `number` | Consumo mensal
|`indicated_kit`| `number` | Kit Indicado
|`used_kit`| `number` | Kit Utitlizado
|`plate_quantity`| `number` | Quantidade de Placas
|`daily_power`| `number` | Potência Diaria
|`monthly_power`| `number` | Potência Mensal
|`annual_power`| `number` | Potência Anual
|`power_archieved`| `number` | Potência da Usina baseada na Idade da Usina (`plant_age`)
|`planted_trees`| `number` | Estimativa de Árvores que deixarão de ser cortadas
|`CO2_reduction`| `number` | Estimativa de diminuição do CO²
|`km_cars`| `number` | Estimativa de Km rodados
|`payback`| `number` | Valor de Payback (em meses)
|`average_plant`| `number` | Valor Médio da Usina
|`economy_value`| `number` | Valor de Ecônomia (mensal)
|`required_space`| `number` | Estimativa de Espaço Necessário (em m²)
|`structure`| `number` | Estimativa de Peso da Estrutura (em Kg)

Você pode desestruturar esses valores da Instância (como no exemplo acima) ou referenciando direto do Objeto, como por exemplo:
```
// ...

const Calculator = new Sunvoltaic(250, 1, SunvoltaicConfig)

console.log(`Potência gerada diária: ${Calculator.daily_power} kWh`)
console.log(`Potência gerada mensal: ${Calculator.monthly_power} kWh`)
console.log(`${Calculator.planted_trees} Árvores deixarão de ser cortadas em ${plant_age} anos.`)
```

## O que vem por aí?

- [ ]  Reescrever biblioteca utilizando Typescript
- [ ]  Obter Radiação Solar apartir de API (ou similar)
- [ ]  Substituir entrada de Radiação Solar por CEP
Deixe as suas sugestões via Issue.
## Autores

- [@victorpubh](https://www.github.com/victorpubh)

