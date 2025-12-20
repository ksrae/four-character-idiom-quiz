
import { Component, inject, input, output, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, Idiom } from '../services/data.service';
import { StorageService, SavedGameState, GameResultDetail } from '../services/storage.service';

@Component({
  selector: 'app-game',
  imports: [CommonModule],
  template: `
    <div class="h-full flex flex-col max-w-2xl mx-auto p-4 relative font-sans">
      
      <!-- Top Bar: Score & Progress -->
      <div class="shrink-0 flex justify-between items-center mb-2 bg-white p-3 rounded-lg shadow-sm border border-stone-200">
        <div class="flex flex-col">
          <span class="text-xs text-stone-500 font-bold uppercase tracking-wider">Stage {{ stage() }}</span>
          <span class="text-sm text-stone-400 font-mono transition-all duration-300" [class.text-amber-500]="feedbackMode() === 'correct'">
            {{ displayIndex() }} / {{ questions().length }}
          </span>
        </div>
        <div class="text-2xl font-bold text-amber-600 font-mono transition-transform duration-300" [class.scale-125]="feedbackMode() === 'correct'">
          {{ totalScore() }} <span class="text-xs text-stone-400 font-sans">점</span>
        </div>
      </div>

      <!-- Game Area -->
      @if (!gameEnded()) {
        <!-- Middle Split Container -->
        <div class="flex-1 flex flex-col min-h-0 gap-3 mb-3 relative">
          
          <!-- Question Half -->
          <div 
             class="flex-1 bg-white rounded-xl shadow-md border-l-4 border-amber-500 p-4 flex flex-col justify-center items-center relative overflow-hidden transition-all duration-500"
             [class.animate-shake]="shakeEffect()"
             [class.opacity-0]="isTransitioning()">
             
             <div class="mb-3 text-base font-bold text-amber-600 bg-amber-50 px-3 py-0.5 rounded-full border border-amber-100 transition-colors"
                  [class.text-red-500]="shakeEffect()"
                  [class.bg-red-50]="shakeEffect()"
                  [class.border-red-100]="shakeEffect()">
               {{ currentQuestionScore() }}점
             </div>

             <h2 class="text-xl md:text-3xl font-bold text-stone-800 text-center leading-relaxed word-keep-all serif">
               "{{ currentQuestion().meaning }}"
             </h2>
          </div>

          <!-- Hints Half -->
          <div class="flex-1 flex flex-col gap-2 overflow-y-auto pr-1 transition-opacity duration-300" [class.opacity-50]="feedbackMode() === 'correct'">
            <!-- Hint 1 -->
            <button (click)="revealHint(1)" [disabled]="hint1Revealed() || feedbackMode() !== 'none'" 
              class="w-full p-3 rounded-lg border text-left flex justify-between items-center transition-colors shrink-0 shadow-sm"
              [class]="hint1Revealed() ? 'bg-stone-100 border-stone-200 text-stone-700' : 'bg-white border-stone-300 hover:bg-stone-50 text-stone-500'">
              <span class="font-bold text-sm">💡 힌트 1 (한자) <span class="text-xs font-normal opacity-70">-2점</span></span>
              @if (hint1Revealed()) {
                <span class="text-xl font-bold font-serif">{{ currentQuestion().hanja }}</span>
              } @else {
                <span class="text-xs bg-stone-200 px-2 py-1 rounded">터치하여 보기</span>
              }
            </button>

            @if (hint1Revealed()) {
              <button (click)="revealHint(2)" [disabled]="hint2Revealed() || feedbackMode() !== 'none'"
                class="w-full p-3 rounded-lg border text-left flex justify-between items-center transition-colors shrink-0 shadow-sm animate-fade-in"
                [class]="hint2Revealed() ? 'bg-stone-100 border-stone-200 text-stone-700' : 'bg-white border-stone-300 hover:bg-stone-50 text-stone-500'">
                <div class="flex-1 mr-2">
                  <span class="font-bold text-sm block mb-1">💡 힌트 2 (상황) <span class="text-xs font-normal opacity-70">-2점</span></span>
                  @if (hint2Revealed()) {
                    <span class="text-sm leading-tight block">{{ currentQuestion().situation }}</span>
                  }
                </div>
                @if (!hint2Revealed()) {
                  <span class="text-xs bg-stone-200 px-2 py-1 rounded whitespace-nowrap">터치하여 보기</span>
                }
              </button>
            }

            @if (hint2Revealed()) {
              <button (click)="revealHint(3)" [disabled]="hint3Revealed() || feedbackMode() !== 'none'"
                class="w-full p-3 rounded-lg border text-left flex justify-between items-center transition-colors shrink-0 shadow-sm animate-fade-in"
                [class]="hint3Revealed() ? 'bg-stone-100 border-stone-200 text-stone-700' : 'bg-white border-stone-300 hover:bg-stone-50 text-stone-500'">
                <div class="flex-1 mr-2">
                  <span class="font-bold text-sm block mb-1">💡 힌트 3 (결정적) <span class="text-xs font-normal opacity-70">-2점</span></span>
                   @if (hint3Revealed()) {
                    <span class="text-sm font-semibold text-amber-700 leading-tight block">{{ currentQuestion().criticalHint }}</span>
                  }
                </div>
                 @if (!hint3Revealed()) {
                  <span class="text-xs bg-stone-200 px-2 py-1 rounded whitespace-nowrap">터치하여 보기</span>
                }
              </button>
            }
          </div>

          <!-- Feedback Overlay -->
          @if (feedbackMode() === 'correct') {
            <div class="absolute inset-0 z-50 flex items-center justify-center animate-pop-in pointer-events-none">
              <div class="bg-green-500 text-white rounded-full p-8 shadow-2xl opacity-90 backdrop-blur-sm border-4 border-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-16 h-16">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
            </div>
          }
        </div>

        <!-- Bottom Fixed Area -->
        <div class="shrink-0 flex flex-col gap-3">
          <!-- Options -->
          <div class="grid grid-cols-2 gap-3">
            @for (opt of options(); track opt) {
              <button (click)="submitAnswer(opt)"
                [disabled]="wrongOptions().has(opt) || feedbackMode() !== 'none'"
                class="h-14 rounded-xl font-bold text-lg border-2 shadow-sm transition-all relative overflow-hidden"
                [class]="getOptionClass(opt)">
                {{ opt }}
              </button>
            }
          </div>

          <!-- Skip Button -->
          <button (click)="skipQuestion()" 
            [disabled]="feedbackMode() !== 'none'"
            class="w-full py-3 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
            <span>건너뛰기</span>
            <span class="bg-red-800 text-red-100 text-xs px-2 py-0.5 rounded-full">-5점</span>
          </button>
        </div>
      }

      <!-- Stage Clear -->
      @if (gameEnded()) {
        <div class="absolute inset-0 bg-white z-40 flex flex-col items-center justify-center p-6 text-center animate-fade-in">
          <div class="mb-6">
            <h2 class="text-3xl font-bold text-stone-800 mb-2 serif">Stage {{ stage() }} 종료</h2>
            <p class="text-stone-500">수고하셨습니다!</p>
          </div>

          <div class="bg-stone-50 p-8 rounded-full w-48 h-48 flex flex-col items-center justify-center border-4 border-amber-400 shadow-inner mb-8">
            <span class="text-stone-400 font-bold uppercase text-sm">Total Score</span>
            <span class="text-5xl font-bold text-stone-800 mt-1">{{ totalScore() }}</span>
          </div>

          <div class="flex flex-col gap-3 w-full max-w-xs">
            <button (click)="nextStageAction()" class="w-full py-3 bg-amber-500 text-white rounded-lg font-bold shadow hover:bg-amber-600 text-lg">
              다음 스테이지 도전 (Stage {{ stage() + 1 }})
            </button>
            <button (click)="retryStage()" class="w-full py-3 bg-stone-700 text-white rounded-lg font-bold shadow hover:bg-stone-600">
              이 스테이지 다시하기
            </button>
            <button (click)="goToStats()" class="w-full py-3 bg-stone-100 text-stone-600 rounded-lg font-bold hover:bg-stone-200">
              통계 보기
            </button>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(5px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
      animation: fadeIn 0.3s ease-out forwards;
    }
    
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20% { transform: translateX(-5px); }
      40% { transform: translateX(5px); }
      60% { transform: translateX(-5px); }
      80% { transform: translateX(5px); }
    }
    .animate-shake {
      animation: shake 0.4s ease-in-out;
    }

    @keyframes popIn {
      0% { transform: scale(0.5); opacity: 0; }
      50% { transform: scale(1.1); opacity: 1; }
      100% { transform: scale(1); opacity: 1; }
    }
    .animate-pop-in {
      animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    }
  `]
})
export class GameComponent {
  stage = input.required<number>();
  initialState = input<SavedGameState | null>(null);
  
