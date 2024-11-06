const { Model, DataTypes, Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');

// Database connection
const sequelize = new Sequelize('healthcare_2', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql',
});

class Patient extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Name is required"
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "Email is invalid"
          },
          notEmpty: {
            msg: "Email is required"
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password is required"
          },
        },
      },
    }, {
      sequelize,
      modelName: 'patients',
      tableName: 'patients',
      timestamps: false,
      hooks: {
        beforeCreate: async (patient) => {
          if (patient.password) {
            const salt = await bcrypt.genSaltSync(10);
            patient.password = bcrypt.hashSync(patient.password, salt);
          }
        },
      },
    });
  }

  static async authenticate(email, password) {
    const patient = await Patient.findOne({ where: { email } });
    if (!patient) {
      throw new Error('User not found');
    }
    const isPasswordValid = bcrypt.compareSync(password, patient.password);
    if (!isPasswordValid) {
      throw new Error('Incorrect password');
    }
    return patient;
  }
}

Patient.init(sequelize);

module.exports = Patient;