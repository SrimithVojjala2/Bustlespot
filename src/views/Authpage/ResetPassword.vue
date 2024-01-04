<template>
    <div class="view-container">
        <div class="image-container">
            <backgroundImage />
        </div>
        <div class="router-view-container">
            <div class="container">
                <div class="header">
                    <p class="header-title">
                        Welcome!
                    </p>
                    <p class="header-section">
                        Reset Password
                    </p>
                </div>
                <div class="form-container">
                    <form @submit.prevent="console.log('hello')" class="form-container">
                        <div class="InputView">
                            <TextInput label="Email ID" id="Email" type="text" @input="validateEmail" v-model="username">
                                <template #icon>
                                    <el-icon size="20"><Message /></el-icon>
                                </template>
                                <template #error>
                                    <span v-if="usernameInvalid">
                                        Please enter your email
                                    </span>
                                    <span v-if="!usernameInvalid && !usernameError">
                                        Please enter a valid email address
                                    </span>
                                </template>
                            </TextInput>
                        </div>
                        <div class="links">
                            <router-link class="forgot-password" to="/login">
                                Sign in to your account
                            </router-link>
                        </div>
                        <button type="submit"
                            :class="{ 'btn-submit': !isButtonDisabled, 'btn-submit-danger': isButtonDisabled }"
                            :disabled="isButtonDisabled">
                            Reset Password
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TextInput from '@/components/TextInput.vue';
import backgroundImage from '@/components/backgroundImage.vue';
import { Message} from '@element-plus/icons-vue';

export default {
    components: { TextInput,backgroundImage,Message },
    data() {
        return {
            username: '',
            usernameError: true,
            usernameInvalid: false,
        }
    },
    watch: {
        username(newval) {
            if (newval === '') {
                this.usernameInvalid = true
            }
            else {
                this.usernameInvalid = false
            }
        },
    },
    methods: {
        validateEmail() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            this.usernameError = emailRegex.test(this.username);
        }
    },
    computed: {
        isButtonDisabled() {
            // Disable the button if either username or password is empty
            return this.username === '' || !this.usernameError;
        }
    },
}
</script>

<style scoped>
@import url('./Login.css');
@import url('./Authpage.css');
.InputView {
    margin-top: 5px;
}
</style>