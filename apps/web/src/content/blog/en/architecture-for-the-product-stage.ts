import type { ArticleLocalizedContent } from '../types';

export const content: ArticleLocalizedContent = {
  title: 'Choosing an Architecture That Matches the Product Stage',
  excerpt:
    'The most sophisticated architecture is not automatically the right one. A useful foundation should match the current product, team, risks, and expected evolution.',
  introduction:
    'Architecture decisions are often discussed as if they were a matter of taste between competing technologies. In practice, they are product decisions: they determine how quickly a team can respond to what they learn, how confidently they can change direction, and how expensive the next stage of the product will be. The right architecture depends on the stage of the product, the size and experience of the team, the risks that actually matter, and the way the product is expected to evolve.',
  sections: [
    {
      type: 'h2',
      id: 'architecture-is-a-product-decision',
      heading: 'Architecture is a product decision',
    },
    {
      type: 'p',
      text: 'Architecture shapes speed, cost, risk, and the ability to change. A team that treats architecture as an internal engineering detail will still make the decision, but it will make it without considering the product consequences. Treating it as a product decision means weighing those consequences explicitly.',
    },
    {
      type: 'ul',
      items: [
        'How fast can the team ship the next iteration of the current stage?',
        'How expensive is it to validate an uncertain idea or abandon it?',
        'How much operational burden will the team need to carry after launch?',
        'How easy will it be to hand the product to a different team later?',
      ],
    },
    {
      type: 'p',
      text: 'The same technical choice can be correct for one product and wrong for another. The deciding factors are rarely the technologies themselves.',
    },
    {
      type: 'h2',
      id: 'the-cost-of-under-engineering',
      heading: 'The cost of under-engineering',
    },
    {
      type: 'p',
      text: 'Under-engineering usually means choosing a structure that worked for an earlier, simpler version and holding onto it past the point where it becomes painful. The symptoms are familiar: a growing codebase that resists change, a deployment that requires careful manual steps, and a testing story that no one trusts.',
    },
    {
      type: 'p',
      text: 'The cost is not always visible in the moment. It appears as the pace of delivery slows, as small changes break unexpected parts of the system, and as the team spends its time fighting the structure instead of serving the product. Waiting until this point is expensive because the rework is spread across the entire system.',
    },
    {
      type: 'h2',
      id: 'the-cost-of-unnecessary-complexity',
      heading: 'The cost of unnecessary complexity',
    },
    {
      type: 'p',
      text: 'Complexity has its own price. A distributed system introduces network failures, consistency concerns, operational tooling, and debugging challenges that a simpler structure does not have. Adding it before there is a genuine need means paying the cost early and receiving none of the benefit.',
    },
    {
      type: 'p',
      text: 'Complexity is also a tax on every future change. Every developer who works on the system must understand more moving parts, and every deployment has more room to fail. The appropriate amount of complexity is the amount required to meet the product’s real needs, not the amount a team can demonstrate.',
    },
    {
      type: 'h2',
      id: 'product-stage-and-uncertainty',
      heading: 'Product stage and uncertainty',
    },
    {
      type: 'p',
      text: 'Early products are defined by uncertainty. The market, the workflow, and the most valuable features are still being learned. In this stage, the priority is making change cheap and learning fast. A structure that keeps the codebase understandable and the deployment simple is usually more valuable than one optimized for scale that has not arrived.',
    },
    {
      type: 'p',
      text: 'As a product matures, the priorities shift. Stability, performance, and operational predictability become more important, and the architecture should evolve to reflect that. The mistake is using a mature-stage architecture for an early product, or a startup-stage architecture forever.',
    },
    {
      type: 'h2',
      id: 'team-capacity-and-operational-ownership',
      heading: 'Team capacity and operational ownership',
    },
    {
      type: 'p',
      text: 'Architecture must be matched to the people who will run it. A small team that owns the product end to end cannot carry the operational burden of many separately operated services. Every component adds monitoring, alerting, deployment, and recovery responsibilities.',
    },
    {
      type: 'p',
      text: 'The honest question is not what a large organization could operate, but what this team can operate well today while still improving the product. Operational ownership is a genuine constraint, and ignoring it produces systems that are technically impressive and practically fragile.',
    },
    {
      type: 'h2',
      id: 'data-and-integration-boundaries',
      heading: 'Data and integration boundaries',
    },
    {
      type: 'p',
      text: 'Data often dictates architecture more than any other factor. The shape of the data, who owns it, how often it changes, and which systems depend on it determine where the boundaries in a system should sit.',
    },
    {
      type: 'p',
      text: 'A useful exercise is to identify the integration boundaries before the service boundaries: which parts of the system share a data model, which change for different reasons, and which would need to evolve independently. Boundaries drawn around data ownership tend to hold up better than boundaries drawn around job titles.',
    },
    {
      type: 'h2',
      id: 'modular-monoliths-services-and-practical-trade-offs',
      heading: 'Modular monoliths, services, and practical trade-offs',
    },
    {
      type: 'p',
      text: 'The choice between a modular monolith and a set of services is not a moral one. Each has real costs and benefits, and the right answer depends on the specific context. A modular monolith keeps the codebase and operational surface simple while services provide independent scaling, deployment, and ownership boundaries.',
    },
    {
      type: 'p',
      text: 'The important discipline is modularity itself: clear boundaries, explicit dependencies, and well-defined interfaces. A poorly structured monolith and a poorly structured set of services both fail; a well-structured system of either kind is workable. Teams should start with the simplest structure that meets the product’s needs and introduce distribution only when a concrete requirement justifies it.',
    },
    {
      type: 'h2',
      id: 'security-and-reliability-requirements',
      heading: 'Security and reliability requirements',
    },
    {
      type: 'p',
      text: 'Security and reliability requirements should be derived from the product, not assumed. The sensitivity of the data, the users involved, the regulatory context, and the consequences of downtime all affect the appropriate design.',
    },
    {
      type: 'ul',
      items: [
        'What data is collected, and what is the consequence of its exposure?',
        'Who can access each part of the system, and how is that enforced?',
        'What happens to the product when a dependency or provider fails?',
        'How long can the product be unavailable before the impact becomes serious?',
      ],
    },
    {
      type: 'p',
      text: 'These answers should be documented because they drive real decisions: where secrets live, how data is isolated, how backups are taken, and how failures are handled. Skipping them does not remove the requirements; it removes the consideration.',
    },
    {
      type: 'h2',
      id: 'creating-decision-records',
      heading: 'Creating decision records',
    },
    {
      type: 'p',
      text: 'Architecture decisions are usually revisited months later, often by people who were not present when they were made. A lightweight decision record captures the context, the options considered, the decision, and the reason. Without it, a future team may repeat the same analysis or, worse, reverse a decision without understanding why it existed.',
    },
    {
      type: 'p',
      text: 'The record does not need to be elaborate. A short document per significant decision, stored with the code, is enough. What matters is that the reasoning survives longer than the conversation that produced it.',
    },
    {
      type: 'h2',
      id: 'when-and-how-architecture-should-evolve',
      heading: 'When and how architecture should evolve',
    },
    {
      type: 'p',
      text: 'Architecture is not a single event. It evolves as the product, team, and risks change. The healthy pattern is incremental: extract a service when it genuinely needs independent scaling or ownership, introduce a queue when a real rate mismatch appears, and add caching when measured performance requires it.',
    },
    {
      type: 'p',
      text: 'The warning signs that evolution is overdue are practical: changes that keep touching more files, deployments that keep growing riskier, and operational incidents that keep coming from the same place. These are better signals than technology trends, and they point toward specific, measurable improvements rather than a rebuild.',
    },
    {
      type: 'h2',
      id: 'practical-conclusion',
      heading: 'Practical conclusion',
    },
    {
      type: 'p',
      text: 'There is no universal best architecture, only an appropriate one for a given product, team, and stage. The practical approach is to match the structure to the current reality, keep it simple until a concrete requirement justifies complexity, document the decisions, and evolve the system incrementally as the product outgrows it. The most sophisticated architecture is not automatically the right one.',
    },
  ],
};
