module.exports = {
    postResponse: function(req, res){
        let letterid = Number(req.params.letterid);
        req.app.get('db').postResponse([letterid, req.body.text, req.user.id]).then(resp => {
            res.status(200).send(resp[0]);
        });
    }, 

    getResponses: function(req, res){
        let id = Number(req.params.letterid);
        req.app.get('db').getResponses([id]).then(resp => {
            res.status(200).send(resp);
        });
    }
}