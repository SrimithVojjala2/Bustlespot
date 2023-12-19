<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
        <div class="main-container">
            <label :for="id" class="label">{{ label }}</label>
            <div class="inner-container">
                <div class="input-icon-container">
                    <div class="icon" name='Icon'>
                        <slot name="icon">
                        </slot>
                    </div>
                    <div class="input">
                        <input :type="type" autocomplete="off" :placeholder="placeholder" :id="id" :value="modelValue"
                            @input="$emit('update:modelValue', $event.target.value)" />
                    </div>
                </div>
                <div class="validations">
                    <p>
                        <slot name="error"></slot>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        id: String,
        label: String,
        type: {
            type: String,
            default: 'text',
        },
        modelValue: {
            type: [String, Number],
            default: '',
        },
        placeholder: {
            type: [String],
            default: '',
        }
    },
    emits: ['update:modelValue']
}
</script>

<style scoped>
.main-container {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.label {
    color: var(--word-color);
    font-size: 12px;
    font-family: 'Avenir Next LT Pro' !important;
    margin-bottom: 3px;
}

.inner-container {
    display: inline-flex;
    flex-direction: column;
    position: relative;
    padding: 0px;
    margin: 4px 0px 0px;
    border: 0px;
    vertical-align: top;
    width: 100%;
}

.input-icon-container {
    border: none;
    background-color: rgb(45, 45, 45);
    border-radius: 0px;
    color: rgb(141, 141, 141);
    font-size: 12px;
    font-weight: 400;
    line-height: 1.4375em;
    letter-spacing: 0.00938em;
    box-sizing: border-box;
    cursor: text;
    display: inline-flex;
    align-items: center;
    width: 100%;
    position: relative;
    padding-left: 14px;
    padding-right: 8px;
    overflow: hidden;
    font-family: 'Avenir Next LT Pro' !important;
    user-select: none;
}

.input-icon-container .icon {
    display: flex;
    height: 0.01em;
    max-height: 2em;
    -webkit-box-align: center;
    align-items: center;
    white-space: nowrap;
    /* color: rgba(0, 0, 0, 0.54); */
    margin-right: 8px;
    color: rgb(141, 141, 141);
}

.input-icon-container .input {
    width: 100%;
}

.input-icon-container .input input {
    background-color: #e8f0fe00;
    color: currentcolor;
    letter-spacing: 0.3px;
    outline: none;
    border: 0px;
    box-sizing: content-box;
    background: none;
    height: 1.4375em;
    margin: 0px;
    display: block;
    width: 100%;
    padding: 8.5px 14px 8.5px 0px;
}

.inner-container .validations {
    font-family: Roboto, Helvetica, Arial, sans-serif;
    font-weight: 400;
    letter-spacing: 0.03333em;
    text-align: left;
    margin: 4px 0px 0px;
    line-height: 16px;
}

.inner-container .validations p {
    font-size: 12px;
    color: rgb(255, 0, 0);
    margin: 4px 0px 0px;
    height: fit-content;
}
</style>