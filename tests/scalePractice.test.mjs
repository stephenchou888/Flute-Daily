import assert from 'node:assert/strict';
import test from 'node:test';
import {
  buildPracticeNotes,
  buildScaleAbc,
  getScaleNotes,
  PRACTICE_PATTERNS,
  SCALE_ROOTS,
  SCALE_TYPES,
} from '../src/lib/scalePractice.ts';

test('offers twelve tonic choices for the 24 major and minor keys', () => {
  assert.equal(SCALE_ROOTS.length, 12);
  assert.equal(new Set(SCALE_ROOTS.map(root => root.pitchClass)).size, 12);
  assert.ok(SCALE_TYPES.some(type => type.id === 'major'));
  assert.ok(SCALE_TYPES.some(type => type.id === 'natural-minor'));
});

test('spells common major, minor, and modal scales correctly', () => {
  assert.deepEqual(
    getScaleNotes('C', 'major').map(note => note.name),
    ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'],
  );
  assert.deepEqual(
    getScaleNotes('Eb', 'natural-minor').map(note => note.name),
    ['Eb4', 'F4', 'Gb4', 'Ab4', 'Bb4', 'Cb5', 'Db5', 'Eb5'],
  );
  assert.deepEqual(
    getScaleNotes('D', 'dorian').map(note => note.name),
    ['D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5'],
  );
  assert.deepEqual(
    getScaleNotes('C', 'whole-tone').map(note => note.name),
    ['C4', 'D4', 'E4', 'F#4', 'G#4', 'Bb4', 'C5'],
  );
});

test('all tonic and scale combinations preserve their semitone formulas and spelling', () => {
  const naturalPitchClasses = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };

  for (const root of SCALE_ROOTS) {
    for (const type of SCALE_TYPES) {
      const notes = getScaleNotes(root.id, type.id);
      assert.equal(notes.length, type.intervals.length + 1);
      assert.deepEqual(
        notes.map(note => note.midi - notes[0].midi),
        [...type.intervals, 12],
      );
      for (const note of notes) {
        const spelledMidi =
          12 * (note.octave + 1) + naturalPitchClasses[note.letter] + note.accidental;
        assert.equal(spelledMidi, note.midi, `${root.id} ${type.id}: ${note.name}`);
      }
    }
  }
});

test('builds scale and interval sequences with the expected endpoints', () => {
  const cMajor = getScaleNotes('C', 'major');
  const scale = buildPracticeNotes(cMajor, 'scale');
  const thirds = buildPracticeNotes(cMajor, 'thirds');
  const fourths = buildPracticeNotes(cMajor, 'fourths');
  const fifths = buildPracticeNotes(cMajor, 'fifths');
  const groups3 = buildPracticeNotes(cMajor, 'groups3');
  const groups4 = buildPracticeNotes(cMajor, 'groups4');
  const triads = buildPracticeNotes(cMajor, 'triads');
  assert.equal(scale.length, 15);
  assert.deepEqual([scale[0].name, scale[7].name, scale.at(-1)?.name], ['C4', 'C5', 'C4']);
  assert.deepEqual(thirds.slice(0, 4).map(note => note.name), ['C4', 'E4', 'D4', 'F4']);
  assert.deepEqual(fourths.slice(0, 4).map(note => note.name), ['C4', 'F4', 'D4', 'G4']);
  assert.deepEqual(fifths.slice(0, 4).map(note => note.name), ['C4', 'G4', 'D4', 'A4']);
  assert.deepEqual(groups3.slice(0, 6).map(note => note.name), ['C4', 'D4', 'E4', 'D4', 'E4', 'F4']);
  assert.deepEqual(groups4.slice(0, 8).map(note => note.name), ['C4', 'D4', 'E4', 'F4', 'D4', 'E4', 'F4', 'G4']);
  assert.deepEqual(triads.slice(0, 6).map(note => note.name), ['C4', 'E4', 'G4', 'D4', 'F4', 'A4']);
  assert.equal(PRACTICE_PATTERNS.length, 7);
});

test('generates ABC notes and notation accidentals', () => {
  const cSharpMajor = getScaleNotes('C#', 'major');
  const abc = buildScaleAbc(cSharpMajor);
  assert.match(abc, /K:C/);
  assert.match(abc, /\^C/);
  assert.match(abc, /w: C♯4/);
  assert.ok(Math.abs(cSharpMajor[0].frequency - 277.18) < 0.01);
});
