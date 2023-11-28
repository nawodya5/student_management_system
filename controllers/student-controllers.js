const mysql = require('mysql');

// Connection Pool
let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// View Student
exports.view = (req, res) => {
    // Student the connection
    connection.query('SELECT * FROM student WHERE status = "active"', (err, rows) => {
        // When done with the connection, release it
        if (!err) {
            console.log('1 The data from student table: \n', rows);
            // let removedStudent = req.query.removed;
            res.render('main', { rows, });
        } else {
            console.log(err);
        }
    });
}

// Find Student by Search
exports.find = (req, res) => {
    let searchTerm = req.body.search;
    // User the connection
    connection.query('SELECT * FROM student WHERE first_name LIKE ? OR last_name LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
        if (!err) {
            res.render('main', { rows });
        } else {
            console.log(err);
        }
        console.log('2 The data from student table: \n', rows);
    });
}

exports.form = (req, res) => {
    res.render('new-student-form');
}

// Add new Student
exports.create = (req, res) => {
    const { id, first_name, last_name, email, phone, comments } = req.body;
    let searchTerm = req.body.search;
    //validation

    if (!id || !first_name || !last_name || !email || !phone || !comments) {
        return res.render('new-student', { alert: 'All fields are required.' });
    }
    // Student the connection
    connection.query('INSERT INTO student SET id=?, first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?', [id, first_name, last_name, email, phone, comments], (err, rows) => {
        if (!err) {
            res.render('new-student', { alert: 'Student added successfully.' });
        } else {
            console.log(err);
            res.render('new-student', { alert: 'Failed to add student.' });
        }
        console.log('3 The data from student table: \n', rows);
    });
}


// Edit Student
exports.edit = (req, res) => {
    // Student the connection
    connection.query('SELECT * FROM student WHERE id = ?', [req.params.id], (err, rows) => {
        if (!err) {
            res.render('edit-student', { rows });
        } else {
            console.log(err);
        }
        console.log('4 The data from student table: \n', rows);
    });
}


// Update Student
exports.update = (req, res) => {
    const { first_name, last_name, email, phone, comments } = req.body;
    // User the connection
    connection.query('UPDATE student SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ? WHERE id = ?', [first_name, last_name, email, phone, comments, req.params.id], (err, rows) => {

        if (!err) {
            // Student the connection
            connection.query('SELECT * FROM student WHERE id = ?', [req.params.id], (err, rows) => {
                // When done with the connection, release it

                if (!err) {
                    res.render('edit-student', { rows, alert: `${first_name} has been updated.` });
                } else {
                    console.log(err);
                }
                console.log('5 The data from student table: \n', rows);
            });
        } else {
            console.log(err);
        }
        console.log(' 6 The data from student table: \n', rows);
    });
}

// Delete Student
exports.delete = (req, res) => {
    // Delete a record

    // User the connection
    connection.query('DELETE FROM student WHERE id = ?', [req.params.id], (err, rows) => {

        if (!err) {

            res.redirect('/');
        } else {
            console.log(err);
        }
        console.log('7 The data from duser table: \n', rows);

    });

    // Hide a record

    // connection.query('UPDATE student SET status = ? WHERE id = ?', ['removed', req.params.id], (err, rows) => {
    //     if (!err) {
    //         let removedStudent = encodeURIComponent('Student successeflly removed.');
    //         res.redirect('/?removed=' + removedStudent);
    //     } else {
    //         console.log(err);
    //     }
    //     console.log('7 The data from beer table are: \n', rows);
    // });

}

// View all Student
exports.viewall = (req, res) => {

    // Student the connection
    connection.query('SELECT * FROM student', [req.params.id], (err, rows) => {
        if (!err) {
            res.render('view-student', { rows });
        } else {
            console.log(err);
        }
        console.log('8 The data from student table: \n', rows);
    });

}

exports.studentHome = (req, res) => {
    let removedStudent = req.query.removed;
    res.render('student-home', { removedStudent });
};



// exports.studentHome = (req, res) => {
//     let removedStudent = req.query.removed;
//     let dummyRows = [{ id: 1, first_name: 'John', last_name: 'Doe' }, { id: 2, first_name: 'Jane', last_name: 'Doe' }];
//     res.render('student-home', { rows: dummyRows, removedStudent });
// };
