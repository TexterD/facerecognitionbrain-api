const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
	client: 'pg',
	connection: {
		host: 'postgres://smartbrain_hie3_user:uC2Nx77iAfenptO39Yn0hhBNOt71adZ1@dpg-cfk4l8pmbjsn9eapib5g-a/smartbrain_hie3'
	}
});

const app = express();

app.use(express.json());

app.use(cors());

app.get('/', (req, res) => { res.send('it is working!') });
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) });
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(process.env.PORT || 3001, () => {
	console.log(`app is running on port ${process.env.PORT}`);
});