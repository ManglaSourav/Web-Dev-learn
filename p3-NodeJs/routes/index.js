var express = require('express');
var router = express.Router();
const Trade = require('../models/trades');

let lastId = 0;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('<p>HTML Data</p>');
});

router.post('/trades', async (req, res) => {
  const trade = await Trade.create({
      ...req.body,
      id: ++lastId
  });
  res.status(201).send(trade);
});

router.get('/trades', async (req, res) => {
  const where = {};
  if (req.query.user_id) where.user_id = req.query.user_id;
  if (req.query.type) where.type = req.query.type;
  const trades = await Trade.findAll({
      where,
      order: [['id', 'ASC']]
  });
  res.send(trades);
});

router.get('/trades/:id', async (req, res) => {
  const trade = await Trade.findOne({
      where: { id: req.params.id }
  });
  if (!trade) return res.status(404).send('ID not found');
  res.send(trade);
});

router.all('/trades/:id', (req, res) => {
  res.status(405).end();
});

module.exports = router;
