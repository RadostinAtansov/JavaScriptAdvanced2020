function solveClasses() {
    class Hall {
        constructor(capacity, name) {

            this.capacity = capacity;
            this.name = name;
            this.events = [];
        };

        hallEvent(title) {

            if (this.events.includes(title)) {
                throw new Error("This event is already added!");
            }
            this.events.push(title);
            return "Event is added.";
        };

        close() {

            this.events = [];
            return `${this.name} hall is closed.`;
        };

        toString() {

            let result = `${this.name} hall - ${this.capacity}`;

            if (this.events.length > 0) {
                result += "\n";
                result += `Events: ${this.events.join(', ')}`;
            }

            return result;
        };

    };

    class MovieTheater extends Hall {
        constructor(capacity, name, screenSize) {
            super(capacity, name)
            this.screenSize = screenSize;
            this.eventsOfString = [];
        };

        close() {
            return super.close() + "Аll screenings are over.";
        };

        toString() {
            let result = super.toString();

            result += "\n";
            result += `${this.name} is a movie theater with ${this.screenSize} screensize and ${this.capacity} seats capacity.`;
            return result;
        };

    };

    class ConcertHall extends Hall {
        constructor(capacity, name) {
            super(capacity, name)
            this.events = [];
        };

        hallEvent(title, performers) {
            this.title = title;
            this.performers = performers;

            this.events.push(title);

            return super.hallEvent();

        };

        close() {
            return super.close() + "Аll performances are over.";
        };

        toString() {
            let result = super.toString();

            if (this.events.length > 0) {
                result += "\n";
                result += `Performers: ${this.performers.join(', ')}.`;
            };
            return result;
        };
    };

    return {
        Hall,
        MovieTheater,
        ConcertHall
    };
}


let classes = solveClasses();
let hall = new classes.Hall(20, 'Main');
console.log(hall.hallEvent('Breakfast Ideas'));
console.log(hall.hallEvent('Annual Charity Ball'));
console.log(hall.toString());
console.log(hall.close());
// --------------------------------------------------------------------------------------
let movieHall = new classes.MovieTheater(10, 'Europe', '10m');
console.log(movieHall.hallEvent('Top Gun: Maverick'));
console.log(movieHall.toString());
// --------------------------------------------------------------------------------------
let concert = new classes.ConcertHall(5000, 'Diamond');
console.log(concert.hallEvent('The Chromatica Ball', ['LADY GAGA']));
console.log(concert.toString());
console.log(concert.close());
console.log(concert.toString());



// Event is added.
// Event is added.
// Main hall - 20
// Events: Breakfast Ideas, Annual Charity Ball
// Main hall is closed.
// --------------------------------------------------------------------------------------
// Event is added.
// Europe hall - 10
// Events: Top Gun: Maverick
// Europe is a movie theater with 10m screensize and 10 seats capacity.
// --------------------------------------------------------------------------------------
// Event is added.
// Diamond hall - 5000
// Events: The Chromatica Ball
// Performers: LADY GAGA.
// Diamond hall is closed.Аll performances are over.
// Diamond hall - 5000