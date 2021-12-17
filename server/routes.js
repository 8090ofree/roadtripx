const authControl = require('./controllers/auth');
const subscription = require('./controllers/subscription');
const passport = require('passport');
const isAuth = passport.authenticate('jwt', {session: false});

function addRoutes(app){
    app.all('*', (req, res, next) => {
        console.log(req.method + ' ' + req.url);
        next();
    });

    
    app.get('/test-url', (req, res, next) => {
		res.send({
			success: true
		});
	})

    app.get('/api/isauth', isAuth ,authControl.userAuth)
    app.get('/api/pk' ,subscription.pkeys)
    app.post('/api/activate', authControl.activate)
    app.post('/api/activation-link', authControl.activationLink)
    app.post('/api/reset-link', authControl.resetLink)
    app.post('/api/reset', authControl.reset)
    app.post('/api/plan', subscription.plan)
    app.post('/api/plansignin', subscription.plansignin)
    app.post('/api/cancelplan', subscription.cancel)
    app.post('/api/info', authControl.userinfo)
    app.post('/api/signup', authControl.signup)
    app.post('/api/signin', authControl.signin)
}

const routes = {
    addRoutes
}

module.exports = routes