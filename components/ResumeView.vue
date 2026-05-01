<script setup lang="ts">
interface Experience {
  period: string
  company: string
  location: string
  title: string
  bullets: string[]
  impact: string
}

interface Resume {
  personal: {
    firstName: string
    lastName: string
    title: string
    email: string
    phone: string
    location: string
    photo: string
  }
  profile: string
  expertise: string[]
  education: { school: string, degree: string, year: string }[]
  languages: { name: string, level: string }[]
  experiences: Experience[]
  references: string
}

defineProps<{
  resume: Resume
}>()
</script>

<template>
  <article class="resume-page">
    <aside class="resume-sidebar">
      <div class="resume-photo" :style="{ backgroundImage: `url(${resume.personal.photo})` }" />

      <section>
        <h2>Contact</h2>
        <p>{{ resume.personal.email }}</p>
        <p>{{ resume.personal.phone }}</p>
        <p>{{ resume.personal.location }}</p>
      </section>

      <section v-if="resume.education?.length">
        <h2>Education</h2>
        <ul class="dot-list">
          <li v-for="(edu, i) in resume.education" :key="i">
            <strong>{{ edu.school }}</strong><br>
            {{ edu.degree }}<br>
            {{ edu.year }}
          </li>
        </ul>
      </section>

      <section v-if="resume.expertise?.length">
        <h2>Expertise</h2>
        <ul class="bullet-list">
          <li v-for="(skill, i) in resume.expertise" :key="i">{{ skill }}</li>
        </ul>
      </section>

      <section v-if="resume.languages?.length">
        <h2>Langues</h2>
        <p v-for="(lang, i) in resume.languages" :key="i" class="lang">
          {{ lang.name }} - {{ lang.level }}
        </p>
      </section>

      <section v-if="resume.references">
        <h2>Références</h2>
        <p>{{ resume.references }}</p>
      </section>
    </aside>

    <main class="resume-main">
      <header class="resume-name">
        <h1>
          <span>{{ resume.personal.firstName }}</span>
          <span class="bold">{{ resume.personal.lastName }}</span>
        </h1>
        <p class="resume-title">{{ resume.personal.title }}</p>
      </header>

      <section class="resume-profile">
        <h2>Profil</h2>
        <p v-for="(para, i) in resume.profile.split(/\n\n+/)" :key="i">{{ para }}</p>
      </section>

      <section class="resume-experiences">
        <h2>Expériences notables</h2>
        <div class="timeline">
          <div v-for="(exp, i) in resume.experiences" :key="i" class="timeline-item">
            <div class="timeline-dot" />
            <div class="timeline-content">
              <p class="period">{{ exp.period }}</p>
              <p v-if="exp.company || exp.location" class="company">
                {{ exp.company }}<span v-if="exp.location"> | {{ exp.location }}</span>
              </p>
              <h3>{{ exp.title }}</h3>
              <ul v-if="exp.bullets?.length">
                <li v-for="(b, j) in exp.bullets" :key="j">{{ b }}</li>
              </ul>
              <p v-if="exp.impact" class="impact"><strong>Impact :</strong> {{ exp.impact }}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  </article>
</template>

<style scoped>
.resume-page {
  display: grid;
  grid-template-columns: 320px 1fr;
  width: 210mm;
  min-height: 297mm;
  margin: 0 auto;
  background: #fff;
  color: #1f2937;
  font-family: 'DM Sans', sans-serif;
  font-size: 10.5pt;
  line-height: 1.45;
  box-shadow: 0 10px 40px rgb(0 0 0 / 12%);
  overflow: hidden;
}

.resume-sidebar {
  position: relative;
  background: #ed682e;
  color: #fff;
  padding: 0 28px 32px;
}

.resume-sidebar::before {
  content: '';
  display: block;
  width: 100%;
  height: 230px;
  background: #fff;
  margin: 0 -28px;
  width: calc(100% + 56px);
  clip-path: polygon(0 0, 100% 0, 100% 80%, 0 100%);
}

.resume-photo {
  position: absolute;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  width: 220px;
  height: 220px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  background-color: #f3f4f6;
}

.resume-sidebar section {
  margin-top: 22px;
}

.resume-sidebar h2 {
  font-size: 13pt;
  font-weight: 700;
  margin: 0 0 10px;
  letter-spacing: 0.2px;
}

.resume-sidebar p {
  margin: 2px 0;
  font-size: 10pt;
}

.resume-sidebar .lang {
  font-size: 10pt;
}

.resume-sidebar .bullet-list,
.resume-sidebar .dot-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.resume-sidebar .bullet-list li {
  position: relative;
  padding-left: 14px;
  margin: 4px 0;
  font-size: 10pt;
}

.resume-sidebar .bullet-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 7px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #fff;
}

.resume-sidebar .dot-list li {
  position: relative;
  padding-left: 14px;
  margin: 6px 0;
  font-size: 10pt;
  line-height: 1.35;
}

.resume-sidebar .dot-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 7px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #fff;
}

.resume-main {
  padding: 32px 36px 32px;
}

.resume-name h1 {
  font-size: 38pt;
  line-height: 1.05;
  margin: 0 0 6px;
  color: #ed682e;
  font-weight: 400;
}

.resume-name h1 .bold {
  display: block;
  font-weight: 800;
}

.resume-title {
  font-size: 12pt;
  color: #4b5563;
  margin: 0 0 24px;
}

.resume-main h2 {
  color: #ed682e;
  font-size: 16pt;
  font-weight: 800;
  margin: 18px 0 10px;
}

.resume-profile p {
  margin: 0 0 10px;
  text-align: justify;
}

.timeline {
  position: relative;
  padding-left: 22px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 6px;
  top: 6px;
  bottom: 6px;
  width: 1px;
  background: #d1d5db;
}

.timeline-item {
  position: relative;
  margin-bottom: 18px;
}

.timeline-dot {
  position: absolute;
  left: -22px;
  top: 4px;
  width: 13px;
  height: 13px;
  border: 1.5px solid #ed682e;
  background: #fff;
  border-radius: 50%;
}

.timeline-content .period {
  margin: 0;
  font-size: 10pt;
  color: #1f2937;
}

.timeline-content .company {
  margin: 0;
  font-size: 10pt;
  color: #1f2937;
}

.timeline-content h3 {
  margin: 4px 0 6px;
  font-size: 12pt;
  font-weight: 800;
  color: #1f2937;
}

.timeline-content ul {
  margin: 0 0 6px;
  padding-left: 18px;
}

.timeline-content li {
  margin: 2px 0;
  font-size: 10pt;
}

.timeline-content .impact {
  margin: 6px 0 0;
  font-size: 10pt;
  font-weight: 700;
}

@media print {
  .resume-page {
    box-shadow: none;
    width: 100%;
    min-height: auto;
  }
}
</style>
