<template>
  <div class="home d-flex flex-column flex-lg-row align-items-stretch">
    <div class="panel d-flex flex-row">
      <nuxt-link to="/fullstack-developer" class="content d-flex flex-column text-center justify-content-center">
        <h2>Fullstack developer</h2>
        <p>
          Developer since 2006, I'm currently CTO @ Noci.io.
        </p>
      </nuxt-link>
      <div class="bg" style="background-image:url(/me.jpg)"></div>
    </div>
    <div class="panel d-flex flex-row">
      <nuxt-link to="/drummer" class="content d-flex flex-column text-center justify-content-center">
        <h2>Drummer</h2>
        <p>
          Self-taught drummer, I'm covering songs on YouTube !
        </p>
      </nuxt-link>
      <div class="bg" style="background-image:url(/drums.jpg)"></div>
    </div>
  </div>
</template>

<script>

export default {
  components: {
  }
}
</script>

<style lang="scss">
  .home {
    height: 100%;
    height: 100vh;
    overflow: hidden;

    .panel {
      width: 100%;
      height: 100%;
      position: relative;

      .bg {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background: transparent no-repeat center center;
        background-size: cover;
        z-index: 1;
      }

      .content {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background: rgba(0, 0, 0, 0.8);
        color: #fff;
        z-index: 2;
        -webkit-transition: background 400ms ease-out;
        -moz-transition: background 400ms ease-out;
        -ms-transition: background 400ms ease-out;
        -o-transition: background 400ms ease-out;
        transition: background 400ms ease-out;

        &:hover {
          background: rgba(0, 0, 0, 0.5);
        }
      }
    }
  }
</style>
