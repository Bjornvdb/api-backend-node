const router = require('express').Router()
const bcrypt = require('bcrypt')
const db = require('../db')
const { registerValidation } = require('../validation')


router.post('/user/register', async (req, res) => {

  // Validatie van de gegevens
  const { error } = registerValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  try {
    // Kijken of er al een account bestaat

    /*
      @add: Account recovery if email exist - 19/09/2019
    */

    let query = 'SELECT user_email FROM public.user WHERE user_email = $1'
    const emailFound = await db.query(query, [email])
    if (emailFound.rowCount !== 0) return res.json({ message: 'Account already exists' })

    // Paswoord hashen en account aanmaken
    const passwordHashed = await bcrypt.hash(password, 12)
    query = 'INSERT INTO public.user (user_email, user_password) VALUES ($1, $2)'
    await db.query(query, [email, passwordHashed])
    return res.json({ message: 'Account created' })

  } catch (error) {
    console.log(error)
  }
})

router.post('/user/login', async (req, res) => {
  res.status(401).send({ message: 'unauthorized' })
  const { email, password } = req.body
})

module.exports = router