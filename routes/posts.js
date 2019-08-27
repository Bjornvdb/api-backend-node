const router = require('express').Router()
const verifyToken = require('../verifyToken')


router.post('/posts', verifyToken, async (req, res) => {
  res.send(req.user_id)
})

router.get('/posts/:id', verifyToken, async (req, res) => {
  if (req.params.id === req.user_id) console.log('match')
  res.json(req.user_id)
})




module.exports = router