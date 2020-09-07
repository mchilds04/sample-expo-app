const { users } = require("/opt/users.js")

exports.handler = async (event) => {
    // TODO implement
    return {
        statusCode: 200,
        body: JSON.stringify({ users }),
    };
};
