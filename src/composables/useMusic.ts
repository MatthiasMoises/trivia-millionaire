import { onMounted, onUnmounted, ref } from "vue";

export const useMusic = (file: string) => {
  const audio = new Audio(file);
  const isPlaying = ref(false)

  onMounted(() => {
    startMusic()
  })

  onUnmounted(() => {
    pauseMusic()
  })

  const startMusic = () => {
    audio.loop = true;
    audio.play();
    isPlaying.value = true;
  }

  const pauseMusic = () => {
    audio.pause();
    isPlaying.value = false;
  }

  return {
    isPlaying,
    startMusic,
    pauseMusic
  }
}