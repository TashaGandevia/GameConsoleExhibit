import {Component, Property} from '@wonderlandengine/api';
import {CursorTarget} from '@wonderlandengine/components';

/**
 * menu_button
 */
export class MenuButton extends Component {
    static TypeName = 'menu_button';
    /* Properties that are configurable in the editor */
    static Properties = {
        /** The component to trigger */
        option1: Property.object(),
        option2: Property.object(),
        
    };

    static onRegister(engine) {
        engine.registerComponent(CursorTarget);
    }

    start() {
        this.option1.getComponent('text').active = false;
        this.option2.getComponent('text').active = false;
        this.option1.getComponent('collision').active = false;
        this.option2.getComponent('collision').active = false;

        /*this.textBox = this.object.getComponent(TextGenerator);
        this.Content = this.objectS.getComponent(TextGenerator);*/
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
        // Destroy this button
        this.object.destroy(this);
        this.option1.getComponent('text').active = true;
        this.option2.getComponent('text').active = true;
        this.option1.getComponent('collision').active = true;
        this.option2.getComponent('collision').active = true;


        
    }
}
