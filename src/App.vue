<template>
    <div id="app" class="vh-100">
        <b-tabs pills card class="full-height-tabs" nav-wrapper-class="bg-dark">

            <b-tab title="Лаб 0" active class="p-0" title-link-class="text-white">
                <lab0/>
            </b-tab>

            <b-tab title="Лаб 1" class="p-0" title-link-class="text-white">
                <lab1/>
            </b-tab>

            <b-tab title="Лаб 2" class="p-0" title-link-class="text-white">
                <lab2/>
            </b-tab>

        </b-tabs>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Lab0 from "@/components/Lab0.vue";
import Lab1 from "@/components/Lab1.vue";
import Lab2 from "@/components/Lab2.vue";

@Component({
    components: {
        Lab2,
        Lab1,
        Lab0
    }
})
export default class App extends Vue {}
</script>
