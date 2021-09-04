/**
 * Сохранить файл в файловую систему
 * @param blob объект, который будет сохранён
 * @param name имя файла, под которым будет предложено сохранить файл
 */
export function saveBlobAsFile(blob: Blob, name: string) : void {
    const link = document.createElement('a');
    link.download = name;

    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
}