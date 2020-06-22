<template>
  <div class="home d-flex flex-column flex-lg-row align-items-stretch">
    <div class="panel d-flex flex-row">
      <nuxt-link to="/fullstack-developer" class="content d-flex flex-column text-center justify-content-center">
        <h2>Fullstack developer</h2>
        <p>
          Developer since 2006, I'm currently <b>CTO</b> @ <b>Noci.io</b>, in <b>Bordeaux, France</b>.
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
  $homeGutter: 5px;
  $gutterColor: #000;

  .home {
    height: 100%;
    height: 100vh;
    overflow: hidden;

    .panel {
      width: 100%;
      height: 100%;
      position: relative;

      &:first-child {
        border-bottom: $homeGutter solid $gutterColor;
      }

      &:last-child {
        border-top: $homeGutter solid $gutterColor;
      }

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
        padding: 20px;

        &:hover {
          background: rgba(0, 0, 0, 0.5);
        }
      }
    }
  }

  
  @media (min-width: 992px) { 
    .home {
      .panel {
        &:first-child {
          border-bottom: none;
          border-right: $homeGutter solid $gutterColor;
        }

        &:last-child {
          border-top: none;
          border-left: $homeGutter solid $gutterColor;
        }
      }
    }
  }
</style>
