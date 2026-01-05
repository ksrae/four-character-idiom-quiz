
import { Injectable, signal } from '@angular/core';

export interface GameRecord {
  timestamp: number;
  stage: number;
  stageScore: number; // Score earned in this specific stage
  totalScore: number; // Cumulative score up to this stage
  correctCount: number;
  totalQuestions: number;
}

export interface SavedGameState {
  stage: number;
  currentIndex: number;
  totalScore: number;
  timestamp: number;
}

export interface IdiomStat {
  id: number;
  presented: number;
  correct: number;
  wrong: number;
}

export interface GameResultDetail {
  id: number;
  isCorrect: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private dbName = 'SajeoseongEoDB';
  private statsStore = 'gameStats';
  private ongoingStore = 'ongoingGame';
  private idiomStatsStore = 'idiomStats';
  private db: IDBDatabase | null = null;
  
  // Signal to notify components when stats update
  statsUpdated = signal<number>(0);

  constructor() {
    this.initDB();
  }

  private initDB() {
    // Increased version to 4 for stageScore addition
    const request = indexedDB.open(this.dbName, 4); 

    request.onerror = (event) => {
      console.error('Database error:', event);
    };

    request.onupgradeneeded = (event: any) => {
      const db = event.target.result;
      
      // Store for Game Sessions
      if (!db.objectStoreNames.contains(this.statsStore)) {
        db.createObjectStore(this.statsStore, { keyPath: 'timestamp' });
      }
      
      // Store for Current Progress
      if (!db.objectStoreNames.contains(this.ongoingStore)) {
        db.createObjectStore(this.ongoingStore, { keyPath: 'id' });
      }

      // Store for Individual Idiom Statistics
      if (!db.objectStoreNames.contains(this.idiomStatsStore)) {
        db.createObjectStore(this.idiomStatsStore, { keyPath: 'id' });
      }
    };

    request.onsuccess = (event: any) => {
      this.db = event.target.result;
    };
  }

  // --- Statistics Methods ---

  saveGameResult(stage: number, totalScore: number, stageScore: number, correctCount: number, totalQuestions: number, results: GameResultDetail[]) {
    if (!this.db) return;
    
    const transaction = this.db.transaction([this.statsStore, this.idiomStatsStore], 'readwrite');
    
    // 1. Save Game Record
    const recordStore = transaction.objectStore(this.statsStore);
    const record: GameRecord = {
      timestamp: Date.now(),
      stage,
      stageScore,
      totalScore,
      correctCount,
      totalQuestions
    };
    recordStore.add(record);

    // 2. Update Idiom Stats
    const idiomStore = transaction.objectStore(this.idiomStatsStore);
    
    results.forEach(res => {
      const request = idiomStore.get(res.id);
      request.onsuccess = () => {
        const data = request.result as IdiomStat | undefined;
        let stat: IdiomStat;
        
        if (data) {
          stat = data;
        } else {
          stat = { id: res.id, presented: 0, correct: 0, wrong: 0 };
        }
        
        stat.presented++;
        if (res.isCorrect) {
          stat.correct++;
        } else {
          stat.wrong++;
        }
        
        idiomStore.put(stat);
      };
    });
    
    transaction.oncomplete = () => {
      this.statsUpdated.update(v => v + 1);
    };
  }

  getAllStats(): Promise<GameRecord[]> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        setTimeout(() => {
           if (!this.db) {
             resolve([]);
             return;
           }
           this._fetchStats(resolve, reject);
        }, 500);
        return;
      }
      this._fetchStats(resolve, reject);
    });
  }

  private _fetchStats(resolve: any, reject: any) {
    const transaction = this.db!.transaction([this.statsStore], 'readonly');
    const store = transaction.objectStore(this.statsStore);
    const request = store.getAll();

    request.onsuccess = () => {
      resolve(request.result || []);
    };
    request.onerror = () => {
      reject('Failed to fetch stats');
    };
  }

  getIdiomStats(): Promise<IdiomStat[]> {
    return new Promise((resolve) => {
       if (!this.db) {
         resolve([]); 
         return;
       }
       const transaction = this.db.transaction([this.idiomStatsStore], 'readonly');
       const store = transaction.objectStore(this.idiomStatsStore);
       const request = store.getAll();
       request.onsuccess = () => resolve(request.result || []);
       request.onerror = () => resolve([]);
    });
  }

  // --- Ongoing Game Methods ---

  saveGameState(stage: number, currentIndex: number, totalScore: number) {
    if (!this.db) return;
    const transaction = this.db.transaction([this.ongoingStore], 'readwrite');
    const store = transaction.objectStore(this.ongoingStore);
    
    store.put({
      id: 'current',
      stage,
      currentIndex,
      totalScore,
      timestamp: Date.now()
    });
  }

  loadGameState(): Promise<SavedGameState | null> {
    return new Promise((resolve) => {
      if (!this.db) {
        setTimeout(() => {
          if (!this.db) { resolve(null); return; }
          this._loadGameState(resolve);
        }, 500);
        return;
      }
      this._loadGameState(resolve);
    });
  }

  private _loadGameState(resolve: (val: SavedGameState | null) => void) {
    const transaction = this.db!.transaction([this.ongoingStore], 'readonly');
    const store = transaction.objectStore(this.ongoingStore);
    const request = store.get('current');

    request.onsuccess = () => {
      const data = request.result;
      if (data) {
        // Check expiration (1 week = 7 * 24 * 60 * 60 * 1000 ms)
        const oneWeekMs = 604800000;
        if (Date.now() - data.timestamp > oneWeekMs) {
          this.clearGameState();
          resolve(null);
        } else {
          resolve(data as SavedGameState);
        }
      } else {
        resolve(null);
      }
    };
    request.onerror = () => resolve(null);
  }

  clearGameState() {
    if (!this.db) return;
    const transaction = this.db.transaction([this.ongoingStore], 'readwrite');
    const store = transaction.objectStore(this.ongoingStore);
    store.delete('current');
  }

  resetAllData() {
    if (!this.db) return;
    const transaction = this.db.transaction([this.statsStore, this.idiomStatsStore, this.ongoingStore], 'readwrite');
    transaction.objectStore(this.statsStore).clear();
    transaction.objectStore(this.idiomStatsStore).clear();
    transaction.objectStore(this.ongoingStore).clear();
    
    transaction.oncomplete = () => {
      this.statsUpdated.update(v => v + 1);
    };
  }
}
