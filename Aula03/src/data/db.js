const users = [];

const save = (user) => {
  users.push(user);
}

const findAll = () => {
  return users;
}

const getById = (id) => {
  const user = users.find(u => u.id == id);
  return user;
}

module.exports = {
  save, findAll, getById
}

