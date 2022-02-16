module.exports = {
    average_sun: 4.66,
    plant_age: 25,
    plate_w: 530,
    value_kwv: {
        residential: 0.89,
        commercial: 0.89,
        agro: 0.89,
    },
    reference_kwh: (used_kit) => {
        let reference_kwh = 7999.9;

        if(used_kit >= 2.5){
            reference_kwh = 7971.70;
        } else if(this.used_kit <= 5.0){
            reference_kwh = 6462.26;
        } else if(this.used_kit <= 7.5){
            reference_kwh = 5492.83;
        } else if(this.used_kit <= 10.0){
            reference_kwh = 5718.57;
        } else if(this.used_kit <= 12.5){
            reference_kwh = 5437.82;
        } else if(this.used_kit <= 15){
            reference_kwh = 5786.57;
        } else if(this.used_kit <= 17){
            reference_kwh = 5525.34;
        } else if(this.used_kit <= 20){
            reference_kwh = 5348.41;
        } else if(this.used_kit > 20){
            reference_kwh = 5348.41;
        }

        return reference_kwh;
    }
}