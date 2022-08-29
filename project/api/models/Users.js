const Sequelize = require("sequelize");
const db = require("../config/db");
const bcrypt = require("bcrypt");
class Users extends Sequelize.Model {
  hash(password, salt) {
    return bcrypt.hash(password, salt);
  }
  validatePassword(password) {
    return this.hash(password, this.salt).then(
      (newHash) => newHash === this.password
    );
  }
}
Users.init(
  {
    name: { type: Sequelize.STRING, allowNull: false },
    email: { type: Sequelize.STRING, allowNull: false },
    password: { type: Sequelize.STRING, allowNull: false },
    avatar: { type: Sequelize.STRING },
    salt: { type: Sequelize.STRING },
    isAdmin: { type: Sequelize.BOOLEAN, defaultValue: false },
  },
  { sequelize: db, modelName: "users" }
);
Users.beforeCreate((user) => {
  const salt = bcrypt.genSaltSync();
  user.salt = salt;
  return user.hash(user.password, salt).then((hash) => {
    user.password = hash;
  });
});
module.exports = Users;
