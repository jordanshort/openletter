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
        app.get('db').insertLetter(letter).then(response => {
            res.status(200).send(response)
        })
    }
}