  // Outputs
  requestRestart = output<void>();
  requestStats = output<void>();
  requestNextStage = output<void>();
  
  private dataService = inject(DataService);
  private storageService = inject(StorageService);

  // Game State Signals
  questions = signal<Idiom[]>([]);
  currentIndex = signal(0);
  currentQuestion = computed(() => this.questions()[this.currentIndex()]);
  displayIndex = computed(() => this.currentIndex() + 1); // For the UI "1/5"
  
  options = signal<string[]>([]);
  wrongOptions = signal<Set<string>>(new Set());
  
  totalScore = signal(0);
  currentQuestionScore = signal(10);
  
  // Track stats for current game
  gameResults = signal<GameResultDetail[]>([]);
  
  // Hint States
  hint1Revealed = signal(false);
  hint2Revealed = signal(false);
  hint3Revealed = signal(false);

  // UI Effects
  shakeEffect = signal(false);
  gameEnded = signal(false);
  feedbackMode = signal<'none' | 'correct' | 'wrong'>('none');
  isTransitioning = signal(false); // Used to fade out question before swap

  constructor() {
    // Setup listener for closing browser
    window.addEventListener('beforeunload', () => {
       if (!this.gameEnded()) {
         this.storageService.saveGameState(this.stage(), this.currentIndex(), this.totalScore());
       }
    });

    effect(() => {
      // If we have an initial state provided by resume, use it.
      // Otherwise load fresh data for the stage.
      const saved = this.initialState();
      // We only use the initial state if the stage matches what we requested
      if (saved && saved.stage === this.stage() && this.questions().length === 0) {
        this.restoreGame(saved);
      } else if (this.questions().length === 0) {
        // Only load fresh if not already loaded (prevents infinite loop with effect)
        this.loadStageData(this.stage());
      }
    });

    // Watch for stage changes specifically to reload if component stays alive
    effect(() => {
       const stg = this.stage();
       // If logic to check if stage changed significantly
    }, { allowSignalWrites: true });
  }

