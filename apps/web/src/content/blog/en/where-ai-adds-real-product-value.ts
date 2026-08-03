import type { ArticleLocalizedContent } from '../types';

export const content: ArticleLocalizedContent = {
  title: 'Where AI Adds Real Value Inside Product Workflows',
  excerpt:
    'AI is most useful when it improves a defined workflow and is connected to the product’s data, permissions, validation, monitoring, and human decisions.',
  introduction:
    'A model is not a product feature. The value of AI in a product comes from the workflow it improves: the specific task that currently costs time, effort, or quality, and that a model can perform well enough to help. Products that succeed with AI are usually the ones that started with a well-understood workflow, kept the model inside clear boundaries, and designed for the reality that model output can be incomplete or incorrect.',
  sections: [
    {
      type: 'h2',
      id: 'start-with-the-workflow-not-the-model',
      heading: 'Start with the workflow, not the model',
    },
    {
      type: 'p',
      text: 'The most reliable way to find value in AI is to start with a task and ask whether it is a good fit for a model. A good candidate task has a clear input, a defined output, and a measurable improvement in speed or quality.',
    },
    {
      type: 'p',
      text: 'Starting from the model instead creates a search for a problem to attach to it. That usually produces a demo that impresses and a workflow that does not improve. The discipline is to describe the workflow change first, then evaluate whether a model can genuinely deliver it.',
    },
    {
      type: 'h2',
      id: 'useful-ai-product-patterns',
      heading: 'Useful AI product patterns',
    },
    {
      type: 'p',
      text: 'Across products, a small number of patterns account for most of the value. Each pattern has clear boundaries, which makes it possible to validate, evaluate, and contain the behavior of the model.',
    },
    {
      type: 'ul',
      items: [
        'Search and knowledge assistance, grounded in the product’s own content.',
        'Document extraction and classification of recurring inputs.',
        'Assisted content and decision support with human review.',
        'Recommendation and personalization built on real user behavior.',
      ],
    },
    {
      type: 'h2',
      id: 'search-and-knowledge-assistance',
      heading: 'Search and knowledge assistance',
    },
    {
      type: 'p',
      text: 'A common high-value pattern is answering questions about the product’s own content: documentation, policies, support history, or technical reference. The value comes from reducing the time people spend searching for information they already have.',
    },
    {
      type: 'p',
      text: 'The important design decisions are about grounding and boundaries. The answer should be built from retrieved content the product actually controls, and the interface should make it possible to trace the answer back to its source. When the system cannot find relevant content, it should say so instead of inventing an answer.',
    },
    {
      type: 'h2',
      id: 'document-extraction-and-classification',
      heading: 'Document extraction and classification',
    },
    {
      type: 'p',
      text: 'Many workflows begin with unstructured input: invoices, forms, messages, or scanned documents. Extracting structured fields and classifying the item into the right workflow step is a pattern where models are genuinely strong and where errors are detectable.',
    },
    {
      type: 'p',
      text: 'The discipline here is validation and review. Extraction should be checked against the format and range of the expected fields, and items below a confidence threshold should route to a human rather than entering the system silently.',
    },
    {
      type: 'h2',
      id: 'assisted-content-and-decision-support',
      heading: 'Assisted content and decision support',
    },
    {
      type: 'p',
      text: 'Assistance is different from automation. In an assisted flow, the model drafts content or suggests a decision, and the user reviews, edits, and approves the result. The product still respects the user’s responsibility and the workflow’s approval requirements.',
    },
    {
      type: 'p',
      text: 'This pattern is valuable because it reduces the effort of a repetitive task while keeping a human accountable for the outcome. The design should make the model’s suggestion easy to accept, edit, or discard, and should not hide the fact that the output came from a model.',
    },
    {
      type: 'h2',
      id: 'recommendation-and-personalization',
      heading: 'Recommendation and personalization',
    },
    {
      type: 'p',
      text: 'Recommendations are only useful when they reflect real behavior and context. A system that recommends based on explicit user choices, recent activity, and the current workflow is more trustworthy than one that presents generic suggestions.',
    },
    {
      type: 'p',
      text: 'The design should make the reasoning legible and give the user control. Explaining why an item was recommended and allowing the user to adjust their preferences turns a recommendation engine into a useful product feature rather than a black box.',
    },
    {
      type: 'h2',
      id: 'access-control-and-data-boundaries',
      heading: 'Access control and data boundaries',
    },
    {
      type: 'p',
      text: 'AI features inherit the product’s data boundaries. A knowledge assistant must not retrieve documents the current user cannot see, and an extraction pipeline must not send sensitive content to an external provider without a clear and justified contract.',
    },
    {
      type: 'ul',
      items: [
        'Enforce the same permissions in AI features as in the rest of the product.',
        'Know where every input and output travels, including external providers.',
        'Keep sensitive data out of shared or logged contexts unless explicitly designed.',
        'Document retention and deletion behavior for AI-related data.',
      ],
    },
    {
      type: 'p',
      text: 'These are product and security decisions, not implementation details. They should be decided early, because retrofitting boundaries into an AI feature is harder than designing them in.',
    },
    {
      type: 'h2',
      id: 'structured-outputs-and-validation',
      heading: 'Structured outputs and validation',
    },
    {
      type: 'p',
      text: 'Models produce text, but products need structured behavior. The practical approach is to constrain the output to a defined schema and then validate it against the same rules the rest of the system applies.',
    },
    {
      type: 'p',
      text: 'Validation is the difference between a demo and a feature. An extracted date that fails format validation, a generated field that falls outside its allowed values, and a classification that does not match a known workflow step should all be caught before they affect other systems.',
    },
    {
      type: 'h2',
      id: 'confidence-fallback-and-human-review',
      heading: 'Confidence, fallback, and human review',
    },
    {
      type: 'p',
      text: 'Model output can be incomplete or incorrect, and a well-designed product accounts for that. Every AI step should have a defined fallback: what happens when the model is uncertain, when it fails, or when its output does not pass validation.',
    },
    {
      type: 'callout',
      text: 'A useful rule is that the product’s correctness must not depend on the model being right every time. Low-confidence results should route to a human, failed steps should fail clearly, and the workflow should continue to function even when the AI contribution is empty.',
    },
    {
      type: 'h2',
      id: 'monitoring-cost-quality-and-usage',
      heading: 'Monitoring cost, quality, and usage',
    },
    {
      type: 'p',
      text: 'AI features need monitoring like any other critical path, with metrics specific to them. Cost is a real concern because model calls are not free, and quality is a concern because the model changes under you.',
    },
    {
      type: 'ul',
      items: [
        'Track usage: which features are actually used, and how often.',
        'Track cost per call and per workflow, and watch for runaway usage.',
        'Sample and review outputs regularly rather than assuming they stay correct.',
        'Monitor latency, failures, and fallback rates like any other dependency.',
      ],
    },
    {
      type: 'h2',
      id: 'when-ai-is-not-the-appropriate-solution',
      heading: 'When AI is not the appropriate solution',
    },
    {
      type: 'p',
      text: 'A deterministic rule is better than a model when the behavior must be exact. If a task can be expressed as a finite set of rules, validated against an existing data source, or completed with a simple integration, adding a model usually adds cost and uncertainty without adding value.',
    },
    {
      type: 'p',
      text: 'The honest evaluation is whether the model solves a problem that rules and integrations cannot. When the answer is no, the disciplined choice is to leave AI out of that workflow entirely.',
    },
    {
      type: 'h2',
      id: 'practical-conclusion',
      heading: 'Practical conclusion',
    },
    {
      type: 'p',
      text: 'AI adds real value when it improves a defined workflow, respects the product’s data and permissions, validates its outputs, and accounts for the fact that model output can be wrong. The model is a component within a larger system, not the system itself. Teams that design the workflow, the boundaries, and the fallbacks first build AI features that users can actually rely on.',
    },
  ],
};
