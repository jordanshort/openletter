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
    },

    getFollowingLetters: function(req, res){
        req.app.get('db').getFollowingLetters([req.user.id]).then(resp => {
            resp.sort(function(a, b){
                a = new Date(a.created_at);
                b = new Date(b.created_at);
                return a>b ? -1 : a<b ? 1 : 0;
            });
            res.status(200).send(resp);
        });
    },

    search: function(req, res){
        let splitTerm = req.body.term.split(' ');
        let searchArr = [];
        for (let i = 0; i < splitTerm.length; i++){
            if (i === splitTerm.length-1){
                searchArr.push(splitTerm[i]);
            } else {
                searchArr.push(splitTerm[i] + ' & ');
            };
        };
        let searchTerms = searchArr.join('');
        req.app.get('db').search([searchTerms]).then(resp => {
            res.status(200).send(resp);
        }).catch(err => console.log(err));
    },

    save: function(req, res){
        let letterID = Number(req.params.id);
        req.app.get('db').save([letterID, req.user.id]).then(response => {
            res.status(200).send(response);
        });
    },

    getSaved: function(req, res){
        req.app.get('db').getSaved([req.user.id]).then(resp => {
            res.status(200).send(resp);
        });
    },

    deleteSaved: function(req, res){
        letterID = Number(req.params.id);
        req.app.get('db').deleteSaved([letterID, req.user.id]).then(() => {
            req.app.get('db').getSaved([req.user.id]).then(resp => {
                res.status(200).send(resp);
            });
        });
    }

}