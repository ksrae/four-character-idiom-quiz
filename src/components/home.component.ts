
import { Component, output, inject, signal, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  template: `
    <div class="h-full flex flex-col items-center justify-center p-6 text-center bg-[url('https://www.transparenttextures.com/patterns/korean-pattern.png')]">
      
      <div class="mb-12 animate-float">
        <span class="inline-block bg-stone-800 text-amber-400 px-4 py-1 rounded-full text-xs font-bold tracking-[0.2em] mb-4">QUIZ APP</span>
        <h1 class="text-5xl md:text-6xl font-bold text-stone-900 mb-2 serif leading-tight">
          사자성어<br><span class="text-amber-600">마스터</span>
        </h1>
        <p class="text-stone-500 mt-4 text-lg">지혜를 쌓는 10단계 도전</p>
      </div>

      <div class="flex flex-col gap-4 w-full max-w-xs">
        @if (hasSavedGame()) {
          <button (click)="resumeGame.emit()" 
            class="relative overflow-hidden group bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg transition-transform hover:-translate-y-1 active:scale-95 mb-2">
            <span class="relative z-10 flex items-center justify-center gap-2">
              <span>▶</span> 이어서 하기
            </span>
          </button>
        }

        <button (click)="startGame.emit()" 
          class="relative overflow-hidden group bg-amber-500 hover:bg-amber-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg transition-transform hover:-translate-y-1 active:scale-95">
          <span class="relative z-10">{{ hasSavedGame() ? '새 게임 시작' : '게임 시작' }}</span>
        </button>

        <button (click)="viewStats.emit()" 
          class="bg-white hover:bg-stone-50 text-stone-700 py-4 rounded-xl font-bold text-lg shadow border border-stone-200 transition-colors">
          통계 보기
        </button>
      </div>

      <div class="mt-16 text-stone-400 text-sm">
        <p>오늘의 사자성어로 당신의 어휘력을 높이세요.</p>
      </div>
    </div>
  `,
  styles: [`
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    .animate-float {
      animation: float 4s ease-in-out infinite;
    }
  `]
})
export class HomeComponent implements OnInit {
  startGame = output<void>();
  viewStats = output<void>();
  resumeGame = output<void>();

  storage = inject(StorageService);
  hasSavedGame = signal(false);

  ngOnInit() {
    this.storage.loadGameState().then(state => {
      this.hasSavedGame.set(!!state);
    });
  }
}
