<template>
    <b-container class="h-100" fluid>
        <b-row class="h-100">
            <b-col class="h-100 p-3">
                <!--#region Canvas resizing -->
                <h6>Current canvas size is {{ currentCanvasWidth }}X{{ currentCanvasHeight }}px</h6>
                <b-form-group>
                    <b-input-group prepend="Height" append="px" size="sm">
                        <b-form-input type="number" v-model="newCanvasHeight" min="0" step="1"/>
                    </b-input-group>
                </b-form-group>

                <b-form-group>
                    <b-input-group prepend="Width" append="px" size="sm">
                        <b-form-input type="number" v-model="newCanvasWidth" min="0" step="1"/>
                    </b-input-group>
                </b-form-group>

                <b-form-group>
                    <b-button @click="resizeCanvas" size="sm">Resize canvas</b-button>
                </b-form-group>
                <!--#endregion Canvas resizing -->

                <!--#region Image drawing-->
                <b-form-group>
                    <b-form-file accept="image/jpeg, image/png" size="sm" v-model="imgFile"/>
                </b-form-group>
                <b-form-group>
                    <b-button @click="drawImage" size="sm">Draw image</b-button>
                </b-form-group>
                <!--#endregion-->

                <!--#region Image saving -->
                <b-form-group>
                    <b-button @click="saveImage" size="sm">Save image</b-button>
                </b-form-group>
                <!--#endregion-->

                <!--#region Colors inversion-->
                <b-form-group>
                    <b-button @click="invertColors" size="sm">Invert colors</b-button>
                </b-form-group>
                <!--#endregion-->

                <!--#region Random line drawing-->
                <b-form-group>
                    <b-button @click="drawRandomLine" size="sm">Draw random line</b-button>
                </b-form-group>
                <!--#endregion-->
            </b-col>
            <b-col cols="9" class="h-100 bg-secondary canvas-container" >
                <canvas :id="canvasId"></canvas>
            </b-col>
        </b-row>
    </b-container>
</template>

<script lang="ts">
import {Component, Vue, Watch} from "vue-property-decorator";
import {saveBlobAsFile} from "@/Utils/Files";
import {getRandomInt, getRandomIntVector} from "@/Utils/Rng";

@Component
export default class Lab0 extends Vue {
    public canvasId = "canvas";
    public get canvas() : HTMLCanvasElement {
        return document.getElementById(this.canvasId)! as HTMLCanvasElement;
    }

    //#region Image
    public imgFile: File|null = null;

    drawImage() : void {
        if(!this.imgFile) return;

        console.log('drawImage', {
            imageName: this.imgFile.name,
            size: this.imgFile.size
        })

        let image = new Image;
        image.src = URL.createObjectURL(this.imgFile);
        image.onload = () => {
            let canvas = this.canvas;
            let context = canvas.getContext('2d')!;

            this.newCanvasWidth = this.currentCanvasWidth = canvas.width = image.width;
            this.newCanvasHeight = this.currentCanvasHeight = canvas.height = image.height;
            this.newSizeChanged = false;

            context.fillStyle = "white";
            context.fillRect(0, 0, image.width, image.height);
            context.drawImage(image, 0, 0);

            URL.revokeObjectURL(image.src);
        }
    }

    saveImage() : void {
        console.log('saveImage');

        let canvas = this.canvas;
        canvas.toBlob((blob) => {
            if(!blob) return;
            saveBlobAsFile(blob, "CG result");
        });
    }
    //#endregion

    //#region Canvas resizing
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
        })

        let height = typeof this.newCanvasHeight !== "number"
            ? Number.parseInt(this.newCanvasHeight)
            : this.newCanvasHeight;
        let width = typeof this.newCanvasWidth !== "number"
            ? Number.parseInt(this.newCanvasWidth)
            : this.newCanvasWidth;

        let canvas = document.getElementById(this.canvasId)! as HTMLCanvasElement;

        this.currentCanvasHeight = canvas.height = height;
        this.currentCanvasWidth = canvas.width = width;
        this.newSizeChanged = false;

        // Закрашиваем в белый
        let context = canvas.getContext('2d')!
        context.fillStyle = "white";
        context.fillRect(0, 0, width, height);
    }
    //#endregion

    //#region Color inversion
    invertColors() : void {
        // За основу взял https://www.w3schools.com/tags/canvas_getimagedata.asp
        let canvas = this.canvas;
        let context = canvas.getContext('2d')!;
        let imageData = context.getImageData(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < imageData.data.length; i += 4) {
            // red
            imageData.data[i] = 255 - imageData.data[i];
            // green
            imageData.data[i + 1] = 255 - imageData.data[i + 1];
            // blue
            imageData.data[i + 2] = 255 - imageData.data[i + 2];
            // alpha
            imageData.data[i + 3] = 255;
        }

        context.putImageData(imageData, 0, 0);
    }
    //#endregion

    //#region Random line drawing
    drawRandomLine() : void {
        const canvas = this.canvas;
        const context = canvas.getContext('2d')!;
        const lineCount = getRandomInt(1, 10);
        let [x ,y] = getRandomIntVector(2, [0, 0], [this.currentCanvasWidth, this.currentCanvasHeight]);
        context.beginPath();
        context.moveTo(x, y);
        for (let i = 0; i < lineCount; i++) {
            [x ,y] = getRandomIntVector(2, [0, 0], [this.currentCanvasWidth, this.currentCanvasHeight]);
            context.lineTo(x, y);
        }
        context.stroke();
    }
    //#endregion

    mounted() : void {
        console.log('mounted', {
            Height: this.currentCanvasHeight,
            Width: this.currentCanvasWidth,
            this: this
        });

        let canvas = document.getElementById(this.canvasId)! as HTMLCanvasElement;
        let context = canvas.getContext('2d')!;

        canvas.height = this.currentCanvasHeight;
        canvas.width = this.currentCanvasWidth;

        let gradient = context.createRadialGradient(
            this.currentCanvasWidth / 2, this.currentCanvasHeight / 2, 5,
            this.currentCanvasWidth / 2, this.currentCanvasHeight / 2, 100);
        gradient.addColorStop(0, "red");
        gradient.addColorStop(1, "white");
        context.fillStyle = gradient;
        context.fillRect(0, 0, this.currentCanvasWidth, this.currentCanvasHeight);
    }
}
</script>

<style scoped lang="scss">
// Чтобы воспользоваться переменной $spacer
@import "node_modules/bootstrap/scss/bootstrap";

.source-image {
    max-height: 100%;
    max-width: 100%;
}

.canvas-container {
    display: flex;
    overflow: auto;
    align-items: start;
    padding: $spacer;
}
</style>