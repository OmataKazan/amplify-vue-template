/**
 * コードの構成要素（コードタイプ、拡張、アドノート）と
 * その音程を定義したファイルです。
 * 
 * 音程は半音単位でルート音からの間隔として表現されています。
 */
import type { 
    ChordType,
    Extension,
    AddNote
} from '@/types/Basic'

import type {
    ChordIntervals, ExtensionIntervals, AddNoteIntervals, DegreeIntervals
} from '@/types/Interval'

export const chordType: ChordType[] = ["major", "minor", "dim", "aug"]

export const CHORD_INTERVALS: ChordIntervals = {
    major: [0, 4, 7],
    minor: [0, 3, 7], 
    dim: [0, 3, 6],
    aug: [0, 4, 8],
} as const;

export const extension: Extension[] = ["7",  "maj7"]
export const extensionIntervals: ExtensionIntervals =  {
    "7": [10],
    "maj7": [11],
    "6": [9]
} as const;

export const addNote: AddNote[] = ["add9","add11", "add13"]
export const addNoteIntervals: AddNoteIntervals =  {
    "add9": [14],
    "add11": [16],
    "add13": [18]
} as const;

export const degreeIntervals: DegreeIntervals = {
    "Ⅰ": 0,
    "Ⅱ": 2,
    "Ⅲ": 4,
    "Ⅳ": 5,
    "Ⅴ": 7,
    "Ⅵ": 9,
    "Ⅶ": 11
} as const;