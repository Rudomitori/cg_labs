<template>
    <div id="app" class="vh-100">
        <b-tabs pills card class="full-height-tabs" nav-wrapper-class="bg-dark rounded-0">

            <b-tab title="Lab 0" active class="p-0" title-link-class="text-white">
                <lab0/>
            </b-tab>

            <b-tab title="Lab 1" title-link-class="text-white">
                <b-card-text>Содержимое первой лабы</b-card-text>
            </b-tab>

        </b-tabs>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Lab0 from "@/components/Lab0.vue";

@Component({
    components: {
        Lab0
    }
})
export default class App extends Vue {
}
</script>

<style lang="scss">

</style>
