export interface ControlState {
  alert: AlertInterface;
}

export interface AlertInterface {
  alertMsg: string | null;
  isAlertShown?: boolean;
  alertVariant?: alertTypes;
}

export type alertTypes = "success" | "info" | "warning" | "error";
