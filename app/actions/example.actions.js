import { NEXT_ELEMENT } from '../constants/switchExample.constants';

export function changeCurrentElement(newCurrentElement) {
    return {
        type: NEXT_ELEMENT,
        payload: newCurrentElement,
    }
}