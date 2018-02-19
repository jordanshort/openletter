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
        console.log(req.user.id);
        // let { id } = req.user;
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

    getAuthLetters: function(req, res){
        let id = Number(req.params.author);
        req.app.get('db').getUserLetters([id]).then(resp => {
            res.status(200).send(resp)
        })
    },

    editLetter: function(req, res){
        let { id } = req.params;
        let update = [
            req.body.title,
            req.body.description,
            req.body.addressedTo,
            req.body.text,
            req.params.id
        ]
        req.app.get('db').editLetter(update).then(resp => {
            req.app.get('db').getThisLetter([resp[0].id]).then( letters => {
                res.status(200).send(letters[0])
            })
        });
    },

    delete: function(req, res){
        let id = Number(req.params.id);
        req.app.get('db').deleteLetter([id]).then( () => {
            req.app.get('db').getUserLetters([req.user.id]).then( resp => {
                res.status(200).send(resp);
            });
        });
    }

}