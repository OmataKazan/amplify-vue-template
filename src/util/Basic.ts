import type { Note, Degree } from '@/types/Basic'
import { note, degree } from '@/const/Basic'

// ノートのインデックスを取得する
export const getNoteIndex = (targetNote: Note): number => {
  return note.findIndex(n => n === targetNote);
}

// 度数のインデックスを取得する
export const getDegreeIndex = (targetDegree: Degree): number => {
  return degree.findIndex(d => d === targetDegree);
}