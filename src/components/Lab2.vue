<template>
    <div class="container-fluid h-100">
        <div class="h-100 row">
            <div class="col h-100 p-3">
                <!--#region Загрузка исходного изображения -->
                <b-form-group>
                    <b-form-file accept="image/jpeg, image/png" size="sm" v-model="sourceImageFile"
                                 placeholder="Изображение для фона не выбрано"
                                 drop-placeholder="Отпустите здесь"
                                 browse-text="Выбрать"/>
                </b-form-group>
                <!--#endregion-->

                <!--#region Удаление точек, Расчёт и Сохранение изображения-->
                <b-form-group>
                    <b-button @click="saveImage" size="sm">Сохранить изображение</b-button>
                </b-form-group>
                <b-form-group>
                    <b-button @click="deletePoints"
                              :disabled="!sourcePoints.length && !resultPoints.length"
                              variant="danger" size="sm">
                        Удалить точки
                    </b-button>
                </b-form-group>
                <b-form-group>
                    <b-button @click="calculateResultImage"
                              :disabled="!sourcePoints.length || !resultPoints.length || !imageIsLoaded"
                              variant="primary" size="sm">
                        Расчитать изображение
                    </b-button>
                </b-form-group>
                <!--#endregion -->

                <!--#region Выбор типа точек-->
                <b-form-group label="Ставить точки">
                    <b-form-radio-group
                        v-model="sourceMode"
                        :options="[{text:'исходного', value: true}, {text:'итогового', value: false}]"
                        button-variant="outline-primary"
                        size="sm"
                        buttons
                    ></b-form-radio-group>
                </b-form-group>
                <!--#endregion-->

                <!--#region Списки точек-->
                <div v-if="sourcePoints.length" class="mb-3">
                    <h5 >Точки на исходном изображении</h5>
                    <div v-for="point in sourcePoints" :key="`${point.x}:${point.y}`"
                         class="input-group input-group-sm">
                        <div class="input-group-prepend">
                            <div class="input-group-text">X:</div>
                        </div>
                        <b-form-input type="number" v-model="point.x"/>
                        <b-form-input type="number" v-model="point.y"/>
                        <div class="input-group-append">
                            <div class="input-group-text">:Y</div>
                        </div>
                    </div>
                </div>

                <div v-if="resultPoints.length" class="mb-3">
                    <h5 >Точки на итоговом изображении</h5>
                    <div v-for="point in resultPoints" :key="`${point.x}:${point.y}`"
                         class="input-group input-group-sm">
                        <div class="input-group-prepend">
                            <div class="input-group-text">X:</div>
                        </div>
                        <b-form-input type="number" v-model="point.x"/>
                        <b-form-input type="number" v-model="point.y"/>
                        <div class="input-group-append">
                            <div class="input-group-text">:Y</div>
                        </div>
                    </div>
                </div>

                <!--#endregion-->
            </div>
            <b-tabs pills class="col-sm-4 col-md-5 col-lg-7 col-xl-9 full-height-tabs p-0"
                    nav-wrapper-class="bg-dark"
                    active-nav-item-class="text-dark bg-secondary border-0 mb-0"
                    nav-item-class="text-white border-0">
                <b-tab title="Исходое ихображение" title-link-class="text-white">
                    <div class="h-100 bg-secondary canvas-container">
                        <canvas :id="sourceCanvasId" @click="onSourceCanvasClicked"></canvas>
                    </div>
                </b-tab>
                <b-tab title="Итоговое" title-link-class="text-white">
                    <div class="h-100 bg-secondary canvas-container">
                        <canvas :id="resultCanvasId"></canvas>
                    </div>
                </b-tab>
            </b-tabs>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from "vue-property-decorator";
import {saveBlobAsFile} from "@/Utils/Files";
import Vector2 from "@/Utils/Vector2";
import {nameOf} from "@/Utils/Others";
import {getInverseMatrix, multiplyMatrixToMatrix} from "@/Utils/Matrix";

@Component
export default class Lab2 extends Vue {
    //#region Канвасы

    // Id должны быть уникальными,
    // иначе компонент будет работать не с тем элементом
    /** Id канваса с исходным изображением */
    readonly sourceCanvasId = "lab2-source-canvas";
    readonly resultCanvasId = "lab2-result-canvas"

    get sourceCanvas() : HTMLCanvasElement {
        return document.getElementById(this.sourceCanvasId)! as HTMLCanvasElement;
    }

