export function calcToBeCollected(action, unhealedTraumas) {
    let count = 1;

    if (unhealedTraumas.includes(action.category) && action.healing) {
        count += 1;
    };

    count += Object.values(action.progress).filter((value) => value !== 0).length;
    return count;
}