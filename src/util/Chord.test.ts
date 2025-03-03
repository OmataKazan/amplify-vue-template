import { describe, test, expect } from '@jest/globals'
import { generateChordNotes, generateChordNotesFromChrodType, getAddNoteChordNote, getBassNoteChordNote, getExtensionChordNote } from './Chord'
import type { Note, ChordType, Degree, Extension, AddNote } from '@/types/Basic'

describe('generateChordNotes', () => {
  test('CキーでⅠ度のmajorコードを生成できる', () => {
    const key: Note = 'C'
    const degree: Degree = 'Ⅰ'
    const chordType: ChordType = 'minor'
    const extension: Extension = '7'
    const addNote: AddNote = 'add9'
    const rootNote: Degree = 'Ⅲ'
    
    const result = generateChordNotes(key, degree, chordType, extension, addNote, rootNote)
    expect(result).toEqual(
      {
        bassNote: ['E'],
        middleNote: ['C', 'D#', 'G', 'A#'],
        topNote: ['D']
      }
    )
  })
})

describe('generateChordNotesFromChordType', () => {
  test('CキーでⅠ度のmajorコードを生成できる', () => {
    const key: Note = 'C'
    const degree: Degree = 'Ⅰ'
    const chordType: ChordType = 'major'
    
    const result = generateChordNotesFromChrodType(key, degree, chordType)
    expect(result).toEqual(['C', 'E', 'G'])
  })

  test('CキーでⅠ度のminorコードを生成できる', () => {
    const key: Note = 'C'
    const degree: Degree = 'Ⅰ'
    const chordType: ChordType = 'minor'
    
    const result = generateChordNotesFromChrodType(key, degree, chordType)
    expect(result).toEqual(['C', 'D#', 'G'])
  })

  test('Bキーで7度のdimコードを生成できる', () => {
    const key: Note = 'B'
    const degree: Degree = 'Ⅶ'
    const chordType: ChordType = 'dim'
    
    const result = generateChordNotesFromChrodType(key, degree, chordType)
    expect(result).toEqual(['A#', 'C#', 'E'])
  })
})

describe('getExtensionChordNote', () => {
  test('CキーでⅠ度のmajorコードの7度の拡張和音を生成できる', () => {
    const key: Note = 'C'
    const degree: Degree = 'Ⅰ'
    const extension: Extension = '7'

    const result = getExtensionChordNote(key, degree, extension)
    expect(result).toEqual(['A#'])
  })

  test('Cキーで3度のmajorコードのmaj7度の拡張和音を生成できる', () => {
    const key: Note = 'C'
    const degree: Degree = 'Ⅲ'
    const extension: Extension = '7'

    const result = getExtensionChordNote(key, degree, extension)
    expect(result).toEqual(['D'])
  })
})

describe('getAddNoteChordNote', () => {
  test('CキーでⅠ度のmajorコードのadd9度の追加音を生成できる', () => {
    const key: Note = 'C'
    const degree: Degree = 'Ⅰ'
    const addNote: AddNote = 'add9'

    const result = getAddNoteChordNote(key, degree, addNote)
    expect(result).toEqual(['D'])
  })
})

describe('getBassNoteChordNote', () => {
  test('Cキーで3度のベース音を生成できる', () => {
    const key: Note = 'C'
    const degree: Degree = 'Ⅰ'
    const bassNote: Degree = 'Ⅲ'

    const result = getBassNoteChordNote(key, degree, bassNote)
    expect(result).toEqual(['E'])
  })
  test('Cキーで1度のベース音を生成できる', () => {
    const key: Note = 'C'
    const degree: Degree = 'Ⅰ'

    const result = getBassNoteChordNote(key, degree)
    expect(result).toEqual(['C'])
  })
})
