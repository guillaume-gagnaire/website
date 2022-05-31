<template>
  <div class="work">
    <div class="jumbo">
      <p>
        I worked for many companies, founded or not. Here's a list of my
        remarkable experiences.
      </p>
    </div>
    <div class="list">
      <div v-for="job in data.jobs" :key="job.id" class="job" :id="job.id">
        <div class="header">
          <div class="title">
            <strong>{{ job.title }}</strong> at
            <strong>{{ job.company }}</strong>
          </div>
          <div class="date" v-if="job.to === null">
            Since {{ date(job.from) }}
          </div>
          <div class="date" v-else>
            From {{ date(job.from) }} to {{ date(job.to) }}
          </div>
        </div>
        <div class="description">
          <div v-html="job.description"></div>
          <a class="button" target="_blank" :href="job.link" v-if="job.link">
            See website
          </a>
        </div>
      </div>
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
.work {
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

  .list {
    max-width: 900px;
    padding: 50px 20px;
    margin: 0 auto;

    .job {
      margin: 0 0 20px 0;
      border: 1px solid #fff;
      transition: all ease-in-out 200ms;
      border-radius: 8px;
      padding: 10px;
      color: #fff;

      &:hover {
        border-color: #e91e63;
      }

      .header {
        font-weight: 300;
        border-bottom: 1px solid rgba(255, 255, 255, 0.3);
        padding: 0 10px 10px 10px;
        font-size: 13px;

        .title {
          font-size: 18px;
        }
      }

      .description {
        padding: 10px;
        font-size: 13px;
      }

      a.button {
        border: 2px solid #e91e63;
        background: none;
        padding: 10px 20px;
        color: #e91e63;
        cursor: pointer;
        font-size: 13px;
        transition: all ease-in-out 200ms;
        text-decoration: none;
        display: inline-block;
        margin-top: 10px;

        &:hover {
          background: #e91e63;
          color: #fff;
        }
      }
    }
  }
}
</style>
