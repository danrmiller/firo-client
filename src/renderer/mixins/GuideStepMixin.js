export default {
    props: [
        'onNext'
    ],

    created () {
        const options = this.$options
        // store injection
        if (options.store) {
            this.$store = typeof options.store === 'function'
                ? options.store()
                : options.store
        } else if (options.parent && options.parent.$store) {
            this.$store = options.parent.$store
        }

        // skip if not enabled due to the current state
        if (!this.isEnabled()) {
            this.onNext()
        }
    },

    // components can decide weather they are available or not (based on e.g. settings)
    isEnabled () {
        return true
    }
}
