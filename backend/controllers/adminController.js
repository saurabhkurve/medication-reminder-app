const db = require('../config/db');

exports.getAcknowledgmentLogs = (req, res) => {
  const { patient_id, start_date, end_date } = req.query;

  let query = 'SELECT * FROM acknowledgment_logs WHERE 1=1';
  const params = [];

  if (patient_id) {
    query += ' AND user_id = ?';
    params.push(patient_id);
  }

  if (start_date) {
    query += ' AND timestamp >= ?';
    params.push(new Date(start_date));
  }

  if (end_date) {
    query += ' AND timestamp <= ?';
    params.push(new Date(end_date));
  }

  db.query(query, params, (err, results) => {
    if (err) return res.status(500).send('Error on the server.');
    res.status(200).send(results);
  });
};