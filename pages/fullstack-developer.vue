<template>
  <article>
    <nuxt-link to="/" class="back">&lt; Back to home</nuxt-link>
    <h1>Guillaume Gagnaire</h1>
    <h2>CTO @ <a href="https://www.noci.io">Noci.io</a> in Bordeaux, France</h2>

    <img src="/me.jpg" alt="" class="photo" />
    
    <p>Self-taught developer since 2006, I had the opportunity to create several companies, to support others, either as an employee or as a consultant.</p>

    <p>I am committed to bringing my expertise to the service of innovation and digital transformation.</p>

    <p>Patient and teacher, I have the pleasure of managing a small team of developers within Noci.io, a company dedicated to chatbots and product advice. Rather than management based on monitoring and control, I much prefer trust and coaching in order to teach, advance and grow my employees.</p>

    <h2 style="margin-top: 42px;">Contact me !</h2>
    <p>
      You can contact me at <a href="mailto:contact@guillaume-gagnaire.dev">contact@guillaume-gagnaire.dev</a>.
    </p>
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
      font-size: 12px;
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
