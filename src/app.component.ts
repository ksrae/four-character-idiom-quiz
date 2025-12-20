
import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home.component';
import { GameComponent } from './components/game.component';
import { StatsComponent } from './components/stats.component';
import { StorageService, SavedGameState } from './services/storage.service';

type ViewState = 'home' | 'game' | 'stats';

@Component({
  selector: 'app-root',
  imports: [CommonModule, HomeComponent, GameComponent, StatsComponent],
  template: `
    <main class="h-screen w-screen bg-stone-100 overflow-hidden font-sans">
      @switch (currentView()) {
        @case ('home') {
          <app-home 
            (startGame)="toGame()" 
            (resumeGame)="resumeGame()" 
            (viewStats)="toStats()">
          </app-home>
        }
        @case ('game') {
          <app-game 
            [stage]="currentStage()" 
            [initialState]="resumeState()"
            (requestRestart)="handleRestartGame()"
            (requestNextStage)="handleNextStage()"
            (requestStats)="toStats()">
          </app-game>
        }
        @case ('stats') {
          <app-stats (goHome)="toHome()"></app-stats>
        }
      }
    </main>
  `
})
export class AppComponent {
  storage = inject(StorageService);
  currentView = signal<ViewState>('home');
  currentStage = signal<number>(1);
  resumeState = signal<SavedGameState | null>(null);

  toGame() {
    // Start fresh
    this.currentStage.set(1);
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
        this.currentView.set('game');
      } else {
        // Fallback if load fails
        this.toGame();
      }
    });
  }

  toStats() {
    this.currentView.set('stats');
  }

  toHome() {
    this.currentView.set('home');
  }

  handleRestartGame() {
    this.currentStage.set(1);
    this.resumeState.set(null);
    this.storage.clearGameState();
    
    // Force re-init
    this.currentView.set('home');
    setTimeout(() => {
        this.currentView.set('game');
    }, 0);
  }

  handleNextStage() {
    const next = this.currentStage() + 1;
    this.currentStage.set(next);
    this.resumeState.set(null); // Clear resume state for next stage
    
    // Re-trigger component? No, GameComponent watches stage input.
    // However, we want to ensure clean state. 
    // The GameComponent effect will trigger on stage change.
  }
}
