<template>
  <main class="globalLoader__overlay">
    <div class="globalLoader">
    </div>
  </main>
</template>

<style scoped>
.globalLoader__overlay {
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  z-index: 5;
  backdrop-filter: grayscale(100%) blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
}


.globalLoader {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #000000;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
