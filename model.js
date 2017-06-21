const
    Sequelize = require('sequelize'),
    config = require('./config')

var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
})

var Pet = sequelize.define('pet', {
    id: {
        type: Sequelize.STRING(50),
        primaryKey: true
    },
    name: Sequelize.STRING(100),
    gender: Sequelize.BOOLEAN,
    birth: Sequelize.STRING(10),
    createdAt: Sequelize.BIGINT,
    updatedAt: Sequelize.BIGINT,
    version: Sequelize.BIGINT,
}, {
    timestamps: false
})

var User = sequelize.define('t_user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    nickname: Sequelize.STRING(20),
    username: Sequelize.STRING(20),
    password: Sequelize.STRING(20),
    email: Sequelize.STRING(40),
    tel: Sequelize.STRING(20),
    online: Sequelize.BOOLEAN,
}, {
    timestamps: false
})

module.exports = {
    "Pet": Pet,
    "User": User
}