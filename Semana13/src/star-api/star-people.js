const { default: axios } = require("axios")

const getPersona = async (id) => {
    const url = `https://swapi.dev/api/people/${id}`
    const response = await axios.get(url);
    return response.data.name;
}

module.exports = { getPersona }