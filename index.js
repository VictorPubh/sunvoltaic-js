
class Sunvoltaic {
    constructor(
        energy_bill,
        type_activity,
        config
    ) {
        this.energy_bill = energy_bill;
        this.average_sun = config['average_sun'];
        this.plant_age = config['plant_age'];
        this.config = config;
        this.value_kwh = this.getValueKwh(+type_activity, config['value_kwv']);

        /* Indicated Kit */
        this.monthly_consumption = this.getMontlyConsumption();
        this.indicated_kit = this.getIndicatedKit();
        this.used_kit = this.getUsedKit();
        this.plate_quantity = this.getPlateQuantity(this.config['plate_w']);

        /* Generated Energy */
        this.daily_power = this.getDailyPower();
        this.monthly_power = this.getMontlyPower();
        this.annual_power = this.getAnnualPower();
        this.power_archieved = this.getPowerAchieved();

        /* Environmental Estimate */
        this.planted_trees = this.getPlantedTrees();
        this.CO2_reduction = this.getCO2Reduction();
        this.km_cars = this.getKmCars();
        this.payback = this.getPayback();

        /* Plant */
        this.average_plant = this.getAveragePlant();
        this.economy_value = this.getEconomyValue();
        this.required_space = this.getRequiredSpace();
        this.structure = this.getStruct();
    }

    /* Indicated Kit Functions */

    getValueKwh(key, modes) {
        /**
         * 1: Residencial
         * 2: Comercial
         * 3: Agropecuária
         */

        switch (key) {
            case 1:
                return modes.residential;
            case 2:
                return modes.commercial;
            case 3:
                return modes.agro;

            default:
                return modes.residential;
        }
    }

    getMontlyConsumption() {
        const monthly_consumption = (this.energy_bill / this.value_kwh).toFixed(2);
        // console.log("Consumo mensal do cliente em [kWh]: " + monthly_consumption);

        return monthly_consumption;
    }

    getIndicatedKit() {
        const indicated_kit = ((this.monthly_consumption / 30) / this.average_sun).toFixed(2);
        // console.log("Kit Indicado: " + indicated_kit);

        return indicated_kit;
    }

    getUsedKit() {
        const used_kit = (this.getPlateQuantity(this.config['plate_w']) * 0.53).toFixed(2);
        // console.log("Kit Utilizado: " + used_kit);

        return used_kit;
    }

    getPlateQuantity(w = 335) {
        const plate_quantity = Math.ceil(this.indicated_kit / (w / 1000));
        // console.log(`Placa potência ${w}W - Quantidade: + ${plate_quantity}`);

        return plate_quantity;
    }

    /* Generated Energy Functions */

    getDailyPower() {
        const daily_power = parseFloat((this.used_kit * this.average_sun) * 0.7767).toFixed(2);
        // console.log("Potência gerada diária: " + daily_power);

        return daily_power;
    }

    getMontlyPower() {
        const monthly_power = parseFloat(((this.used_kit * this.average_sun) * 30.5) * 0.7767).toFixed(2);
        // console.log("Potência gerada mensal: " + monthly_power);

        return monthly_power;
    }

    getAnnualPower() {
        const annual_power = (this.monthly_power * 12).toFixed(2);
        // console.log("Potência gerada anual: " + annual_power);

        return annual_power;
    }

    getPowerAchieved() {
        const power_achieved = parseFloat(this.annual_power * this.plant_age).toFixed(2);
        // console.log(`Potência gerada em ${this.plant_age} anos: ${power_achieved}`);

        return power_achieved;
    }

    /* Environmental Estimate Functions */

    getPlantedTrees() {
        const planted_trees = parseFloat(this.power_archieved / 72.87).toFixed(2);
        // console.log(planted_trees + " Árvores deixarão de ser cortadas.");

        return planted_trees;
    }

    getCO2Reduction() {
        const CO2_reduction = parseFloat(this.power_archieved / 1.89).toFixed(2);
        // console.log(CO2_reduction + " Kg de CO₂ deixarão de serem jogadas no ar.");

        return CO2_reduction;
    }

    getKmCars() {
        const km_cars = parseFloat(this.power_archieved / 0.28).toFixed(2);
        // console.log(km_cars + " KM rodados de carro");

        return km_cars;
    }

    // Plant

    getAveragePlant() {
        const average_plant = parseFloat(this.indicated_kit * this.getReferenceKwh()).toFixed(2);
        // console.log("Valor médio da Usina: " + average_plant);

        return average_plant;
    }

    getEconomyValue() {
        return parseFloat(this.monthly_power * this.value_kwh).toFixed(2);
    }

    getPayback() {
        let average_max = this.getMaxAveragePlant()
        const economy = this.getEconomyValue()

        const payback = Math.round((average_max / economy) / 12)
        // console.log("Payback em Até (meses): " + payback)

        return payback;
    }

    getRequiredSpace() {
        const required_space = this.plate_quantity * 2;
        // console.log(`Aproximadamente: ${required_space} m²`);

        return required_space;
    }

    getStruct() {
        const structure = this.plate_quantity * 28;
        // console.log(`Peso de Estrutura: ${structure} kg`);

        return structure;
    }

    getMinAveragePlant() {
        return parseFloat(this.getAveragePlant() - (this.getAveragePlant() * 10) / 100).toFixed(2);
    }

    getMaxAveragePlant() {
        return parseFloat(this.getAveragePlant() + (this.getAveragePlant() / 100) * 15).toFixed(2);
    }

    // Utils

    getReferenceKwh() {
        const reference_kwh = this.config['reference_kwh'](this.used_kit)

        return reference_kwh
    }
}

module.exports = Sunvoltaic