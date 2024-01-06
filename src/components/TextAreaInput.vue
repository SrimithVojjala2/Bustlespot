<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div :class="$attrs">
        <div class="main-container">
            <label :for="id" class="label">{{ label }}</label>
            <div class="inner-container">
                <div class="textinput-icon-container">
                    <div class="texticon" name='Icon'>
                        <slot name="icon">
                        </slot>
                    </div>
                    <div class="textinput">
                        <textarea :type="type" autocomplete="off" :placeholder="placeholder" :id="id" :value="modelValue"
                            @input="$emit('update:modelValue', $event.target.value)" class="TextArea"></textarea>
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

<style>
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

.textinput-icon-container {
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
    border: none;
    background-color: rgb(249, 249, 249);
    border-radius: 0px;
    color: rgb(141, 141, 141);
    font-size: 12px;
    align-items: flex-start;
    padding: 8.5px 14px;
}

.textinput-icon-container .texticon {
    display: flex;
    height: 1.6em;
    align-items: center;
    white-space: nowrap;
    color: rgba(0, 0, 0, 0.54);
    margin-right: 8px;
}

.textinput-icon-container .textinput {
    width: 100%;
}

.textinput-icon-container .textinput textarea {
    color: currentcolor;
    border: 0px;
    outline: 0px;
    box-sizing: content-box;
    background: none;
    margin: 0px;
    display: block;
    min-width: 0px;
    width: 100%;
    resize: none;
    padding: 0px;
    height: 85px;
}

.inner-container .validations {
    font-family: Roboto, Helvetica, Arial, sans-serif;
    letter-spacing: 0.03333em;
    text-align: left;
    margin: 4px 0px 0px;
    line-height: 16px;
}

.inner-container .validations span {
    font-family: Roboto, Helvetica, Arial, sans-serif;
    font-weight: 600;
    letter-spacing: 0.03333em;
    text-align: left;
    margin: 4px 0px 0px;
    font-size: 11px;
    line-height: 16px;
    color: red;
}
</style>