<template>
  <div class="contact">
    <div class="jumbo">
      <p>
        Want to grap a cup of <s>coffee</s> <strong>hot chocolate</strong> with
        me ? Ask me anything ? You can <strong>get in touch</strong> with me :
      </p>
      <p style="text-align: center">
        <a href="mailto:contact@guillaume-gagnaire.dev">
          contact@guillaume-gagnaire.dev
        </a>
        <br />
        or
        <br />
        <a href="tel:+33652351822">
          +33 (0)6 52 35 18 22
        </a>
      </p>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import data from '../conf/content.json'

export default {
  data () {
    return {
      data
    }
  },
  methods: {
    date (val) {
      return dayjs(val).format('MM/YYYY')
    }
  }
}
</script>

<style lang="scss">
.contact {
  .jumbo {
    max-width: 900px;
    padding: 50px 20px;
    margin: 0 auto;
    color: #fff;

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
  }
}
</style>
