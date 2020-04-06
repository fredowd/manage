const fs = require('fs');

module.exports = {
    addCoursPage: (req, res) => {
        res.render('add-cours.ejs', {
            title: `Bienvenue sur Manage | Ajouter un cours`
            ,message: ''
        });
    },

    addCours: (req, res) => {

        let message = '';
        let titre = req.body.titre;
        let description = req.body.description;
        let date = req.body.date;
        let addresse = req.body.addresse;

        let allCoursQuery = "SELECT * FROM cours WHERE titre = '" + titre + "' ";

        db.query(allCoursQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Ce cours éxiste déjà';
                res.render('add-cours.ejs', {
                    message,
                    title: `Bienvenue sur Manage | Ajouter un cours`
                });
            } else {
                // send the player's details to the database
                let query = "INSERT INTO `cours` (titre, description, date, addresse) VALUES ('" +
                    titre + "', '" + description + "', '" + date + "', '" + addresse + "')";
                db.query(query, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                });
            }   
        }
    )},

        // edit is not effective
    editCoursPage: (req, res) => {
        let id_cours = req.params.id;
        let query = "SELECT * FROM cours WHERE id_cours = '" + id_cours + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-cours.ejs', {
                title: 'Modifier cours',
                cours: result[0],
                message: ''
            });
        });
    },

    editCours: (req, res) => {
        let id_cours = req.params.id;
        let titre = req.body.titre;
        let description = req.body.description;
        let date = req.body.date;
        let addresse = req.body.addresse;

        let query = "UPDATE `cours` SET `titre` = '" + titre + "', `description` = '" + description + "', `date` = '" + date + "', `addresse` = '" + addresse + "' WHERE `cours`.`id_cours` = '" + id_cours + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },

    deleteCours: (req, res) => {
        let id_cours = req.params.id;
        let deleteUserQuery = 'DELETE FROM cours WHERE id_cours = "' + id_cours + '"';

        db.query(deleteUserQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    }
};