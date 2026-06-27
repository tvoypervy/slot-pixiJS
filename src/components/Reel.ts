import { Container, Graphics, Text } from "pixi.js";
import { GAME_CONFIG } from "../config/gameConfig";

export class Reel extends Container {
  private symbolTexts: Text[] = [];
  private symbolBgs: Graphics[] = [];

  constructor(reelIndex: number) {
    super();
    this.initReel(reelIndex);
  }

  private initReel(reelIndex: number): void {
    this.x = reelIndex * (GAME_CONFIG.symbol.width + GAME_CONFIG.symbol.gap);

    for (let i = 0; i < GAME_CONFIG.grid.rows; i++) {
      const symbolContainer = new Container();
      symbolContainer.y =
        i * (GAME_CONFIG.symbol.height + GAME_CONFIG.symbol.gap);

      // Тло символу
      const bg = new Graphics();
      bg.roundRect(
        0,
        0,
        GAME_CONFIG.symbol.width,
        GAME_CONFIG.symbol.height,
        15,
      );
      bg.fill({ color: 0xffffff });
      bg.tint = 0x2a2a36;

      // Текст символу
      const text = new Text({
        text: "?",
        style: { fontSize: 32, fill: "#ffffff", fontWeight: "bold" },
      });
      text.anchor.set(0.5);
      text.position.set(
        GAME_CONFIG.symbol.width / 2,
        GAME_CONFIG.symbol.height / 2,
      );

      symbolContainer.addChild(bg);
      symbolContainer.addChild(text);

      // Зберігаємо посилання на елементи, щоб змінювати їх пізніше 
      this.symbolBgs.push(bg);
      this.symbolTexts.push(text);
      this.addChild(symbolContainer);
    }
  }

  // Метод для оновлення символів (приймає масив з 3 літер)
  public setSymbols(symbols: string[]): void {
    symbols.forEach((sym, index) => {
      if (this.symbolTexts[index]) {
        // Зменшуємо шрифт для довгих слів типу SCATTER
        this.symbolTexts[index].style.fontSize = sym.length > 1 ? 18 : 40;
        this.symbolTexts[index].text = sym;
      }
    });
  }

  // Метод для підсвітки конкретного символу
  public highlightSymbol(rowIndex: number, isWin: boolean): void {
    if (this.symbolBgs[rowIndex]) {
      this.symbolBgs[rowIndex].tint = isWin ? 0xffd700 : 0x2a2a36;
      this.symbolTexts[rowIndex].style.fill = isWin ? "#000000" : "#ffffff";
    }
  }
}
