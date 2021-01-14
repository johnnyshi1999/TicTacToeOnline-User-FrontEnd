export default function Global_IsAwaitingServerResponse_ActionCreator(awaitServerState){
    return {
        type: "isAwaitingServerResponse",
        payload: awaitServerState
    }
}