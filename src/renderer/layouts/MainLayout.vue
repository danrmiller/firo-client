<template>
    <div id="main-layout">
        <LelantusDisabledHeader v-if="!isLelantusAllowed" />
        <AwaitingAnonymizationHeader v-else-if="showPaymentPendingWarning" />

        <div id="main-content" :class="{'has-header': hasHeader}">
            <Sidebar id="sidebar" />

            <main id="primary">
                <router-view v-slot="{Component}">
                    <keep-alive include="DebugConsolePage">
                        <component :is="Component" />
                    </keep-alive>
                </router-view>
            </main>
        </div>
    </div>
</template>

<script>
import {mapGetters} from "vuex";
import Sidebar from 'renderer/components/Sidebar'
import AwaitingAnonymizationHeader from "renderer/components/AwaitingAnonymizationHeader";
import LelantusDisabledHeader from "renderer/components/LelantusDisabledHeader";

export default {
    name: 'MainLayout',

    components: {
        AwaitingAnonymizationHeader,
        LelantusDisabledHeader,
        Sidebar
    },

    watch: {
        showPaymentPendingWarning() {
            window.dispatchEvent(new Event('resize'));
        },

        isLelantusAllowed() {
            window.dispatchEvent(new Event('resize'));
        }
    },

    computed: {
        ...mapGetters({
            showPaymentPendingWarning: 'App/showPaymentPendingWarning',
            isLelantusAllowed: 'ApiStatus/isLelantusAllowed'
        }),

        hasHeader() {
            return this.showPaymentPendingWarning || !this.isLelantusAllowed;
        }
    }
}
</script>

<style lang="scss">
$size-warning-banner: 40px;
$size-sidebar-width: 290px;

#main-layout {
    height: 100vh;

    .warning-header {
        height: 40px;
    }

    #main-content {
        &:not(.has-header) {
            height: 100vh;
        }

        &.has-header {
            height: calc(100vh - #{$size-warning-banner});
        }

        #sidebar {
            float: left;
            width: $size-sidebar-width;
            height: 100%;
        }

        #primary {
            float: right;
            width: calc(100vw - #{$size-sidebar-width});
            height: 100%;
            background: var(--color-background-main);
        }
    }
}
</style>
