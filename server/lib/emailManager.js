const mailgun = require("mailgun-js");
const DOMAIN = process.env.MAILGUN_DOMAIN;


exports.activationEmail = async (user) => {

	const token = user.activationToken;

	const activationLink = process.env.BASE_URL + '/activate?token=' + token;
	console.log('link: ', activationLink)
	//SEND EMAIL
	const mg = mailgun({
		apiKey: process.env.MAILGUN_APIKEY,
		domain: DOMAIN
	});
	const data = {
		from: 'gyaofree@gmail.com',
		to: process.env.NODE_ENV === 'production' ? user.email : 'gyaofree@gmail.com',
		subject: 'Activate your account',
		template: "activation",
        'h:X-Mailgun-Variables': JSON.stringify({ activation_link: activationLink})
	};

	//actually send call
	try {
			const body = await mg.messages().send(data);
			console.log('email body: ', body);
	} catch (err) {
		console.log('activationEmail err: ', err)
	}

}


exports.resetEmail = async (user) => {

	const token = user.passwordToken;

	const resetLink = process.env.BASE_URL + '/reset?token=' + token;
	console.log('link: ', resetLink)
	//SEND EMAIL
	const mg = mailgun({
		apiKey: process.env.MAILGUN_APIKEY,
		domain: DOMAIN
	});
	const data = {
		from: 'gyaofree@gmail.com',
		to: process.env.NODE_ENV === 'production' ? user.email : 'gyaofree@gmail.com',
		subject: 'Reset your password. Link inside.',
		template: "reset",
        'h:X-Mailgun-Variables': JSON.stringify({ reset_link: resetLink })
	};

	//actually send call
	try {
			const body = await mg.messages().send(data);
			console.log('email body: ', body);
	} catch (err) {
		console.log('activationEmail err: ', err)
	}

}

// exports.updateUser = async (user, email, name) => {

// 	//SEND EMAIL
// 	const mg = mailgun({
// 		apiKey: process.env.MAILGUN_APIKEY,
// 		domain: DOMAIN
// 	});
// 	const data = {
// 		from: 'gyaofree@gmail.com',
// 		to: 'gyaofree@gmail.com',
// 		subject: 'Update your account',
// 		template: "info",
//         'h:X-Mailgun-Variables': JSON.stringify({ 
// 			user_email: user.email,
// 			user_newemail: email,
// 			user_name: user.name,
// 			user_newname: name
// 		})
// 	};

// 	//actually send call
// 	try {
// 			const body = await mg.messages().send(data);
// 			console.log('email body: ', body);
// 	} catch (err) {
// 		console.log('activationEmail err: ', err)
// 	}

// }

exports.updateUser = async (user, email, name) => {

	//SEND EMAIL
	const mg = mailgun({
		apiKey: process.env.MAILGUN_APIKEY,
		domain: DOMAIN
	});
	const data = {
		from: 'gyaofree@gmail.com',
		to: 'gyaofree@gmail.com',
		subject: 'Update your account',
		template: "info",
        'h:X-Mailgun-Variables': JSON.stringify({ 
			user_email: user.email,
			user_newemail: email,
			user_name: user.name,
			user_newname: name
		})
	};

	//actually send call
	try {
			const body = await mg.messages().send(data);
			console.log('email body: ', body);
	} catch (err) {
		console.log('activationEmail err: ', err)
	}

}


exports.planConfirm = async (user) => {

	//SEND EMAIL
	const mg = mailgun({
		apiKey: process.env.MAILGUN_APIKEY,
		domain: DOMAIN
	});
	const data = {
		from: 'gyaofree@gmail.com',
		to: process.env.NODE_ENV === 'production' ? user.email : 'gyaofree@gmail.com',
		subject: 'Subscription update',
		template: "subsuccess",
        'h:X-Mailgun-Variables': JSON.stringify({ name: user.name})
	};

	//actually send call
	try {
			const body = await mg.messages().send(data);
			console.log('email body: ', body);
	} catch (err) {
		console.log('activationEmail err: ', err)
	}

}

exports.planCancel = async (user) => {

	//SEND EMAIL
	const mg = mailgun({
		apiKey: process.env.MAILGUN_APIKEY,
		domain: DOMAIN
	});
	const data = {
		from: 'gyaofree@gmail.com',
		to: process.env.NODE_ENV === 'production' ? user.email : 'gyaofree@gmail.com',
		subject: 'Subscription update',
		template: "subcancel",
        'h:X-Mailgun-Variables': JSON.stringify({ name: user.name})
	};

	const datagal = {
		from: 'gyaofree@gmail.com',
		to: 'gyaofree@gmail.com',
		subject: 'Subscription update',
		template: "subcancel",
        'h:X-Mailgun-Variables': JSON.stringify({ name: user.email})
	};

	//actually send call
	try {
			const body = await mg.messages().send(data);
			const bodygal = await mg.messages().send(datagal);
			console.log('email body: ', body);
	} catch (err) {
		console.log('activationEmail err: ', err)
	}

}