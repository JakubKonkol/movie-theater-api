export const getRoomById = (id) => {
    return roomsSampleData.find(room => room.id === id);
}
export const getRooms = () => {
    return roomsSampleData;
}
export const createRoom = (room) => {
    return {
        status: "success",
        message: "Room created successfully",
    }
}
export const updateRoom = (id, room) => {
    return {
        status: "success",
        message: "Room updated successfully",
    }
}
export const patchRoom = (id, room) => {
    return {
        status: "success",
        message: "Room patched successfully",
    }
}
export const deleteRoom = (id) => {
    return {
        status: "success",
        message: "Room deleted successfully",
    }
}