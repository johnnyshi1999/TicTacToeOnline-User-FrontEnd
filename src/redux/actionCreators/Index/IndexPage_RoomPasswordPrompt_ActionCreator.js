export default function IndexPage_RoomPasswordPrompt_ActionCreator(room){
    return {
        type: "index/passwordPrompt",
        payload: room
    }
}