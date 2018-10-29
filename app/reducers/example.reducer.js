import { NEXT_ELEMENT } from '../constants/switchExample.constants';

const initialState = {
    elements: [
        'button',
        'dropdown',
        'input',
    ],
    currentElement: 'button',
}

export function switchExampleReducer(state = initialState, action) {
    switch(action.type) {
        case NEXT_ELEMENT:
            return {
                ...state,
                currentElement: action.payload,
            };
        default:
            return state;
    }
}