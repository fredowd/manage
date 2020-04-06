module.exports = {
    getHomePage: (req, res) => {
        let query = "SELECT * FROM cours ORDER BY id_cours ASC"; // query database to get all the players

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('index.ejs', {
                title: `Bienvenue sur Manage | Liste des cours`,
                courses: result
            });
        });
    },
};