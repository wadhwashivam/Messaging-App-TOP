import prisma from "./prisma.js";

async function getUserByUsername(username){
    return prisma.user.findUnique({
        where: { username }
    });
}

async function getUserById(id){
    return prisma.user.findUnique({
        where: { id },
        select: { id: true, username: true, name: true, bio: true, avatar: true }
    });
}

async function createUser(username, name, hashedPassword){
    return prisma.user.create({
        data: {
            username: username,
            name: name,
            password: hashedPassword
        }
    });
}

async function getUsers(){
    return prisma.user.findMany({
        select: { id: true, username: true, name: true, bio: true, avatar: true }
    });
}

async function editUserProfile(id, updates){
    return prisma.user.update({
        where: { id },
        data: updates,
    });
}

async function deleteProfileById(id){
    return prisma.user.delete({
        where: { id }
    });
}

async function getMessages(myId, otherUserId){
    return prisma.message.findMany({
        where: {
            OR: [
                {senderId: myId, recipientId: otherUserId},
                {senderId: otherUserId, recipientId: myId},
            ]},
        orderBy: { createdAt: "asc"},
    });
}

async function createMessage(myId, otherUserId, content){
    return prisma.message.create({
        data: {senderId: myId, recipientId: otherUserId, content: content},
    });
}

export { getUserById, getUserByUsername, createUser, getUsers, editUserProfile , deleteProfileById, getMessages, createMessage };