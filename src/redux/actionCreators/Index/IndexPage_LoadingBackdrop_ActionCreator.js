export default function IndexPage_LoadingBackdrop_ActionCreator(loadingState){
    return {
        type: "index/pageloading",
        payload: loadingState
    }
}