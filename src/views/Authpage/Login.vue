<!-- eslint-disable vue/multi-word-component-names -->
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
                        Sign in to your account
                    </p>
                </div>
                <div class="form_container">
                    <form class="login-form" @submit.prevent="handlelogin" style="width: 100%;">
                        <div>
                            <TextInput label="Email ID" placeholder="Enter your email address" id="Email" type="text"
                                @input="validateEmail" v-model="email">
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
                        <div>
                            <TextInput label="Password" placeholder="Enter your password" id="Password"
                                :type="tooglePassword ? 'password' : 'text'" v-model="password">
                                <template #icon>
                                    <span @click="togglePasswordVisibility" class="togglepassword" v-if="tooglePassword"><el-icon size="20"><View /></el-icon></span>
                                    <span @click="togglePasswordVisibility" class="togglepassword" v-else><el-icon size="20"><Hide/></el-icon></span>
                                </template>
                                <template #error>
                                    <span v-if="passwordError">
                                        please enter your password
                                    </span>
                                </template>
                            </TextInput>
                        </div>
                        <div class="links">
                            <router-link class="forgot-password" to="/forgot-password">Forgot password?</router-link>
                        </div>
                        <button type="submit"
                            :class="{ 'btn-submit': !isButtonDisabled, 'btn-submit-danger': isButtonDisabled }"
                            :disabled="isButtonDisabled">
                            Login
                        </button>
                    </form>
                </div>
                <div class="footer-container">
                    <div class="footer">
                        Don't have an account?.
                    </div>
                    <div>
                        <router-link class="signup-link" to="/signup">Sign up</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TextInput from '@/components/TextInput.vue';
import backgroundImage from '@/components/backgroundImage.vue';
import { Message,View,Hide } from '@element-plus/icons-vue';
import { mapActions } from 'vuex';
export default {
    // eslint-disable-next-line vue/no-reserved-component-names
    components: { TextInput, backgroundImage,Message,View,Hide },
    data() {
        return {
            email: '',
            password: '',
            usernameError: true,
            usernameInvalid: false,
            passwordError: false,
            tooglePassword: true,
        }
    },
    computed: {
        isButtonDisabled() {
            return this.email === '' || this.password === '' || !this.usernameError || this.passwordError;
        }
    },
    watch: {
        email(newval) {
            if (newval === '') {
                this.usernameInvalid = true
            }
            else {
                this.usernameInvalid = false
            }
        },
        password(newval) {
            if (newval === '') {
                this.passwordError = true
            }
            else {
                this.passwordError = false
            }
        }
    },
    methods: {
        ...mapActions('auth', ['login']),
        validateEmail() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            this.usernameError = emailRegex.test(this.email);
        },
        togglePasswordVisibility() {
            this.tooglePassword = !this.tooglePassword;
        },
        handlelogin() {
            let userCredentials = {
                email: this.email,
                password: this.password
            }
            this.login(userCredentials)
        }
    }
}
</script>

<style scoped>
@import url("./Login.css");
@import url("./Authpage.css");

.togglepassword{
    cursor: pointer;
}
</style>