import type {
    Note,
    Degree,
    ChordType,
    Extension,
    AddNote
} from '@/types/Basic'
import {
    note
} from '@/const/Basic'
import {
    CHORD_INTERVALS,
    extensionIntervals,
    addNoteIntervals,
    degreeIntervals
} from '@/const/Interval'
import { getNoteIndex } from './Basic';
import type { Chord } from '@/types/Chord';
/**
 * 和音を構成する
 * @param key
 * @param degree
 * @param chordType
 * @param extension
 * @param addNote
 * @param bassNote ベース音を指定します。指定した場合、そのノートがコードの最低音として使用されます。
 * @returns コードを構成する音の配列
 */
export const generateChordNotes = (key: Note, degree: Degree, chordType: ChordType, extension?: Extension, addNote?: AddNote, bassNote?: Degree): Chord => {
  const chord: Chord = {
    bassNote: getBassNoteChordNote(key, degree, bassNote),
    middleNote: [...generateChordNotesFromChrodType(key, degree, chordType),
      ...(extension ? getExtensionChordNote(key, degree, extension) : []),],
    topNote: [...(addNote ? getAddNoteChordNote(key, degree, addNote) : [])]
  }
  return chord;
}

/**
 * ルート音のインデックスを取得する共通処理
 * @param key
 * @param degree
 */
const getRootIndex = (key: Note, degree: Degree): number => {
  const keyIndex = getNoteIndex(key);
  const degreeInterval = degreeIntervals[degree];
  return (keyIndex + degreeInterval) % 12;
}

/**
 * 音程から音名を取得する共通処理
 * @param rootIndex
 * @param intervals
 */
const getNotesByIntervals = (rootIndex: number, intervals: number[]): Note[] => {
  return intervals.map((interval) => {
    const noteIndex = (rootIndex + interval) % 12;
    return note[noteIndex];
  });
}

/**
 * 基本的な三和音を構成する
 * @param key
 * @param degree
 * @param chordType
 */
export const generateChordNotesFromChrodType = (key: Note, degree: Degree, chordType: ChordType): Note[] => {
  const rootIndex = getRootIndex(key, degree);
  const chordIntervals = CHORD_INTERVALS[chordType];
  return getNotesByIntervals(rootIndex, chordIntervals);
}

/**
 * 拡張和音の音名を取得する
 * @param key
 * @param degree
 * @param extension
 */
export const getExtensionChordNote = (key: Note, degree: Degree, extension: Extension): Note[] => {
  const rootIndex = getRootIndex(key, degree);
  const extensionInterval = extensionIntervals[extension];
  return getNotesByIntervals(rootIndex, extensionInterval);
}

/**
 * 追加音の音名を取得する
 * @param key
 * @param degree
 * @param addNote
 */
export const getAddNoteChordNote = (key: Note, degree: Degree, addNote: AddNote): Note[] => {
  const rootIndex = getRootIndex(key, degree);
  const addNoteInterval = addNoteIntervals[addNote];
  return getNotesByIntervals(rootIndex, addNoteInterval);
}

/**
 * ベース音の音名を取得する
 * @param key
 * @param degree
 * @param bassNote
 */
export const getBassNoteChordNote = (key: Note, degree: Degree, bassNote?: Degree): Note[] => {
  const targetDegree = bassNote ?? degree;
  return getNotesByIntervals(getRootIndex(key, targetDegree), [0]);
}
