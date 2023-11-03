// @todo do this
export const sleep = async (ms: number, callback?: () => void) => {
    // create async function here so we can await here too
    const doSleep = async () => {
        const p = new Promise(resolve => setTimeout(resolve, ms));
        p.then(() => {
            callback?.();
        })
        return p;
    };

    // await promise
    await doSleep();
}