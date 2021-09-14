<template>
    <b-container class="h-100" fluid="">
        <b-row class="h-100">
            <b-col class="h-100 p-3">
                <!--#region Изменение размера -->
                <b-form-group>
                    <b-input-group prepend="(x, y):" size="sm" >
                        <b-form-input type="number" @keypress.enter="resizeCanvas" v-model="newCanvasHeight" min="5" step="1"/>
                        <b-form-input type="number" @keypress.enter="resizeCanvas" v-model="newCanvasWidth" min="5" step="1"/>
                        <b-input-group-append>
                            <b-input-group-text>px</b-input-group-text>
                            <b-button @click="resizeCanvas" :variant="newSizeChanged ? 'primary' : 'secondary'">Обновить</b-button>
                        </b-input-group-append>
                    </b-input-group>
                </b-form-group>
                <!--#endregion -->

                <!--#region Фоновое изображение -->
                <b-form-group>
                    <b-form-file accept="image/jpeg, image/png" size="sm" v-model="backgroundImageFile"
                                 placeholder="Изображение для фона не выбрано"
                                 drop-placeholder="Отпустите здесь"
                                 browse-text="Выбрать"/>
                </b-form-group>
                <!--#endregion-->

                <!--#region Удаление точек-->
                <b-form-group>
                    <b-button @click="deletePoints" :disabled="!points.length"
                              variant="danger" size="sm">
                        Удалить точки
                    </b-button>
                </b-form-group>
                <!--#endregion -->

                <!--#region Тестовые точки-->
                <b-form-group>
                    <b-checkbox v-model="drawDebugPoints">Отрисовывать отладочные точки</b-checkbox>
                </b-form-group>
                <!--#endregion -->

                <!--#region Сохранение изображения -->
                <b-form-group>
                    <b-button @click="saveImage" size="sm">Сохранить изображение</b-button>
                </b-form-group>
                <!--#endregion-->
            </b-col>
            <b-col cols="9" class="h-100 bg-secondary canvas-container" >
                <canvas :id="canvasId" @click="addPoint"></canvas>
            </b-col>
        </b-row>
    </b-container>
</template>

<script lang="ts">
import {Component, Vue, Watch} from "vue-property-decorator";
import {saveBlobAsFile} from "@/Utils/Files";
import Vector2 from "@/Utils/Vector2";

@Component
export default class Lab1 extends Vue {
    /** Id канваса. Должно быть уникальным,
     *  иначе компонент будет работать не с тем элементом */
    public readonly canvasId = "lab1-canvas";
    public get canvas() : HTMLCanvasElement {
        return document.getElementById(this.canvasId)! as HTMLCanvasElement;
    }

    //#region Фон
    public backgroundImageFile: File|null = null;
    public backgroundImage: HTMLImageElement|null = null;
    public imageIsLoaded = false;

    @Watch("backgroundImageFile")
    onBackgroundImageFileChanged(newFile: File|null) : void {
        console.log('BackgroundImageChanged', {
            Name: newFile?.name,
            Size: newFile?.size
        });

        // Высвобождаем object URL
        if(this.imageIsLoaded) {
            URL.revokeObjectURL(this.backgroundImage!.src);
        }

        this.imageIsLoaded = false;
        this.backgroundImage = null;

        if(!newFile) {
            this.redraw();
            return;
        }

        let newImage = new Image;
        this.backgroundImage = newImage;
        newImage.src = URL.createObjectURL(newFile);
        newImage.onload = () => {
            console.log('image loaded', {
                name: newFile!.name
            })
            // Если файл изображения сменился, пока грузилось это,
            // то надо высвободить object URL
            if(this.backgroundImage !== newImage) {
                URL.revokeObjectURL(newImage.src);
                return;
            }

            this.imageIsLoaded = true;
            this.redraw()
        }
    }
    //#endregion

    //#region Рисование
    redraw(): void {
        this.drawBackground();

        for (const point of this.points) {
            this.drawPoint(point);
        }

        this.drawSpline();
    }

    drawBackground() : void {
        console.log('Draw background');

        const canvas = this.canvas;
        const context = canvas.getContext('2d')!;

        context.fillStyle = "white";
        context.fillRect(0, 0, this.currentCanvasWidth, this.currentCanvasHeight);

        if(this.imageIsLoaded) context.drawImage(
            this.backgroundImage!,
            0, 0, this.backgroundImage!.width, this.backgroundImage!.height,
            0, 0, canvas.width, canvas.height
        );
    }

    drawPoint(point: Vector2, color?: string|null) : void {
        const radius = 5;
        color = color || 'red';

        const context = this.canvas.getContext('2d')!;
        context.strokeStyle = color;

        context.beginPath();
        context.arc(point.x, point.y, radius, 0, Math.PI*2, false);
        context.closePath();
        context.stroke();
    }

    drawSpline(): void {
        if(this.points.length < 2) return;
        const anchorPoints = this.calculateAnchorPoints();

        const context2D = this.canvas.getContext('2d')!;
        context2D.strokeStyle = 'black';
        context2D.beginPath();
        context2D.moveTo(this.points[0].x, this.points[0].y);
        for (let i = 0; i < anchorPoints.length; i++) {
            context2D.bezierCurveTo(
                anchorPoints[i][0].x, anchorPoints[i][0].y,
                anchorPoints[i][1].x, anchorPoints[i][1].y,
                this.points[i+1].x, this.points[i+1].y
            );
        }
        context2D.stroke();
    }
    //#endregion

    //#region Точки сплайна
    /** Точки, через которые должен проходит сплайн */
    public points: Vector2[] = [];
    public drawDebugPoints = false;

