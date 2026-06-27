import { Application } from "pixi.js";
import { GAME_CONFIG } from "./config/gameConfig";
import { GameModel } from "./core/Model";
import { GameView } from "./core/View";
import { GameController } from "./core/Controller";

async function initGame() {
  const app = new Application();
  await app.init({
    width: GAME_CONFIG.width,
    height: GAME_CONFIG.height,
    backgroundColor: 0x1a1a24,
  });

  document.body.appendChild(app.canvas);

  // Init (ініт)
  const model = new GameModel();
  const view = new GameView(app);
  const controller = new GameController(model, view);

  // Logic start (ТУТ ДОДАНО AWAIT)
  await controller.init();
}

initGame();
