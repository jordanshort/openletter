module.exports = {
    getFollowing: function(req, res){
        req.app.get('db').getFollowing([req.user.id]).then(resp => {
            res.status(200).send(resp);
        })
    },

    getFollowers: function(req, res){
        req.app.get('db').getFollowers([req.user.id]).then(resp => {
            res.status(200).send(resp);
        });
    }
}