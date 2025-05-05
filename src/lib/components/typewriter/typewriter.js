// /**
//  *
//  * @param {Element} e
//  * @param {number} time
//  */
// export async function typewriterString(e, time) {
//     /**
//      * @type {string | undefined}
//      */
//     let str = undefined;

//     let i = 0;

//     /**@param {Element} _e*/
//     async function _type(_e) {
//         if (!str) str = _e.innerHTML;
//         if (i < str.length) {
//             _e.innerHTML = str.slice(0, i++) + "_";
//             await new Promise((fulfil) => {
//                 setTimeout(fulfil, time);
//             });
//             await _type(e);
//         } else {
//             e.innerHTML = str;
//         }
//     }
//     await _type(e);
// }

/**
 *
 * @param {Element} e
 * @param {number} time
 *
 * @returns {{start: () => Promise<void>}}
 */
export function typewriterString(e, time) {
    return typewriter(
        e,
        time,
        (e) => e.innerHTML,
        (_, __, arr, i) => {
            if (typeof arr != "string")
                throw TypeError(`not a string, got ${arr}`);
            return arr.slice(0, i++) + "_";
        },
        (_, arr) => arr
    );
}

/**
 * @template {{length: number}} T
 * @param {Element} e
 * @param {number} time
 * @param {(e: Element) => T} init
 * @param {(e: Element, innerHTML:string, arr: T, i: number) => string} process
 * @param {(e: Element, arr: T) => string} finish
 *
 * @returns {{start: () => Promise<void>}}
 */
export function typewriter(e, time, init, process, finish) {
    /**
     * @type {T | undefined}
     */
    let arr = undefined;

    let i = 0;

    /**@param {Element} _e*/
    async function _type(_e) {
        if (arr == undefined) {
            arr = init(_e);
            _e.innerHTML = "";
        }
        if (i < arr.length) {
            _e.innerHTML = process(e, _e.innerHTML, arr, i);
            i++;
            await new Promise((fulfil) => {
                setTimeout(fulfil, time);
            });
            await _type(e);
        } else {
            _e.innerHTML = finish(e, arr);
        }
    }
    return { start: () => _type(e) };
}

// export async function typewriterCustom(e, time, init, process, finish) {
//     /**
//      * @type {{length: number} | undefined}
//      */
//     let arr = undefined;

//     let i = 0;

//     /**@param {Element} _e*/
//     async function _type(_e) {
//         if (!arr) arr = init(_e);
//         if (i <= arr.length) {
//             _e.innerHTML = process(e, arr, i);
//             i++;
//             await new Promise((fulfil) => {
//                 setTimeout(fulfil, time);
//             });
//             await _type(e);
//         } else {
//             _e.innerHTML = finish(e, arr);
//         }
//     }
//     await _type(e);
// }
