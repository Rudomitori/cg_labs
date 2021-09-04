/**
 * Сгенерировать случайное целое число из множества [min, max]
 * @param min минимальное значение
 * @param max максимальное значение
 */
export function getRandomInt(min: number, max: number): number {
    const rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

/**
 * Сгенерировать случайный целочисленный вектор
 * @param n количество измерений
 * @param min массив минимальных значений
 * @param max мвссив максимальных значений
 */
export function getRandomIntVector(n: number, min: number[], max: number[]) : number[] {
    const resultVector = new Array<number>(n);
    for (let i = 0; i < n; i++) {
        resultVector[i] = getRandomInt(min[i], max[i]);
    }
    return resultVector;
}