const Sunvoltaic = require('../index.js')
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