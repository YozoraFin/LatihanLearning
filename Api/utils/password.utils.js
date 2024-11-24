import bcrypt from 'bcryptjs'

const hashPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

const comparePassword = (password, hash) => {
    return bcrypt.compareSync(password, hash)
}

export default {hashPassword,comparePassword}