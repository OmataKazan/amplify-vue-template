<script setup lang="ts">
import * as Tone from "tone";
import { ref, onUnmounted } from "vue";

const synth = new Tone.PolySynth().toDestination();

const musicalScale = [
  "C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3", 
  "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4",
  "C5", "C#5", "D5", "D#5", "E5", "F5", "F#5", "G5", "G#5", "A5", "A#5", "B5"
]

// 基本的な音名
type Note = "C" | "C#" | "D" | "D#" | "E" | "F" | "F#" | "G" | "G#" | "A" | "A#" | "B";

// コードのタイプ定義を更新
type ChordType = "major" | "minor" | "7" | "m7" | "maj7" | "dim" | "aug" | "sus2" | "sus4" | "add9" | "add11" | "add13";

// 拡張コード
type Extension = "6" | "7" | "maj7" | "9" | "11" | "13";

// オプション追加音
type AddNote = "add9" | "add11" | "add13";

// コード情報を表現する型
type Chord = {
  root: Note; // ルート音
  type?: ChordType; // コードタイプ
  extensions?: Extension[]; // 拡張コード（複数選択可能）
  addNotes?: AddNote[]; // 追加音（複数選択可能）
  bassNote?: Note; // ベース音（オプション）
};

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

// コードの音を生成する関数
const generateChordNotes = (chord: Chord): string[] => {
  const notes: string[] = [];
  const rootIndex = musicalScale.findIndex(note => note.startsWith(chord.root));
  
  if (rootIndex === -1) return [];

  // ルート音を追加
  notes.push(musicalScale[rootIndex]);

  // コードタイプに基づいて音を追加
  switch (chord.type) {
    case "major":
      notes.push(musicalScale[rootIndex + 4]); // 長3度
      notes.push(musicalScale[rootIndex + 7]); // 完全5度
      break;
    case "minor":
      notes.push(musicalScale[rootIndex + 3]); // 短3度
      notes.push(musicalScale[rootIndex + 7]); // 完全5度
      break;
    case "dim":
      notes.push(musicalScale[rootIndex + 3]); // 短3度
      notes.push(musicalScale[rootIndex + 6]); // 減5度
      break;
    case "aug":
      notes.push(musicalScale[rootIndex + 4]); // 長3度
      notes.push(musicalScale[rootIndex + 8]); // 増5度
      break;
    case "sus2":
      notes.push(musicalScale[rootIndex + 2]); // 長2度
      notes.push(musicalScale[rootIndex + 7]); // 完全5度
      break;
    case "sus4":
      notes.push(musicalScale[rootIndex + 5]); // 完全4度
      notes.push(musicalScale[rootIndex + 7]); // 完全5度
      break;
    default:
      notes.push(musicalScale[rootIndex + 4]); // デフォルトはメジャーコード
      notes.push(musicalScale[rootIndex + 7]);
  }

  // 拡張コードの処理
  if (chord.extensions) {
    chord.extensions.forEach(ext => {
      switch (ext) {
        case "6":
          notes.push(musicalScale[rootIndex + 9]);
          break;
        case "7":
          notes.push(musicalScale[rootIndex + 10]);
          break;
        case "maj7":
          notes.push(musicalScale[rootIndex + 11]);
          break;
        case "9":
          notes.push(musicalScale[rootIndex + 14]);
          break;
        case "11":
          notes.push(musicalScale[rootIndex + 17]);
          break;
        case "13":
          notes.push(musicalScale[rootIndex + 21]);
          break;
      }
    });
  }

  // 追加音の処理
  if (chord.addNotes) {
    chord.addNotes.forEach(add => {
      switch (add) {
        case "add9":
          notes.push(musicalScale[rootIndex + 14]);
          break;
        case "add11":
          notes.push(musicalScale[rootIndex + 17]);
          break;
        case "add13":
          notes.push(musicalScale[rootIndex + 21]);
          break;
      }
    });
  }

  // ベース音の処理
  if (chord.bassNote) {
    const bassIndex = musicalScale.findIndex(note => note.startsWith(chord.bassNote!));
    if (bassIndex !== -1) {
      notes.unshift(musicalScale[bassIndex]);
    }
  }

  return notes;
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
    <button @click="play">Play</button>
    <div class="chord-controls">
      <!-- 現在のコード表示 -->
      <div class="current-chord-display">
        <h2>{{ currentChord.root }}{{ currentChord.type }}{{ currentChord.bassNote ? '/' + currentChord.bassNote : '' }}</h2>
      </div>

      <!-- キー選択 -->
      <div class="button-group">
        <h3>キー</h3>
        <div class="key-buttons">
          <button
            v-for="note in (['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'] as Note[])"
            :key="note"
            @click="selectedKey = note"
            :class="{ active: selectedKey === note }"
          >
            {{ note }}
          </button>
        </div>
      </div>

      <!-- ディグリー選択 -->
      <div class="button-group">
        <h3>ディグリー</h3>
        <div class="degree-buttons">
          <button 
            v-for="(degree, index) in ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ', 'Ⅵ', 'Ⅶ']"
            :key="degree"
            @click="selectDegree(index)"
            :class="{ active: isDegreeSelected(index) }"
          >
            {{ degree }}
          </button>
        </div>
      </div>

      <!-- コードタイプ選択 -->
      <div class="button-group">
        <h3>コードタイプ</h3>
        <div class="type-buttons">
          <button 
            v-for="type in (['major', 'minor', '7', 'm7', 'maj7', 'dim', 'aug', 'sus4', 'add9', 'add11', 'add13'] as ChordType[])"
            :key="type"
            @click="currentChord.type = type"
            :class="{ active: currentChord.type === type }"
          >
            {{ type }}
          </button>
        </div>
      </div>

      <!-- ベースのディグリー選択 -->
      <div class="button-group">
        <h3>ベース音</h3>
        <div class="bass-buttons">
          <button
            @click="currentChord.bassNote = undefined"
            :class="{ active: currentChord.bassNote === undefined }"
          >
            なし
          </button>
          <button 
            v-for="(degree, index) in ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ', 'Ⅵ', 'Ⅶ']"
            :key="degree"
            @click="selectBassDegree(index)"
            :class="{ active: isBassDegreeSelected(index) }"
          >
            {{ degree }}
          </button>
        </div>
      </div>

      <button class="play-button" @click="playChord(currentChord)">コードを再生</button>
    </div>
    
  </div>
</template>

<style scoped>
</style>
