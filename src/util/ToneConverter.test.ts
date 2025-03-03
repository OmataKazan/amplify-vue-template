import { describe, test, expect } from '@jest/globals'
import { convertChordToFrequencys } from './ToneConverter'
import { Chord } from '@/types/Chord'

describe('convertChordToFrequencys', () => {
  test('C, D, Eの和音を鳴らす', () => {
    const chord: Chord = {
        bassNote: ['C'],
        middleNote: ['D'],
        topNote: ['E']
    }
    const frequencys = convertChordToFrequencys(chord)
    expect(frequencys).toEqual([261.63, 293.66, 329.63])
  })
})