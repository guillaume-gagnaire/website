<template>
  <div>
    <header>
      <div>
        <nuxt-link href="/">
          <img src="@/assets/logo.png" alt="G" />
        </nuxt-link>
        <nav>
          <nuxt-link href="/">Home</nuxt-link>
          <nuxt-link href="/work">Work</nuxt-link>
          <nuxt-link href="/contact">Contact</nuxt-link>
        </nav>
      </div>
    </header>
    <div id="main">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;700&display=swap');

html,
body {
  background: #1b242f;
}

* {
  font-family: Poppins, sans-serif;
  box-sizing: border-box;
}

header {
  > div {
    display: flex;
    align-items: center;
    margin: 0 auto;
    max-width: 1200px;
    padding: 20px;

    img {
      height: 48px;
      width: 48px;
    }

    nav {
      text-align: right;
      flex: 1;

      a {
        color: #fff;
        font-size: 18px;
        font-weight: 700;
        text-decoration: none;
        margin: 0 16px;

        &:hover {
          color: #e91e63;
        }
      }
    }
  }
}
</style>
