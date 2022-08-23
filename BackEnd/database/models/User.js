module.exports = (sequelize, dataTypes) => {
    const alias = "User",//// el alias es el nombre del modelo y se crea en singular y mayuscula
        cols = {
            id: {
                type: dataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
           
            email: {
                type: dataTypes.STRING(100),
                allowNull: false
            },
            password: {
                type: dataTypes.STRING(100),
                allowNull: false
            }

        }

    let config = {
        timestamps: false,
        underscored: true // tiraba error entonces pusimos estas dos cosas en config

    }

    const User = sequelize.define(alias, cols, config)

    User.associate = function (models) {
        User.hasMany(models.Record,
            {
                as: "records",
                foreignKey: "user_id"
            })
    }

    return User;
}
