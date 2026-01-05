
import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home.component';
import { GameComponent } from './components/game.component';
import { StatsComponent } from './components/stats.component';
import { StorageService, SavedGameState } from './services/storage.service';

type ViewState = 'home' | 'game';

@Component({
  selector: 'app-root',
  imports: [CommonModule, HomeComponent, GameComponent, StatsComponent],
  template: `
    <main class="h-screen w-screen bg-stone-100 overflow-hidden font-sans relative">
      <!-- Underlying View (Home or Game) -->
      @if (currentView() === 'home') {
          <app-home 
            (startGame)="toGame()" 
            (resumeGame)="resumeGame()" 
            (viewStats)="toStats()">
          </app-home>
      } @else if (currentView() === 'game') {
          <app-game 
            [stage]="currentStage()" 
            [startScore]="runningTotal()"
            [initialState]="resumeState()"
            (requestRestart)="handleRestartGame()"
            (requestNextStage)="handleNextStage($event)"
            (requestStats)="toStats()">
          </app-game>
      }

      <!-- Stats Overlay -->
      @if (isStatsOpen()) {
        <div class="absolute inset-0 z-50 bg-stone-100 animate-fade-in">
          <app-stats (goBack)="closeStats()"></app-stats>
        </div>
      }
    </main>
  `,
  styles: [`
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .animate-fade-in {
      animation: fadeIn 0.2s ease-out forwards;
    }
  `]
})
export class AppComponent {
  storage = inject(StorageService);
  currentView = signal<ViewState>('home');
  isStatsOpen = signal(false);

  currentStage = signal<number>(1);
  resumeState = signal<SavedGameState | null>(null);
  
  // Tracks the cumulative score across stages
  runningTotal = signal<number>(0);

  toGame() {
    // Start fresh
    this.currentStage.set(1);
    this.runningTotal.set(0);
    this.resumeState.set(null);
    // Remove any old saves to ensure fresh start
    this.storage.clearGameState();
    this.currentView.set('game');
  }

  resumeGame() {
    this.storage.loadGameState().then(state => {
      if (state) {
        this.resumeState.set(state);
        this.currentStage.set(state.stage);
        this.runningTotal.set(state.totalScore); 
        this.currentView.set('game');
      } else {
        // Fallback if load fails
        this.toGame();
      }
    });
  }

  toStats() {
    this.isStatsOpen.set(true);
  }

  closeStats() {
    this.isStatsOpen.set(false);
  }

  toHome() {
    this.isStatsOpen.set(false);
    this.currentView.set('home');
  }

  handleRestartGame() {
    this.currentStage.set(1);
    this.runningTotal.set(0);
    this.resumeState.set(null);
    this.storage.clearGameState();
    
    // Force re-init by toggling view
    this.currentView.set('home');
    setTimeout(() => {
        this.currentView.set('game');
    }, 0);
  }

  handleNextStage(currentTotalScore: number) {
    // Update running total with the score from the finished stage
    this.runningTotal.set(currentTotalScore);
    
    const next = this.currentStage() + 1;
    this.currentStage.set(next);
    this.resumeState.set(null); // Clear resume state for next stage
  }
}
