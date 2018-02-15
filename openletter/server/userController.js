module.exports = {
    getAuthor: function(req, res){
        let id = Number(req.params.id);
        req.app.get('db').getAuthorInfo([id]).then( resp => {
            res.status(200).send(resp[0]);
        });
    },

    getUser: function(req, res){
        req.app.get('db').getAuthorInfo([req.user.id]).then( resp => {
            res.status(200).send(resp[0]);
        });
    }
}