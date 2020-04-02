const crypto = require('crypto')
const connection = require('../database/connection')

module.exports = {
  async index (req, res) {
    const ongs = await connection('ongs').select('*')

    return res.json(ongs)
  },

  async create (req, res) {
    const { name, email, whatsapp, city, uf } = req.body

    if ((name==='' || email === '' || whatsapp === '')){
      return res.status(422).json({message: 'Error'})
    }

    const id = crypto.randomBytes(4).toString('HEX')
    try{
    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    })
  } catch(err) {
    return res.json({message: err})
  }
    return res.json({ id })
  }

}
