// 3和音のインターバル
export type ChordIntervals = {
  [K in ChordType]: number[]
}
// 4和音のインターバル
export type ExtensionIntervals = {
    [K in Extension]: number[] 
}

// 追加音のインターバル
export type AddNoteIntervals = {
    [K in AddNote]: number[]
}

export type DegreeIntervals = {
    [K in Degree]: number
}