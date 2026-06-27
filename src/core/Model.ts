import type { SpinResult } from "./SpinService";

export class GameModel {
  private _balance: number = 0;
  private _bet: number = 0;
  private _currentGrid: string[][] = [];
  private _lastWin: SpinResult["win"] | null = null;

  // Json data model init (Ініціалізуємо модель даними з JSON)
  public initConfig(balance: number, bet: number) {
    this._balance = balance;
    this._bet = bet;
    // Creating 5x3 matrix for start (Створюємо порожню матрицю 5х3 для старту)
    this._currentGrid = Array(3)
      .fill(null)
      .map(() => Array(5).fill("?"));
  }

  get balance(): number {
    return this._balance;
  }
  get bet(): number {
    return this._bet;
  }
  get currentGrid(): string[][] {
    return this._currentGrid;
  }
  get lastWin() {
    return this._lastWin;
  }

  public deductBet(): boolean {
    if (this._balance >= this._bet) {
      this._balance -= this._bet;
      return true;
    }
    return false;
  }

  public applySpinResult(spinData: SpinResult): void {
    this._currentGrid = spinData.matrix;
    this._lastWin = spinData.win;
    this._balance += spinData.win.amount; // Додаємо виграш
  }
}
