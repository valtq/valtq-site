type LeadEmailContext = {
  name: string;
  email: string;
  company?: string | null;
  phone?: string | null;
  country?: string | null;
  website?: string | null;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
  features?: string[] | null;
  score: number;
  companySize?: string | null;
  isDecisionMaker?: boolean | null;
  urgency?: string | null;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function row(label: string, value: string | null | undefined): string {
  if (!value) {
    return '';
  }

  return `<tr>
    <td style="padding:8px 12px;color:#64748b;vertical-align:top;">${escapeHtml(label)}</td>
    <td style="padding:8px 12px;color:#0f172a;">${escapeHtml(value)}</td>
  </tr>`;
}

export function buildInternalLeadEmail(lead: LeadEmailContext): {
  subject: string;
  html: string;
  text: string;
} {
  const features =
    lead.features && lead.features.length > 0
      ? lead.features.join(', ')
      : null;

  const subject = `[ValtQ] New discovery lead — score ${lead.score} — ${lead.name}`;

  const html = `<!DOCTYPE html>
<html>
  <body style="font-family:Arial,sans-serif;background:#f8fafc;padding:24px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;">
      <tr>
        <td style="padding:24px;">
          <h1 style="margin:0 0 8px;font-size:20px;color:#0f172a;">New Discovery Lead</h1>
          <p style="margin:0 0 20px;color:#64748b;">A visitor completed the discovery flow.</p>
          <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
            ${row('Score', String(lead.score))}
            ${row('Name', lead.name)}
            ${row('Email', lead.email)}
            ${row('Company', lead.company)}
            ${row('Phone', lead.phone)}
            ${row('Country', lead.country)}
            ${row('Website', lead.website)}
            ${row('Project type', lead.projectType)}
            ${row('Budget', lead.budget)}
            ${row('Timeline', lead.timeline)}
            ${row('Company size', lead.companySize)}
            ${row(
              'Decision maker',
              lead.isDecisionMaker === undefined || lead.isDecisionMaker === null
                ? null
                : lead.isDecisionMaker
                  ? 'Yes'
                  : 'No',
            )}
            ${row('Urgency', lead.urgency)}
            ${row('Features', features)}
            ${row('Description', lead.description)}
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = [
    `New Discovery Lead (score ${lead.score})`,
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Company: ${lead.company ?? 'n/a'}`,
    `Budget: ${lead.budget}`,
    `Timeline: ${lead.timeline}`,
    `Project type: ${lead.projectType}`,
    `Description: ${lead.description}`,
  ].join('\n');

  return { subject, html, text };
}

export function buildVisitorConfirmationEmail(lead: LeadEmailContext): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = 'We received your discovery brief — ValtQ';

  const html = `<!DOCTYPE html>
<html>
  <body style="font-family:Arial,sans-serif;background:#f8fafc;padding:24px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;">
      <tr>
        <td style="padding:28px;">
          <p style="margin:0 0 4px;letter-spacing:0.08em;text-transform:uppercase;font-size:12px;color:#64748b;">ValtQ</p>
          <h1 style="margin:0 0 16px;font-size:24px;color:#0f172a;">Thank you, ${escapeHtml(lead.name)}</h1>
          <p style="margin:0 0 16px;color:#334155;line-height:1.6;">
            We received your discovery submission and our team is reviewing it.
            If you booked a consultation, you will also receive a calendar confirmation separately.
          </p>
          <h2 style="margin:24px 0 8px;font-size:16px;color:#0f172a;">Submission summary</h2>
          <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
            ${row('Company', lead.company)}
            ${row('Project type', lead.projectType)}
            ${row('Budget', lead.budget)}
            ${row('Timeline', lead.timeline)}
          </table>
          <h2 style="margin:24px 0 8px;font-size:16px;color:#0f172a;">What happens next</h2>
          <ol style="margin:0;padding-left:20px;color:#334155;line-height:1.7;">
            <li>We review your brief and score fit.</li>
            <li>We prepare focused questions for your consultation.</li>
            <li>You meet with us to align on scope, timeline, and next steps.</li>
          </ol>
          <p style="margin:24px 0 0;color:#64748b;font-size:14px;">
            Reply to this email if you need to update anything before we talk.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = [
    `Thank you, ${lead.name}.`,
    'We received your discovery submission.',
    `Project type: ${lead.projectType}`,
    `Budget: ${lead.budget}`,
    `Timeline: ${lead.timeline}`,
    'Next: our team reviews your brief and prepares for your consultation.',
  ].join('\n');

  return { subject, html, text };
}
