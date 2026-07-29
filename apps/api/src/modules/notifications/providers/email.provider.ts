import { Resend } from 'resend';
import type {
  NotificationMessage,
  NotificationProvider,
  NotificationSendResult,
} from './notification-provider.js';

type ResendEmailProviderOptions = {
  apiKey: string;
  fromEmail: string;
};

/**
 * Resend-backed email provider.
 */
export class ResendEmailProvider implements NotificationProvider {
  readonly name = 'resend';
  private readonly client: Resend;
  private readonly fromEmail: string;

  constructor(options: ResendEmailProviderOptions) {
    this.client = new Resend(options.apiKey);
    this.fromEmail = options.fromEmail;
  }

  async send(message: NotificationMessage): Promise<NotificationSendResult> {
    const { data, error } = await this.client.emails.send({
      from: this.fromEmail,
      to: [message.to],
      subject: message.subject,
      html: message.html,
      text: message.text,
    });

    if (error) {
      return {
        success: false,
        provider: this.name,
        error: error.message,
      };
    }

    return {
      success: true,
      provider: this.name,
      messageId: data?.id,
    };
  }
}

/**
 * No-op provider used when Resend credentials are not configured.
 * Keeps local/CI flows green without silently pretending delivery succeeded.
 */
export class NoopEmailProvider implements NotificationProvider {
  readonly name = 'noop';

  async send(_message: NotificationMessage): Promise<NotificationSendResult> {
    return {
      success: false,
      provider: this.name,
      error: 'Email provider is not configured',
    };
  }
}
