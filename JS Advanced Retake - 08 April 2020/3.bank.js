class Bank {
    constructor(bankName) {
        this._bankName = bankName;
        this.allCustomers = [];
        this.transactionInfos = [];

    }

    newCustomer(customer) {

        if (this.allCustomers.some(c => c.personalId === customer.personalId)) {
            throw new Error(`${customer.firstName} ${customer.lastName} is already our customer!`);
        }
        this.allCustomers.push(customer);

        return customer;
    }

    depositMoney(personalId, amount) {
        let person = this.allCustomers.find(c => c.personalId == personalId);

        if (person === undefined) {
            throw new Error('We have no customer with this ID!');
        } else {

            if (isNaN(person.totalMoney)) {
                person.totalMoney = amount;
            } else {
                person.totalMoney += amount;
            }
            if (!Array.isArray(person.transactionInfos)) {
                person.transactionInfos = [];
            }
            let message = `${person.transactionInfos.length + 1}. ${person.firstName} ${person.lastName} made deposit of ${amount}$!`;

            person.transactionInfos.push(message);

            return `${person.totalMoney}$`;
        }
    }

    withdrawMoney(personalId, amount) {

        let person = this.allCustomers.find(c => c.personalId === personalId);

        if (person === undefined) {
            throw new Error('We have no customer with this ID!');
        } else {

            if (isNaN(person.totalMoney)) {
                person.totalMoney = amount;
            }
            if (!Array.isArray(person.transactionInfos)) {
                person.transactionInfos = [];
            }
            if (person.totalMoney < amount) {
                throw new Error(`${person.firstName} ${person.lastName} does not have enough money to withdraw that amount!`);
            } else {
                person.totalMoney -= amount;

                let message = `${person.transactionInfos.length + 1}. ${
                        person.firstName
                    } ${person.lastName} withdrew ${amount}$!`;

                person.transactionInfos.push(message);
            }



            return `${person.totalMoney}$`;
        }
    }

    customerInfo(personalId) {

        let result = [];
        let person = this.allCustomers.find(p => p.personalId == personalId);

        if (person === undefined) {
            throw new Error('We have no customer with this ID!');
        }
        result.push(`Bank name: ${this._bankName}`);
        result.push(`Customer name: ${person.firstName} ${person.lastName}`);
        result.push(`Customer ID: ${person.personalId}`);
        result.push(`Total Money: ${person.totalMoney}$`);
        result.push(`Transactions:`);

        let transRevers = [];
        for (const transactions of person.transactionInfos) {
            transRevers.push(`${transactions}`);
        }
        transRevers.reverse();
        result.push(transRevers.join('\n'));

        return result.join('\n');
    }

}