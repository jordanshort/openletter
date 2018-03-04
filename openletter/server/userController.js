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
    },

    updateProfile: function(req, res){
        let update = [ 
           req.body.month,
           req.body.day,
           req.body.year,
           req.body.about,
           req.body.job,
           req.body.employer,
           req.user.id,
           req.body.firstName,
           req.body.lastName,
           req.body.email
        ];
        req.app.get('db').updateUser(update).then(resp => {
            res.status(200).send(resp[0]);
        });
    },

    getRecommended: function(req, res){
        req.app.get('db').getRecommended([req.user.id]).then(resp => {
            res.status(200).send(resp);
        });
    },

    addFollowing: function(req, res){
        let body = [
            req.user.id,
            req.body.id
        ]
        req.app.get('db').addFollowing(body).then(() => {
            req.app.get('db').getFollowing([req.user.id]).then(resp => {
                res.status(200).send(resp);
            });
        });
    },

    getNotifications: function(req, res){
        req.app.get('db').getNotifications([req.user.id]).then(resp => {
            res.status(200).send(resp);
        });
    },

    markRead: function(req, res){
        req.app.get('db').markRead([req.body.id]).then(resp => {
            res.status(200).send()
        });
    }

    
}