require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rate = require('express-rate-limit');
const { scoreTxn } = require('./fraud/score');

const app = express();
app.use(express.json(), helmet(), cors(), rate({ windowMs: 60_000, max: 120 }));

app.post('/api/fraud/score', (req, res) => {
  const score = scoreTxn(req.body);
  const decision = score >= 60 ? 'BLOCK' : score >= 40 ? 'REVIEW' : 'ALLOW';
  res.json({ score, decision });
});

app.listen(3001, () => console.log('FraudShield running :3001'));
