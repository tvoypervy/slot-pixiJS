import { Container } from "pixi.js";
import { Reel } from "./Reel";
import { GAME_CONFIG } from "../config/gameConfig";

export class ReelsContainer extends Container {
  private reels: Reel[] = [];

  constructor() {
    super();
    this.position.set(GAME_CONFIG.reelsPosition.x, GAME_CONFIG.reelsPosition.y);
    this.initReels();
  }

  private initReels(): void {
    for (let i = 0; i < GAME_CONFIG.grid.cols; i++) {
      const reel = new Reel(i);
      this.reels.push(reel);
      this.addChild(reel);
    }
  }

  // Парсимо матрицю (рядки в колонки) і передаємо в барабани
  public updateGrid(matrix: string[][]): void {
    for (let col = 0; col < GAME_CONFIG.grid.cols; col++) {
      const reelSymbols: string[] = [];
      for (let row = 0; row < GAME_CONFIG.grid.rows; row++) {
        reelSymbols.push(matrix[row][col]);
      }
      this.reels[col].setSymbols(reelSymbols);
    }
  }
  // тут трохи по підсвітці
  public resetHighlights(): void {
    this.reels.forEach((reel) => {
      for (let row = 0; row < GAME_CONFIG.grid.rows; row++) {
        reel.highlightSymbol(row, false);
      }
    });
  }

  // Ще трохи підсвітка
  public highlightPositions(positions: number[][]): void {
    positions.forEach((pos) => {
      const [col, row] = pos; // JSON віддає координати у форматі [col, row]
      if (this.reels[col]) {
        this.reels[col].highlightSymbol(row, true);
      }
    });
  }
}
