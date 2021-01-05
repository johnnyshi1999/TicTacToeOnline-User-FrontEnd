export default function IndexPage_ErrorPopUp_ActionCreator(errorPopup_OpenState){
    return {
        type: "index/errorPopup",
        payload: errorPopup_OpenState
    }
}