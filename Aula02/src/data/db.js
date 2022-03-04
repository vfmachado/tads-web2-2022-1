const users = [];

const save = (user) => {
  users.push(user);
}

const findAll = () => {
  return users;
}

module.exports = {
  save, findAll
}

