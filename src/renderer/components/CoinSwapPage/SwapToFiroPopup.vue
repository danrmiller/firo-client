<template>
    <div>
        <div class="title">
            Swap to Firo
        </div>

        <div class="content">
            <div id="swapToFiroQrCode" />

            <div class="field">
                <label>
                    Amount to Send
                </label>

                <div class="value">
                    <span class="amount">{{ fromAmount }}</span> <span class="ticker">{{ fromCurrency }}</span>
                </div>
            </div>

            <div v-if="feeFrom" class="field">
                <label>
                    {{ fromCurrency }} Fee
                </label>

                <div class="value">
                    <span class="amount">{{ feeFrom }}</span> <span class="ticker">FIRO</span>
                </div>
            </div>

            <div class="field">
                <label>
                    {{ toCurrency }} Fee
                </label>

                <div class="value">
                    <span class="amount">{{ feeTo }}</span> <span class="ticker">{{ toCurrency }}</span>
                </div>
            </div>

            <div class="field">
                <label>
                    Estimated Total to Receive
                </label>

                <div class="value">
                    <span class="amount">{{ amountTo }}</span> <span class="ticker">{{ toCurrency }}</span>
                </div>
            </div>

            <div class="field">
                <label>
                    {{ fromCurrency === 'FIRO' ? toCurrency : fromCurrency }} Address
                </label>

                <div class="value address">
                    <span>{{ address }}</span>
                </div>
            </div>
        </div>

        <div class="buttons">
            <button class="disrecommended" @click="$emit('cancel')">
                Cancel
            </button>

            <button @click="$emit('confirm')">
                Continue
            </button>
        </div>
    </div>
</template>

<script>
// $emits: cancel, confirm
import Amount from "renderer/components/shared/Amount";
import QRCode from "easyqrcodejs";

export default {
    name: 'SendStepConfirm',

    components: {
        Amount
    },

    props: {
        rate: {
            type: String,
            required: true
        },

        exchangeAddress: {
            type: String,
            required: true
        },

        remoteAmount: {
            type: String,
            required: true
        },

        remoteCurrency: {
            type: String,
            required: true
        },

        firoAmount: {
            type: String,
            required: true
        },

        firoTransactionFee: {
            type: String,
            required: true
        }
    },

    data() {
        return {
            qrCode: null
        }
    },

    methods: {
        makeQrCode() {
            if (this.qrCode) {
                this.qrCode.makeCode(this.exchangeAddress);
            } else {
                this.qrCode = new QRCode(this.$refs.qrCode, {
                    text: this.address,
                    height: 256,
                    width: 256,
                    colorDark: 'black',
                    colorLight: 'white'
                });
            }
        }
    }
}
</script>

<style scoped lang="scss">
@import "src/renderer/styles/popup";

@include popup();

.address {
    font: {
        size: 0.8em;
        family: "Robot Mono";
    }
}

.amount {
    font-weight: bold;
}

.content {
    // We do NOT want the size to be adaptive to the screen.
    width: 400pt;

    .field {
        margin-bottom: var(--padding-base)

        label {
            margin-right: var(--padding-base);
            width: fit-content;
            font-weight: bold;
        }

        .value {
            width: available;
            display: inline;
            float: right;
        }
    }
}
</style>
