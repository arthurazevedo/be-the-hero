const crypto = require('crypto')
const connection = require('../database/connection')

module.exports = {
  async index (req, res) {
    const ongs = await connection('ongs').select('*')

    return res.json(ongs)
  },
  async create (req, res) {
    const { name, email, whatsapp, city, uf } = req.body

    const ong = await connection('ongs').where('email', email). select('email')
    console.log(ong)

    if ((ong.length > 0) || (name==='' || email === '' || whatsapp === '')){
      return res.status(422).json({message: 'Error'})
    }

    const id = crypto.randomBytes(4).toString('HEX')

    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    })
    return res.json({ id })
  }

}
