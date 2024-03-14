import {Component, InputComponent, Property} from '@wonderlandengine/api';
import {CursorTarget} from '@wonderlandengine/components';

/**
 * Helper function to trigger haptic feedback pulse.
 *
 * @param {Object} object An object with 'input' component attached
 * @param {number} strength Strength from 0.0 - 1.0
 * @param {number} duration Duration in milliseconds
 */
export function hapticFeedback(object, strength, duration) {
    const input = object.getComponent(InputComponent);
    if (input && input.xrInputSource) {
        const gamepad = input.xrInputSource.gamepad;
        if (gamepad && gamepad.hapticActuators)
            gamepad.hapticActuators[0].pulse(strength, duration);
    }
}

/**
 * Panel-Info
 */
export class PanelInfo extends Component {
    static TypeName = 'Panel-Info';
    /* Properties that are configurable in the editor */
    static Properties = {
        panelInfo: Property.object(),
        vrCamera: Property.object(),

    };

    static onRegister(engine) {
        engine.registerComponent(CursorTarget);
    }

    start() {
        this.target =
            this.object.getComponent(CursorTarget) ||
            this.object.addComponent(CursorTarget);
    }

    onActivate() {
        this.target.onUp.add(this.onUp);
    }

    onDeactivate() {
        this.target.onUp.remove(this.onUp);
    }

    onUp = (_, cursor) => {
        this.panelInfo.setPositionWorld(this.vrCamera.getPositionWorld());
    }
}
