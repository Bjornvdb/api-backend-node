const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../db')
const { registerValidation, loginValidation } = require('../validation')


router.post('/user/register', async (req, res) => {

  console.log(req.headers["accept-language"])

  // Validatie van de gegevens
  const { error } = registerValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  try {
    // Kijken of er al een account bestaat
    let query = 'SELECT user_email FROM public.user WHERE user_email = $1'
    const emailFound = await db.query(query, [req.body.email])
    if (emailFound.rowCount !== 0) return res.status(400).send('Account already exists')

    // Paswoord hashen en account aanmaken
    const passwordHashed = await bcrypt.hash(req.body.password, 12)
    query = 'INSERT INTO public.user (user_email, user_password) VALUES ($1, $2)'
    await db.query(query, [req.body.email, passwordHashed])
    return res.json({ message: 'Account created' })

  } catch (error) {
    console.log(error)
  }
})

router.post('/user/login', async (req, res) => {

  // Validatie van de gegevens
  const { error } = loginValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  try {
    let query = 'SELECT user_id, user_email, user_password FROM public.user WHERE user_email = $1'
    const result = await db.query(query, [req.body.email])

    // Kijken of account bestaat
    if (result.rowCount === 0) return res.json({ message: 'Account bestaat niet' })

    // Kijken of wachtwoord overeenkomt
    const validPass = await bcrypt.compare(req.body.password, result.rows[0].user_password)
    if (!validPass) return res.status(400).json({ message: 'Paswoord fout' })

    // JWT token maken en meegeven

    const token = await jwt.sign({ id: result.rows[0].user_id }, process.env.TOKEN_SECRET, { algorithm: 'HS256', expiresIn: '1h' })
    res.header('auth-token', token)
    return res.status(200).send({ token })

  } catch (error) {
    console.log(error)
  }
})

module.exports = router