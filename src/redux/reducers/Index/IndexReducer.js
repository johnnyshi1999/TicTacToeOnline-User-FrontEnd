export default function IndexReducer(state, action) {
    const tokens = action.type.split(/\/(.+)/);
    switch(tokens[0]){
        case "pageloading":
            return {...state, 
                isLoading: action.payload,
            };
        case "errorPopup":
            return {...state,
                pageWideError: action.payload
            }
    }
    return state;
}