import { GameModel } from "./Model";
import { GameView } from "./View";
import { SpinService } from "./SpinService";

export class GameController {
  private model: GameModel;
  private view: GameView;
  private spinService: SpinService;

  constructor(model: GameModel, view: GameView) {
    this.model = model;
    this.view = view;
    this.spinService = new SpinService();
  }

  // Async for json waiting (Метод тепер асинхронний, щоб дочекатися JSON)
  public async init(): Promise<void> {
    // 1. JSON loading (Завантажуємо JSON)
    await this.spinService.loadData();

    // 2. Setting model json data (Налаштовуємо модель даними з JSON)
    this.model.initConfig(
      this.spinService.config.balance,
      this.spinService.config.bet,
    );

    // 3. View init (Ініціалізуємо View)
    this.view.init(() => this.handleSpin());
    this.view.ui.updateBalance(this.model.balance);
    this.view.ui.updateBet(this.model.bet);
  }

  private handleSpin(): void {
    if (!this.model.deductBet()) {
      alert("Недостатньо балансу!");
      return;
    }

    this.view.ui.updateBalance(this.model.balance);
    this.view.ui.setSpinEnabled(false);
    this.view.reels.resetHighlights(); // reset old backlights(Скидаємо стару підсвітку)
    this.view.ui.hideWin(); // hide prew win

    const spinData = this.spinService.getNextSpin();

    setTimeout(() => {
      this.model.applySpinResult(spinData);
      this.view.ui.updateBalance(this.model.balance);
      this.view.ui.setSpinEnabled(true);

      // 1. Refresh grid with json 
      this.view.reels.updateGrid(this.model.currentGrid);

      // 2. If we win - light starts now!
      if (spinData.win.lines && spinData.win.lines.length > 0) {
        spinData.win.lines.forEach((line: { positions: number[][] }) => {
          this.view.reels.highlightPositions(line.positions);
        });
      }

      // If we win - show how much! (if win > 0) 
      if (spinData.win.amount > 0) {
        this.view.ui.showWin(spinData.win.amount);
      }
    }, 1500);
  }
}
