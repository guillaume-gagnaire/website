<template>
  <!--
    La photo est un JPEG opaque : contrairement à l'ancienne PNG détourée,
    elle ne peut pas être composée sur le dégradé de la charte. On la rend
    donc plein cadre, le fond studio faisant office de fond de bloc.
  -->
  <div
    class="w-full max-w-[400px] h-[420px] mx-auto rounded-xl lg:-my-4 overflow-hidden"
  >
    <img
      src="/me.jpg"
      alt="Guillaume Gagnaire"
      width="400"
      height="420"
      class="w-full h-full object-cover"
    />
  </div>
</template>
