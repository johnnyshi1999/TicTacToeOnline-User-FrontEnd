import IndexReducer from './Index/IndexReducer';

const initialState = {
    isAwaitingServerResponse: null,
    IndexPage: {
        isLoading: false,
        pageWideError: null,
        roomToTypePassword: null
    }
}

export default function AppReducer(state = initialState, action) {
    const tokens = action.type.split(/\/(.+)/);
    switch(tokens[0]){
        case "index":
            return { ...state,
                IndexPage: IndexReducer(state.IndexPage, {
                    ...action,
                    type: tokens[1]
                })};
        case "isAwaitingServerResponse":
            return {...state,
                isAwaitingServerResponse: action.payload
            };
        default:
            return state;
    }
}