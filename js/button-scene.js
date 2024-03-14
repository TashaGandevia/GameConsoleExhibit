import {Component, InputComponent, MeshComponent, Property} from '@wonderlandengine/api';
import {CursorTarget, HowlerAudioSource} from '@wonderlandengine/components';

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
 * Button component.
 *
 * Shows a 'hoverMaterial' on cursor hover, moves backward on cursor down,
 * returns to its position on cursor up, plays click/unclick sounds and haptic
 * feedback on hover.
 *
 * Use `target.onClick.add(() => {})` on the `cursor-target` component used
 * with the button to define the button's action.
 *
 * Supports interaction with `finger-cursor` component for hand tracking.
 */
export class ButtonComponent extends Component {
    static TypeName = 'button-scene';
    static Properties = {
        sceneFile: Property.string("AnotherScene.bin"),

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

    /* Called by 'cursor-target' */
    onUp = (_, cursor) => {
        this.engine.scene.load(this.sceneFile);
    }
}