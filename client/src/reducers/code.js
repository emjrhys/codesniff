import { ADD_CODE } from '../constants/ActionTypes'

const initialState = [
    {
        id: 0,
        code: 'cout << "Hello World" << endl;'
    }
];

export default function codes(state = initialState, action) {
    switch (action.type) {
        case ADD_CODE:
            return [
                {
                    id: state.reduce((madId, code) => Math.max(code.id, maxId), -1) + 1,
                    code: action.text
                },
                ...state
            ]
        default:
            return initialState
    }
}
