// http://mathhelpplanet.com/static.php?p=javascript-operatsii-nad-matritsami

/** Умножить матрицу на число */
export function multiplyMatrixToNumber(M: number[][], a: number): number[][] {
    return M.map(v => v.map(x => a * x));
}
/** Перемножить матрицы */
export function multiplyMatrixToMatrix(A: number[][], B: number[][]): number[][] {
    const rowsA = B.length;
    const colsA = B[0].length;
    const rowsB = A.length;
    const colsB = A[0].length;
    if (colsA != rowsB) throw "Невозможно перемножить матрицы";

    const C = [] as number[][];
    for (let i = 0; i < rowsA; i++) C[i] = [];

    for (let k = 0; k < colsB; k++) {
        for (let i = 0; i < rowsA; i++) {
            let t = 0;
            for (let j = 0; j < rowsB; j++)
                t += B[i][j] * A[j][k];
            C[i][k] = t;
        }
    }
    return C;
}

/** Возвести матрицу в целочисленную положительную степень */
export function powMatrix(M: number[][], n: number): number[][] {
    return n != 1
        ? multiplyMatrixToMatrix(powMatrix(M, n - 1), M)
        : M;
}

/** Получить присоединённую матрицу */
export function getAdjugateMatrix(M: number[][]): number[][] {
    const N = M.length;
    const adjA = [] as number[][];
    for (let i = 0; i < N; i++) {
        adjA[i] = [];
        for (let j = 0; j < N; j++) {
            const B = [] as number[][];
            const sign = ((i + j) % 2 == 0) ? 1 : -1;
            for (let m = 0; m < j; m++) {
                B[m] = [];
                for (let n = 0; n < i; n++) B[m][n] = M[m][n];
                for (let n = i + 1; n < N; n++) B[m][n - 1] = M[m][n];
            }
            for (let m = j + 1; m < N; m++) {
                B[m - 1] = [];
                for (let n = 0; n < i; n++) B[m - 1][n] = M[m][n];
                for (let n = i + 1; n < N; n++) B[m - 1][n - 1] = M[m][n];
            }
            adjA[i][j] = sign * getDeterminant(B);
        }
    }
    return adjA;
}

/** Получить детерминант.
 *
 * Используется алгоритм Барейса, сложность O(n^3)
 * */
export function getDeterminant(A:number[][]): number {
    const N = A.length;
    const B = [] as number[][];
    let denom = 1;
    let exchanges = 0;
    for (let i = 0; i < N; ++i) {
        B[i] = [];
        for (let j = 0; j < N; ++j) B[i][j] = A[i][j];
    }
    for (let i = 0; i < N - 1; ++i) {
        let maxN = i, maxValue = Math.abs(B[i][i]);
        for (let j = i + 1; j < N; ++j) {
            const value = Math.abs(B[j][i]);
            if (value > maxValue) {
                maxN = j;
                maxValue = value;
            }
        }
        if (maxN > i) {
            const temp = B[i];
            B[i] = B[maxN];
            B[maxN] = temp;
            ++exchanges;
        } else {
            if (maxValue == 0) return maxValue;
        }
        const value1 = B[i][i];
        for (let j = i + 1; j < N; ++j) {
            const value2 = B[j][i];
            B[j][i] = 0;
            for (let k = i + 1; k < N; ++k) B[j][k] = (B[j][k] * value1 - B[i][k] * value2) / denom;
        }
        denom = value1;
    }
    if (exchanges % 2) return -B[N - 1][N - 1];
    else return B[N - 1][N - 1];
}

/** Получить обратную матрицу
 * @return {number[][]|null} Найденная обратная матрица или null, если детерминант == 0
 */
export function getInverseMatrix(M: number[][]): number[][]|null {
    const det = getDeterminant(M);
    if (det == 0) return null;
    const N = M.length;
    M = getAdjugateMatrix(M);
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) M[i][j] /= det;
    }
    return M;
}