const operations = require('../../mongoose/userOperations');

async function detailsOfUser(req,res){
    const user = await operations.getUserDetailsById(req.userID);
    res.json(user);
}
module.exports = detailsOfUser