<template>
    <div class="framed-input" :class="{'has-unit': unit}">
        <label>{{ label }}</label>
        <div class="frame" ref="frame">
            <slot />
            <div v-if="unit" class="unit">{{ unit }}</div>
            <div v-else-if="copy" class="copy" @click="copyContent">📋</div>
        </div>
    </div>
</template>

<script>
import {clipboard} from "electron";

export default {
    name: "InputFrame",
    props: ['label', 'unit', 'copy'],

    methods: {
        copyContent() {
            clipboard.writeText(this.$refs.frame.querySelector('input').value);
        }
    }
}
</script>

<style lang="scss">
.framed-input {
    position: relative;
    height: 50px;
    background-color: inherit;

    label {
        position: absolute;
        left: 9px;
        font-size: 12px;
        letter-spacing: 0.4px;
        z-index: var(--z-input-frame-label);
        padding: {
            left: 5px;
            right: 5px;
        }

        background-color: var(--color-background-main);

        @at-root .detail & {
            background-color: var(--color-background-detail);
        }
    }

    .frame {
        position: absolute;
        top: 6px;
        bottom: 0;
        right: 0;
        left: 0;

        height: 36px;
        border: {
            width: thin;
            style: solid;
            radius: 4px;
            color: var(--color-secondary-tag-background);
        }

        input {
            font-weight: bold;
            height: 100%;
            width: 100%;
            padding: {
                top: 11px;
                bottom: 11px;
                left: 14px;
                right: 14px;
            }
            color: inherit;
            background-color: inherit;
            border: none;
            outline: none;
        }

        .unit, .copy {
            @at-root .framed-input.has-unit input {
                width: 80% !important;
            }

            position: absolute;
            text-align: right;
            width: 20%;
            right: 14px;
            bottom: 10px;
        }

        .copy {
            cursor: pointer;
        }
    }
}
</style>