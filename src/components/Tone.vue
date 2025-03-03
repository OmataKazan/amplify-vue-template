<script setup lang="ts">
import * as Tone from "tone";
import { ref, onUnmounted } from "vue";

import { degree } from "@/const/MusicTheory";

const synth = new Tone.PolySynth().toDestination();

const musicalScale = [
  "C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3", 
  "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4",
  "C5", "C#5", "D5", "D#5", "E5", "F5", "F#5", "G5", "G#5", "A5", "A#5", "B5"
]


const currentChord = ref<Chord>({
  root: "C",
  type: "major",
  bassNote: undefined
});

const selectedKey = ref<Note>("C");
const selectedDegree = ref<number | null>(null);
const selectedBassDegree = ref<number | null>(null);

const selectDegree = (index: number) => {
  selectedDegree.value = index;
  currentChord.value.root = calculateNote(selectedKey.value, index);
};

const selectBassDegree = (index: number) => {
  selectedBassDegree.value = index;
  currentChord.value.bassNote = calculateNote(selectedKey.value, index);
};

const isDegreeSelected = (index: number) => selectedDegree.value === index;
const isBassDegreeSelected = (index: number) => selectedBassDegree.value === index;

const calculateNote = (key: Note, degreeIndex: number): Note => {
  const notes: Note[] = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  const keyIndex = notes.indexOf(key);
  const majorScale = [0, 2, 4, 5, 7, 9, 11];
  const newIndex = (keyIndex + majorScale[degreeIndex]) % 12;
  return notes[newIndex];
};



const play = async () => {
  await Tone.start(); // オーディオコンテキストを初期化
  synth.triggerAttackRelease("C4", "8n");
};

const playChord = async (chord: Chord) => {
  const notes = generateChordNotes(chord);
  await Tone.start();
  synth.triggerAttackRelease(notes, "8n");
};

const playNote = async (note: string) => {
  await Tone.start();
  synth.triggerAttackRelease(note, "8n");
};


onUnmounted(() => {
  synth.dispose(); // リソース解放
});

</script>

<template>
  <div>
    <h1>Tone</h1>
  </div>
</template>

<style scoped>
</style>
