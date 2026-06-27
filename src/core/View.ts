import { Application } from "pixi.js";
import { UIContainer } from "../components/UIContainer";
import { ReelsContainer } from "../components/ReelsContainer";

export class GameView {
  private app: Application;
  public ui!: UIContainer;
  public reels!: ReelsContainer; // Here grid add(Додали змінну для сітки)

  constructor(app: Application) {
    this.app = app;
  }

  public init(onSpinClick: () => void): void {
    // Init and add reel (вони будуть під UI)
    this.reels = new ReelsContainer();
    this.app.stage.addChild(this.reels);

    // 2. UI init (Ініціалізуємо і додаємо UI)
    this.ui = new UIContainer(onSpinClick);
    this.app.stage.addChild(this.ui);
  }
}