    get resultCanvas() : HTMLCanvasElement {
        return document.getElementById(this.resultCanvasId)! as HTMLCanvasElement;
    }

    onSourceCanvasClicked(ev: MouseEvent) : void {
        const canvas = this.sourceCanvas;
        const domRect = canvas.getBoundingClientRect();
        const x = ev.clientX - domRect.left;
        const y = ev.clientY - domRect.top;

        if(this.sourceMode)
            this.addSourcePoint(new Vector2(x, y))
        else
            this.addResultPoint(new Vector2(x, y))
    }

    resizeCanvas(width: number, height: number) : void {
        const canvas = this.sourceCanvas
        const scaleX = width / canvas.width;
        const scaleY = height / canvas.height;

        for (const point of this.sourcePoints) {
            point.x *= scaleX;
            point.y *= scaleY;
        }

        for (const point of this.resultPoints) {
            point.x *= scaleX;
            point.y *= scaleY;
        }

        canvas.height = height;
        canvas.width = width;

        this.redraw();
    }

    //#endregion

    //#region Исходное изображение

    public sourceImageFile: File|null = null;
    public sourceImage: HTMLImageElement|null = null;
    public imageIsLoaded = false;

    @Watch(nameOf<Lab2>("sourceImageFile"))
    onSourceImageFileChanged(newFile: File|null) : void {
        // Высвобождаем object URL
        if(this.imageIsLoaded) {
            URL.revokeObjectURL(this.sourceImage!.src);
        }

        this.imageIsLoaded = false;
        this.sourceImage = null;

        if(!newFile) {
            this.redraw();
            return;
        }

        let newImage = new Image;
        this.sourceImage = newImage;
        newImage.src = URL.createObjectURL(newFile);
        newImage.onload = () => {
            // Если файл изображения сменился, пока грузилось это,
            // то надо высвободить object URL
            if(this.sourceImage !== newImage) {
                URL.revokeObjectURL(newImage.src);
                return;
            }

            this.resizeCanvas(newImage.width, newImage.height);
            this.imageIsLoaded = true;
            this.redraw()
        }
    }

    //#endregion

    //#region Итоговое изображение
    calculateResultImage():void {
        console.log("Расчёт");

        if(this.sourcePoints.length < 3 || this.resultPoints.length < 3)
            throw "Недостаточно точек";

        // https://www.school30.spb.ru/cgsg/cgc2018/CGC2018_03_CGMath.pdf
        // 17 слайд

        const G = [
            this.sourcePoints.map(v => v.x),
            this.sourcePoints.map(v => v.y),
            [1, 1, 1]
        ];
        const G1 = [
            this.resultPoints.map(v => v.x),
            this.resultPoints.map(v => v.y),
            [1, 1, 1]
        ];
        const inverseG1 = getInverseMatrix(G1)!;
        const inverseG = getInverseMatrix(G)!;
        /** Матрица преобразования координат целевого изображения
         *  в координаты исходного */
        const inverseA = multiplyMatrixToMatrix(inverseG1, G);
        /** Матрица преобразования координат исходного изображения
         *  в координаты целевого */
        const A = multiplyMatrixToMatrix(inverseG, G1);
        console.log({G, G1, inverseG, inverseG1, A, inverseA})

        const sourceCanvas = this.sourceCanvas;
        const sourceWidth = sourceCanvas.width;
        const sourceHeight = sourceCanvas.height;

        const sourceCorners = [
            [0, sourceHeight-1, 1], [sourceWidth-1, sourceHeight-1, 1],
            [0, 0, 1], [sourceWidth, 0, 1]
        ];

        const mappedSourceCorners = sourceCorners
            .map(corner => multiplyMatrixToMatrix(corner.map(c => [c]), A).map(c => c[0]))
            .map(v => v.map(Math.round));

        const resultBounds = {
            maxX: mappedSourceCorners.reduce((prev, v) => Math.max(prev, v[0]), -Infinity),
            maxY: mappedSourceCorners.reduce((prev, v) => Math.max(prev, v[1]), -Infinity),
            minX: mappedSourceCorners.reduce((prev, v) => Math.min(prev, v[0]), Infinity),
            minY: mappedSourceCorners.reduce((prev, v) => Math.min(prev, v[1]), Infinity)
        };

        const resultCanvas = this.resultCanvas;
        const resultCanvasOffset = [resultBounds.minX, resultBounds.minY];
        const resultWidth = resultBounds.maxX - resultBounds.minX;
        const resultHeight = resultBounds.maxY - resultBounds.minY;

        resultCanvas.width = resultWidth;
        resultCanvas.height = resultHeight;


        const sourceContext = sourceCanvas.getContext('2d')!;
        const sourceImageData =  sourceContext.getImageData(0, 0, sourceWidth, sourceHeight);

        const resultContext = resultCanvas.getContext('2d')!;
        const resultImageData = resultContext.getImageData(0, 0, resultWidth, resultHeight);

        for(let x = 0; x < resultWidth; x++) {
            for (let y = 0; y < resultHeight; y++) {
                const resultX = x + resultCanvasOffset[0];
                const resultY = y + resultCanvasOffset[1]
                let [sourceX, sourceY] = multiplyMatrixToMatrix([[resultX], [resultY], [1]], inverseA)
                    .map(v => v[0]);
                sourceX = Math.round(sourceX);
                sourceY = Math.round(sourceY);

                if (sourceX < 0 || sourceX >= sourceWidth
                    || sourceY < 0 || sourceY >= sourceHeight) {
                    continue;
                }

                const resultI = y * (resultWidth * 4) + x * 4;
                const sourceI = sourceY * (sourceWidth * 4) + sourceX * 4;

                resultImageData.data[resultI] = sourceImageData.data[sourceI];
                resultImageData.data[resultI+1] = sourceImageData.data[sourceI+1];
                resultImageData.data[resultI+2] = sourceImageData.data[sourceI+2];
                resultImageData.data[resultI+3] = sourceImageData.data[sourceI+3];
            }
        }

        resultContext.putImageData(resultImageData, 0, 0);
    }

