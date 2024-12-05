const db = require('../config/db');

exports.createMedicine = (req, res) => {
  const { name, dosage, schedule_time } = req.body;
  const userId = req.userId;

  db.query(
    'INSERT INTO medicines (user_id, name, dosage, schedule_time) VALUES (?, ?, ?, ?)',
    [userId, name, dosage, schedule_time],
    (err, result) => {
      if (err) return res.status(500).send('Error on the server.');
      res.status(201).send({ message: 'Medicine schedule added successfully!' });
    }
  );
};

exports.getMedicines = (req, res) => {
  const userId = req.userId;

  db.query('SELECT * FROM medicines WHERE user_id = ?', [userId], (err, results) => {
    if (err) return res.status(500).send('Error on the server.');
    res.status(200).send(results);
  });
};

exports.acknowledgeMedicine = (req, res) => {
  const { medicine_id } = req.body;
  const userId = req.userId;
  const status = 'Taken'; // Set the default status value

  db.query(
    'INSERT INTO acknowledgment_logs (user_id, medicine_id, status) VALUES (?, ?, ?)',
    [userId, medicine_id, status],
    (err, result) => {
      if (err) {
        console.error('Error acknowledging medicine:', err); // Log the error details
        return res.status(500).send('Error on the server.');
      }
      res.status(201).send({ message: 'Medicine acknowledged successfully!', result });
    }
  );
};


exports.getAcknowledgments = (req, res) => {
  const { patient_id, start_date, end_date } = req.query;

  let query = 'SELECT * FROM acknowledgment_logs WHERE 1=1';
  const queryParams = [];

  if (patient_id) {
    query += ' AND user_id = ?';
    queryParams.push(patient_id);
  }

  if (start_date) {
    query += ' AND timestamp >= ?';
    queryParams.push(start_date);
  }

  if (end_date) {
    query += ' AND timestamp <= ?';
    queryParams.push(end_date);
  }

  console.log('Executing query:', query);
  console.log('With parameters:', queryParams);

  db.query(query, queryParams, (err, results) => {
    if (err) {
      console.error('Error fetching logs:', err);
      return res.status(500).send('Error on the server.');
    }
    res.status(200).send(results);
  });
};

exports.deleteAcknowledgment = (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM acknowledgment_logs WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error deleting acknowledgment:', err); // Log the error details
      return res.status(500).send('Error on the server.');
    }
    if (result.affectedRows === 0) {
      console.error('No acknowledgment found with the given ID:', id); // Log if no rows were affected
      return res.status(404).send('Acknowledgment not found.');
    }
    res.status(200).send({ message: 'Acknowledgment deleted successfully!' });
  });
};