    @Watch('drawDebugPoints')
    onDrawDebugPointsChanged() : void {
        this.redraw();
    }

    addPoint(ev: MouseEvent) : void {
        const canvas = this.canvas;
        const domRect = canvas.getBoundingClientRect();
        const x = ev.clientX - domRect.left;
        const y = ev.clientY - domRect.top;

        const point = new Vector2(x, y);
        this.points.push(point);
        console.log('point was added', {x, y});

        this.redraw()
    }

    deletePoints(): void {
        this.points = [];
        this.redraw();
    }

    /** Расчитать опорные точки для построения сплайна */
    calculateAnchorPoints() : [Vector2, Vector2][] {
        if(this.points.length < 2) return [];
        let anchorPoints = new Array<[Vector2, Vector2]>(this.points.length - 1);

        let lastCenterA = this.points[1].copy
            .add(this.points[0])
            .divide(2);
        let lastLength = this.points[1].copy
            .subtract(this.points[0])
            .length;
        anchorPoints[0] = [
            this.points[0].copy,
            this.points[1].copy
        ];
        if(this.drawDebugPoints) this.drawPoint(lastCenterA, "black");
        for (let i = 2; i < this.points.length; i++) {
            const centerA = this.points[i].copy
                .add(this.points[i - 1])
                .divide(2);

            if(this.drawDebugPoints) this.drawPoint(centerA, "black");
            const length = this.points[i].copy
                .subtract(this.points[i-1])
                .length;

            const bv = centerA.copy
                .subtract(lastCenterA)
                .multiply(lastLength/(length+lastLength));

            if(this.drawDebugPoints) this.drawPoint(lastCenterA.copy.add(bv), "yellow");
            anchorPoints[i-2][1].subtract(bv);
            anchorPoints[i-1] = [
                anchorPoints[i-2][1].copy
                    .add(centerA)
                    .subtract(lastCenterA),
                this.points[i].copy
            ];
            lastCenterA = centerA;
            lastLength = length;
        }
        if(this.drawDebugPoints)
            for (const anchorPoint of anchorPoints) {
                this.drawPoint(anchorPoint[0], "blue");
                this.drawPoint(anchorPoint[1], "green");
            }

        return anchorPoints;

        /** Центры A отрезков между точками */
        // const centers:Vector2[] = [];
        // for (let i = 1; i < this.points.length; i++) {
        //     const center = this.points[i].copy
        //         .add(this.points[i - 1])
        //         .divide(2);
        //     centers.push(center);
        // }
        //
        // const P: [Vector2, Vector2][] = [];
        // for (let i = 2; i < this.points.length; i++) {
        //     const l1 = this.points[i-1].copy
        //         .subtract(this.points[i-2])
        //         .length;
        //     const l2 = this.points[i].copy
        //         .subtract(this.points[i-1])
        //         .length;
        //     const b = centers[i-1].copy
        //         .subtract(centers[i-2])
        //         .multiply(l1/l2/2)
        //         .add(centers[i-2]);
        //     const v = this.points[i-1].copy
        //         .subtract(b);
        //     const p = [
        //         centers[i-2].copy.add(v),
        //         centers[i-1].copy.add(v)
        //     ];
        //     P.push(p);
        //}
    }
    //#endregion

    //#region Сохранение изображения
    saveImage() : void {
        console.log('saveImage');

        let canvas = this.canvas;
        canvas.toBlob((blob) => {
            if(!blob) return;
            saveBlobAsFile(blob, "CG result");
        });
    }
    //#endregion

    //#region Изменение размера
    public currentCanvasWidth = 500;
    public currentCanvasHeight = 500;

    public newCanvasWidth: string|number = 500;
    public newCanvasHeight: string|number = 500;
    public newSizeChanged = false;

    @Watch('newCanvasHeight')
    onNewCanvasWidthChanged() : void {
        this.newSizeChanged = true;
    }

    @Watch('newCanvasWidth')
    onNewCanvasHeightChanged() : void {
        this.newSizeChanged = true;
    }

    resizeCanvas() : void {
        console.log('resizeCanvas', {
            Height: this.newCanvasHeight,
            Width: this.newCanvasWidth
        });

        const newCanvasHeight = typeof this.newCanvasHeight !== "number"
            ? Number.parseFloat(this.newCanvasHeight)
            : this.newCanvasHeight;
        const newCanvasWidth = typeof this.newCanvasWidth !== "number"
            ? Number.parseFloat(this.newCanvasWidth)
            : this.newCanvasWidth;

        const scaleX = newCanvasWidth / this.currentCanvasWidth;
        const scaleY = newCanvasHeight / this.currentCanvasHeight;
        for (const point of this.points) {
            point.x *= scaleX;
            point.y *= scaleY;
        }

        const canvas = this.canvas;

        this.currentCanvasHeight = canvas.height = newCanvasHeight;
        this.currentCanvasWidth = canvas.width = newCanvasWidth;
        this.newSizeChanged = false;

        this.redraw();
    }
    //#endregion

    mounted() : void {
        console.log('mounted', {
            Height: this.currentCanvasHeight,
            Width: this.currentCanvasWidth,
            this: this
        });

        const canvas = this.canvas;
        canvas.height = this.currentCanvasHeight;
        canvas.width = this.currentCanvasWidth;

        this.redraw();
    }
}
</script>

<style scoped lang="scss">
// Чтобы воспользоваться переменной $spacer
@import "node_modules/bootstrap/scss/bootstrap";

.canvas-container {
    display: flex;
    overflow: auto;
    align-items: start;
    padding: $spacer;
}
</style>