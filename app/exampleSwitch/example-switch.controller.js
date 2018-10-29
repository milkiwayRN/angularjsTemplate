import * as ExampleActions from '../actions/example.actions';

export default class SwitchController {
    constructor($ngRedux) {
        /* ngRedux will merge the requested state's slice and actions onto this,
        you don't need to redefine them in your controller */
        console.log($ngRedux);
        this.unsubscribe = $ngRedux.connect(this.mapStateToThis, ExampleActions)(this);
    }

    // Which part of the Redux global state does our component want to receive?
    mapStateToThis(state) {
        return {
            currentElement: state.exampleSwitch.currentElement,
            elements: state.exampleSwitch.elements
        };
    }

    onNextElement = () => {
        const currentIndex = this.elements.indexOf(this.currentElement);
        this.changeCurrentElement(this.elements[(currentIndex + 1) % this.elements.length]);
    };

    $onDestroy() {
        this.unsubscribe();
    }
}