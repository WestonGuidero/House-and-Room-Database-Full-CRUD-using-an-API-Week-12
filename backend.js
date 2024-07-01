require('dotenv').config();

const PORT = 8001;
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

const API_URL = process.env.API_URL;

app.get('/houses', async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching houses:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.post('/houses', async (req, res) => {
  try {
    const response = await axios.post(`${API_URL}`, req.body);
    res.json(response.data);
  } catch (error) {
    console.error('Error creating house:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.put('/houses/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.put(`${API_URL}/${id}`, req.body);
    res.json(response.data);
  } catch (error) {
    console.error('Error updating house:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.delete('/houses/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error deleting house:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});
