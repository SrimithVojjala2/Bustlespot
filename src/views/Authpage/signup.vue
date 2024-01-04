<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="view-container">
        <div class="image-container">
            <backgroundImage />
        </div>
        <div class="router-view-container">
            <div class="container">
                <div class="header">
                    <p class="header-title">Welcome!</p>
                    <p class="header-section">Sign up</p>
                </div>
                <div class="form-container">
                    <form class="login-form" @submit.prevent="signup" style="width: 100%">
                        <div class="InputView">
                            <TextInput label="Email ID" placeholder="Enter your email address" id="Email" type="text"
                                @input="validateEmail" v-model="username">
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
                        <div class="InputView">
                            <TextInput label="First name" id="FirstName" type="text" placeholder="Enter your first name"
                                v-model="FirstName">
                                <template #icon><el-icon size="20"><UserFilled /></el-icon> </template>
                                <template #error>
                                    <span v-if="firstnameError">Please enter your firstName</span>
                                </template>
                            </TextInput>
                        </div>
                        <div class="InputView">
                            <TextInput label="Last name" id="LastName" type="text" placeholder="Enter your last name"
                                v-model="LastName">
                                <template #icon><el-icon size="20"><UserFilled /></el-icon></template>
                                <template #error>
                                    <span v-if="lastnameError">Please enter your lastname</span>
                                </template>
                            </TextInput>
                        </div>
                        <div class="InputView">
                            <TextInput label="Password" placeholder="Enter your password" id="Password"
                                :type="tooglePassword ? 'password' : 'text'" @input="validatePassword" v-model="password">
                                <template #icon>
                                    <span @click="togglePasswordVisibility" v-if="tooglePassword"><el-icon size="20"><View /></el-icon></Span>
                                    <span @click="togglePasswordVisibility" v-else><el-icon size="20"><Hide/></el-icon></span>
                                </template>
                                <template #error>
                                    <span v-if="passwordInvalid">
                                        Please enter your password
                                    </span>
                                    <span v-if="!passwordInvalid && !passwordError">
                                        The password should include minimum 8 characters, 1 uppercase, 1 special character,
                                        1
                                        number, 1 lowercase
                                    </span>
                                </template>
                            </TextInput>
                        </div>
                        <div class="InputView">
                            <TextInput label="Confirm password" id="ConfirmPassword" placeholder="Confirm password"
                                :type="toogleConfirmPassword ? 'password' : 'text'" v-model="ConfirmPassword">
                                <template #icon>
                                    <span @click="toggleConfirmPasswordVisibility" v-if="toogleConfirmPassword">
                                        <el-icon size="20"><View /></el-icon>
                                    </span>
                                    <span v-else @click="toggleConfirmPasswordVisibility">
                                        <el-icon size="20"><Hide/></el-icon>
                                    </span>

                                </template>
                                <template #error>
                                    <span v-if="confirmpasswordInvalid">
                                        Please enter your confirm password
                                    </span>
                                    <span v-if="!confirmpasswordError && !confirmpasswordInvalid">
                                        Confirm password should match with password
                                    </span>
                                </template>
                            </TextInput>
                        </div>
                        <button type="submit"
                            :class="{ 'btn-submit': !isButtonDisabled, 'btn-submit-danger': isButtonDisabled }"
                            :disabled="isButtonDisabled">
                            Sign up
                        </button>
                    </form>
                </div>
                <div class="footer-container">
                    <div class="footer">
                        Already have an account?
                    </div>
                    <div>
                        <router-link class="login-link" :to="{ name: 'Login' }">Login</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TextInput from '@/components/TextInput.vue';
import backgroundImage from '@/components/backgroundImage.vue';
import axios from 'axios';
import { Message,UserFilled,View,Hide} from '@element-plus/icons-vue';
export default {
    // eslint-disable-next-line vue/no-reserved-component-names
    components: { TextInput ,backgroundImage,Message,UserFilled,Hide,View},
    data() {
        return {
            username: '',
            FirstName: '',
            LastName: '',
            password: '',
            ConfirmPassword: '',
            usernameError: true,
            usernameInvalid: false,
            passwordError: true,
            passwordInvalid: false,
            tooglePassword: true,
            lastnameError: false,
            firstnameError: false,
            confirmpasswordError: true,
            confirmpasswordInvalid: false,
            toogleConfirmPassword: true,
        }
    },
    computed: {
        isButtonDisabled() {
            // Disable the button if either username or password is empty
            return this.username === '' || this.password === '' || this.FirstName === '' || this.LastName === '' || this.password === '' || this.ConfirmPassword === '' || !this.usernameError || !this.passwordError || !this.confirmpasswordError;
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
        password(newval) {
            if (newval === '') {
                this.passwordInvalid = true
            }
            else {
                this.passwordInvalid = false
            }
        },
        FirstName(newval) {
            if (newval === '') {
                this.firstnameError = true;
            }
            else {
                this.firstnameError = false;
            }
        },
        LastName(newval) {
            if (newval === '') {
                this.lastnameError = true;
            }
            else {
                this.lastnameError = false;
            }
        },
        ConfirmPassword(newval) {
            if (newval === '') {
                this.confirmpasswordInvalid = true
            }
            else {
                if (newval === this.password || this.password === '') {
                    this.confirmpasswordError = true
                    this.confirmpasswordInvalid = false
                } else {
                    this.confirmpasswordError = false
                    this.confirmpasswordInvalid = false
                }
            }
        },
    },
    methods: {
        validateEmail() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            this.usernameError = emailRegex.test(this.username);
        },
        validatePassword() {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            this.passwordError = passwordRegex.test(this.password);
        },
        toggleConfirmPasswordVisibility() {
            this.toogleConfirmPassword = !this.toogleConfirmPassword;
        },
        togglePasswordVisibility() {
            this.tooglePassword = !this.tooglePassword;
        },
        signup() {
            let postdata = {
                email: this.username,
                // firstname: this.FirstName,
                // lastname: this.LastName,
                password: this.password,
            };
            axios.post('https://reqres.in/api/register', postdata)
                .then((response) => console.log(response))
                .catch((error) => console.log(error))
        }
    },
}
</script>

<style scoped>
@import url('./Login.css');
@import url("./Authpage.css");
</style>
