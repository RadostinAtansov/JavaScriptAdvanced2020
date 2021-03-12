class Parking {
    constructor(capacity) {
        this.capacity = capacity;
        this.vehicles = [];
    }

    addCar(carModel, carNumber) {
        if (this.vehicles.length >= this.capacity) {
            throw new Error('Not enough parking space.');
        }
        this.vehicles.push({ carModel, carNumber, payed: false });

        return `The ${carModel}, with a registration number ${carNumber}, parked.`
    }

    removeCar(carNumber) {
        let carPay = this.vehicles.find(c => c.carNumber === carNumber);

        if (this.vehicles.some(c => c.carNumber == carNumber) == false) {
            throw new Error(`The car, you're looking for, is not found.`);

        } else if ((this.vehicles.some(c => c.carNumber == carNumber)) && carPay.payed == false) {

            throw new Error(`${carNumber} needs to pay before leaving the parking lot.`);
        }

        let carIndex = this.vehicles.indexOf(carPay);
        this.vehicles.splice(carIndex, 1);

        return `${carNumber} left the parking lot.`
    }

    pay(carNumber) {
        let carPay = this.vehicles.find(c => c.carNumber === carNumber);

        if (this.vehicles.some(c => c.carNumber == carNumber) == false) {
            throw new Error(`${carNumber} is not in the parking lot.`);
        } else if ((this.vehicles.some(c => c.carNumber == carNumber)) && carPay.payed == true) {
            throw new Error(`${carNumber}'s driver has already payed his ticket.`);
        }
        carPay.payed = true;

        return `${carNumber}'s driver successfully payed for his stay.`
    }

    getStatistics(carNumber) {
        let result = [];
        let emptySlots = Math.abs(this.vehicles.length - this.capacity);

        if (carNumber == undefined) {
            result.push(`The Parking Lot has ${ emptySlots } empty spots left.`);
            this.vehicles
                .sort((a, b) => a.carModel.localeCompare(b.carModel))
                .forEach(e => {
                    result.push(`${e.carModel} == ${e.carNumber} - ${e.payed ? 'Has payed' : 'Not payed'}`)
                })

            return result.join('\n').trim();
        }

        let car = this.vehicles.find(c => c.carNumber == carNumber);
        result.push(`${car.carModel} == ${car.carNumber} - ${car.payed ? 'Has payed' : 'Not payed'}`);

        return result.join('\n');
    }
}