import { AccountController } from "./controllers/AccountController.js";
import { GifsController } from "./controllers/GifsController.js";
import { AuthGuard } from "./services/AuthService.js";
import { Router } from "./utils/Router.js";


export const router = new Router([
  {
    path: '',
    controllers: [GifsController],
    view: 'app/views/GifsView.html',
  },
  {
    path: '#/account',
    middleware: [AuthGuard],
    controllers: [AccountController],
    view: 'app/views/AccountView.html',
  }
])




