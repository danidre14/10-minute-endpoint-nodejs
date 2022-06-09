const prisma = require("../models/context");

const createUser = async function () {
    const user = await prisma.user.create({
        data: {
            expiresAt: addMinutes(new Date(), 10)
        }
    });

    return user;
}

const findById = async function (id) {
    const user = await prisma.user.findUnique({
        where: {
            id
        }
    });
    return user;
}
const addMinutes = function (date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
}

module.exports.createUser = createUser;
module.exports.findById = findById;
