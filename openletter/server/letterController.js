module.exports = {
    post: function(req, res){
        let { title, description, addressedTo, text } = req.body;
        let letter = [
            title,
            description,
            addressedTo,
            text,
            req.user.id
        ]
        req.app.get('db').insertLetter(letter).then(response => {
            res.status(200).send(response)
        })
    },

    get: function(req, res){
        req.app.get('db').getUserLetters([req.user.id]).then( resp => {
            res.status(200).send(resp);
        })
    },

    getLetter: function(req, res){
        let { id } = req.params;
        req.app.get('db').getThisLetter([id]).then(resp => {
            res.status(200).send(resp[0])
        });
    },
}