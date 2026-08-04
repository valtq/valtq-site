import type { ArticleLocalizedContent } from '../types';

export const content: ArticleLocalizedContent = {
  title: 'Why Discovery Should Happen Before Development',
  excerpt:
    'Discovery helps teams clarify the product problem, users, constraints, risks, and decisions before implementation creates expensive commitments.',
  introduction:
    'It is common for a project to begin with a confident brief and a request to start building immediately. The impulse is understandable: code feels like progress, and planning can feel like delay. In practice, the cost of building the wrong thing is usually higher than the cost of understanding it first. Discovery is the period in which a team reduces avoidable uncertainty before major product and architecture decisions are locked in.',
  sections: [
    {
      type: 'h2',
      id: 'development-can-begin-before-the-problem-is-clear',
      heading: 'Development can begin before the problem is clear',
    },
    {
      type: 'p',
      text: 'A team can start writing code within days of receiving a brief. Features can be built, screens can be connected, and a demo can be produced. What is much harder is knowing whether those features solve a real problem, for the right users, under real constraints.',
    },
    {
      type: 'p',
      text: 'When development begins before the problem is understood, decisions get made implicitly. Data models assume relationships that may not exist. Workflows assume steps that users do not follow. Integration points assume systems that behave differently in production. None of these assumptions are visible to the team until they surface as rework, and by then the product is already shaped around them.',
    },
    {
      type: 'callout',
      text: 'The goal is not to avoid mistakes entirely. The goal is to avoid the mistakes that are cheap to prevent and expensive to undo after implementation.',
    },
    {
      type: 'h2',
      id: 'what-discovery-should-clarify',
      heading: 'What Discovery should clarify',
    },
    {
      type: 'p',
      text: 'Discovery is a structured period of learning, not a vague discussion. It should produce a shared understanding of the product objective, the users and their workflow, the systems already in place, the constraints that limit options, and the decisions the team is being asked to make.',
    },
    {
      type: 'p',
      text: 'A useful way to structure it is around a small set of questions: who is the product for, what workflow does it improve, what would change if it worked, and what existing systems or processes must it respect? When a team can answer these questions with evidence rather than assumption, the scope that follows is far more realistic.',
    },
    {
      type: 'h2',
      id: 'understanding-users-and-workflows',
      heading: 'Understanding users and workflows',
    },
    {
      type: 'p',
      text: 'Products succeed when they fit into a real workflow. A common failure is designing for an idealized user who does not exist, based on a workflow that is described rather than observed.',
    },
    {
      type: 'ul',
      items: [
        'Who performs the task today, and how do they do it without the product?',
        'Where does the workflow start, and what triggers each step?',
        'What happens when something goes wrong or the user is interrupted?',
        'Who else depends on the output of this workflow?',
      ],
    },
    {
      type: 'p',
      text: 'The answers reveal scope that a brief rarely contains: edge cases, permission requirements, notification flows, and the boring but essential steps in the middle of the process.',
    },
    {
      type: 'h2',
      id: 'existing-systems-and-constraints',
      heading: 'Existing systems and constraints',
    },
    {
      type: 'p',
      text: 'Most products are not built in a vacuum. They connect to existing accounts, databases, payment providers, identity systems, and third-party services. Each of these carries behavioral details that shape the product design.',
    },
    {
      type: 'p',
      text: 'The team should identify the systems the product must integrate with, the data available today, the formats it arrives in, and the rate limits or operational constraints of the providers involved. This is where feasibility is decided: a feature that seems simple on paper can become a multi-week effort when the existing system does not expose the required capability.',
    },
    {
      type: 'h2',
      id: 'assumptions-risks-and-dependencies',
      heading: 'Assumptions, risks, and dependencies',
    },
    {
      type: 'p',
      text: 'Every project begins with assumptions. The value of Discovery is making them explicit and deciding which are safe, which are risky, and which should be validated before significant investment.',
    },
    {
      type: 'ul',
      items: [
        'An assumption about users: who the product is for and what they need.',
        'An assumption about behavior: that a certain workflow or incentive will hold.',
        'An assumption about technology: that a provider, data source, or integration is available.',
        'An assumption about operations: that the team can support the product after launch.',
      ],
    },
    {
      type: 'p',
      text: 'Risks are not all equal. The most dangerous are the ones that, if wrong, would invalidate the core value of the product. Discovery should surface those first so the team can investigate them before they become expensive.',
    },
    {
      type: 'h2',
      id: 'scope-and-priority-decisions',
      heading: 'Scope and priority decisions',
    },
    {
      type: 'p',
      text: 'A common outcome of Discovery is a smaller scope than the initial wish-list. That is a success, not a failure. When the team understands the workflow and constraints, it becomes possible to identify the minimum set of capabilities that delivers real value.',
    },
    {
      type: 'p',
      text: 'Priorities should be decided on evidence: which steps cause the most friction, which systems are already trusted, and which capabilities unblock the rest of the roadmap. The output is not a promise to build everything; it is a defensible sequence of what to build first and why.',
    },
    {
      type: 'h2',
      id: 'what-useful-discovery-outputs-look-like',
      heading: 'What useful Discovery outputs look like',
    },
    {
      type: 'p',
      text: 'Discovery should end with artifacts that the whole team can use, not a binder that no one opens. A useful set of outputs usually includes a written problem statement, a description of the primary workflow and its users, a list of validated constraints and risks, a proposed scope with priorities, and the open questions that remain.',
    },
    {
      type: 'p',
      text: 'These outputs are decision inputs. They give the design and engineering team the context they need to make sensible choices during implementation, and they give stakeholders a concrete basis for reviewing whether the plan matches the problem.',
    },
    {
      type: 'h2',
      id: 'discovery-does-not-need-to-become-endless-planning',
      heading: 'Discovery does not need to become endless planning',
    },
    {
      type: 'p',
      text: 'Discovery has a cost. Spending months analyzing a small, well-understood project is as much of a failure as skipping Discovery entirely on a large, uncertain one. The appropriate depth depends on the size of the decision, the amount of existing evidence, and the cost of being wrong.',
    },
    {
      type: 'callout',
      text: 'A useful discipline is to set a time-box and an explicit decision point. Discovery ends when the team has enough clarity to start delivering without reckless assumptions, not when every question has a perfect answer.',
    },
    {
      type: 'h2',
      id: 'signals-that-a-team-is-ready-to-move-into-delivery',
      heading: 'Signals that a team is ready to move into delivery',
    },
    {
      type: 'ol',
      items: [
        'The problem statement is written down and agreed by the relevant stakeholders.',
        'The primary users and their workflow are understood well enough to describe them.',
        'The critical constraints and integration dependencies are identified and verified.',
        'The risky assumptions are known, and a validation plan exists for the important ones.',
        'The initial scope is prioritized, with a clear sense of what is out of scope for the first release.',
        'The remaining open questions are documented and assigned, rather than silently deferred.',
      ],
    },
    {
      type: 'p',
      text: 'When these signals are present, the team can start delivery with a meaningful foundation. New information will still emerge; the difference is that it will emerge as manageable change rather than structural surprise.',
    },
    {
      type: 'h2',
      id: 'practical-conclusion',
      heading: 'Practical conclusion',
    },
    {
      type: 'p',
      text: 'Discovery is not a guarantee against change. Its value is reducing avoidable uncertainty before major product and architecture decisions are made. Teams that invest in understanding the problem, the users, the systems, and the risks build with clearer intent, review work more confidently, and change direction with far less wasted effort.',
    },
  ],
};