  loadStageData(stageLvl: number) {
    const qList = this.dataService.getQuestionsForStage(stageLvl);
    this.questions.set(qList);
    this.currentIndex.set(0);
    this.totalScore.set(0);
    this.gameResults.set([]);
    this.gameEnded.set(false);
    this.resetQuestionState();
    this.saveProgress();
  }

  restoreGame(saved: SavedGameState) {
    const qList = this.dataService.getQuestionsForStage(saved.stage);
    this.questions.set(qList);
    this.currentIndex.set(saved.currentIndex);
    this.totalScore.set(saved.totalScore);
    // Note: We don't have detailed question history in simple resume saveState
    // So we just start empty for results tracking in this session.
    this.gameResults.set([]); 
    this.gameEnded.set(false);
    this.resetQuestionState();
  }

  resetQuestionState() {
    this.currentQuestionScore.set(10);
    this.hint1Revealed.set(false);
    this.hint2Revealed.set(false);
    this.hint3Revealed.set(false);
    this.wrongOptions.set(new Set());
    this.shakeEffect.set(false);
    this.feedbackMode.set('none');
    this.isTransitioning.set(false);

    // Generate options
    const correct = this.currentQuestion().word;
    const distractors = this.dataService.getDistractors(this.currentQuestion().id);
    const allOpts = [correct, ...distractors];
    // Shuffle options locally
    for (let i = allOpts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allOpts[i], allOpts[j]] = [allOpts[j], allOpts[i]];
    }
    this.options.set(allOpts);
  }

  revealHint(hintNum: number) {
    let revealed = false;
    if (hintNum === 1 && !this.hint1Revealed()) {
      this.hint1Revealed.set(true);
      revealed = true;
    } else if (hintNum === 2 && !this.hint2Revealed() && this.hint1Revealed()) {
      this.hint2Revealed.set(true);
      revealed = true;
    } else if (hintNum === 3 && !this.hint3Revealed() && this.hint2Revealed()) {
      this.hint3Revealed.set(true);
      revealed = true;
    }

    if (revealed) {
      this.currentQuestionScore.update(s => Math.max(0, s - 2));
    }
  }

  getOptionClass(opt: string): string {
    const isWrong = this.wrongOptions().has(opt);
    const isCorrect = this.feedbackMode() === 'correct' && opt === this.currentQuestion().word;
    
    if (isCorrect) {
      return 'bg-green-500 border-green-600 text-white';
    }
    
    if (isWrong) {
      return 'bg-stone-100 border-stone-200 text-stone-300 cursor-not-allowed';
    }
    
    return 'bg-white border-stone-300 hover:border-amber-400 hover:bg-amber-50 active:bg-amber-100 text-stone-700';
  }

  submitAnswer(answer: string) {
    if (this.gameEnded() || this.feedbackMode() !== 'none') return;
    if (this.wrongOptions().has(answer)) return;

    const correct = this.currentQuestion().word;
    const qId = this.currentQuestion().id;

    if (answer === correct) {
      // Correct!
      this.totalScore.update(s => s + this.currentQuestionScore());
      this.feedbackMode.set('correct');
      
      // Track Result
      this.gameResults.update(res => [...res, { id: qId, isCorrect: true }]);

      // Delay to show animation, then next question
      setTimeout(() => {
        this.nextQuestion();
      }, 1500);

    } else {
      // Wrong
      this.wrongOptions.update(set => {
        const newSet = new Set(set);
        newSet.add(answer);
        return newSet;
      });

      const currentScore = this.currentQuestionScore();
      if (currentScore > 0) {
        this.currentQuestionScore.update(s => Math.max(0, s - 1));
      }
      
      this.shakeEffect.set(true);
      setTimeout(() => this.shakeEffect.set(false), 400);
      
      // Track wrong result if it's the first time we see this question wrong?
      // Actually, we usually track 'Result' as final outcome. 
      // If they eventually get it right, it counts as correct but low score.
      // But for stats purposes, let's say: if they made a mistake, we might want to know.
      // Simplification: We record the result when moving to next question.
    }
  }

  skipQuestion() {
    if (this.gameEnded() || this.feedbackMode() !== 'none') return;
    
    const qId = this.currentQuestion().id;
    this.totalScore.update(s => s - 5);
    
    // Track Result (Skipped counts as wrong for stats purposes usually)
    this.gameResults.update(res => [...res, { id: qId, isCorrect: false }]);

    // Slight visual feedback for skip
    this.isTransitioning.set(true);
    setTimeout(() => {
      this.nextQuestion();
    }, 300);
  }

  nextQuestion() {
    const idx = this.currentIndex();
    // Dynamic check for total questions (previously hardcoded to 9)
    if (idx < this.questions().length - 1) {
      this.isTransitioning.set(true); // Fade out old question
      
      setTimeout(() => {
        this.currentIndex.set(idx + 1);
        this.resetQuestionState(); // Transition new question in
        this.saveProgress();
      }, 300); 

    } else {
      this.finishStage();
    }
  }

  saveProgress() {
    if (!this.gameEnded()) {
      this.storageService.saveGameState(this.stage(), this.currentIndex(), this.totalScore());
    }
  }

  finishStage() {
    this.gameEnded.set(true);
    
    // Calculate stats
    const correctCount = this.gameResults().filter(r => r.isCorrect).length;
    const totalQ = this.questions().length; // Should be 5

    this.storageService.saveGameResult(
        this.stage(), 
        this.totalScore(), 
        correctCount, 
        totalQ,
        this.gameResults()
    );
    // Clear ongoing game since stage is done
    this.storageService.clearGameState();
  }

  nextStageAction() {
    this.requestNextStage.emit();
  }

  retryStage() {
    this.loadStageData(this.stage());
  }

  goToStats() {
    this.requestStats.emit();
  }
}
