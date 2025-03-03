/**
 * 音楽理論の基本的な定数を定義したファイルです。
 * 
 * これらの定数は、和音の生成や音階の操作などの
 * 音楽理論に関する処理で使用されます。
 */


import type {
    Degree, Note
} from "@/types/Basic"

export const degree: Degree[] = ["Ⅰ", "Ⅱ", "Ⅲ", "Ⅳ", "Ⅴ", "Ⅵ", "Ⅶ"]

export const note: Note[] = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
