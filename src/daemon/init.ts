// Initialization routines for zcoind.

import { Zcoind } from './zcoind';

/// Start up zcoind, connect to it, and return a Zcoind instance.
async function zcoind(store: any, zcoindLocation: string, zcoindDataDir: string): Promise<Zcoind> {
    // For each component in src/lib/daemon/modules, we register the exported function handleEvent() as an event handler for
    // the event with the name of the module, and also call the exported initialize() function.
    //
    // Each module may export a function handler:
    //
    //     async handleEvent(vuexStore: VuexStore, zcoind: Zcoind, eventData: any)
    //
    // and also may export an initializer, which will be called after the block index is loaded:
    //
    //     async initialize(vuexStore: VuexStore, zcoind: Zcoind)
    //
    const eventHandlers: {[topic: string]: (zcoind: Zcoind, eventData: any) => Promise<void>} = {};
    const initializers = [];

    const daemonComponents = require.context('./modules', true, /[^\/]\.ts$/);
    for (const fileName of daemonComponents.keys()) {
        const component = daemonComponents(fileName);
        const topic = fileName.match(/([^\/]+)\.ts$/)[1];

        if (component.handleEvent) {
            eventHandlers[topic] = async (zcoind, eventData) => component.handleEvent(store, zcoind, eventData);
        }

        if (component.initialize) {
            // Things won't work properly if component.initialize isn't an AsyncFunction.
            if (component.initialize.constructor.name !== "AsyncFunction") {
                throw `invalid initializer for ${topic}: initializer must be an async function`;
            }

            initializers.push(
                async (zcoind) => await component.initialize(store, zcoind)
            );
        }
    }

    const zcoind = new Zcoind(zcoindLocation, zcoindDataDir, initializers, eventHandlers);
    await zcoind.start();

    return zcoind;
}

export default zcoind;