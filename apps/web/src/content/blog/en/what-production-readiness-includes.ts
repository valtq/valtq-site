import type { ArticleLocalizedContent } from '../types';

export const content: ArticleLocalizedContent = {
  title: 'What Production Readiness Actually Includes',
  excerpt:
    'A successful build is not automatically a production-ready product. Release readiness also includes configuration, security, data, monitoring, recovery, ownership, and operational clarity.',
  introduction:
    'When a build completes and tests pass, it is tempting to describe the product as ready. The reality is that production readiness is a separate question from development completion. A product is ready for real users when it can be configured, operated, monitored, and recovered by people who did not build it, and when its failure modes are understood before they occur.',
  sections: [
    {
      type: 'h2',
      id: 'build-success-is-only-one-signal',
      heading: 'Build success is only one signal',
    },
    {
      type: 'p',
      text: 'A passing build and a green test suite prove that the code does what the tests describe. They do not prove that the product works in production, where the environment, the data, the users, and the traffic are all different.',
    },
    {
      type: 'p',
      text: 'The gap between build success and production readiness is where most launch problems actually live: configuration that differs between environments, data that does not migrate cleanly, permissions that are not enforced, and failures that are invisible until users report them.',
    },
    {
      type: 'h2',
      id: 'environment-and-configuration-management',
      heading: 'Environment and configuration management',
    },
    {
      type: 'p',
      text: 'The product should be configurable through a defined, documented mechanism rather than through edits to the code. Environment variables, configuration files, and deployment settings should behave predictably across local, staging, and production environments.',
    },
    {
      type: 'ul',
      items: [
        'Configuration is documented, including the meaning and effect of each value.',
        'Environment-specific values are separated from code and from each other.',
        'Staging closely mirrors production in providers, versions, and settings.',
        'Changing configuration is a repeatable, reviewable process.',
      ],
    },
    {
      type: 'h2',
      id: 'secrets-and-sensitive-values',
      heading: 'Secrets and sensitive values',
    },
    {
      type: 'p',
      text: 'API keys, database credentials, and signing secrets must never be committed to source control. They belong in a secret manager or encrypted store, injected at deployment time, with access limited to the systems that need them.',
    },
    {
      type: 'p',
      text: 'Rotation should be possible without a code deployment. If a secret is ever exposed, there should be a clear procedure for replacing it, and the team should know which systems depend on it.',
    },
    {
      type: 'h2',
      id: 'data-preparation-and-migrations',
      heading: 'Data preparation and migrations',
    },
    {
      type: 'p',
      text: 'New products often start with empty databases, which hides the reality that real data is messy. Production readiness requires validating the migrations against realistic data and confirming that existing records will survive the transition.',
    },
    {
      type: 'p',
      text: 'Migrations should be versioned, reversible where possible, and rehearsed against a copy of production data. Data cleaning, deduplication, and backfill steps should be defined before launch rather than improvised during it.',
    },
    {
      type: 'h2',
      id: 'authentication-authorization-and-validation',
      heading: 'Authentication, authorization, and validation',
    },
    {
      type: 'p',
      text: 'The product should be checked from the perspective of who is allowed to do what. Authentication confirms identity, authorization enforces what each identity may access, and validation protects the system from malformed input.',
    },
    {
      type: 'ul',
      items: [
        'Every restricted action is protected by authorization checks.',
        'Default permissions are least-privilege, not open-by-default.',
        'User input is validated on the server, not only in the browser.',
        'Sensitive operations are logged with sufficient detail for audit.',
      ],
    },
    {
      type: 'h2',
      id: 'logging-and-error-visibility',
      heading: 'Logging and error visibility',
    },
    {
      type: 'p',
      text: 'An unlogged system is unobservable. Logging should capture the information needed to understand a request end to end: who, what, when, from where, and what happened. Sensitive values should be excluded by design.',
    },
    {
      type: 'p',
      text: 'Errors should be captured centrally, with stack traces and context, and failures should be visible to the people responsible before users encounter them. A system whose errors are invisible is a system whose problems accumulate silently.',
    },
    {
      type: 'h2',
      id: 'monitoring-and-meaningful-alerts',
      heading: 'Monitoring and meaningful alerts',
    },
    {
      type: 'p',
      text: 'Monitoring should measure what matters to the product: availability, latency, error rates, and the key business signals that indicate the system is working. Alerts should fire on conditions that require action, not on noise.',
    },
    {
      type: 'p',
      text: 'An alert that no one can act on is worse than no alert, because it trains the team to ignore them. Every alert should be reviewed for whether it is actionable and whether the on-call response to it is defined.',
    },
    {
      type: 'h2',
      id: 'deployment-and-rollback-planning',
      heading: 'Deployment and rollback planning',
    },
    {
      type: 'p',
      text: 'Releases should be repeatable and reversible. A deployment process that works because of tribal knowledge is a launch risk. A documented, automated, reviewed pipeline is the difference between a planned release and an adventure.',
    },
    {
      type: 'p',
      text: 'Rollback should be planned before launch, not during an incident. The team should know what the previous known-good version is, how to restore it, and what the consequences of restoring it are for data written in the meantime.',
    },
    {
      type: 'h2',
      id: 'critical-path-and-release-verification',
      heading: 'Critical-path and release verification',
    },
    {
      type: 'p',
      text: 'Before launch, the team should walk the critical paths as a user would: sign in, perform the primary workflow, and complete a full transaction. This verification belongs in the release checklist, not in last-minute clicking.',
    },
    {
      type: 'p',
      text: 'A brief smoke test that confirms the core journey works after deployment catches the failures that automated suites miss, especially when they are caused by the environment rather than the code.',
    },
    {
      type: 'h2',
      id: 'ownership-handover-and-support',
      heading: 'Ownership, handover, and support',
    },
    {
      type: 'p',
      text: 'A product in production has owners. Someone must be responsible for answering incidents, reviewing the metrics, and deciding when to act. If the product changes hands, the receiving team needs documentation and access before the handover, not after the first incident.',
    },
    {
      type: 'ul',
      items: [
        'Ownership and on-call responsibility are explicit and documented.',
        'Runbooks exist for the known failure modes and recovery steps.',
        'Access is documented and provisioned before it is needed.',
        'A support channel exists for users to report problems.',
      ],
    },
    {
      type: 'h2',
      id: 'known-limitations-and-post-launch-priorities',
      heading: 'Known limitations and post-launch priorities',
    },
    {
      type: 'p',
      text: 'Production readiness does not mean the product is finished. There are always known limitations, and the difference between a professional launch and an unprofessional one is whether those limitations are documented and prioritized.',
    },
    {
      type: 'p',
      text: 'The launch review should end with an explicit list of what is deferred, why, and what evidence will trigger addressing it. This turns honest limitations into a roadmap instead of into surprises.',
    },
    {
      type: 'h2',
      id: 'practical-production-readiness-checklist',
      heading: 'Practical production-readiness checklist',
    },
    {
      type: 'ul',
      items: [
        'Configuration is documented and environment-aware.',
        'Secrets are managed, never committed, and rotatable.',
        'Migrations are rehearsed against realistic data.',
        'Authorization and validation are enforced server-side.',
        'Logs and errors are central, searchable, and free of secrets.',
        'Monitoring and alerts are meaningful and actionable.',
        'Deployment and rollback are documented and rehearsed.',
        'Critical paths are smoke-tested after deployment.',
        'Ownership, runbooks, and support are explicit.',
        'Known limitations are listed with post-launch priorities.',
      ],
    },
    {
      type: 'h2',
      id: 'conclusion',
      heading: 'Conclusion',
    },
    {
      type: 'p',
      text: 'A checklist does not guarantee a failure-free launch, and no amount of preparation removes every risk. What production readiness provides is a different quality: the confidence that the team understands the system, can operate it, and can recover it when something unexpected happens. That understanding, built before launch, is what separates a product that is deployed from a product that is truly ready.',
    },
  ],
};
