import {Component, Property} from '@wonderlandengine/api';

/**
 * volume-control
 */
export class VolumeControl extends Component {
    static TypeName = 'volume-control';
    /* Properties that are configurable in the editor */
    static Properties = {
        param: Property.float(1.0)
    };

    start() {
        console.log('start() with param', this.param);
    }

    update(dt) {
        /* Called every frame. */
    }
}
