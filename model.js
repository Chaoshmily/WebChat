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

var Base = sequelize.define('t_base', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    sex: Sequelize.BOOLEAN,
    qq: Sequelize.STRING(20),
    hobby: Sequelize.STRING(200),
    say: Sequelize.STRING(200),
    bc: Sequelize.STRING(20),
    fc: Sequelize.STRING(20),
    img: Sequelize.STRING(100),
}, {
    timestamps: false
})

var Chat = sequelize.define('t_chatlog', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    sendTime: Sequelize.BIGINT,
    content: Sequelize.STRING(1000),
    userId: Sequelize.INTEGER
}, {
    timestamps: false
})

module.exports = {
    "Pet": Pet,
    "User": User,
    "Base": Base,
    "Chat": Chat
}