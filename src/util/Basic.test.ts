import { describe, test, expect } from '@jest/globals'

import { getNoteIndex, getDegreeIndex } from './Basic'
import { note, degree } from '@/const/Basic'

describe('Basic.ts のテスト', () => {
  describe('getNoteIndex', () => {
    test('正しいノートのインデックスを返すこと', () => {
      expect(getNoteIndex('C')).toBe(0)
      expect(getNoteIndex('F#')).toBe(6)
      expect(getNoteIndex('B')).toBe(11)
    })

    test('全てのノートに対してテスト', () => {
      note.forEach((n, i) => {
        expect(getNoteIndex(n)).toBe(i)
      })
    })
  })

  describe('getDegreeIndex', () => {
    test('正しいディグリーのインデックスを返すこと', () => {
      expect(getDegreeIndex('Ⅰ')).toBe(0)
      expect(getDegreeIndex('Ⅳ')).toBe(3)
      expect(getDegreeIndex('Ⅶ')).toBe(6)
    })

    test('全てのディグリーに対してテスト', () => {
      degree.forEach((d, i) => {
        expect(getDegreeIndex(d)).toBe(i)
      })
    })
  })
})
