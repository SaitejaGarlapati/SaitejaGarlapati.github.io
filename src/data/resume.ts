/**
 * Single source of truth for all site content.
 *
 * Everything rendered on the site comes from this file. Content is drawn
 * from the resume (resume/Saiteja_Garlapati_Resume.pdf) plus first-hand
 * detail provided by Saiteja (Inference as a Service, BMaaS components).
 * To update the site's content, edit here — not in the components.
 */

export const identity = {
  name: "Saiteja Garlapati",
  /** kebab-case handle used in the spec block and nav */
  handle: "saiteja-garlapati",
  title: "Software Engineer",
  focus: "AI Infrastructure & Compute",
  location: "Hillsboro, OR",
  email: "4511saiteja@gmail.com",
  github: "https://github.com/SaitejaGarlapati",
  linkedin: "https://www.linkedin.com/in/garlapati-saiteja-0aa052189/",
  /** ISO date the current role started — drives the live uptime counter */
  readySince: "2023-09-18T00:00:00-07:00",
  summary:
    "I build the layer where AI meets metal: Kubernetes control planes " +
    "that provision bare-metal and GPU compute, inference platforms " +
    "that serve LLMs on top of them, and agentic tooling that puts " +
    "those LLMs to work operating the infrastructure itself. Go and " +
    "Python, hands-on from BMC to model endpoint.",
};

/**
 * Major systems built at Intel, presented as running workloads.
 * `kind` is a flavor label in the K8s style (InferenceService is a real
 * KServe kind). The featured system renders full-width with its
 * components as a resource tree.
 */
export interface System {
  name: string;
  kind: string;
  status: "Running";
  description: string;
  labels: string[];
  /** full-width flagship card */
  featured?: boolean;
  /** AI-layer workload: rendered with the cyan accent (green = platform) */
  ai?: boolean;
  /** sub-services rendered as a tree inside the card */
  components?: { name: string; role: string }[];
}

export const systems: System[] = [
  {
    name: "bmaas-control-plane",
    kind: "Platform",
    status: "Running",
    featured: true,
    description:
      "BareMetal as a Service: the Kubernetes control plane that turns " +
      "racks of Intel hardware into provisionable compute. User-facing " +
      "REST APIs backed by gRPC microservices handle provisioning and " +
      "orchestration; cloud-init bootstrapping standardizes node OS " +
      "configuration; OIDC, RBAC, namespaces, and resource quotas " +
      "enforce multi-tenant isolation.",
    components: [
      {
        name: "instance-operator",
        role: "Provisions bare-metal and GPU nodes and drives their full lifecycle, from enrollment to production.",
      },
      {
        name: "validation-operator",
        role: "Gates the available pool. When a customer deprovisions a node, it runs performance workloads and system validation (preflight checks, drivers, interconnect speed), then releases healthy nodes back to the pool and flags failures for review.",
      },
      {
        name: "auto-discovery",
        role: "Connects to every switch in a region, verifies BMC reachability and VLAN configuration, and runs pre-flight checks so newly racked nodes surface ready-to-enroll.",
      },
    ],
    labels: ["kubernetes", "operators", "metal3", "redfish", "ipmitool", "grpc", "rest", "cloud-init", "oidc/rbac"],
  },
  {
    name: "inference-as-a-service",
    kind: "InferenceService",
    status: "Running",
    ai: true,
    description:
      "LLM serving on Intel hardware for internal customers. Models run " +
      "on vLLM, SGLang, and Ollama (llama.cpp backend); a LiteLLM proxy " +
      "gateway routes requests intelligently based on their complexity; " +
      "Langfuse traces the LLM layer while Prometheus, Grafana, and ELK " +
      "watch the hardware underneath.",
    labels: ["vllm", "sglang", "ollama", "litellm", "langfuse", "prometheus", "grafana"],
  },
  {
    name: "ai-validation-agent",
    kind: "Agent",
    status: "Running",
    ai: true,
    description:
      "An agentic LLM layer over the validation infrastructure. Admins " +
      "describe what to validate in plain language; the agent plans the " +
      "run, drives the validation operator through the Kubernetes API, " +
      "and returns a summarized outcome with links to the artifacts.",
    labels: ["llm-agent", "orchestration", "k8s-api", "gpu-health", "benchmarks"],
  },
];

/**
 * Career as a node lifecycle — the same state machine BMaaS applies to
 * bare-metal nodes, applied to the engineer. Chronological order;
 * the last entry is the current (pulsing) state.
 */
export interface Phase {
  /** lifecycle state name, K8s-phase style */
  phase: "Provisioned" | "Bootstrapped" | "Validating" | "Ready";
  /** tailwind color key from the theme (see tailwind.config.mjs) */
  color: "steel" | "cyan" | "amber" | "green";
  period: string;
  org: string;
  role: string;
  /** flavor annotation rendered as a code comment — stylistic, not a claim */
  note: string;
  /** one tight line per entry; deep detail belongs in `systems`, not here */
  desc?: string;
  current?: boolean;
}

export const lifecycle: Phase[] = [
  {
    phase: "Provisioned",
    color: "steel",
    period: "07/2017 → 06/2021",
    org: "Vellore Institute of Technology · Vellore, India",
    role: "B.Tech, Information Technology",
    note: "base image flashed",
  },
  {
    phase: "Bootstrapped",
    color: "cyan",
    period: "09/2021 → 08/2023",
    org: "Portland State University · Portland, USA",
    role: "M.S., Computer Science",
    note: "os configured, packages installed",
  },
  {
    phase: "Validating",
    color: "amber",
    period: "10/2022 → 08/2023",
    org: "Intel Corporation · United States",
    role: "Software Engineer Intern",
    note: "health checks passing",
    desc: "Automation frameworks and Jenkins pipelines in Go and Cypress for IDC's billing, metering, and identity services, with gRPC and REST integrations across environments.",
  },
  {
    phase: "Ready",
    color: "green",
    period: "09/2023 → present",
    org: "Intel Corporation · United States",
    role: "Software Engineer · AI Infrastructure & Compute",
    note: "admitted to cluster · reconciling",
    desc: "Building the systems above end to end: provisioning the metal, serving the models, and keeping multi-tenant GPU clusters healthy, observable, and isolated.",
    current: true,
  },
];

/**
 * Technical skills expressed as Kubernetes node labels —
 * the literal way K8s declares what a node is capable of.
 * Prefixes group the skill categories; ai/ sits up front because the
 * goal is the bridge between compute infrastructure and AI.
 */
export const labels: { prefix: string; values: string[]; ai?: boolean }[] = [
  { prefix: "lang", values: ["go", "python"] },
  { prefix: "ai", values: ["llm-serving", "vllm", "sglang", "ollama", "litellm"], ai: true },
  { prefix: "infra", values: ["kubernetes", "docker", "helm"] },
  { prefix: "cloud", values: ["aws", "gcp"] },
  { prefix: "api", values: ["grpc", "rest", "protobuf"] },
  { prefix: "hw", values: ["bmc", "ipmitool"] },
  { prefix: "o11y", values: ["prometheus", "grafana", "elk-kibana", "langfuse"] },
  { prefix: "ci", values: ["jenkins", "github-actions", "bazel"] },
  { prefix: "db", values: ["mysql", "postgresql", "mongodb"] },
  { prefix: "os", values: ["linux"] },
];
