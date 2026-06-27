// JSON Type 
export interface WinLine {
  payline: number;
  symbol: string;
  count: number;
  positions: number[][]; // [col, row]
}

export interface SpinResult {
  id: number;
  matrix: string[][];
  win: {
    amount: number;
    lines?: WinLine[];
    scatterCount?: number;
    bonusTriggered?: boolean;
  };
}

export interface GameData {
  gameConfig: { rows: number; columns: number; bet: number; balance: number };
  symbols: any[];
  paylines: any[];
  spins: SpinResult[];
}

export class SpinService {
  private gameData!: GameData;
  private currentSpinIndex = 0;

  public async loadData(): Promise<void> {
    try {
      const response = await fetch("/spins.json");
      this.gameData = await response.json();
      console.log("Дані гри завантажено:", this.gameData);
    } catch (error) {
      console.error("Помилка завантаження spins.json:", error);
    }
  }

  public get config() {
    return this.gameData.gameConfig;
  }

  public getNextSpin(): SpinResult {
    if (!this.gameData || !this.gameData.spins.length) {
      throw new Error("Дані ще не завантажені");
    }

    const result = this.gameData.spins[this.currentSpinIndex];
    this.currentSpinIndex =
      (this.currentSpinIndex + 1) % this.gameData.spins.length;

    return result;
  }
}
