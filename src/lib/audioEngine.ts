/**
 * Web Audio Engine for Flute Daily Companion
 * Provides high-accuracy Metronome timing and realistic Flute Tone & Drone synthesis.
 */

class FluteAudioEngine {
  private ctx: AudioContext | null = null;
  private droneOscs: OscillatorNode[] = [];
  private droneGain: GainNode | null = null;
  private vibratoLfo: OscillatorNode | null = null;
  private currentDroneFreq: number = 440;
  private isDroneActive: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Play a brief realistic flute note
  public playFluteTone(freq: number, duration: number = 1.2, volume: number = 0.4) {
    try {
      const ctx = this.initContext();
      const now = ctx.currentTime;

      // Master gain with smooth envelope (soft attack, sustained, soft release)
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.0001, now);
      masterGain.gain.exponentialRampToValueAtTime(Math.max(0.001, volume), now + 0.09);
      masterGain.gain.setValueAtTime(Math.max(0.001, volume), now + duration - 0.2);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      // Low pass filter to simulate flute body warmth
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(Math.min(freq * 3.5, 5500), now);

      masterGain.connect(filter);
      filter.connect(ctx.destination);

      // Harmonic 1: Fundamental
      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(freq, now);

      // Harmonic 2 (1 octave higher, gentle)
      const osc2 = ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(freq * 2, now);
      const gain2 = ctx.createGain();
      gain2.gain.setValueAtTime(0.22, now);
      osc2.connect(gain2);
      gain2.connect(masterGain);

      // Subtle vibrato (5 Hz, small depth)
      const lfo = ctx.createOscillator();
      lfo.frequency.setValueAtTime(5.2, now);
      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(freq * 0.006, now); // ~0.6% frequency variation
      lfo.connect(lfoGain);
      lfoGain.connect(osc1.frequency);
      lfoGain.connect(osc2.frequency);

      osc1.connect(masterGain);

      // Start & Stop
      osc1.start(now);
      osc2.start(now);
      lfo.start(now);

      osc1.stop(now + duration);
      osc2.stop(now + duration);
      lfo.stop(now + duration);
    } catch {
      // AudioContext might be blocked until user gesture
    }
  }

  // Play a metronome click sound
  public playClick(time: number, isAccent: boolean, isSubdivision: boolean = false, volume: number = 0.7) {
    try {
      const ctx = this.initContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const baseFreq = isAccent ? 1200 : isSubdivision ? 650 : 880;
      const decayDuration = isAccent ? 0.045 : isSubdivision ? 0.025 : 0.035;
      const gainVal = isAccent ? volume : isSubdivision ? volume * 0.45 : volume * 0.75;

      osc.type = isAccent ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(baseFreq, time);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.35, time + decayDuration);

      gain.gain.setValueAtTime(gainVal, time);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + decayDuration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(time);
      osc.stop(time + decayDuration);
    } catch {
      // ignore
    }
  }

  // Start continuous pitch drone
  public startDrone(freq: number, richHarmonics: boolean = true, volume: number = 0.35) {
    this.stopDrone();
    try {
      const ctx = this.initContext();
      const now = ctx.currentTime;
      this.currentDroneFreq = freq;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.0001, now);
      masterGain.gain.linearRampToValueAtTime(volume, now + 0.15);
      masterGain.connect(ctx.destination);
      this.droneGain = masterGain;

      // Primary sine
      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(freq, now);
      osc1.connect(masterGain);
      osc1.start(now);
      this.droneOscs.push(osc1);

      if (richHarmonics) {
        // Octave harmonic
        const osc2 = ctx.createOscillator();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(freq * 2, now);
        const gain2 = ctx.createGain();
        gain2.gain.setValueAtTime(0.2, now);
        osc2.connect(gain2);
        gain2.connect(masterGain);
        osc2.start(now);
        this.droneOscs.push(osc2);

        // Fifth harmonic (soft)
        const osc3 = ctx.createOscillator();
        osc3.type = 'sine';
        osc3.frequency.setValueAtTime(freq * 3, now);
        const gain3 = ctx.createGain();
        gain3.gain.setValueAtTime(0.06, now);
        osc3.connect(gain3);
        gain3.connect(masterGain);
        osc3.start(now);
        this.droneOscs.push(osc3);
      }

      this.isDroneActive = true;
    } catch {
      // ignore
    }
  }

  // Update drone frequency seamlessly
  public setDroneFreq(freq: number) {
    if (!this.ctx || !this.isDroneActive) return;
    const now = this.ctx.currentTime;
    this.currentDroneFreq = freq;
    if (this.droneOscs[0]) {
      this.droneOscs[0].frequency.setTargetAtTime(freq, now, 0.05);
    }
    if (this.droneOscs[1]) {
      this.droneOscs[1].frequency.setTargetAtTime(freq * 2, now, 0.05);
    }
    if (this.droneOscs[2]) {
      this.droneOscs[2].frequency.setTargetAtTime(freq * 3, now, 0.05);
    }
  }

  // Update drone volume
  public setDroneVolume(volume: number) {
    if (this.droneGain && this.ctx) {
      this.droneGain.gain.setTargetAtTime(volume, this.ctx.currentTime, 0.05);
    }
  }

  // Stop drone
  public stopDrone() {
    if (this.droneGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.droneGain.gain.linearRampToValueAtTime(0.0001, now + 0.1);
      setTimeout(() => {
        this.droneOscs.forEach(osc => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {
            // ignore
          }
        });
        this.droneOscs = [];
        this.droneGain = null;
        this.isDroneActive = false;
      }, 120);
    } else {
      this.droneOscs = [];
      this.isDroneActive = false;
    }
  }

  public getIsDronePlaying() {
    return this.isDroneActive;
  }

  public getAudioContextTime() {
    const ctx = this.initContext();
    return ctx.currentTime;
  }
}

export const fluteAudio = new FluteAudioEngine();
