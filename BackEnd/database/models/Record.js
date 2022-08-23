module.exports = (sequelize, dataTypes) => {
    const alias = "Record",//// el alias es el nombre del modelo y se crea en singular y mayuscula
        cols = {
            id: {
                type: dataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            created_at: {
                field: "created_at",// tiraba error entonces le pusimos el campo field
                type: dataTypes.DATE,
                allowNull: true
            },
            updated_at: {
                field: "updated_at",
                type: dataTypes.DATE,
                allowNull: true,
            },
            concept: {
                type: dataTypes.STRING(100),
                allowNull: false
            },
            tipe: {
                type: dataTypes.STRING(45),
                allowNull: false,

            },
            amount: {
                type: dataTypes.DECIMAL(10,1),
                allowNull: false,
                
            },
            category_id: {
                type: dataTypes.INTEGER,
                allowNull: false,
            },
            user_id: {
                type: dataTypes.INTEGER,
                allowNull: true,
            }

            
          
        }
    let config = {
        timestamps: false,
        underscored: true // tiraba error entonces pusimos estas dos cosas en config

    }

    const Record = sequelize.define(alias, cols, config)

    Record.associate = function (models) {
        Record.belongsTo(models.Category,{
                as: "categories",
                foreignKey: "category_id"
            });
            Record.belongsTo(models.User,{
                as: "users",
                foreignKey: "user_id"
            });

    }
    

    return Record;
}