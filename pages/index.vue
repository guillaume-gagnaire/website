<template>
  <div class="home">
    <div class="jumbo">
      <img src="@/assets/me.jpeg" alt="" />
      <p class="heading">
        Hi, I'm <strong>Guillaume</strong>, I do things with
        <strong style="color: #e91e63">code</strong>.
      </p>
      <p>
        I'm currently <strong>{{ job.title }}</strong> at
        <strong
          ><nuxt-link :href="`/work/${job.id}`">{{
            job.company
          }}</nuxt-link></strong
        >.
      </p>
    </div>
    <div style="text-align: center">
      <button @click="$router.push('/work')">
        See my work
      </button>
    </div>
  </div>
</template>

<script>
import data from '../conf/content.json'

export default {
  data () {
    return {
      data
    }
  },
  computed: {
    job () {
      return this.data.jobs[0]
    }
  }
}
</script>

<style lang="scss">
.home {
  .jumbo {
    max-width: 900px;
    padding: 50px 20px;
    margin: 0 auto;
    color: #fff;

    img {
      display: block;
      height: 128px;
      width: 128px;
      border-radius: 128px;
      margin: 0 auto 40px auto;
    }

    p {
      font-size: 32px;
      line-height: 40px;
      margin: 0 0 30px;

      a {
        color: inherit;
      }

      a,
      strong {
        &:hover {
          color: #e91e63;
          transition: color ease-in-out 200ms;
        }
      }
    }

    .heading {
      font-size: 72px;
      line-height: 80px;
    }
  }

  button {
    border: 2px solid #e91e63;
    background: none;
    padding: 15px 35px;
    color: #e91e63;
    cursor: pointer;
    font-size: 18px;
    transition: all ease-in-out 200ms;

    &:hover {
      background: #e91e63;
      color: #fff;
    }
  }
}
</style>
