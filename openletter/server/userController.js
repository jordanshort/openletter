module.exports = {
    getAuthor: function(req, res){
        let { id } = req.params;
        req.app.get('db').getAuthorInfo([id]).then( resp => {
            res.status(200).send(resp[0]);
        });
    },
}