import { Container, Graphics, Text, TextStyle } from "pixi.js";

export class UIContainer extends Container {
  private balanceText!: Text;
  private betText!: Text;
  private winText!: Text; 
  private spinButton!: Container;
  private onSpinCallback: () => void;

  constructor(onSpin: () => void) {
    super();
    this.onSpinCallback = onSpin;
    this.initUI();
  }

  private initUI(): void {
    const style = new TextStyle({
      fontFamily: "Arial",
      fontSize: 24,
      fill: "#ffffff",
      fontWeight: "bold",
    });

    // 1. Balance text (Текст Балансу)
    this.balanceText = new Text({ text: "Balance: $1000", style });
    this.balanceText.position.set(50, 520);
    this.addChild(this.balanceText);

    // 2. Bet text (Текст Ставки)
    this.betText = new Text({ text: "Bet: $10", style });
    this.betText.position.set(300, 520);
    this.addChild(this.betText);

    // 3. Winning text (Текст Виграшу - центруємо)
    this.winText = new Text({
      text: "",
      style: new TextStyle({
        fontFamily: "Arial",
        fontSize: 36,
        fill: "#ffd700", 
        fontWeight: "bold",
      }),
    });
    this.winText.anchor.set(0.5); 
    this.winText.position.set(400, 470); 
    this.winText.visible = false; 
    this.addChild(this.winText);

    // 4. Кнопка Spin (тут вирішив що коментарі будуть зайві:) )
    this.spinButton = new Container();
    this.spinButton.position.set(600, 510);

    this.spinButton.eventMode = "static";
    this.spinButton.cursor = "pointer";

    const buttonBg = new Graphics();
    buttonBg.roundRect(0, 0, 150, 50, 10);
    buttonBg.fill({ color: 0xff3333 });

    const btnStyle = new TextStyle({ ...style, fontSize: 20 });
    const spinText = new Text({ text: "SPIN", style: btnStyle });
    spinText.position.set(45, 12);

    this.spinButton.addChild(buttonBg);
    this.spinButton.addChild(spinText);

    this.spinButton.on("pointerdown", () => this.onSpinCallback());

    this.addChild(this.spinButton);
  }

  public updateBalance(value: number): void {
    this.balanceText.text = `Balance: $${value}`;
  }

  public updateBet(value: number): void {
    this.betText.text = `Bet: $${value}`;
  }

  public setSpinEnabled(enabled: boolean): void {
    this.spinButton.eventMode = enabled ? "static" : "none";
    this.spinButton.alpha = enabled ? 1 : 0.5;
  }

  // win method
  public showWin(amount: number): void {
    this.winText.text = `WIN: $${amount}!`;
    this.winText.visible = true;
  }

  public hideWin(): void {
    this.winText.visible = false;
  }
}
