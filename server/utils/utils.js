const getLoggedInUserId = (req) => req?.loggedInUserId;
const setLoggedInUserId = (req, userId) => {
    req.loggedInUserId = userId;
}

module.exports = {
    getLoggedInUserId,
    setLoggedInUserId
};