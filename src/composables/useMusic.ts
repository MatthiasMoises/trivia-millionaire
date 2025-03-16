import { onMounted, onUnmounted, ref, type Ref, toValue, watchEffect } from "vue";
import bgMusic1 from '../assets/sounds/music1.mp3';
import bgMusic2 from '../assets/sounds/music2.mp3';
import bgMusic3 from '../assets/sounds/music3.mp3';
import type { Difficulty } from "./useQuestions";

export const useMusic = (difficulty: Ref<Difficulty>) => {
  const audio = new Audio();
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

  const loadSrc = () => {
    pauseMusic()
    if (toValue(difficulty) === 'easy') {
      audio.src = bgMusic1
    } else if (toValue(difficulty) === 'medium') {
      audio.src = bgMusic2
    } else {
      audio.src = bgMusic3
    }
    startMusic()
  }

  watchEffect(() => {
    loadSrc()
  })

  return {
    isPlaying,
    startMusic,
    pauseMusic
  }
}