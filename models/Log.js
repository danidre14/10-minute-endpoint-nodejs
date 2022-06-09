const prisma = require("./context");


const createLog = async function (id, details) {
    const log = await prisma.log.create({
        data: {
            method: details.method,
            body: details.body,
            query: details.query,
            owner: {
                connect: {
                    id
                }
            }
        }
    });
    return log;
}


const findByUserId = async function (id) {
    const user = await prisma.user.findUnique({
        where: {
            id
        },
        include: {
            logs: true
        }
    });
    
    return user.logs;
}

module.exports.createLog = createLog;
module.exports.findByUserId = findByUserId;
