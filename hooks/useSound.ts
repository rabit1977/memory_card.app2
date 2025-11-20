import { useCallback } from 'react';

const useSound = (enabled: boolean = true) => {
  const playTone = useCallback(
    (freq: number, type: OscillatorType, duration: number, delay = 0) => {
      if (!enabled || typeof window === 'undefined') return;

      try {
        const AudioContext =
          window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContext) return;

        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);

        gain.gain.setValueAtTime(0.1, ctx.currentTime + delay);
        gain.gain.exponentialRampToValueAtTime(
          0.01,
          ctx.currentTime + delay + duration
        );

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + delay);
        osc.stop(ctx.currentTime + delay + duration);
      } catch (e) {
        console.error('Audio error', e);
      }
    },
    [enabled]
  );

  const playFlip = () => playTone(400, 'sine', 0.1);
  const playMatch = () => {
    playTone(600, 'sine', 0.1, 0);
    playTone(800, 'sine', 0.2, 0.1);
  };
  const playWin = () => {
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
      playTone(freq, 'triangle', 0.3, i * 0.15);
    });
  };
  const playError = () => playTone(150, 'sawtooth', 0.3);

  return { playFlip, playMatch, playWin, playError };
};
export default useSound;