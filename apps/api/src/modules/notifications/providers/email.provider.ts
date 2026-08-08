import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';
import type {
  NotificationMessage,
  NotificationProvider,
  NotificationSendResult,
} from './notification-provider.js';

type SmtpEmailProviderOptions = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  fromEmail: string;
};

/**
 * SMTP-backed email provider (Nodemailer).
 */
export class SmtpEmailProvider implements NotificationProvider {
  readonly name = 'smtp';
  private readonly transporter: Transporter;
  private readonly fromEmail: string;

  constructor(options: SmtpEmailProviderOptions) {
    this.transporter = nodemailer.createTransport({
      host: options.host,
      port: options.port,
      secure: options.secure,
      auth: {
        user: options.user,
        pass: options.pass,
      },
    });
    this.fromEmail = options.fromEmail;
  }

  async send(message: NotificationMessage): Promise<NotificationSendResult> {
    try {
      const info = await this.transporter.sendMail({
        from: this.fromEmail,
        to: message.to,
        subject: message.subject,
        html: message.html,
        text: message.text,
      });

      return {
        success: true,
        provider: this.name,
        messageId: info.messageId,
      };
    } catch (error) {
      return {
        success: false,
        provider: this.name,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }
}

/**
 * No-op provider used when SMTP credentials are not configured.
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
