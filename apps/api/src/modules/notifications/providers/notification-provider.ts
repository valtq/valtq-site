export const NotificationType = {
  INTERNAL_LEAD: 'internal_lead',
  VISITOR_CONFIRMATION: 'visitor_confirmation',
} as const;

export type NotificationType =
  (typeof NotificationType)[keyof typeof NotificationType];

export type NotificationMessage = {
  to: string;
  subject: string;
  html: string;
  text?: string;
};

export type NotificationSendResult = {
  success: boolean;
  provider: string;
  messageId?: string;
  error?: string;
};

/**
 * Provider abstraction — swap Resend for SES/Postmark without changing callers.
 */
export interface NotificationProvider {
  readonly name: string;
  send(message: NotificationMessage): Promise<NotificationSendResult>;
}
