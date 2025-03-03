import { Chord } from '@/types/Chord'
import { generateChordNotes } from './Chord'
import * as Tone from "tone";

const synth = new Tone.PolySynth().toDestination();

export const convertChordToFrequencys = (chord: Chord): Tone.Unit.Frequency[] => {
    // ベース音は3オクターブ目
    const bassNotes = chord.bassNote.map(note => {
        const noteName = note.replace(/[0-9]/g, '');
        const octave = parseInt(note.replace(/[^0-9]/g, ''));
        return `${noteName}${octave + 3}`;
    });
    // 中音は4オクターブ目
    const middleNotes = chord.middleNote.map(note => {
        const noteName = note.replace(/[0-9]/g, '');
        const octave = parseInt(note.replace(/[^0-9]/g, ''));
        return `${noteName}${octave + 4}`;
    });
    // 上音は5オクターブ目
    const topNotes = chord.topNote.map(note => {
        const noteName = note.replace(/[0-9]/g, '');
        const octave = parseInt(note.replace(/[^0-9]/g, ''));
        return `${noteName}${octave + 5}`;
    });
    return [...bassNotes, ...middleNotes, ...topNotes];
}