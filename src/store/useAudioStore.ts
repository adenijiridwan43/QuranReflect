import { create } from 'zustand';
import * as FileSystem from 'expo-file-system/legacy';
import { createAudioPlayer, setAudioModeAsync, AudioPlayer } from 'expo-audio';

export interface Reciter {
  id: string;
  name: string;
  style: string;
}

export const AVAILABLE_RECITERS: Reciter[] = [
  { id: 'mishaari_raashid_al_3afaasee', name: 'Mishary Rashid Alafasy', style: 'Murattal' },
  { id: 'abdurrahmaan_as_sudays', name: 'Abdur-Rahman As-Sudais', style: 'Murattal' },
  { id: 'sa3ood_ash-shuraym', name: 'Saud Ash-Shuraym', style: 'Murattal' },
  { id: 'ahmed_ibn_3ali_al-3ajamy', name: 'Ahmed Ibn Ali Al-Ajmy', style: 'Murattal' },
];

export const AUDIO_DIR = FileSystem.documentDirectory + 'surahs/';

interface AudioState {
  // State
  selectedReciter: Reciter;
  playingSurahId: number | null;
  isPlaying: boolean;
  isDownloading: boolean;
  downloadProgress: number;
  soundObject: AudioPlayer | null;

  // Actions
  setReciter: (reciter: Reciter) => void;
  // Flow
  checkIfDownloaded: (surahId: number, reciterId: string) => Promise<boolean>;
  downloadSurah: (surahId: number) => Promise<void>;
  playSurah: (surahId: number) => Promise<void>;
  pauseSurah: () => Promise<void>;
  resumeSurah: () => Promise<void>;
  stopSurah: () => Promise<void>;
}

export const useAudioStore = create<AudioState>((set, get) => ({
  selectedReciter: AVAILABLE_RECITERS[0],
  playingSurahId: null,
  isPlaying: false,
  isDownloading: false,
  downloadProgress: 0,
  soundObject: null,

  setReciter: (reciter) => set({ selectedReciter: reciter }),

  checkIfDownloaded: async (surahId: number, reciterId: string) => {
    const fileUri = `${AUDIO_DIR}${reciterId}_${surahId}.mp3`;
    const info = await FileSystem.getInfoAsync(fileUri);
    return info.exists;
  },

  downloadSurah: async (surahId: number) => {
    const { selectedReciter } = get();
    const paddedSurah = String(surahId).padStart(3, '0');
    const url = `https://download.quranicaudio.com/quran/${selectedReciter.id}/${paddedSurah}.mp3`;
    const fileUri = `${AUDIO_DIR}${selectedReciter.id}_${surahId}.mp3`;

    // Ensure directory exists
    const dirInfo = await FileSystem.getInfoAsync(AUDIO_DIR);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(AUDIO_DIR, { intermediates: true });
    }

    set({ isDownloading: true, downloadProgress: 0 });

    const downloadResumable = FileSystem.createDownloadResumable(
      url,
      fileUri,
      {},
      (downloadProgress) => {
        const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
        set({ downloadProgress: progress });
      }
    );

    try {
      await downloadResumable.downloadAsync();
      set({ isDownloading: false, downloadProgress: 1 });
    } catch (e) {
      console.error(e);
      set({ isDownloading: false, downloadProgress: 0 });
    }
  },

  playSurah: async (surahId: number) => {
    const { soundObject: currentSound, selectedReciter, stopSurah } = get();
    
    // Stop any existing audio
    if (currentSound) {
      await stopSurah();
    }

    set({ playingSurahId: surahId });

    // Check if offline file exists
    const fileUri = `${AUDIO_DIR}${selectedReciter.id}_${surahId}.mp3`;
    const check = await FileSystem.getInfoAsync(fileUri);
    let playbackUrl = fileUri;

    // Stream if not downloaded
    if (!check.exists) {
      const paddedSurah = String(surahId).padStart(3, '0');
      playbackUrl = `https://download.quranicaudio.com/quran/${selectedReciter.id}/${paddedSurah}.mp3`;
    }

    try {
      // expo-audio global configuration
      await setAudioModeAsync({
        playsInSilentMode: true,
        shouldPlayInBackground: true,
        interruptionMode: 'doNotMix',
      });

      // Create new player
      const player = createAudioPlayer(playbackUrl);
      
      // Add status listener for completion
      player.addListener('playbackStatusUpdate', (status) => {
        if (status.didJustFinish) {
          set({ isPlaying: false, playingSurahId: null });
        }
      });

      player.play();
      set({ soundObject: player, isPlaying: true });
    } catch (e) {
      console.error('Error playing surah', e);
      set({ isPlaying: false, playingSurahId: null });
    }
  },

  pauseSurah: async () => {
    const { soundObject } = get();
    if (soundObject) {
      soundObject.pause();
      set({ isPlaying: false });
    }
  },

  resumeSurah: async () => {
    const { soundObject } = get();
    if (soundObject) {
      soundObject.play();
      set({ isPlaying: true });
    }
  },

  stopSurah: async () => {
    const { soundObject } = get();
    if (soundObject) {
      soundObject.pause();
      soundObject.remove();
      set({ soundObject: null, isPlaying: false, playingSurahId: null });
    }
  }
}));

