<template>
  <article>
    <nuxt-link to="/" class="back">&lt; Back to home</nuxt-link>
    <h1>Guillaume Gagnaire</h1>
    <h2>Drummer @ Children of Boredom</h2>

    <p>Self-taught drummer since 2005, I am currently a drummer with Children of Boredom, a cover group based in Bordeaux, France.</p>

    <p>My favorite musical styles range from rock to death metal.</p>

    <p>Double pedal lovers, subscribe to my <a href="https://www.youtube.com/channel/UCeME3-22NI6fsq9tzT-jpOQ" target="_blank">Youtube channel</a>!</p>
  </article>
</template>

<script>
export default {
  components: {
  }
}
</script>

<style lang="scss">
  article {
    margin: 40px auto;
    max-width: 600px;
    padding: 0 20px;

    .back {
      color: #fff;
      margin-bottom: 30px;
      display: inline-block;
    }

    h2 {
      font-weight: 300;
      font-size: 22px;
      margin-bottom: 42px;
    }

    .photo {
      float: left;
      margin: 0 20px 20px 0;
      max-width: 200px;
    }
  }
</style>
