<template>
  <header>Example header</header>
  <div id="main" class="main">
    <router-view  class="animated"
                  keep-alive
                  transition="fadeIn"
                  transition-mode="out-in">
    </router-view>
  </div>
  <footer>Example footer</footer>
</template>