    //#endregion

    //#region Рисование

    redraw(): void {
        this.drawSourceImage();

        this.drawPoints();
    }

    drawSourceImage() : void {
        const canvas = this.sourceCanvas;
        const context = canvas.getContext('2d')!;

        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);

        if(this.imageIsLoaded) context.drawImage(
            this.sourceImage!,
            0, 0, this.sourceImage!.width, this.sourceImage!.height,
            0, 0, canvas.width, canvas.height
        );
    }

    drawPoint(point: Vector2, canvas: HTMLCanvasElement,
              options?: {color?: string, radius? :number}
    ) : void {
        const radius = options?.radius || 5;
        const color = options?.color || 'red';
        const context = canvas.getContext('2d')!;

        context.strokeStyle = color;
        context.beginPath();
        context.arc(point.x, point.y, radius, 0, Math.PI*2, false);
        context.closePath();
        context.stroke();
    }

    drawPoints(): void {
        for (const point of this.sourcePoints) {
            this.drawPoint(point, this.sourceCanvas);
        }
        for (const point of this.resultPoints) {
            this.drawPoint(point, this.sourceCanvas, {color: 'blue'});
        }
    }

    //#endregion

    //#region Точки

    sourcePoints: Vector2[] = [];
    resultPoints: Vector2[] = [];
    sourceMode = true;

    addSourcePoint(point: Vector2): void {
        if(this.sourcePoints.length >= 3) this.sourcePoints.shift();
        this.sourcePoints.push(point);
    }

    addResultPoint(point: Vector2): void {
        if(this.resultPoints.length >= 3) this.resultPoints.shift();
        this.resultPoints.push(point);
    }

    deletePoints(): void {
        this.sourcePoints = [];
        this.resultPoints = [];
        this.redraw();
    }

    @Watch(nameOf<Lab2>("resultPoints"), {deep: true})
    @Watch(nameOf<Lab2>("sourcePoints"), {deep: true})
    onSourcePointsChanged(): void {
        console.log("На изменении массива точек")
        this.redraw()
    }

    //#endregion

    //#region Сохранение изображения
    saveImage() : void {
        let canvas = this.resultCanvas;
        canvas.toBlob((blob) => {
            if(!blob) return;
            saveBlobAsFile(blob, "CG result");
        });
    }
    //#endregion

    mounted() : void {
        const canvas = this.sourceCanvas;
        canvas.height = 512;
        canvas.width = 512;

        this.redraw();
    }
}
</script>

<style lang="scss">
// Чтобы воспользоваться переменной $spacer
@import "../index";

.canvas-container {
    display: flex;
    overflow: auto;
    align-items: start;
    padding: $spacer;
}
</style>