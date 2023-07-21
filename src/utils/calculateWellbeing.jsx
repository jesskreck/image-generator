export const calculateWellbeing = (attrac, mental, educ, wealth, social) => {
    const stressLevel = 20;
    const powerLevel = 80;

    let sum = 0;
    let count = 0;

    const progresses = [attrac, mental, educ, wealth, social];

    for (const value of progresses) {
        const level = parseInt(value);

        let weight = 1;
        if (level < stressLevel) {
            weight = 0.5;
        } else if (level > powerLevel) {
            weight = 2;
        }

        sum += level * weight;
        count += weight;
    }

    const wellbeing = Math.round(sum / count);
    return wellbeing;
}
