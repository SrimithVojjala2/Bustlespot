<template>
    <div class="background-image-container">
        <div class="icon-title-container">
            <div class="circle"></div>
            <div class="icon-title">
                <div class="icon">
                    <img src="../assets/images/icon.svg" alt="noicon">
                </div>
                <div class="title">BUSTLESPOT</div>
            </div>
        </div>
        <div class="backgroundImage">
            <img src="../assets/images/loginBanner.svg" alt="noBackground" class="background-image">
        </div>
        <div class="description-main">
            <div class="description">
                <p>
                    Desk to perform more on your Work.
                </p>
            </div>
            <div class="description2">
                Get Ready for tour presence to make sense
            </div>
        </div>  
    </div>
</template>
  
<script>
export default {
    components: {}
}
</script>
  
<style scoped>
.background-image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
}



.icon-title-container {
    display: flex;
    align-items: center;
    width: 100%;
}

.icon-title-container .circle {
    flex: 1;
}

.icon-title-container .icon-title {
    display: flex;
    align-items: center;
    flex: 2;
}

.icon-title-container .icon-title .icon {
    height: 78px;
    width: 77px;
}

.icon-title-container .icon-title .title {
    margin: 8px 0px 0px;
    line-height: 1.5;
    letter-spacing: 0.00940em;
    font-size: 20px;
    font-weight: 300;
    font-style: normal;
    font-family: "Avenir Next LT Pro" !important;
}

.backgroundImage {
    position: relative;
    width: 100%;
}

.description-main {
    display: block;
    align-items: center;
    position: relative;
}

.description-main .description {
    margin: 8px 0px 0px;
    line-height: 1.5;
    letter-spacing: 0.00938em;
    color: rgb(255, 135, 110);
    font-size: 26px;
    font-weight: normal;
    font-style: normal;
    font-family: "Avenir Next LT Pro" !important
}

.description-main .description1 {
    margin: 0px;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.5;
    letter-spacing: 0.00938em;
    font-family: "Avenir Next LT Pro" !important;
}
</style>
  