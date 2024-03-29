const { findResponder, findResponders } = require('../../mongo/methods/responder');

module.exports = (req, res) => {
	if (req.query.hasOwnProperty('chat_id')) {
		findResponder(req.query.chat_id)
			.then(data => {
				if (data) {
					res.send(data);
				} else {
					res.status(400).send({ message: `Responder with id ${req.query.chat_id} doesn\`t exist`});
				}
			})
			.catch((err) => res.status(400).send(err))
	} else {
		findResponders()
			.then(data => res.send(data))
			.catch((err) => res.status(400).send(err))
	}
};