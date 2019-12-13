import { useState } from "react";

/**
 * Function to encapsulate our saving procedures.
 *
 * @param setter Setter hook
 * @param key Key that we are to save to session storage to
 * @param transforms Object that transforms our given value, or values within our given value (if it itself is an object )
 */
const updateSessionStorageFromUpdateState = ( setter : ( value : any ) => void, serializer: ( value : any ) => string, key : string ) =>
    ( value: any ) => {
        window.sessionStorage.setItem(key, serializer(value));
        // This actually causes us to update our state
        return setter(value);
    }


/**
 * Extremely quick implementation of a hook that uses session storage to handle state somewhat
 * like it would regularly be handled.
 *
 * Not too friendly because requires serializer and unserializer functions.
 * Could abstract that away through defaults or currying at some point.
 * @param initial Initial value if there is no session state
 * @param key Key to store our session state at for this specific state
 * @param unserializer Function that takes content from Storage and converts it into object to use in application
 * @param serializer Function that takes domain object and converts it into an object acceptable for putting through JSON.stringify
 */

export const useStateFromSessionStorage = ( initial: any, key : string, unserializer : ( value : any ) => any, serializer : ( value : any ) => string ) => {
    let serialized: (string | null) = null;
    let unserialized: any = initial;

    if ( window.sessionStorage.getItem(key) )
    {
        serialized = window.sessionStorage.getItem(key);
    }

    if ( serialized )
    {
        unserialized = unserializer( serialized );
    }

    const [ state, updateState ] = useState(unserialized);

    return [state, updateSessionStorageFromUpdateState(updateState, serializer, key ) ]
}