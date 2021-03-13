const db = firebase.firestore();
const UserModel = firebase.auth();

const app = Sammy('#root', function() {

    this.use('Handlebars', 'hbs');

    this.get('/home', function(context) {

        db.collection('destinations')
            .get()
            .then((response) => {
                context.collections = response.docs.map((offer) => { return { id: offer.id, ...offer.data() } })
                extendContend(context)
                    .then(function() {
                        this.partial('./templates/home.hbs');
                    })
            });
    })
    this.get('/createObject', function(context) {
        extendContend(context)
            .then(function() {
                this.partial('./templates/createObject.hbs');
            })
    });


    this.get('/editObject/:offerId', function(context) {
        extendContend(context)
            .then(function() {
                this.partial('./templates/editObject.hbs')
            })
    })
    this.get('/edit/:offerId', function(context) {


        const { offerId } = context.params
        console.log(context);

        db.collection('offers')
            .doc(offerId)
            .get()
            .then((response) => {
                context.offer = { id: offerId, ...response.data() };
                extendContend(context)
                    .then(function() {
                        this.partial('./templates/editObject.hbs');
                    })
                    .then(() => {
                        showNotification('Eddited successfully');
                    })
            }).catch(errorHandler)

    });
    this.post('/edit/:offerId', function(context) {

        const { product, description, price, pictureUrl } = context.params;

        const { offerId } = context.params;

        db.collection('offers')
            .doc(offerId)
            .get()
            .then((response) => {

                return db.collection('offers')
                    .doc(offerId)
                    .set({
                        ...response.data(),
                        product,
                        description,
                        price,
                        pictureUrl,
                    })
            })
            .then((response) => {
                this.redirect(`/myObjectsDashbord`)
            })
            .catch(errorHandler);

    });


    this.get('/login', function(context) {
        extendContend(context)
            .then(function() {
                this.partial('./templates/login.hbs');
            })
    });
    this.get('/myObjectsDashbord', function(context) {

        db.collection('offers')
            .get()
            .then((response) => {
                console.log(context);
                context.offers = response.docs.map((offer) => { return { id: offer.id, ...offer.data() } })
                extendContend(context)
                    .then(function() {
                        this.partial('./templates/myObjectsDashbord.hbs');
                    })
            });
    });
    this.get('/register', function(context) {
        extendContend(context)
            .then(function() {
                this.partial('./templates/register.hbs');
            })
    });

    this.get('/profilePage', function(context) {

        // db.collection('destinations')
        //     .get()
        //     .then((response) => {
        //         context.collections = response.docs.map((offer) => { return { id: offer.id, ...offer.data() } })
        extendContend(context)
            .then(function() {
                this.partial('./templates/profilePage.hbs');
            })
            // });
    })

    this.get('/logout', function(context) {
        console.log();
        UserModel.signOut()
            .then((userData) => {
                clearUserData();
                this.redirect('/home')
            })
            .then(() => {
                notify.showSuccess('Logout successful.')
            })
            .catch(errorHandler);
    });
    this.get('/detailsOffer/:offerId', function(context) {

        console.log(context.params.offerId)
        const { offerId } = context.params;

        db.collection('offers')
            .doc(offerId)
            .get()
            .then((response) => {

                const actualData = response.data();
                context.offer = {...actualData, id: offerId };
                extendContend(context)
                    .then(function() {
                        this.partial('./templates/details.hbs');
                    })
            })

    });


    this.post('/register', function(context) {
        const { email, password, rePassword } = context.params;

        if (email.length === 0 || password.length === 0 || rePassword.length === 0) {
            notify.showError('You must fill all fields.');
            return;
        };

        if (password.length < 6) {
            notify.showError('The password must be at least 6 characters long.');
            return;
        };

        if (password !== rePassword) {
            notify.showError('The passwords do not match!');
            return;
        };
        UserModel.createUserWithEmailAndPassword(email, password)
            .then((userData) => {
                saveUserData(userData);
                this.redirect('/home');
            })
            .catch(errorHandler);
    });
    this.post('/login', function(context) {

        const { email, password } = context.params;

        if (email.length === 0 || password.length === 0) {
            notify.showError('You must fill all fields.');
            return;
        }
        UserModel.signInWithEmailAndPassword(email, password)
            .then((userData) => {
                saveUserData(userData);
                console.log(userData)
                this.redirect('/home')
            })
            .catch(errorHandler);

    });
    this.post('/createObject', function(context) {

        const { product, description, price, pictureUrl } = context.params;

        if (product.length > 0 && description.length > 0 && price.length > 0 & pictureUrl.startsWith("https://")) {
            return;
        }
        db.collection('offers')
            .add({
                product,
                description,
                price,
                pictureUrl,
                offerId: getUserData().uid,
                offers: [],
            })
            .then((createData) => {
                console.log(createData);
                this.redirect('#/myObjectsDashbord')
            }).then(() => {
                notify.showSuccess('Created successfully!');
            })
            .catch(errorHandler);
    });


    this.get('/deletePage/:offerId', function(context) {
        extendContend(context)
            .then(function() {
                this.partial('./templates/deletePage.hbs');
            })
    })
    this.get('/delete/:offerId', function(context) {

        console.log('asd');

        const { offerId } = context.params

        db.collection('offers')
            .doc(offerId)
            .get()
            .then((response) => {
                context.offer = { id: offerId, ...response.data() };
                extendContend(context)
                    .then(function() {
                        this.partial('./templates/deletePage.hbs')
                    })
                    // showNotification('Deleted successfully');
            })
            .catch(errorHandler);
    });
    this.post('/delete/:offerId', function(context) {

        const { offerId } = context.params;

        db.collection('offers')
            .doc(offerId)
            .delete()
            .then(() => {
                this.redirect('#/home')
            })
            .catch(errorHandler);

    });

});

(() => {
    app.run('#/home');
})();

function errorHandler(error) {
    console.log(error);
};

function extendContend(context) {

    const user = getUserData();
    context.isLoggedIn = Boolean(user);
    context.email = user ? user.email : '';

    return context.loadPartials({
        'header': './partial/header.hbs',
        'footer': './partial/footer.hbs',
        //'notification': './partial/notification.hbs'
    })

};

function saveUserData(userData) {
    const { user: { email, uid } } = userData;
    localStorage.setItem('user', JSON.stringify({ email, uid }))
};

function getUserData() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

function clearUserData() {
    localStorage.removeItem('user');
};