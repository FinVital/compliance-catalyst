export interface ArticleData {
  slug: string;
  title: string;
  description: string;
  breadcrumbName: string;
  category: string;
  readTime: string;
  date: string;
  summary: string;
  schemaType: string;
  contentHtml: string;
  internalLinks: { text: string; slug: string }[];
}

export const articlesData: Record<string, ArticleData> = {
  "iso-42001-guide": {
    slug: "iso-42001-guide",
    title: "ISO/IEC 42001 AI Management System: The Ultimate Implementation Guide",
    description: "Learn how to plan, implement, and maintain an AI Management System (AIMS) conforming to the ISO/IEC 42001 standard.",
    breadcrumbName: "ISO/IEC 42001 Guide",
    category: "Standards",
    readTime: "9 min read",
    date: "August 9, 2026",
    summary: "A practical walkthrough of the first international standard for artificial intelligence management systems (AIMS), detailing its core clauses, controls, and certification steps.",
    schemaType: "HowTo",
    contentHtml: `
      <h2>Introduction to ISO/IEC 42001</h2>
      <p>ISO/IEC 42001 is the world's first international standard specifying requirements for establishing, implementing, maintaining, and continually improving an Artificial Intelligence Management System (AIMS) within organizations. It is designed for entities that develop, provide, or use AI-based products or services.</p>
      
      <h2>Core Clauses of the Standard</h2>
      <p>The standard follows the High-Level Structure (HLS) common to all ISO management standards (like ISO 27001). The key clauses include:</p>
      <ul>
        <li><strong>Clause 4: Context of the Organization</strong> – Defining the scope of AI systems and understanding stakeholder needs.</li>
        <li><strong>Clause 5: Leadership</strong> – Securing executive commitment and establishing an AI Policy.</li>
        <li><strong>Clause 6: Planning</strong> – Identifying AI risks and opportunities, and setting AI objectives.</li>
        <li><strong>Clause 8: Operation</strong> – Executing AI risk assessments and operational controls.</li>
      </ul>

      <h2>Step-by-Step Implementation</h2>
      <p>Implementing ISO 42001 involves the following sequence of steps:</p>
      <ol>
        <li><strong>Define Scope:</strong> Map all current AI deployments. Use tools like <a href="/ai-governance/shadow-ai-discovery">Shadow AI Discovery</a> to find undocumented integrations.</li>
        <li><strong>Conduct Impact Assessments:</strong> Identify potential societal, ethical, and organizational impacts of each model. Refer to the <a href="/ai-governance/ai-risk-assessment">Algorithmic Impact Assessment Guide</a>.</li>
        <li><strong>Design Operational Controls:</strong> Set up guardrails based on risk tiers. Learn more about <a href="/ai-governance/ai-authority-reversibility">AI Authority and Reversibility Management</a>.</li>
        <li><strong>Gather Evidence:</strong> Automatically compile logs and parameters using <a href="/ai-governance/continuous-compliance-evidence">Continuous Compliance Automation</a>.</li>
      </ol>
    `,
    internalLinks: [
      { text: "Shadow AI Discovery", slug: "shadow-ai-discovery" },
      { text: "Algorithmic Impact Assessments", slug: "ai-risk-assessment" },
      { text: "AI Authority and Reversibility", slug: "ai-authority-reversibility" },
      { text: "Continuous Compliance", slug: "continuous-compliance-evidence" }
    ]
  },
  "nist-ai-rmf-framework": {
    slug: "nist-ai-rmf-framework",
    title: "NIST AI Risk Management Framework: Mapping, Measuring, and Managing AI Risk",
    description: "Step-by-step implementation guide for the NIST AI Risk Management Framework (AI RMF 1.0) for trust and security.",
    breadcrumbName: "NIST AI RMF",
    category: "Frameworks",
    readTime: "8 min read",
    date: "August 9, 2026",
    summary: "An in-depth analysis of the NIST AI Risk Management Framework core functions: Govern, Map, Measure, and Manage, and how to apply them to your AI pipeline.",
    schemaType: "HowTo",
    contentHtml: `
      <h2>Understanding the NIST AI RMF Core</h2>
      <p>The National Institute of Standards and Technology (NIST) released the AI Risk Management Framework (AI RMF 1.0) to help organizations design, develop, and deploy trustworthy AI systems. The framework core is divided into four key functions:</p>
      
      <h3>1. GOVERN</h3>
      <p>The GOVERN function cultivates a culture of risk management. It underpins all other functions and establishes institutional commitment to AI safety and ethics.</p>

      <h3>2. MAP</h3>
      <p>The MAP function contextualizes AI risk. It involves identifying system boundaries, intended tasks, and potential adverse impacts. Effective mapping requires finding every active system via <a href="/ai-governance/shadow-ai-discovery">Shadow AI Discovery</a>.</p>

      <h3>3. MEASURE</h3>
      <p>The MEASURE function analyzes and tracks AI risks using quantitative or qualitative metrics. This includes measuring bias, transparency, and data drift. For real-time updates, see <a href="/ai-governance/bias-drift-monitoring">Drift and Policy Breach Monitoring</a>.</p>

      <h3>4. MANAGE</h3>
      <p>The MANAGE function allocates resources to treat mapped and measured risks. It sets active controls. Learn how to map controls across multiple standards in the <a href="/ai-governance/iso-42001-guide">ISO/IEC 42001 Guide</a>.</p>
    `,
    internalLinks: [
      { text: "Shadow AI Discovery", slug: "shadow-ai-discovery" },
      { text: "Drift Monitoring", slug: "bias-drift-monitoring" },
      { text: "ISO/IEC 42001 Standard", slug: "iso-42001-guide" }
    ]
  },
  "eu-ai-act-compliance": {
    slug: "eu-ai-act-compliance",
    title: "EU AI Act Compliance: Understanding Obligations and Risk Tiers",
    description: "Prepare your organization for the EU AI Act. Learn risk categories, timelines, transparency rules, and penalties.",
    breadcrumbName: "EU AI Act",
    category: "Regulations",
    readTime: "10 min read",
    date: "August 9, 2026",
    summary: "A compliance handbook for the EU AI Act, breaking down prohibited, high-risk, limited-risk, and minimal-risk categories and their respective operational duties.",
    schemaType: "Article",
    contentHtml: `
      <h2>The EU AI Act Risk-Based Approach</h2>
      <p>The European Union AI Act is the first comprehensive horizontal regulation on artificial intelligence. It classifies AI applications into four distinct risk categories:</p>
      
      <h3>1. Prohibited AI (Unacceptable Risk)</h3>
      <p>Applications that threaten people's safety, livelihoods, and rights (e.g., social scoring by governments, behavioral manipulation) are banned outright.</p>

      <h3>2. High-Risk AI</h3>
      <p>Systems deployed in critical infrastructure, recruitment, credit scoring, or law enforcement. These face strict obligations, including:</p>
      <ul>
        <li>Mandatory <a href="/ai-governance/ai-risk-assessment">Algorithmic Impact Assessments</a>.</li>
        <li>Rigorous data logging and continuous proof of validation. See <a href="/ai-governance/continuous-compliance-evidence">Continuous Evidence Collection</a>.</li>
        <li>Explicit human-in-the-loop oversight. Read about <a href="/ai-governance/ai-authority-reversibility">AI Authority Controls</a>.</li>
      </ul>

      <h3>3. Limited Risk (Transparency Obligations)</h3>
      <p>Applications like chatbots or generative AI must notify users that they are interacting with AI. Data training residency rules also apply, which can be mitigated via <a href="/ai-governance/on-premise-sovereign-ai">Sovereign On-Premise AI Deployment</a>.</p>
    `,
    internalLinks: [
      { text: "Algorithmic Impact Assessments", slug: "ai-risk-assessment" },
      { text: "Continuous Evidence Collection", slug: "continuous-compliance-evidence" },
      { text: "AI Authority Controls", slug: "ai-authority-reversibility" },
      { text: "Sovereign On-Premise AI", slug: "on-premise-sovereign-ai" }
    ]
  },
  "shadow-ai-discovery": {
    slug: "shadow-ai-discovery",
    title: "Shadow AI Discovery: How to Uncover and Catalog Unapproved AI Tools",
    description: "Learn passive scanning, API mapping, and code-level inspection techniques to find shadow AI across your enterprise.",
    breadcrumbName: "Shadow AI",
    category: "Discovery",
    readTime: "7 min read",
    date: "August 9, 2026",
    summary: "A technical guide to detecting unauthorized or unapproved AI systems, SaaS integrations, and models running on corporate credit cards and networks.",
    schemaType: "HowTo",
    contentHtml: `
      <h2>What is Shadow AI?</h2>
      <p>Shadow AI refers to the use of artificial intelligence tools, APIs, and SaaS products inside an organization without the explicit knowledge or approval of the IT and compliance teams. This introduces severe data residency, privacy, and regulatory compliance risks.</p>
      
      <h2>Key Detection Methods</h2>
      <p>Organizations can systematically discover shadow AI through three primary vectors:</p>
      <ol>
        <li><strong>Network Traffic Inspection:</strong> Passive DNS and SSL handshake scanning to detect outbound calls to known AI domains and model APIs.</li>
        <li><strong>Code Repository Scans:</strong> Scanning git repositories for API keys and libraries belonging to AI providers.</li>
        <li><strong>SaaS Access Audits:</strong> Reviewing single sign-on (SSO) and corporate billing logs for unregistered AI subscriptions.</li>
      </ol>

      <h2>Mapping into the Central Inventory</h2>
      <p>Once detected, each system must be categorized by risk. High-risk systems must immediately be mapped to GRC standards like the <a href="/ai-governance/eu-ai-act-compliance">EU AI Act</a> and <a href="/ai-governance/iso-42001-guide">ISO/IEC 42001</a>.</p>
    `,
    internalLinks: [
      { text: "EU AI Act Compliance", slug: "eu-ai-act-compliance" },
      { text: "ISO/IEC 42001 Standard", slug: "iso-42001-guide" }
    ]
  },
  "ai-risk-assessment": {
    slug: "ai-risk-assessment",
    title: "How to Perform an Algorithmic Impact Assessment for High-Risk AI",
    description: "A technical walkthrough for conducting AI impact and risk assessments for corporate model deployments.",
    breadcrumbName: "Impact Assessments",
    category: "Risk",
    readTime: "8 min read",
    date: "August 9, 2026",
    summary: "A blueprint for evaluating AI model impacts, tracking bias metrics, data transparency, and model cards to ensure audit readiness.",
    schemaType: "HowTo",
    contentHtml: `
      <h2>The Purpose of AI Impact Assessments</h2>
      <p>Algorithmic Impact Assessments (AIA) evaluate the potential societal, ethical, and safety hazards of deploying an AI system. Both the <a href="/ai-governance/eu-ai-act-compliance">EU AI Act</a> and the <a href="/ai-governance/nist-ai-rmf-framework">NIST AI RMF</a> mandate these assessments for systems operating in high-risk categories.</p>
      
      <h2>Core Assessment Dimensions</h2>
      <p>An effective assessment evaluates the following dimensions:</p>
      <ul>
        <li><strong>Data Governance:</strong> Confirming training data origin, consent, and potential bias representation.</li>
        <li><strong>System Robustness:</strong> Evaluating accuracy, failure modes, and security against adversarial attacks.</li>
        <li><strong>Human Oversight:</strong> Ensuring clear decision boundaries. Learn how in <a href="/ai-governance/ai-authority-reversibility">AI Authority Management</a>.</li>
        <li><strong>Explainability:</strong> Documenting the model card and output logic for audit review.</li>
      </ul>
    `,
    internalLinks: [
      { text: "EU AI Act", slug: "eu-ai-act-compliance" },
      { text: "NIST AI RMF", slug: "nist-ai-rmf-framework" },
      { text: "AI Authority Management", slug: "ai-authority-reversibility" }
    ]
  },
  "continuous-compliance-evidence": {
    slug: "continuous-compliance-evidence",
    title: "Continuous Compliance: Automating Audit Evidence & Tracking Freshness",
    description: "Learn how to automate compliance evidence gathering, calculate freshness scores, and enforce TTL audits.",
    breadcrumbName: "Continuous Compliance",
    category: "Assurance",
    readTime: "7 min read",
    date: "August 9, 2026",
    summary: "How to replace point-in-time compliance audits with an automated evidence engine that tracks data integrity and warns when control proof decays.",
    schemaType: "HowTo",
    contentHtml: `
      <h2>The Limitations of Point-in-Time Audits</h2>
      <p>Traditional GRC models rely on periodic manual screenshot collection and document uploads. For AI systems, which undergo frequent retraining and prompt updates, this approach leaves compliance teams with outdated evidence within weeks.</p>
      
      <h2>The Evidence Engine Concept</h2>
      <p>An automated evidence engine links directly to development pipelines, cloud infrastructures, and model endpoints to collect real-time proof. This includes:</p>
      <ul>
        <li>Cryptographic hashes of model weights.</li>
        <li>Live API access logs and authorization checks.</li>
        <li>Bias evaluation reports.</li>
      </ul>

      <h2>Evidence Freshness & TTL</h2>
      <p>Every piece of evidence is assigned a Time-To-Live (TTL) value. If evidence is not refreshed within this TTL, the freshness score decays, triggering remediation. This is vital for maintaining compliance under the <a href="/ai-governance/iso-42001-guide">ISO/IEC 42001 framework</a>.</p>
    `,
    internalLinks: [
      { text: "ISO/IEC 42001 Framework", slug: "iso-42001-guide" }
    ]
  },
  "autonomous-ai-agents-grc": {
    slug: "autonomous-ai-agents-grc",
    title: "Autonomous AI Agents: The Next Frontier in GRC and Audit Readiness",
    description: "Explore the role of autonomous AI agents in continuous compliance, automated mapping, and audit logging.",
    breadcrumbName: "AI Agents in GRC",
    category: "Automation",
    readTime: "6 min read",
    date: "August 9, 2026",
    summary: "How multi-agent systems automate standard compliance work, mapping system signals to multiple framework lenses automatically.",
    schemaType: "Article",
    contentHtml: `
      <h2>The Shift to Agentic Governance</h2>
      <p>Modern enterprise compliance demands continuous monitoring and scaling. Autonomous AI agents can execute repetitive, complex GRC tasks without manual intervention, working together as an orchestrated system.</p>
      
      <h2>How Multi-Agent GRC Works</h2>
      <p>A typical system delegates tasks across specialized agents:</p>
      <ul>
        <li><strong>Discovery:</strong> Continuously searches for and maps active endpoints. See <a href="/ai-governance/shadow-ai-discovery">Shadow AI Discovery</a>.</li>
        <li><strong>Classification:</strong> Automatically categorizes systems and maps them to control objectives, matching frameworks like <a href="/ai-governance/nist-ai-rmf-framework">NIST AI RMF</a>.</li>
        <li><strong>Evidence Assembly:</strong> Query logs and export conformity reports on demand. See <a href="/ai-governance/continuous-compliance-evidence">Continuous Evidence Collection</a>.</li>
      </ul>
    `,
    internalLinks: [
      { text: "Shadow AI Discovery", slug: "shadow-ai-discovery" },
      { text: "NIST AI RMF", slug: "nist-ai-rmf-framework" },
      { text: "Continuous Evidence Collection", slug: "continuous-compliance-evidence" }
    ]
  },
  "ai-authority-reversibility": {
    slug: "ai-authority-reversibility",
    title: "Managing AI Authority: Guardrails, Escalation, and Reversibility",
    description: "Learn to design safety guardrails and determine reversibility profiles for automated AI decision makers.",
    breadcrumbName: "Authority & Reversibility",
    category: "Risk",
    readTime: "8 min read",
    date: "August 9, 2026",
    summary: "How to govern AI systems based on the level of authority delegated to them and the reversibility of their decisions.",
    schemaType: "HowTo",
    contentHtml: `
      <h2>Evaluating Delegated Authority</h2>
      <p>As AI systems transition from recommending actions to executing them, organizations must govern the exact scope of authority delegated to each model. This is critical for high-impact models under the <a href="/ai-governance/eu-ai-act-compliance">EU AI Act</a>.</p>
      
      <h2>The Authority-Reversibility Matrix</h2>
      <p>ReguLattice models this across four quadrants based on whether authority is delegated and whether the action can be undone:</p>
      <ol>
        <li><strong>Monitor:</strong> Human retains authority; action is reversible. Log and review.</li>
        <li><strong>Sign-off:</strong> Human retains authority; action is irreversible. Hard stop until manual approval is logged.</li>
        <li><strong>Guardrail:</strong> System holds delegated authority; action is reversible. Autonomous execution within defined limits.</li>
        <li><strong>Blocked:</strong> System holds delegated authority; action is irreversible. Prohibited configuration.</li>
      </ol>
    `,
    internalLinks: [
      { text: "EU AI Act Compliance", slug: "eu-ai-act-compliance" }
    ]
  },
  "on-premise-sovereign-ai": {
    slug: "on-premise-sovereign-ai",
    title: "Sovereign GRC: Deploying AI Governance in Air-Gapped Networks",
    description: "How to deploy continuous compliance platforms and local model inference within air-gapped perimeters.",
    breadcrumbName: "Sovereign AI",
    category: "Deployment",
    readTime: "9 min read",
    date: "August 9, 2026",
    summary: "A technical architectural review of local, private, and air-gapped AI GRC setups designed for highly regulated markets.",
    schemaType: "Article",
    contentHtml: `
      <h2>The Sovereign Data Challenge</h2>
      <p>In highly regulated markets (like finance, healthcare, and defense), transmitting compliance data, model prompts, and logs to external cloud APIs is often prohibited due to strict residency laws and data sovereignty requirements.</p>
      
      <h2>Architectural Framework</h2>
      <p>Deploying AI GRC locally requires two key features:</p>
      <ul>
        <li><strong>Local Model Inference:</strong> Running small language models (SLMs) within the organization's perimeter for analysis.</li>
        <li><strong>Self-Contained Storage:</strong> Storing all evidence logs locally. See <a href="/ai-governance/continuous-compliance-evidence">Continuous Compliance Evidence</a>.</li>
      </ul>
    `,
    internalLinks: [
      { text: "Continuous Compliance Evidence", slug: "continuous-compliance-evidence" }
    ]
  },
  "bias-drift-monitoring": {
    slug: "bias-drift-monitoring",
    title: "Drift and Policy Breaches: Active Monitoring for Deployed Models",
    description: "Learn how to monitor model drift, data drift, prompt safety, and policy compliance in production.",
    breadcrumbName: "Drift Monitoring",
    category: "Monitoring",
    readTime: "8 min read",
    date: "August 9, 2026",
    summary: "How to set up active monitoring loops to detect concept drift, covariate shift, and policy violations in production AI endpoints.",
    schemaType: "HowTo",
    contentHtml: `
      <h2>The Dynamic Nature of AI Risks</h2>
      <p>Unlike traditional software, AI systems can experience performance decay and shift over time. Monitoring must detect these changes before they trigger operational failures or compliance breaches under frameworks like the <a href="/ai-governance/nist-ai-rmf-framework">NIST AI RMF</a>.</p>
      
      <h2>Core Monitoring Dimensions</h2>
      <p>Active monitoring should track:</p>
      <ul>
        <li><strong>Concept Drift:</strong> Changes in the statistical properties of the target variable.</li>
        <li><strong>Data Drift (Covariate Shift):</strong> Changes in the input data distribution.</li>
        <li><strong>Policy Breaches:</strong> Violations of system guardrails. Read more in <a href="/ai-governance/ai-authority-reversibility">AI Authority and Guardrails</a>.</li>
      </ul>
    `,
    internalLinks: [
      { text: "NIST AI RMF", slug: "nist-ai-rmf-framework" },
      { text: "AI Authority and Guardrails", slug: "ai-authority-reversibility" }
    ]
  }
};
