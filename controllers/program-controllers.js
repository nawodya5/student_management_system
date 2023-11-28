const mysql = require('mysql');

// Connection Pool
let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// View Program
exports.view = (req, res) => {
    // Program connection
    connection.query('SELECT * FROM program', (err, rows) => {
        // When done with the connection, release it
        if (!err) {
            // let removedProgram = req.query.removed;
            res.render('view-program', { rows, removedProgram });
        } else {
            console.log(err);
        }
        console.log('1 The data from program table: \n', rows);
    });
}

// Find Program by Search
exports.find = (req, res) => {
    let searchTerm = req.body.search;
    // User the connection
    connection.query('SELECT * FROM program WHERE program_name LIKE ? OR program_id LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
        if (!err) {
            res.render('program-home', { rows });
        } else {
            console.log(err);
        }
        console.log('2 The data from program table: \n', rows);
    });
}

exports.form = (req, res) => {
    //res.send("lol")
    res.render('new-program-form');
}

// Add new Program
exports.create = (req, res) => {
    const { program_id, program_name, } = req.body;
    let searchTerm = req.body.search;

    // Program the connection
    connection.query('INSERT INTO program SET program_id=?, program_name = ?', [program_id, program_name], (err, rows) => {
        if (!err) {
            res.render('new-program', { alert: 'Program added successfully.' });
        } else {
            console.log(err);
            res.render('new-program', { alert: 'Failed to add Program' });
        }
        console.log('3 The data from program table: \n', rows);
    });
}


// Edit Program
exports.edit = (req, res) => {
    // Program the connection
    connection.query('SELECT * FROM program WHERE program_id = ?', [req.params.program_id], (err, rows) => {
        if (!err) {
            res.render('edit-program', { rows });
        } else {
            console.log(err);
        }
        console.log('4 The data from program table: \n', rows);
    });
}


// Update program
exports.update = (req, res) => {
    const { program_id, program_name } = req.body;

    connection.query('UPDATE program SET program_name = ? WHERE program_id = ?', [program_name, req.params.program_id], (err, rows) => {

        if (!err) {
            // Program the connection
            connection.query('SELECT * FROM program WHERE program_id = ?', [req.params.program_id], (err, rows) => {
                // When done with the connection, release it

                if (!err) {
                    res.render('edit-program', { rows, alert: `${program_name} has been updated.` });
                } else {
                    console.log(err);
                }
                console.log('5 The data from program table: \n', rows);
            });
        } else {
            console.log(err);
        }
        console.log('6 The data from program table: \n', rows);
    });
}

// Delete program
exports.delete = (req, res) => {

    // Delete a record

    // User the connection
    connection.query('DELETE FROM program WHERE id = ?', [req.params.program_id], (err, rows) => {

        if (!err) {
            console.log('done')
            res.redirect('/');
        } else {
            console.log(err);
        }
        console.log('The data from user table: \n', rows);

    });

    // Hide a record

    // connection.query('UPDATE program SET program_name = ? WHERE program_id = ?', ['removed', req.params.program_id], (err, rows) => {
    //     if (!err) {
    //         let removedProgram = encodeURIComponent('Program successeflly removed.');
    //         res.redirect('/?removed=' + removedProgram);
    //     } else {
    //         console.log(err);
    //     }
    //     console.log('7 The data from toin table are: \n', rows);
    // });

}

// View Program
exports.viewall = (req, res) => {

    // Program the connection
    // connection.query('SELECT * FROM program', [req.params.program_id], (err, rows) => {
    //     if (!err) {
    //         res.render('view-program', { rows });
    //     } else {
    //         console.log(err);
    //     }
    //     console.log('8 The data from program table: \n', rows);
    // });

}

exports.other = (req, res) => {
    console.log('Hello');

    // connection.query('SELECT * FROM program', [req.params.program_id], (err, rows) => {
    //     if (!err) {
    //         res.render('view-program', { rows });
    //     } else {
    //         console.log(err);
    //     }
    //     console.log('8 The data from program table: \n', rows);
    // });

}