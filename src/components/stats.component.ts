
import { Component, inject, signal, effect, output, computed } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { StorageService, GameRecord, IdiomStat } from '../services/storage.service';
import { DataService } from '../services/data.service';

type SortKey = 'presented' | 'correct' | 'wrong';

@Component({
  selector: 'app-stats',
  imports: [CommonModule, DatePipe],
  template: `
    <div class="p-6 max-w-2xl mx-auto h-full overflow-y-auto">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-3xl font-bold text-stone-800 serif">나의 기록</h2>
        <button (click)="resetData()" class="text-stone-400 hover:text-red-500 transition-colors p-2" title="기록 초기화">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
        </button>
      </div>
      
      <div class="grid grid-cols-2 gap-4 mb-8">
        <div class="bg-white p-4 rounded-lg shadow border border-stone-200 text-center">
          <p class="text-stone-500 text-sm">총 플레이 횟수</p>
          <p class="text-3xl font-bold text-amber-600">{{ totalGames() }}</p>
        </div>
        <div class="bg-white p-4 rounded-lg shadow border border-stone-200 text-center">
          <p class="text-stone-500 text-sm">평균 점수</p>
          <p class="text-2xl font-bold text-amber-600">{{ averageScoreDisplay() }}</p>
        </div>
      </div>

      <div class="mb-8">
        <h3 class="text-xl font-bold text-stone-700 mb-3">문제 분석</h3>
        @if (idiomStats().length === 0) {
           <div class="text-center py-6 text-stone-400 bg-white rounded-lg border border-dashed border-stone-300">
            데이터가 없습니다.
           </div>
        } @else {
          <div class="bg-white rounded-lg shadow overflow-hidden border border-stone-200 overflow-x-auto">
            <table class="w-full text-left text-sm">
              <thead class="bg-stone-100 text-stone-600 uppercase font-bold">
                <tr>
                  <th class="p-3">사자성어</th>
                  <th class="p-3 text-center cursor-pointer hover:text-amber-600" (click)="setSort('presented')">
                    제출 ▼
                  </th>
                  <th class="p-3 text-center cursor-pointer hover:text-amber-600" (click)="setSort('correct')">
                    정답 ▼
                  </th>
                  <th class="p-3 text-center cursor-pointer hover:text-amber-600" (click)="setSort('wrong')">
                    오답 ▼
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-stone-100">
                @for (stat of sortedIdiomStats(); track stat.id) {
                  <tr class="hover:bg-stone-50">
                    <td class="p-3 font-medium text-stone-800">
                      {{ getWord(stat.id) }}
                      <span class="block text-xs text-stone-400 font-normal">{{ getMeaning(stat.id) }}</span>
                    </td>
                    <td class="p-3 text-center">{{ stat.presented }}</td>
                    <td class="p-3 text-center text-green-600 font-bold">{{ stat.correct }}</td>
                    <td class="p-3 text-center text-red-500">{{ stat.wrong }}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        }
      </div>

      <h3 class="text-xl font-bold text-stone-700 mb-3">최근 기록</h3>
      @if (records().length === 0) {
        <div class="text-center py-10 text-stone-400 bg-white rounded-lg border border-dashed border-stone-300">
          아직 기록이 없습니다. 게임을 시작해보세요!
        </div>
      } @else {
        <div class="bg-white rounded-lg shadow overflow-hidden border border-stone-200">
          <table class="w-full text-left">
            <thead class="bg-stone-100 text-stone-600 text-sm uppercase">
              <tr>
                <th class="p-3">날짜</th>
                <th class="p-3">스테이지</th>
                <th class="p-3 text-right">점수</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-stone-100">
              @for (record of records(); track record.timestamp) {
                <tr class="hover:bg-stone-50">
                  <td class="p-3 text-sm text-stone-600">{{ record.timestamp | date:'MM.dd HH:mm' }}</td>
                  <td class="p-3 font-medium text-stone-800">Stage {{ record.stage }}</td>
                  <td class="p-3 text-right font-bold text-amber-600">
                     {{ record.totalScore }}
                     @if (record.totalQuestions) {
                       <span class="text-xs text-stone-400 font-normal">({{record.correctCount}}/{{record.totalQuestions}})</span>
                     }
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      }

      <div class="mt-8 text-center">
        <button (click)="goHome.emit()" class="px-8 py-3 bg-stone-700 text-white rounded-full shadow hover:bg-stone-600 transition font-bold">
          메인으로 돌아가기
        </button>
      </div>
    </div>
  `
})
export class StatsComponent {
  storage = inject(StorageService);
  dataService = inject(DataService);
  goHome = output<void>();

  records = signal<GameRecord[]>([]);
  idiomStats = signal<IdiomStat[]>([]);
  
  // Sorting
  sortKey = signal<SortKey>('wrong'); // Default sort by wrong
  sortDesc = signal(true);

  totalGames = signal(0);
  averageScoreDisplay = signal('-');

  sortedIdiomStats = computed(() => {
    const stats = [...this.idiomStats()];
    const key = this.sortKey();
    const desc = this.sortDesc();

    return stats.sort((a, b) => {
      const valA = a[key];
      const valB = b[key];
      return desc ? valB - valA : valA - valB;
    });
  });

  constructor() {
    effect(() => {
      // Trigger reload when signal in service changes
      this.storage.statsUpdated(); 
      this.loadStats();
    });
  }

  loadStats() {
    // Load Game Records
    this.storage.getAllStats().then(data => {
      const sorted = data.sort((a, b) => b.timestamp - a.timestamp);
      this.records.set(sorted);
      
      this.totalGames.set(sorted.length);
      if (sorted.length > 0) {
        const totalScore = sorted.reduce((acc, cur) => acc + cur.totalScore, 0);
        const avgScore = Math.round(totalScore / sorted.length);

        // Calculate average Correct / Total
        let totalCorrect = 0;
        let totalQuestions = 0;
        let hasDetail = false;

        sorted.forEach(r => {
          if (r.totalQuestions) {
             hasDetail = true;
             totalCorrect += r.correctCount;
             totalQuestions += r.totalQuestions;
          }
        });

        if (hasDetail && sorted.length > 0) {
             const avgCorrect = (totalCorrect / sorted.length).toFixed(1);
             const avgTotal = (totalQuestions / sorted.length).toFixed(0);
             // Remove .0 if it's integer
             const displayCorrect = avgCorrect.endsWith('.0') ? avgCorrect.slice(0, -2) : avgCorrect;
             this.averageScoreDisplay.set(`${avgScore}점 (${displayCorrect}/${avgTotal})`);
        } else {
             this.averageScoreDisplay.set(`${avgScore}점`);
        }

      } else {
        this.averageScoreDisplay.set('-');
      }
    });

    // Load Idiom Stats
    this.storage.getIdiomStats().then(stats => {
      this.idiomStats.set(stats);
    });
  }

  setSort(key: SortKey) {
    if (this.sortKey() === key) {
      this.sortDesc.update(d => !d);
    } else {
      this.sortKey.set(key);
      this.sortDesc.set(true); // Default to desc for new key
    }
  }

  getWord(id: number): string {
    return this.dataService.getIdiom(id)?.word || 'Unknown';
  }

  getMeaning(id: number): string {
    const m = this.dataService.getIdiom(id)?.meaning || '';
    return m.length > 20 ? m.substring(0, 20) + '...' : m;
  }

  resetData() {
    if (confirm('모든 게임 기록을 삭제하시겠습니까? 복구할 수 없습니다.')) {
      this.storage.resetAllData();
    }
  }
}
