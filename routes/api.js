// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()

/*  This is a sample API route. */

// router.get('/:resource', (req, res) => {
// 	res.json({
// 		confirmation: 'success',
// 		resource: req.params.resource,
// 		query: req.query // from the url query string
// 	})
// })

// router.get('/:resource/:id', (req, res) => {
// 	res.json({
// 		confirmation: 'success',
// 		resource: req.params.resource,
// 		id: req.params.id,
// 		query: req.query // from the url query string
// 	})
// })


const Profile = require('../models/profile')

router.get('/profile', (req, res) => {
	//const query = req.query
	let filters =req.query
	if(req.query.age != null) {
		filters = {
			age: {$gt: req.query.age}
		}
	}

	Profile.find(filters)
	.then(profiles => {
		res.json({
			confirmation: 'success',
			data: profiles
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})

	
})

// update data into mongodb
// NON-RESTful
router.get('/profile/update', (req, res) => {

	const query = req.query // require: id, key=value 
	const profileId = query.id
	delete query['id']

	Profile.findByIdAndUpdate(profileId, query, {new: true})
	.then(profile => {
		res.json({
			confirmation: 'success',
			data: profile
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})

})

router.get('/profile/remove', (req, res) => {
	const query = req.query

	Profile.findByIdAndRemove(query.id)
	.then(data => {
		res.json({
			confirmation: 'success',
			data: 'Profile ' +query.id+' successfully removed.'
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})

})

router.get('/profile/:id', (req, res) => {
	const id = req.params.id
	Profile.findById(id)
	.then(profile => {
		res.json({
			confirmation: 'success',
			// resource: req.params.resource,
			// id: req.params.id,
			// query: req.query // from the url query string
			data: profile
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: 'Profile \'' + id + '\' not found.'
		})
	})
})

// insert data from form into mongodb
router.post('/profile', (req, res) => {
	//const query = req.query
	// if(req.params.fistName == null || req.query.lastName == null ||
	// 	req.query.age == null || req.query.team == null || req.query.position == null) {
	// 	res.json({
	// 		confirmation: 'fail',
	// 		data: 'One of the field is empty!'+' First Name: '+req.query.fistName+
	// 		' Lastt Name: '+req.lastName+' Age: '+req.age+
	// 		' Team: '+req.team+' Position: '+req.position +
	// 	})

	// } else {
	// 	Profile.create(req.body)
	// 	.then(profile => {
	// 		res.json({
	// 			confirmation: 'success',
	// 			data: profile
	// 		})
	// 	})
	// 	.catch(err => {
	// 		res.json({
	// 		confirmation: 'fail',
	// 		message: err.message
	// 	})
	// })
	// }

	Profile.create(req.body)
		.then(profile => {
			res.json({
				confirmation: 'success',
				data: profile
			})
		})
		.catch(err => {
			res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
	// res.json({
	// 	confirmation: 'success',
	// 	data: req.body
	// })
})

module.exports = router
