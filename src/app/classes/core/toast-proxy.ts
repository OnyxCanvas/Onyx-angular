import { HotToastService } from "@ngneat/hot-toast";

export class ToastProxy {
  private static _instance: HotToastService;

  public static init(toastService: HotToastService): void {
    if (!ToastProxy._instance) {
      ToastProxy._instance = toastService;
    }
  }
  public static get instance(): HotToastService {
    if (!ToastProxy._instance) {
      throw new Error('ToastProxy not initialized');
    }
    return ToastProxy._instance;
  }
}
