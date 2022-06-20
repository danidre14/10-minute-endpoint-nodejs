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

    return !isExpired(user) ? user : null;
}

const isExpired = function (user) {
    try {
        return Date.now() > user.expiresAt.getTime();
    } catch {
        return true;
    }
}

const deleteExpiredUsers = async function () {
    try {
        const { count = 0 } = await prisma.user.deleteMany({
            where: {
                expiresAt: {
                    lte: new Date()
                }
            }
        });

        return count;
    } catch {
        console.log("Error deleting expired users");
        return 0;
    }
}

const addMinutes = function (date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
}

module.exports.createUser = createUser;
module.exports.findById = findById;
module.exports.deleteExpiredUsers = deleteExpiredUsers;
// module.exports.isExpired = isExpired;
