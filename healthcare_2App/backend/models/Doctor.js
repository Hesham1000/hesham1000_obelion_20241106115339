const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize('healthcare_2', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql'
});

class Doctor extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "First Name is required."
          }
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Last Name is required."
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "Email is not valid."
          }
        }
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [10],
            msg: "Phone number is not valid."
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [6],
            msg: "Password must be at least 6 characters."
          }
        }
      },
      specialty: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Specialty is required."
          }
        }
      },
      licenseNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "License Number is required."
          }
        }
      }
    }, {
      sequelize,
      modelName: 'Doctor',
      tableName: 'doctors',
      timestamps: false
    });
  }
}

Doctor.init(sequelize);

module.exports = Doctor;