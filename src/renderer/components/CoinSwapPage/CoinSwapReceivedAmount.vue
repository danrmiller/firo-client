<template>
    <th v-if="isHeader" class="vuetable-th-component-coinswap-received-amount" @click="$emit('click', rowField, $event)">
        Amount to Receive
    </th>

    <td v-else class="vuetable-td-component-coinswap-received-amount">
        <span class="amount">{{ rowData.expectedAmountToReceive }}</span>
        <span class="ticker">{{ rowData.toCoin }}</span>
    </td>
</template>

<script>
import VuetableFieldMixin from 'vue3-vuetable/src/components/VuetableFieldMixin.vue'

export default {
    name: 'CoinSwapSentAmount',

    mixins: [
        VuetableFieldMixin
    ]
}
</script>

<style scoped lang="scss">
</style>
