export interface ControlState {
  alert: AlertInterface;
}

export interface AlertInterface {
  alertVariant: alertTypes;
  alertMsg: string | null;
  isAlertShown: boolean;
}

export type alertTypes = "success" | "info" | "warning" | "error";
