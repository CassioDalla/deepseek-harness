// website/.vitepress/config.ts
import { readFileSync as readFileSync2, writeFileSync as writeFileSync2 } from "node:fs";
import { resolve as resolve2 } from "node:path";
import { withMermaid } from "file:///home/cassiodalla/Documentos/github/deepseek-harness/node_modules/.pnpm/vitepress-plugin-mermaid@2.0.17_mermaid@11.16.0_vitepress@1.6.4_@algolia+client-search@_4e5e1d2dbd0e712c5a716bdb24f56ddf/node_modules/vitepress-plugin-mermaid/dist/vitepress-plugin-mermaid.es.mjs";

// website/.vitepress/code-groups.ts
function codeGroupFallbackHead(mpa) {
  return mpa ? [["style", {}, `
.vp-code-group .tabs, .vp-code-group button.copy { display: none; }
.vp-code-group .blocks > div { display: block; }
`]] : [];
}
function isolateCodeGroupRadios(md) {
  const render = md.renderer.rules["container_code-group_open"];
  if (render === void 0) throw new Error("VitePress Markdown renderer is missing the code-group opening rule.");
  md.renderer.rules["container_code-group_open"] = (...args) => {
    const html = render(...args);
    const opening = '<div class="tabs">';
    const closing = '</div><div class="blocks">';
    if (!html.includes(opening) || !html.includes(closing)) {
      throw new Error("VitePress code-group markup does not contain the expected tab strip.");
    }
    return html.replace(opening, '<form class="tabs" @submit.prevent>').replace(closing, '</form><div class="blocks">');
  };
}

// website/docs.ts
function localized(value, locale) {
  return typeof value === "object" && value !== null && !Array.isArray(value) ? value[locale] : value;
}
function mirroredPages(pages) {
  return pages.flatMap((page) => ["root", "en"].map((locale) => {
    const aliases = page.sourceAliases === void 0 ? void 0 : Array.isArray(page.sourceAliases) ? page.sourceAliases : page.sourceAliases[locale];
    return {
      locale,
      contentLocale: localized(page.contentLocale, locale),
      source: localized(page.source, locale),
      route: locale === "root" ? page.route : `en/${page.route}`,
      label: page.label[locale],
      sidebar: page.sidebar[locale],
      section: page.section[locale],
      order: page.order,
      ...page.outline === void 0 ? {} : { outline: page.outline },
      ...aliases === void 0 ? {} : { sourceAliases: aliases }
    };
  }));
}
function pairedPages(pages) {
  return mirroredPages(pages.map((page) => {
    const chineseSource = page.source.replace(/\.md$/, ".zh.md");
    const sharedAliases = page.sourceAliases ?? [];
    return {
      ...page,
      source: { root: chineseSource, en: page.source },
      contentLocale: { root: "zh-CN", en: "en-US" },
      sourceAliases: {
        root: [...sharedAliases, page.source],
        en: [...sharedAliases, chineseSource]
      }
    };
  }));
}
var homeAndGuide = pairedPages([
  {
    source: "docs/user/index.md",
    route: "index.md",
    label: { root: "DeepSeek Harness", en: "DeepSeek Harness" },
    sidebar: { root: null, en: null },
    section: { root: "\u9996\u9875", en: "Home" },
    order: 0
  },
  {
    source: "docs/user/guide/index.md",
    route: "guide/quickstart.md",
    label: { root: "\u4F7F\u7528 Web UI", en: "Use the Web UI" },
    sidebar: { root: "zh-guide", en: "en-guide" },
    section: { root: "\u5165\u95E8", en: "Guide" },
    order: 1,
    sourceAliases: ["docs/user/guide"]
  },
  {
    source: "docs/user/guide/providers.md",
    route: "guide/providers.md",
    label: { root: "\u914D\u7F6E\u6A21\u578B", en: "Configure models" },
    sidebar: { root: "zh-guide", en: "en-guide" },
    section: { root: "\u5165\u95E8", en: "Guide" },
    order: 2
  },
  {
    source: "docs/user/guide/network-proxy.md",
    route: "guide/network-proxy.md",
    label: { root: "\u7F51\u7EDC\u4EE3\u7406", en: "Network proxy" },
    sidebar: { root: "zh-guide", en: "en-guide" },
    section: { root: "\u5165\u95E8", en: "Guide" },
    order: 3
  },
  {
    source: "docs/user/guide/python-sdk.md",
    route: "guide/python-sdk.md",
    label: { root: "Python", en: "Python" },
    sidebar: { root: "zh-guide", en: "en-guide" },
    section: { root: "SDK", en: "SDK" },
    order: 1
  },
  {
    source: "docs/user/guide/github-review.md",
    route: "guide/github-review.md",
    label: { root: "GitHub \u8BC4\u5BA1\u4F1A\u8BDD", en: "GitHub review sessions" },
    sidebar: { root: "zh-guide", en: "en-guide" },
    section: { root: "\u81EA\u52A8\u5316", en: "Automation" },
    order: 1
  },
  {
    source: "docs/user/guide/schedule.md",
    route: "guide/schedule.md",
    label: { root: "\u4F1A\u8BDD\u5185\u63D0\u9192", en: "Session reminders" },
    sidebar: { root: "zh-guide", en: "en-guide" },
    section: { root: "\u81EA\u52A8\u5316", en: "Automation" },
    order: 2
  },
  {
    source: "docs/user/guide/mcp-memory.md",
    route: "guide/mcp-memory.md",
    label: { root: "\u8BB0\u5FC6 MCP", en: "Memory MCP" },
    sidebar: { root: "zh-guide", en: "en-guide" },
    section: { root: "\u96C6\u6210", en: "Integrations" },
    order: 1
  }
]);
var develop = pairedPages([
  {
    source: "docs/user/develop/basic/index.md",
    route: "develop/basic/index.md",
    label: { root: "\u7B2C\u4E00\u4E2A Harness \u63D2\u4EF6", en: "Your first Harness plugin" },
    sidebar: { root: "zh-develop", en: "en-develop" },
    section: { root: "\u57FA\u7840", en: "Basics" },
    order: 1,
    sourceAliases: ["docs/user/develop/basic"]
  },
  {
    source: "docs/user/develop/basic/tool.md",
    route: "develop/basic/tool.md",
    label: { root: "\u5F00\u53D1\u4E00\u4E2A Tool", en: "Build a tool" },
    sidebar: { root: "zh-develop", en: "en-develop" },
    section: { root: "\u57FA\u7840", en: "Basics" },
    order: 2
  },
  {
    source: "docs/user/develop/basic/config.md",
    route: "develop/basic/config.md",
    label: { root: "\u63D2\u4EF6\u914D\u7F6E", en: "Plugin configuration" },
    sidebar: { root: "zh-develop", en: "en-develop" },
    section: { root: "\u57FA\u7840", en: "Basics" },
    order: 3
  },
  {
    source: "docs/user/develop/basic/publish.md",
    route: "develop/basic/publish.md",
    label: { root: "\u6253\u5305\u4E0E\u5B89\u88C5\u63D2\u4EF6", en: "Package and install" },
    sidebar: { root: "zh-develop", en: "en-develop" },
    section: { root: "\u57FA\u7840", en: "Basics" },
    order: 4
  },
  {
    source: "docs/user/develop/framework/index.md",
    route: "develop/framework/index.md",
    label: { root: "\u63D2\u4EF6\u4E0E\u751F\u547D\u5468\u671F", en: "Plugin lifecycle" },
    sidebar: { root: "zh-develop", en: "en-develop" },
    section: { root: "\u6846\u67B6\u80FD\u529B", en: "Framework" },
    order: 1,
    sourceAliases: ["docs/user/develop/framework"]
  },
  {
    source: "docs/user/develop/framework/service.md",
    route: "develop/framework/service.md",
    label: { root: "\u670D\u52A1\u4E0E\u4F9D\u8D56", en: "Services and dependencies" },
    sidebar: { root: "zh-develop", en: "en-develop" },
    section: { root: "\u6846\u67B6\u80FD\u529B", en: "Framework" },
    order: 2
  },
  {
    source: "docs/user/develop/framework/events.md",
    route: "develop/framework/events.md",
    label: { root: "\u4E8B\u4EF6\u7CFB\u7EDF", en: "Event system" },
    sidebar: { root: "zh-develop", en: "en-develop" },
    section: { root: "\u6846\u67B6\u80FD\u529B", en: "Framework" },
    order: 3
  },
  {
    source: "docs/user/develop/practice/index.md",
    route: "develop/practice/index.md",
    label: { root: "\u80FD\u529B\u7684\u4E09\u5C42\u62C6\u5206", en: "Capability layering" },
    sidebar: { root: "zh-develop", en: "en-develop" },
    section: { root: "\u5B9E\u6218", en: "Practice" },
    order: 1,
    sourceAliases: ["docs/user/develop/practice"]
  },
  {
    source: "docs/user/develop/practice/llm-adapter.md",
    route: "develop/practice/llm-adapter.md",
    label: { root: "LLM \u9002\u914D\u5668", en: "LLM adapter" },
    sidebar: { root: "zh-develop", en: "en-develop" },
    section: { root: "\u5B9E\u6218", en: "Practice" },
    order: 2
  },
  {
    source: "docs/user/develop/practice/dynamic-cordis.md",
    route: "develop/practice/dynamic-cordis.md",
    label: { root: "\u6301\u4E45\u5316 Harness \u63D2\u4EF6", en: "Persistent Harness plugins" },
    sidebar: { root: "zh-develop", en: "en-develop" },
    section: { root: "\u5B9E\u6218", en: "Practice" },
    order: 3
  }
]);
var cordisTutorial = pairedPages([
  ["index.md", "\u603B\u89C8", "Overview"],
  ["01-first-plugin.md", "1. \u7B2C\u4E00\u4E2A\u63D2\u4EF6", "1. Your first plugin"],
  ["02-lifecycle-and-effects.md", "2. \u751F\u547D\u5468\u671F\u4E0E\u526F\u4F5C\u7528", "2. Lifecycle and effects"],
  ["03-services.md", "3. \u670D\u52A1", "3. Services"],
  ["04-events.md", "4. \u4E8B\u4EF6", "4. Events"],
  ["05-config.md", "5. \u914D\u7F6E", "5. Configuration"],
  ["06-composition-and-hmr.md", "6. \u7EC4\u5408\u4E0E\u70ED\u91CD\u8F7D", "6. Composition and HMR"],
  ["07-into-the-harness.md", "7. \u8FDB\u5165 Harness", "7. Into the harness"]
].map(([file, rootLabel, enLabel], order) => ({
  source: `docs/cordis-tutorial/${file}`,
  route: `develop/cordis-tutorial/${file}`,
  label: { root: rootLabel, en: enLabel },
  sidebar: { root: "zh-develop", en: "en-develop" },
  section: { root: "Cordis \u6846\u67B6\u6559\u7A0B", en: "Cordis framework tutorial" },
  order,
  ...file === "index.md" ? { sourceAliases: ["docs/cordis-tutorial"] } : {}
})));
var cordisPrimerReference = pairedPages([
  {
    source: "docs/cordis-primer.md",
    route: "reference/cordis-primer.md",
    label: { root: "Cordis \u5165\u95E8", en: "Cordis primer" },
    sidebar: { root: "zh-reference", en: "en-reference" },
    section: { root: "\u6982\u5FF5", en: "Concepts" },
    order: 1
  }
]);
var subsystemGroups = [
  ["\u603B\u89C8", "Overview", [
    ["README.md", "\u5B50\u7CFB\u7EDF", "Subsystems"]
  ]],
  ["\u5185\u6838\u4E0E\u4F5C\u7528\u57DF", "Core and scopes", [
    ["core.md", "\u6838\u5FC3", "Core"],
    ["scope.md", "\u4F5C\u7528\u57DF", "Scopes"],
    ["invariants.md", "\u8FD0\u884C\u65F6\u4E0D\u53D8\u5F0F", "Runtime invariants"]
  ]],
  ["\u4F1A\u8BDD\u4E0E\u6301\u4E45\u5316", "Sessions and persistence", [
    ["session.md", "\u4F1A\u8BDD", "Sessions"],
    ["session-query.md", "\u4F1A\u8BDD\u67E5\u8BE2", "Session query"],
    ["session-reference.md", "\u4F1A\u8BDD\u5F15\u7528", "Session references"],
    ["session-title.md", "\u4F1A\u8BDD\u6807\u9898", "Session titles"],
    ["session-projection.md", "\u4F1A\u8BDD\u6295\u5F71", "Session projections"],
    ["persistence.md", "\u4F1A\u8BDD\u6301\u4E45\u5316", "Session persistence"],
    ["spill.md", "Spill \u5B58\u50A8", "Spill storage"],
    ["session-telemetry.md", "\u9065\u6D4B", "SessionTelemetryBackend"]
  ]],
  ["\u6A21\u578B\u4E0E\u4E0A\u4E0B\u6587", "Model and context", [
    ["llm-streaming.md", "LLM \u6D41\u5F0F\u54CD\u5E94", "LLM streaming"],
    ["token-meter.md", "Token \u8BA1\u91CF", "Token metering"],
    ["system-prompt.md", "\u7CFB\u7EDF\u63D0\u793A\u8BCD", "System prompts"],
    ["compaction.md", "\u4E0A\u4E0B\u6587\u538B\u7F29", "Compaction"]
  ]],
  ["\u6267\u884C\u4E0E\u5DE5\u5177", "Execution and tools", [
    ["tools.md", "\u5DE5\u5177", "Tools"],
    ["shell.md", "Bash \u6267\u884C", "Bash execution"],
    ["subprocess.md", "\u5B50\u8FDB\u7A0B", "Subprocesses"],
    ["terminal.md", "PTY \u4F1A\u8BDD", "PTY sessions"],
    ["jobs.md", "\u540E\u53F0\u4EFB\u52A1", "Background jobs"],
    ["filesystem.md", "\u6587\u4EF6\u7CFB\u7EDF", "Filesystem"],
    ["lsp.md", "LSP \u5BFC\u822A", "LSP navigation"],
    ["ptc-runtime.md", "PTC \u8FD0\u884C\u65F6", "PTC runtime"],
    ["web.md", "Web \u8BBF\u95EE", "Web access"],
    ["skills.md", "\u6280\u80FD", "Skills"],
    ["workflow.md", "\u5DE5\u4F5C\u6D41", "Workflows"],
    ["subagent.md", "\u5B50\u4EE3\u7406", "Subagents"]
  ]],
  ["\u7B56\u7565\u4E0E\u4EA4\u4E92", "Policy and interaction", [
    ["approval.md", "\u5BA1\u6279", "Approvals"],
    ["permission-presets.md", "\u6743\u9650\u9884\u8BBE", "Permission presets"],
    ["sandbox.md", "\u6C99\u7BB1", "Sandboxing"],
    ["plan.md", "\u8BA1\u5212\u6A21\u5F0F", "Plan mode"],
    ["user-questions.md", "\u7528\u6237\u4EA4\u4E92", "User interaction"],
    ["commands.md", "\u547D\u4EE4", "Human commands"],
    ["goal.md", "\u76EE\u6807", "Goals"],
    ["schedule.md", "\u5B9A\u65F6\u63D0\u9192", "Scheduled reminders"]
  ]],
  ["\u5E73\u53F0\u4E0E\u63A5\u5165", "Platform and access", [
    ["web-server.md", "HTTP \u670D\u52A1\u5668", "HTTP server"],
    ["web-client.md", "Web Client \u67B6\u6784", "Web Client architecture"],
    ["client-modules.md", "\u5BA2\u6237\u7AEF\u6A21\u5757", "Client modules"],
    ["slots.md", "\u5BA2\u6237\u7AEF Slots", "Client slots"],
    ["client-resources.md", "\u5BA2\u6237\u7AEF\u8D44\u6E90", "Client resources"],
    ["sidebar-right.md", "\u53F3\u4FA7 Sidebar", "Right Sidebar"],
    ["conversation.md", "Conversation \u7EC4\u88C5", "Conversation assembly"],
    ["typert.md", "Typert", "Typert"],
    ["storage.md", "\u5B58\u50A8", "Storage"],
    ["workspace.md", "\u5DE5\u4F5C\u533A", "Workspaces"],
    ["settings.md", "\u7528\u6237\u8BBE\u7F6E", "User settings"],
    ["credentials.md", "\u7528\u6237\u51ED\u636E", "User credentials"]
  ]]
];
var subsystemsReference = subsystemGroups.flatMap(([rootSection, enSection, files]) => pairedPages(
  files.map(([file, rootLabel, enLabel], order) => ({
    source: `docs/subsystems/${file}`,
    route: file === "README.md" ? "reference/subsystems/index.md" : `reference/subsystems/${file}`,
    label: { root: rootLabel, en: enLabel },
    sidebar: { root: "zh-reference", en: "en-reference" },
    section: { root: rootSection, en: enSection },
    order,
    // Subsystem pages carry long third-level sections a two-level outline reaches.
    outline: [2, 3],
    ...file === "README.md" ? { sourceAliases: ["docs/subsystems"] } : {}
  }))
));
var reference = [
  // `docs/deepseek-llm-api-wire-extensions.md` is a repository-only provider protocol reference.
  // Projected links intentionally resolve to its GitHub source instead of a public site route.
  ...pairedPages([
    ["docs/architecture.md", "reference/index.md", "\u67B6\u6784", "Architecture", 0]
  ].map(([source, route, rootLabel, enLabel, order]) => ({
    source,
    route,
    label: { root: rootLabel, en: enLabel },
    sidebar: { root: "zh-reference", en: "en-reference" },
    section: { root: "\u6982\u5FF5", en: "Concepts" },
    order
  }))),
  ...pairedPages([
    ["docs/capability-seams.md", "reference/capability-seams.md", "\u80FD\u529B\u670D\u52A1", "Capability services", 2],
    ["docs/agent-lifecycle.md", "reference/agent-lifecycle.md", "Agent \u751F\u547D\u5468\u671F", "Agent lifecycle", 3],
    ["docs/tool-execution-pipeline.md", "reference/tool-execution-pipeline.md", "Tool \u6267\u884C", "Tool execution", 4],
    ["docs/api-gateway.md", "reference/api-gateway.md", "API Gateway", "API Gateway", 5]
  ].map(([source, route, rootLabel, enLabel, order]) => ({
    source,
    route,
    label: { root: rootLabel, en: enLabel },
    sidebar: { root: "zh-reference", en: "en-reference" },
    section: { root: "\u6982\u5FF5", en: "Concepts" },
    order
  }))),
  ...pairedPages([
    ["docs/config-catalog.md", "reference/config-catalog.md", "\u63D2\u4EF6\u914D\u7F6E", "Plugin configuration"],
    ["docs/tool-catalog.md", "reference/tool-catalog.md", "Tool Schema", "Tool schemas"],
    ["docs/persistence-catalog.md", "reference/persistence-catalog.md", "\u6301\u4E45\u5316\u4E8B\u4EF6", "Persistence events", "deep"]
  ].map(([source, route, rootLabel, enLabel, outline], order) => ({
    source,
    route,
    label: { root: rootLabel, en: enLabel },
    sidebar: { root: "zh-reference", en: "en-reference" },
    section: { root: "\u751F\u6210\u53C2\u8003", en: "Generated reference" },
    order,
    ...outline === void 0 ? {} : { outline }
  }))),
  ...pairedPages([
    ["context.md", "Context", "Context"],
    ["events.md", "Events", "Events"],
    ["fiber.md", "Fiber", "Fiber"],
    ["registry.md", "Plugin Registry", "Plugin Registry"],
    ["service.md", "Service", "Service"]
  ].map(([file, rootLabel, enLabel], order) => ({
    source: `docs/cordis-api/${file}`,
    route: `reference/cordis-api/${file}`,
    label: { root: rootLabel, en: enLabel },
    sidebar: { root: "zh-reference", en: "en-reference" },
    section: { root: "Cordis API", en: "Cordis Core API" },
    order
  }))),
  ...mirroredPages([
    ["inherited.md", "\u7EE7\u627F\u63A5\u53E3\u9762", "Inherited surface"]
  ].map(([file, rootLabel, enLabel], order) => ({
    source: `docs/cordis-api/${file}`,
    route: `reference/cordis-api/${file}`,
    contentLocale: "en-US",
    label: { root: rootLabel, en: enLabel },
    sidebar: { root: "zh-reference", en: "en-reference" },
    section: { root: "Cordis API", en: "Cordis Core API" },
    order: order + 5
  }))),
  ...pairedPages([
    ["adding-a-package.md", "\u65B0\u589E Package", "Adding a package"],
    ["adding-a-tool.md", "\u65B0\u589E Tool", "Adding a tool"],
    ["adding-an-llm-adapter.md", "\u65B0\u589E LLM Adapter", "Adding an LLM adapter"],
    ["adding-a-settings-card.md", "\u65B0\u589E\u8BBE\u7F6E\u5361\u7247", "Adding a settings card"],
    ["extension-cookbook.md", "\u6269\u5C55\u6A21\u5F0F", "Extension patterns"]
  ].map(([file, rootLabel, enLabel], order) => ({
    source: `docs/cookbook/${file}`,
    route: `reference/cookbook/${file}`,
    label: { root: rootLabel, en: enLabel },
    sidebar: { root: "zh-reference", en: "en-reference" },
    section: { root: "\u5F00\u53D1\u624B\u518C", en: "Cookbook" },
    order
  })))
];
var localeCollections = {
  root: ["zh-guide", "zh-develop", "zh-reference"],
  en: ["en-guide", "en-develop", "en-reference"]
};
var sections = {
  root: [
    { label: "\u5165\u95E8" },
    { label: "SDK" },
    { label: "\u81EA\u52A8\u5316" },
    { label: "\u96C6\u6210" },
    { label: "\u57FA\u7840" },
    { label: "\u6846\u67B6\u80FD\u529B" },
    { label: "\u5B9E\u6218" },
    { label: "Cordis \u6846\u67B6\u6559\u7A0B" },
    { label: "\u6982\u5FF5" },
    { label: "\u751F\u6210\u53C2\u8003" },
    { label: "Cordis API" },
    { label: "\u5F00\u53D1\u624B\u518C" },
    { label: "\u603B\u89C8" },
    { label: "\u5185\u6838\u4E0E\u4F5C\u7528\u57DF", collapsed: true },
    { label: "\u4F1A\u8BDD\u4E0E\u6301\u4E45\u5316", collapsed: true },
    { label: "\u6A21\u578B\u4E0E\u4E0A\u4E0B\u6587", collapsed: true },
    { label: "\u6267\u884C\u4E0E\u5DE5\u5177", collapsed: true },
    { label: "\u7B56\u7565\u4E0E\u4EA4\u4E92", collapsed: true },
    { label: "\u5E73\u53F0\u4E0E\u63A5\u5165", collapsed: true }
  ],
  en: [
    { label: "Guide" },
    { label: "SDK" },
    { label: "Automation" },
    { label: "Integrations" },
    { label: "Basics" },
    { label: "Framework" },
    { label: "Practice" },
    { label: "Cordis framework tutorial" },
    { label: "Concepts" },
    { label: "Generated reference" },
    { label: "Cordis Core API" },
    { label: "Cookbook" },
    { label: "Overview" },
    { label: "Core and scopes", collapsed: true },
    { label: "Sessions and persistence", collapsed: true },
    { label: "Model and context", collapsed: true },
    { label: "Execution and tools", collapsed: true },
    { label: "Policy and interaction", collapsed: true },
    { label: "Platform and access", collapsed: true }
  ]
};
function sectionSpec(locale, label) {
  const declared = sections[locale];
  const section = declared.find((candidate) => candidate.label === label);
  if (section === void 0) throw new Error(`Sidebar section "${label}" has no placement in the ${locale} locale.`);
  return { ...section, index: declared.indexOf(section) };
}
var docsPages = [
  ...homeAndGuide,
  ...develop,
  ...cordisTutorial,
  ...cordisPrimerReference,
  ...subsystemsReference,
  ...reference
];
function orderedPages(locale, collection) {
  return docsPages.filter((page) => page.locale === locale && page.sidebar === collection).sort((left, right) => sectionSpec(locale, left.section).index - sectionSpec(locale, right.section).index || left.order - right.order);
}
function routeLink(route) {
  return `/${route.replace(/(?:index)?\.md$/, "")}`;
}
function landingLink(locale, collection) {
  const first = orderedPages(locale, collection)[0];
  if (first === void 0) throw new Error(`Sidebar collection "${collection}" publishes no page.`);
  return routeLink(first.route);
}

// scripts/project-doc-site.ts
import {
  copyFileSync,
  existsSync,
  lstatSync,
  mkdirSync,
  readFileSync,
  realpathSync,
  rmSync,
  statSync,
  writeFileSync
} from "node:fs";
import { basename, dirname, extname, posix, relative, resolve, sep } from "node:path";
import { fromMarkdown as fromMarkdown2 } from "file:///home/cassiodalla/Documentos/github/deepseek-harness/node_modules/.pnpm/mdast-util-from-markdown@2.0.3_supports-color@9.4.0/node_modules/mdast-util-from-markdown/index.js";
import { gfmFromMarkdown as gfmFromMarkdown2 } from "file:///home/cassiodalla/Documentos/github/deepseek-harness/node_modules/.pnpm/mdast-util-gfm@3.1.0/node_modules/mdast-util-gfm/index.js";
import { gfm as gfm2 } from "file:///home/cassiodalla/Documentos/github/deepseek-harness/node_modules/.pnpm/micromark-extension-gfm@3.0.0/node_modules/micromark-extension-gfm/index.js";

// scripts/markdown.ts
import { fromMarkdown } from "file:///home/cassiodalla/Documentos/github/deepseek-harness/node_modules/.pnpm/mdast-util-from-markdown@2.0.3_supports-color@9.4.0/node_modules/mdast-util-from-markdown/index.js";
import { gfmFromMarkdown } from "file:///home/cassiodalla/Documentos/github/deepseek-harness/node_modules/.pnpm/mdast-util-gfm@3.1.0/node_modules/mdast-util-gfm/index.js";
import { gfm } from "file:///home/cassiodalla/Documentos/github/deepseek-harness/node_modules/.pnpm/micromark-extension-gfm@3.0.0/node_modules/micromark-extension-gfm/index.js";
function isExternalOrAbsoluteMarkdownUrl(url) {
  return url.startsWith("#") || url.startsWith("//") || url.startsWith("/") || /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(url);
}
function splitMarkdownUrlTarget(url) {
  const boundary = url.search(/[?#]/);
  if (boundary === -1) return { path: url, suffix: "" };
  return { path: url.slice(0, boundary), suffix: url.slice(boundary) };
}
function skipWhitespace(source, start) {
  let index = start;
  while (/\s/.test(source[index] ?? "")) index += 1;
  return index;
}
function labelEnd(source) {
  const first = source.indexOf("[");
  if (first === -1) return -1;
  let depth = 0;
  for (let index = first; index < source.length; index += 1) {
    const char = source[index];
    if (char === "\\") index += 1;
    else if (char === "[") depth += 1;
    else if (char === "]") {
      depth -= 1;
      if (depth === 0) return index;
    }
  }
  return -1;
}
function destinationRange(rawNode, type) {
  const endOfLabel = labelEnd(rawNode);
  if (endOfLabel === -1) throw new Error(`markdown: cannot locate label end in ${JSON.stringify(rawNode)}`);
  let start;
  if (type === "definition") {
    const colon = rawNode.indexOf(":", endOfLabel + 1);
    if (colon === -1) throw new Error(`markdown: cannot locate definition separator in ${JSON.stringify(rawNode)}`);
    start = skipWhitespace(rawNode, colon + 1);
  } else {
    if (rawNode[endOfLabel + 1] !== "(") {
      throw new Error(`markdown: cannot locate inline destination in ${JSON.stringify(rawNode)}`);
    }
    start = skipWhitespace(rawNode, endOfLabel + 2);
  }
  if (rawNode[start] === "<") {
    for (let index = start + 1; index < rawNode.length; index += 1) {
      if (rawNode[index] === "\\") index += 1;
      else if (rawNode[index] === ">") return { start: start + 1, end: index };
    }
    throw new Error(`markdown: cannot locate angle-bracket destination end in ${JSON.stringify(rawNode)}`);
  }
  let depth = 0;
  for (let index = start; index < rawNode.length; index += 1) {
    const char = rawNode[index];
    if (char === "\\") index += 1;
    else if (char === "(") depth += 1;
    else if (char === ")") {
      if (depth === 0) return { start, end: index };
      depth -= 1;
    } else if (/\s/.test(char ?? "") && depth === 0) {
      return { start, end: index };
    }
  }
  return { start, end: rawNode.length };
}
function markdownDestination(source, node) {
  const start = node.position?.start.offset;
  const end = node.position?.end.offset;
  if (start === void 0 || end === void 0) {
    throw new Error(`markdown: destination ${JSON.stringify(node.url)} has no source offsets`);
  }
  const range = destinationRange(source.slice(start, end), node.type);
  const absolute = { start: start + range.start, end: start + range.end };
  return { ...absolute, url: source.slice(absolute.start, absolute.end) };
}

// scripts/project-doc-site.ts
var __vite_injected_original_dirname = "/home/cassiodalla/Documentos/github/deepseek-harness/scripts";
var REPOSITORY_URL = "https://github.com/deepseek-ai/deepseek-harness";
var root = resolve(__vite_injected_original_dirname, "..");
var generatedRoot = resolve(root, "website/.generated");
function resolveRepositoryRef(environment) {
  return environment.DOCS_REPOSITORY_REF ?? "master";
}
function repoPath(absPath, repoRoot) {
  return relative(repoRoot, absPath).split(sep).join("/");
}
function decodePath(path) {
  try {
    return decodeURIComponent(path);
  } catch {
    throw new Error(`project-doc-site: malformed percent escape in ${JSON.stringify(path)}.`);
  }
}
function routeTarget(fromRoute, toRoute, suffix) {
  const target = posix.relative(posix.dirname(fromRoute), toRoute);
  return `${target.startsWith(".") ? target : `./${target}`}${suffix}`;
}
function sourceMap(pages) {
  const map = /* @__PURE__ */ new Map();
  for (const page of pages) {
    for (const source of [page.source, ...page.sourceAliases ?? []]) {
      const localized2 = map.get(source) ?? /* @__PURE__ */ new Map();
      if (localized2.has(page.locale)) {
        throw new Error(`project-doc-site: duplicate source or alias ${JSON.stringify(source)} for locale ${JSON.stringify(page.locale)}.`);
      }
      localized2.set(page.locale, page);
      map.set(source, localized2);
    }
  }
  return map;
}
function counterpartSource(source) {
  return source.endsWith(".zh.md") ? source.replace(/\.zh\.md$/, ".md") : source.replace(/\.md$/, ".zh.md");
}
function resolveRepositoryTarget(sourceAbs, rawPath, repoRoot) {
  const decoded = decodePath(rawPath);
  let absPath = resolve(dirname(sourceAbs), decoded);
  if (existsSync(absPath)) return { absPath };
  const lineMatch = decoded.match(/:(\d+)$/);
  if (lineMatch !== null) {
    const lineText = lineMatch[1];
    if (lineText === void 0) throw new Error("project-doc-site: line suffix matched without a line number.");
    absPath = resolve(dirname(sourceAbs), decoded.slice(0, -lineMatch[0].length));
    if (existsSync(absPath)) return { absPath, line: Number.parseInt(lineText, 10) };
  }
  if (extname(decoded) === "") {
    const markdown = resolve(dirname(sourceAbs), `${decoded}.md`);
    if (existsSync(markdown)) return { absPath: markdown };
    const index = resolve(dirname(sourceAbs), decoded, "index.md");
    if (existsSync(index)) return { absPath: index };
  }
  throw new Error(`project-doc-site: ${repoPath(sourceAbs, repoRoot)} links to missing path ${JSON.stringify(rawPath)}.`);
}
function githubTarget(absPath, line, suffix, repositoryRef, repoRoot, image) {
  const path = repoPath(absPath, repoRoot);
  if (image) return `https://raw.githubusercontent.com/deepseek-ai/deepseek-harness/${repositoryRef}/${path}${suffix}`;
  const kind = lstatSync(absPath).isDirectory() ? "tree" : "blob";
  const lineSuffix = line === void 0 ? suffix : `#L${line}`;
  return `${REPOSITORY_URL}/${kind}/${repositoryRef}/${path}${lineSuffix}`;
}
function rewriteMarkdown(source, options) {
  const sourceAbs = resolve(options.repoRoot, options.sourcePath);
  const published = sourceMap(options.pages);
  const tree = fromMarkdown2(source, { extensions: [gfm2()], mdastExtensions: [gfmFromMarkdown2()] });
  const replacements = [];
  const rewrite = (node) => {
    if (isExternalOrAbsoluteMarkdownUrl(node.url)) return;
    const { path, suffix } = splitMarkdownUrlTarget(node.url);
    if (path === "") return;
    const { absPath, line } = resolveRepositoryTarget(sourceAbs, path, options.repoRoot);
    const targetPath = repoPath(absPath, options.repoRoot);
    const isLanguageSwitcher = targetPath === counterpartSource(options.sourcePath);
    const targetLocale = isLanguageSwitcher ? options.locale === "root" ? "en" : "root" : options.locale;
    const page = published.get(targetPath)?.get(targetLocale);
    const nextUrl = page !== void 0 ? routeTarget(options.route, page.route, suffix) : node.type === "image" && options.placeImage !== void 0 ? `${options.placeImage(absPath)}${suffix}` : githubTarget(absPath, line, suffix, options.repositoryRef, options.repoRoot, node.type === "image");
    const destination = markdownDestination(source, node);
    replacements.push({
      start: destination.start,
      end: destination.end,
      value: nextUrl
    });
  };
  const visit = (node) => {
    if ((node.type === "link" || node.type === "image" || node.type === "definition") && "url" in node) rewrite(node);
    if ("children" in node) {
      for (const child of node.children) visit(child);
    }
  };
  visit(tree);
  let projected = source;
  for (const replacement of replacements.sort((a, b) => b.start - a.start)) {
    projected = projected.slice(0, replacement.start) + replacement.value + projected.slice(replacement.end);
  }
  return projected;
}
function addProjectionFrontmatter(markdown, page) {
  const fields = [
    `editSource: ${JSON.stringify(page.source)}`,
    ...page.sidebar === null ? [] : [`rawMarkdownPath: ${JSON.stringify(page.route)}`],
    ...page.outline === void 0 ? [] : [`outline: ${JSON.stringify(page.outline)}`]
  ].join("\n");
  if (markdown.startsWith("---\n")) return markdown.replace("---\n", `---
${fields}
`);
  return `---
${fields}
---

${markdown}`;
}
var LANGUAGE_SWITCHER = /^(?:English \| \[中文\]\([^)]*\)|\[English\]\([^)]*\) \| 中文)$/;
var REPOSITORY_BADGE = /^\[!\[[^\]]*\]\(https:\/\/img\.shields\.io\/[^)]*\)\]\([^)]*\)$/;
function withoutRepositoryChrome(markdown) {
  const lines = markdown.split("\n");
  const switcher = lines.findIndex((line) => LANGUAGE_SWITCHER.test(line));
  if (switcher !== -1 && switcher < 8) {
    lines.splice(switcher, lines[switcher + 1] === "" ? 2 : 1);
  }
  const badge = lines.findLastIndex((line) => REPOSITORY_BADGE.test(line));
  if (badge !== -1) {
    lines.splice(lines[badge - 1] === "" ? badge - 1 : badge, lines[badge - 1] === "" ? 2 : 1);
  }
  return lines.join("\n");
}
function projectedPageContent(markdown, page) {
  if (page.sidebar !== null) return withoutRepositoryChrome(markdown);
  if (!markdown.startsWith("---\n")) {
    throw new Error(`project-doc-site: locale home source ${JSON.stringify(page.source)} must start with YAML frontmatter.`);
  }
  const closingDelimiter = "\n---\n";
  const closing = markdown.indexOf(closingDelimiter, 4);
  if (closing === -1) {
    throw new Error(`project-doc-site: locale home source ${JSON.stringify(page.source)} has unclosed YAML frontmatter.`);
  }
  return markdown.slice(0, closing + closingDelimiter.length);
}
function publishableImage(absPath, repoRoot) {
  const real = realpathSync(absPath);
  const inside = real === repoRoot || real.startsWith(`${repoRoot}${sep}`);
  return inside && statSync(real).isFile() ? real : void 0;
}
function referencedImages() {
  const found = /* @__PURE__ */ new Set();
  for (const page of docsPages) {
    const sourceAbs = resolve(root, page.source);
    if (!existsSync(sourceAbs)) continue;
    rewriteMarkdown(readFileSync(sourceAbs, "utf8"), {
      sourcePath: page.source,
      locale: page.locale,
      route: page.route,
      pages: docsPages,
      repoRoot: root,
      repositoryRef: "master",
      placeImage: (absPath) => {
        const real = publishableImage(absPath, root);
        if (real !== void 0) found.add(real);
        return "";
      }
    });
  }
  return [...found];
}
function docsSourceFiles() {
  return [.../* @__PURE__ */ new Set([...docsPages.map((page) => resolve(root, page.source)), ...referencedImages()])];
}
function defaultProjectionContext() {
  return { pages: docsPages, repoRoot: root, repositoryRef: resolveRepositoryRef(process.env) };
}
function projectPagesInto(targetRoot, context, pageContent, entries = context.pages) {
  const routes = /* @__PURE__ */ new Set();
  const claimed = /* @__PURE__ */ new Map();
  const claim = (target, sourceAbs) => {
    const holder = claimed.get(target);
    if (holder !== void 0 && holder !== sourceAbs) {
      throw new Error(
        `project-doc-site: ${repoPath(sourceAbs, context.repoRoot)} and ${repoPath(holder, context.repoRoot)} both project to ${relative(targetRoot, target).split(sep).join("/")}.`
      );
    }
    if (holder === void 0 && existsSync(target)) {
      throw new Error(
        `project-doc-site: ${repoPath(sourceAbs, context.repoRoot)} would overwrite existing build file ${relative(targetRoot, target).split(sep).join("/")}.`
      );
    }
    claimed.set(target, sourceAbs);
  };
  for (const page of entries) {
    if (routes.has(page.route)) throw new Error(`project-doc-site: duplicate route ${JSON.stringify(page.route)}.`);
    routes.add(page.route);
    const sourceAbs = resolve(context.repoRoot, page.source);
    if (!existsSync(sourceAbs) || !lstatSync(sourceAbs).isFile()) {
      throw new Error(`project-doc-site: source ${JSON.stringify(page.source)} does not exist or is not a file.`);
    }
    const output = resolve(targetRoot, page.route);
    claim(output, sourceAbs);
    mkdirSync(dirname(output), { recursive: true });
    const markdown = readFileSync(sourceAbs, "utf8");
    const projected = rewriteMarkdown(markdown, {
      sourcePath: page.source,
      locale: page.locale,
      route: page.route,
      pages: context.pages,
      repoRoot: context.repoRoot,
      repositoryRef: context.repositoryRef,
      placeImage: (absPath) => {
        const real = publishableImage(absPath, context.repoRoot);
        if (real === void 0) {
          throw new Error(
            `project-doc-site: ${page.source} references image ${repoPath(absPath, context.repoRoot)}, which is not a regular file inside the repository.`
          );
        }
        const name = basename(real);
        const target = resolve(dirname(output), name);
        claim(target, real);
        copyFileSync(real, target);
        return `./${encodeURI(name)}`;
      }
    });
    writeFileSync(output, pageContent(projected, page));
  }
}
function projectDocs() {
  rmSync(generatedRoot, { recursive: true, force: true });
  projectPagesInto(generatedRoot, defaultProjectionContext(), (markdown, page) => addProjectionFrontmatter(projectedPageContent(markdown, page), page));
}
function withoutFrontmatter(markdown, source) {
  if (!markdown.startsWith("---\n")) return markdown;
  const closingDelimiter = "\n---\n";
  const closing = markdown.indexOf(closingDelimiter, 4);
  if (closing === -1) {
    throw new Error(`project-doc-site: ${JSON.stringify(source)} has unclosed YAML frontmatter.`);
  }
  return markdown.slice(closing + closingDelimiter.length).replace(/^\n+/, "");
}
function rawMarkdownPageContent(markdown, source) {
  return withoutRepositoryChrome(withoutFrontmatter(markdown, source));
}
function indexAliasRoute(route) {
  const match = /^(.+)\/index\.md$/.exec(route);
  return match?.[1] === void 0 ? void 0 : `${match[1]}.md`;
}
function emitRawMarkdownPages(outDir, context = defaultProjectionContext()) {
  const aliases = context.pages.flatMap((page) => {
    const alias = indexAliasRoute(page.route);
    return alias === void 0 ? [] : [{ ...page, route: alias }];
  });
  projectPagesInto(
    outDir,
    context,
    (markdown, page) => `\uFEFF${rawMarkdownPageContent(markdown, page.source)}`,
    [...context.pages, ...aliases]
  );
}
function rawMarkdownRoute(route, context = defaultProjectionContext()) {
  const page = context.pages.find((candidate) => candidate.route === route);
  if (page === void 0) return void 0;
  const markdown = readFileSync(resolve(context.repoRoot, page.source), "utf8");
  return rawMarkdownPageContent(rewriteMarkdown(markdown, {
    sourcePath: page.source,
    locale: page.locale,
    route: page.route,
    pages: context.pages,
    repoRoot: context.repoRoot,
    repositoryRef: context.repositoryRef,
    placeImage: (absPath) => `./${encodeURI(basename(absPath))}`
  }), page.source);
}
var llmsTxtLocales = [
  { heading: "\u7B80\u4F53\u4E2D\u6587", locale: "root" },
  { heading: "English", locale: "en" }
];
function llmsTxt(site) {
  const lines = [
    `# ${site.title}`,
    "",
    `> ${site.description}`,
    "",
    "\u9875\u9762 URL \u53BB\u6389\u672B\u5C3E\u659C\u6760\u518D\u52A0 `.md` \u5373\u4E3A\u8BE5\u9875\u539F\u59CB Markdown(\u6839\u8DEF\u5F84\u7528 `/index.md`);\u4E0B\u65B9\u5217\u8868\u662F\u5404\u9875\u7CBE\u786E\u5730\u5740\u3002Drop any trailing slash and append `.md` to a page URL for its raw Markdown (the site root is `/index.md`); the list below carries the exact addresses."
  ];
  for (const { heading, locale } of llmsTxtLocales) {
    lines.push("", `## ${heading}`, "");
    for (const collection of localeCollections[locale]) {
      for (const page of orderedPages(locale, collection)) {
        lines.push(`- [${page.label}](${site.base}${page.route}): ${page.section}`);
      }
    }
  }
  return `${lines.join("\n")}
`;
}

// website/raw-markdown.ts
function rawMarkdownMiddleware(base2, index) {
  return (req, res, next) => {
    if (req.url === void 0 || req.method !== "GET" && req.method !== "HEAD") {
      next();
      return;
    }
    let url;
    try {
      url = new URL(req.url, "http://docs.local");
    } catch (_error) {
      next();
      return;
    }
    if (!url.pathname.startsWith(base2)) {
      next();
      return;
    }
    const path = url.pathname.slice(base2.length);
    const explicit = path.endsWith(".md") && url.searchParams.get("dsh-raw") === "1";
    const destination = req.headers["sec-fetch-dest"];
    if (destination !== void 0 && destination !== "document" && !(destination === "empty" && explicit)) {
      next();
      return;
    }
    const content = path === "llms.txt" ? index() : path.endsWith(".md") ? rawMarkdownRoute(path) : void 0;
    if (content === void 0) {
      if (!explicit) {
        next();
        return;
      }
      res.statusCode = 404;
      res.end();
      return;
    }
    res.setHeader("Content-Type", `${path === "llms.txt" ? "text/plain" : "text/markdown"}; charset=utf-8`);
    res.end(req.method === "HEAD" ? void 0 : content);
  };
}

// website/.vitepress/config.ts
var __vite_injected_original_dirname2 = "/home/cassiodalla/Documentos/github/deepseek-harness/website/.vitepress";
projectDocs();
function sidebar(locale, collection) {
  const groups = /* @__PURE__ */ new Map();
  for (const page of orderedPages(locale, collection)) {
    const entries = groups.get(page.section) ?? [];
    entries.push(page);
    groups.set(page.section, entries);
  }
  return [...groups.entries()].map(([text, entries]) => {
    const { collapsed } = sectionSpec(locale, text);
    return {
      text,
      // A present `collapsed` is what makes the default theme render the
      // group as collapsible at all, so an open group must omit the key.
      ...collapsed === void 0 ? {} : { collapsed },
      items: entries.map((page) => ({ text: page.label, link: routeLink(page.route) }))
    };
  });
}
var guideModules = {
  root: {
    guide: localeCollections.root[0],
    develop: { label: "\u5F00\u53D1", collection: localeCollections.root[1] },
    reference: { label: "\u53C2\u8003", collection: localeCollections.root[2] }
  },
  en: {
    guide: localeCollections.en[0],
    develop: { label: "Development", collection: localeCollections.en[1] },
    reference: { label: "Reference", collection: localeCollections.en[2] }
  }
};
function guideSidebar(locale) {
  const { guide, develop: develop2, reference: reference2 } = guideModules[locale];
  return [
    ...sidebar(locale, guide),
    ...[develop2, reference2].map(({ label, collection }) => ({
      text: label,
      link: landingLink(locale, collection)
    }))
  ];
}
function moduleNav(locale) {
  const { develop: develop2, reference: reference2 } = guideModules[locale];
  const routePrefix = locale === "root" ? "" : "/en";
  return [
    { text: develop2.label, link: landingLink(locale, develop2.collection), activeMatch: `^${routePrefix}/develop/` },
    { text: reference2.label, link: landingLink(locale, reference2.collection), activeMatch: `^${routePrefix}/reference/` }
  ];
}
function watchCanonicalDocs(server) {
  const sources = docsSourceFiles();
  server.watcher.add(sources);
  server.watcher.on("change", (changed) => {
    if (!sources.includes(changed)) return;
    projectDocs();
  });
}
function serveRawMarkdown(server) {
  server.middlewares.use(rawMarkdownMiddleware(base, () => llmsTxt({ base, ...siteIdentity })));
}
function escapeVueInterpolation(html) {
  return html.replaceAll("{{", "&#123;&#123;").replaceAll("}}", "&#125;&#125;");
}
var sharedTheme = {
  search: {
    provider: "local",
    options: {
      locales: {
        root: {
          translations: {
            button: {
              buttonText: "\u641C\u7D22\u6587\u6863",
              buttonAriaLabel: "\u641C\u7D22\u6587\u6863"
            },
            modal: {
              displayDetails: "\u663E\u793A\u8BE6\u7EC6\u5217\u8868",
              resetButtonTitle: "\u6E05\u9664\u641C\u7D22",
              backButtonTitle: "\u5173\u95ED\u641C\u7D22",
              noResultsText: "\u672A\u627E\u5230\u76F8\u5173\u7ED3\u679C",
              footer: {
                selectText: "\u9009\u62E9",
                selectKeyAriaLabel: "\u56DE\u8F66\u952E",
                navigateText: "\u5207\u6362",
                navigateUpKeyAriaLabel: "\u4E0A\u65B9\u5411\u952E",
                navigateDownKeyAriaLabel: "\u4E0B\u65B9\u5411\u952E",
                closeText: "\u5173\u95ED",
                closeKeyAriaLabel: "Esc \u952E"
              }
            }
          }
        }
      }
    }
  },
  socialLinks: [
    { icon: "github", link: "https://github.com/deepseek-ai/deepseek-harness" }
  ],
  editLink: {
    pattern: ({ frontmatter }) => {
      const data = frontmatter;
      const editSource = typeof data === "object" && data !== null ? Reflect.get(data, "editSource") : void 0;
      if (typeof editSource !== "string") throw new Error("Projected documentation page has no editSource frontmatter.");
      return `https://github.com/deepseek-ai/deepseek-harness/edit/master/${editSource}`;
    },
    text: "\u5728 GitHub \u4E0A\u7F16\u8F91\u6B64\u9875"
  }
};
var base = process.env.DOCS_BASE ?? "/";
var siteIdentity = {
  title: "DeepSeek Harness",
  description: "\u7528\u4E8E\u6784\u5EFA Agent Harness \u7684\u63D2\u4EF6\u5316 SDK"
};
var wordmark = readFileSync2(resolve2(__vite_injected_original_dirname2, "../public/wordmark.svg"), "utf8").trim().replace("<svg ", '<svg class="dsh-wordmark" ');
var siteStyle = `
.dsh-lockup { display: inline-flex; align-items: center; gap: 8px; min-width: 0; }
.dsh-wordmark { display: block; height: 22px; width: auto; color: var(--vp-c-text-1); }
.dsh-tag {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--vp-c-brand-soft);
  border-radius: 999px;
  padding: 1px 9px;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  white-space: nowrap;
  color: var(--vp-c-brand-1);
}

.VPSidebar::-webkit-scrollbar { width: 6px; }
.VPSidebar::-webkit-scrollbar-track { background: transparent; }
.VPSidebar::-webkit-scrollbar-thumb {
  background-color: transparent;
  border-radius: 3px;
  transition: background-color 0.3s;
}
.VPSidebar[data-scrolling]::-webkit-scrollbar-thumb { background-color: var(--vp-c-text-3); }
@supports not selector(::-webkit-scrollbar) {
  .VPSidebar { scrollbar-width: thin; scrollbar-color: transparent transparent; }
  .VPSidebar[data-scrolling] { scrollbar-color: var(--vp-c-text-3) transparent; }
}
`;
var scrollbarScript = `
(() => {
  let idle
  addEventListener('scroll', (event) => {
    const target = event.target
    if (!(target instanceof Element) || !target.classList.contains('VPSidebar')) return
    target.dataset.scrolling = ''
    clearTimeout(idle)
    idle = setTimeout(() => delete target.dataset.scrolling, 800)
  }, true)
})()
`;
function siteTitle(previewTag) {
  return `<span class="dsh-lockup">${wordmark}<span class="dsh-tag">${previewTag}</span></span>`;
}
var config_default = withMermaid({
  title: siteIdentity.title,
  description: siteIdentity.description,
  base,
  transformHead: ({ siteConfig }) => codeGroupFallbackHead(siteConfig.mpa),
  /** Emit the raw-Markdown twin of every route plus llms.txt beside the rendered site. */
  buildEnd(siteConfig) {
    emitRawMarkdownPages(siteConfig.outDir);
    writeFileSync2(resolve2(siteConfig.outDir, "llms.txt"), llmsTxt({ base, ...siteIdentity }));
  },
  head: [
    // VitePress leaves head hrefs untouched, so the base belongs here explicitly.
    ["link", { rel: "icon", type: "image/svg+xml", href: `${base}favicon.svg` }],
    ["style", {}, siteStyle],
    ["script", {}, scrollbarScript]
  ],
  cleanUrls: true,
  srcDir: ".generated",
  cacheDir: ".cache",
  outDir: ".dist",
  locales: {
    root: {
      label: "\u7B80\u4F53\u4E2D\u6587",
      lang: "zh-CN",
      themeConfig: {
        siteTitle: siteTitle("\u6280\u672F\u9884\u89C8"),
        nav: [
          { text: "\u5165\u95E8", link: landingLink("root", guideModules.root.guide), activeMatch: "^/guide/" },
          ...moduleNav("root")
        ],
        sidebar: {
          "/guide/": guideSidebar("root"),
          "/develop/": sidebar("root", "zh-develop"),
          "/reference/": sidebar("root", "zh-reference")
        },
        outline: { label: "\u672C\u9875\u76EE\u5F55" },
        docFooter: { prev: "\u4E0A\u4E00\u7BC7", next: "\u4E0B\u4E00\u7BC7" },
        darkModeSwitchLabel: "\u5916\u89C2",
        lightModeSwitchTitle: "\u5207\u6362\u5230\u6D45\u8272\u4E3B\u9898",
        darkModeSwitchTitle: "\u5207\u6362\u5230\u6DF1\u8272\u4E3B\u9898",
        sidebarMenuLabel: "\u83DC\u5355",
        returnToTopLabel: "\u8FD4\u56DE\u9876\u90E8",
        langMenuLabel: "\u5207\u6362\u8BED\u8A00",
        skipToContentLabel: "\u8DF3\u81F3\u5185\u5BB9"
      }
    },
    en: {
      label: "English",
      lang: "en-US",
      link: "/en/",
      themeConfig: {
        siteTitle: siteTitle("Preview"),
        nav: [
          { text: "Guide", link: landingLink("en", guideModules.en.guide), activeMatch: "^/en/guide/" },
          ...moduleNav("en")
        ],
        sidebar: {
          "/en/guide/": guideSidebar("en"),
          "/en/develop/": sidebar("en", "en-develop"),
          "/en/reference/": sidebar("en", "en-reference")
        },
        editLink: {
          pattern: ({ frontmatter }) => {
            const data = frontmatter;
            const editSource = typeof data === "object" && data !== null ? Reflect.get(data, "editSource") : void 0;
            if (typeof editSource !== "string") throw new Error("Projected documentation page has no editSource frontmatter.");
            return `https://github.com/deepseek-ai/deepseek-harness/edit/master/${editSource}`;
          },
          text: "Edit this page on GitHub"
        },
        outline: { label: "On this page" },
        docFooter: { prev: "Previous", next: "Next" }
      }
    }
  },
  vite: {
    // `srcDir` puts the Vite root inside the disposable generated tree, whose
    // own `public/` no tracked asset can live in.
    publicDir: resolve2(__vite_injected_original_dirname2, "../public"),
    plugins: [
      {
        name: "deepseek-harness-doc-projector",
        configureServer(server) {
          watchCanonicalDocs(server);
          serveRawMarkdown(server);
        }
      }
    ]
  },
  markdown: {
    config(md) {
      isolateCodeGroupRadios(md);
      const renderText = md.renderer.rules.text;
      const renderCode = md.renderer.rules.code_inline;
      const renderFence = md.renderer.rules.fence;
      if (renderText === void 0) throw new Error("VitePress Markdown renderer is missing the text rendering rule.");
      if (renderCode === void 0) throw new Error("VitePress Markdown renderer is missing the inline-code rendering rule.");
      if (renderFence === void 0) throw new Error("VitePress Markdown renderer is missing the fence rendering rule.");
      md.renderer.rules.text = (...args) => escapeVueInterpolation(renderText(...args));
      md.renderer.rules.code_inline = (...args) => escapeVueInterpolation(renderCode(...args));
      const renderedFences = /* @__PURE__ */ new Map();
      md.renderer.rules.fence = (...args) => {
        const [tokens, index] = args;
        const token = tokens[index];
        if (token === void 0) throw new Error("VitePress code-fence renderer received no token.");
        if (["mermaid", "mmd"].includes(token.info.trim().split(/\s+/, 1)[0] ?? "")) return renderFence(...args);
        if (Reflect.get(token, "src") !== void 0) return renderFence(...args);
        if (process.env.NODE_ENV !== "production") return renderFence(...args);
        const key = JSON.stringify([token.content, token.info, token.markup, token.attrs]);
        const cached = renderedFences.get(key);
        if (cached !== void 0) return cached;
        const html = renderFence(...args);
        renderedFences.set(key, html);
        return html;
      };
    }
  },
  mermaid: {},
  themeConfig: sharedTheme
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsid2Vic2l0ZS8udml0ZXByZXNzL2NvbmZpZy50cyIsICJ3ZWJzaXRlLy52aXRlcHJlc3MvY29kZS1ncm91cHMudHMiLCAid2Vic2l0ZS9kb2NzLnRzIiwgInNjcmlwdHMvcHJvamVjdC1kb2Mtc2l0ZS50cyIsICJzY3JpcHRzL21hcmtkb3duLnRzIiwgIndlYnNpdGUvcmF3LW1hcmtkb3duLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvY2Fzc2lvZGFsbGEvRG9jdW1lbnRvcy9naXRodWIvZGVlcHNlZWstaGFybmVzcy93ZWJzaXRlLy52aXRlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL2Nhc3Npb2RhbGxhL0RvY3VtZW50b3MvZ2l0aHViL2RlZXBzZWVrLWhhcm5lc3Mvd2Vic2l0ZS8udml0ZXByZXNzL2NvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9jYXNzaW9kYWxsYS9Eb2N1bWVudG9zL2dpdGh1Yi9kZWVwc2Vlay1oYXJuZXNzL3dlYnNpdGUvLnZpdGVwcmVzcy9jb25maWcudHNcIjsvKiogVml0ZVByZXNzIGNvbmZpZ3VyYXRpb24gZm9yIHRoZSBsb2NhbGx5IHByb2plY3RlZCBkb2N1bWVudGF0aW9uIHNpdGUuICovXG5cbmltcG9ydCB7IHJlYWRGaWxlU3luYywgd3JpdGVGaWxlU3luYyB9IGZyb20gJ25vZGU6ZnMnXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAnbm9kZTpwYXRoJ1xuaW1wb3J0IHR5cGUgeyBEZWZhdWx0VGhlbWUsIFBhZ2VEYXRhLCBTaXRlQ29uZmlnIH0gZnJvbSAndml0ZXByZXNzJ1xuaW1wb3J0IHR5cGUgeyBWaXRlRGV2U2VydmVyIH0gZnJvbSAndml0ZSdcbmltcG9ydCB7IHdpdGhNZXJtYWlkIH0gZnJvbSAndml0ZXByZXNzLXBsdWdpbi1tZXJtYWlkJ1xuaW1wb3J0IHsgY29kZUdyb3VwRmFsbGJhY2tIZWFkLCBpc29sYXRlQ29kZUdyb3VwUmFkaW9zIH0gZnJvbSAnLi9jb2RlLWdyb3Vwcy50cydcbmltcG9ydCB7IGxhbmRpbmdMaW5rLCBsb2NhbGVDb2xsZWN0aW9ucywgb3JkZXJlZFBhZ2VzLCByb3V0ZUxpbmssIHNlY3Rpb25TcGVjLCB0eXBlIERvY3NMb2NhbGUsIHR5cGUgRG9jc1BhZ2UsIHR5cGUgRG9jc1NpZGViYXIgfSBmcm9tICcuLi9kb2NzLnRzJ1xuaW1wb3J0IHsgZG9jc1NvdXJjZUZpbGVzLCBlbWl0UmF3TWFya2Rvd25QYWdlcywgbGxtc1R4dCwgcHJvamVjdERvY3MgfSBmcm9tICcuLi8uLi9zY3JpcHRzL3Byb2plY3QtZG9jLXNpdGUudHMnXG5pbXBvcnQgeyByYXdNYXJrZG93bk1pZGRsZXdhcmUgfSBmcm9tICcuLi9yYXctbWFya2Rvd24udHMnXG5cbnByb2plY3REb2NzKClcblxuZnVuY3Rpb24gc2lkZWJhcihsb2NhbGU6IERvY3NMb2NhbGUsIGNvbGxlY3Rpb246IE5vbk51bGxhYmxlPERvY3NQYWdlWydzaWRlYmFyJ10+KTogRGVmYXVsdFRoZW1lLlNpZGViYXJJdGVtW10ge1xuICAvLyBgb3JkZXJlZFBhZ2VzYCBhbHJlYWR5IHNvcnRzIGJ5IHNlY3Rpb24gcGxhY2VtZW50LCBzbyBpbnNlcnRpb24gb3JkZXJcbiAgLy8gY2FycmllcyB0aGUgZ3JvdXAgb3JkZXIgYW5kIGVhY2ggZ3JvdXAga2VlcHMgaXRzIHBhZ2VzIGluIHNlcXVlbmNlLlxuICBjb25zdCBncm91cHMgPSBuZXcgTWFwPHN0cmluZywgRG9jc1BhZ2VbXT4oKVxuICBmb3IgKGNvbnN0IHBhZ2Ugb2Ygb3JkZXJlZFBhZ2VzKGxvY2FsZSwgY29sbGVjdGlvbikpIHtcbiAgICBjb25zdCBlbnRyaWVzID0gZ3JvdXBzLmdldChwYWdlLnNlY3Rpb24pID8/IFtdXG4gICAgZW50cmllcy5wdXNoKHBhZ2UpXG4gICAgZ3JvdXBzLnNldChwYWdlLnNlY3Rpb24sIGVudHJpZXMpXG4gIH1cbiAgcmV0dXJuIFsuLi5ncm91cHMuZW50cmllcygpXS5tYXAoKFt0ZXh0LCBlbnRyaWVzXSkgPT4ge1xuICAgIGNvbnN0IHsgY29sbGFwc2VkIH0gPSBzZWN0aW9uU3BlYyhsb2NhbGUsIHRleHQpXG4gICAgcmV0dXJuIHtcbiAgICAgIHRleHQsXG4gICAgICAvLyBBIHByZXNlbnQgYGNvbGxhcHNlZGAgaXMgd2hhdCBtYWtlcyB0aGUgZGVmYXVsdCB0aGVtZSByZW5kZXIgdGhlXG4gICAgICAvLyBncm91cCBhcyBjb2xsYXBzaWJsZSBhdCBhbGwsIHNvIGFuIG9wZW4gZ3JvdXAgbXVzdCBvbWl0IHRoZSBrZXkuXG4gICAgICAuLi4oY29sbGFwc2VkID09PSB1bmRlZmluZWQgPyB7fSA6IHsgY29sbGFwc2VkIH0pLFxuICAgICAgaXRlbXM6IGVudHJpZXMubWFwKHBhZ2UgPT4gKHsgdGV4dDogcGFnZS5sYWJlbCwgbGluazogcm91dGVMaW5rKHBhZ2Uucm91dGUpIH0pKSxcbiAgICB9XG4gIH0pXG59XG5cbi8qKiBPbmUgbW9kdWxlIGxpbmsgc2hhcmVkIGJldHdlZW4gdGhlIG5hdmlnYXRpb24gYmFyIGFuZCB0aGUgZ3VpZGUgc2lkZWJhci4gKi9cbmludGVyZmFjZSBHdWlkZU1vZHVsZUxpbmsge1xuICAvKiogTGFiZWwgc2hvd24gaW4gdGhlIG5hdmlnYXRpb24gYmFyIGFuZCB0aGUgZ3VpZGUgc2lkZWJhci4gKi9cbiAgbGFiZWw6IHN0cmluZ1xuICAvKiogU2lkZWJhciBjb2xsZWN0aW9uIHRoZSBsaW5rIG9wZW5zLiAqL1xuICBjb2xsZWN0aW9uOiBEb2NzU2lkZWJhclxufVxuXG4vKipcbiAqIFBlci1sb2NhbGUgZ3VpZGUtbW9kdWxlIGZhY3RzOiB0aGUgZ3VpZGUgY29sbGVjdGlvbiBhbmQgdGhlIG1vZHVsZSBsaW5rc1xuICogYXBwZW5kZWQgdG8gdGhlIGd1aWRlIHNpZGViYXIuXG4gKi9cbmludGVyZmFjZSBHdWlkZU1vZHVsZXMge1xuICAvKiogR3VpZGUgc2lkZWJhciBjb2xsZWN0aW9uIGZvciB0aGUgbG9jYWxlLiAqL1xuICBndWlkZTogJ3poLWd1aWRlJyB8ICdlbi1ndWlkZSdcbiAgLyoqIERldmVsb3BtZW50IG1vZHVsZSBsaW5rLiAqL1xuICBkZXZlbG9wOiBHdWlkZU1vZHVsZUxpbmtcbiAgLyoqIFJlZmVyZW5jZSBtb2R1bGUgbGluay4gKi9cbiAgcmVmZXJlbmNlOiBHdWlkZU1vZHVsZUxpbmtcbn1cblxuLyoqXG4gKiBHdWlkZS1tb2R1bGUgZmFjdHMga2V5ZWQgYnkgbG9jYWxlLCBnaXZpbmcgZXZlcnkgbW9kdWxlIGxhYmVsIGFuZCBjb2xsZWN0aW9uXG4gKiBvbmUgaG9tZSBzaGFyZWQgYnkgdGhlIG5hdmlnYXRpb24gYmFyIGFuZCB0aGUgZ3VpZGUgc2lkZWJhci5cbiAqL1xuY29uc3QgZ3VpZGVNb2R1bGVzID0ge1xuICByb290OiB7XG4gICAgZ3VpZGU6IGxvY2FsZUNvbGxlY3Rpb25zLnJvb3RbMF0sXG4gICAgZGV2ZWxvcDogeyBsYWJlbDogJ1x1NUYwMFx1NTNEMScsIGNvbGxlY3Rpb246IGxvY2FsZUNvbGxlY3Rpb25zLnJvb3RbMV0gfSxcbiAgICByZWZlcmVuY2U6IHsgbGFiZWw6ICdcdTUzQzJcdTgwMDMnLCBjb2xsZWN0aW9uOiBsb2NhbGVDb2xsZWN0aW9ucy5yb290WzJdIH0sXG4gIH0sXG4gIGVuOiB7XG4gICAgZ3VpZGU6IGxvY2FsZUNvbGxlY3Rpb25zLmVuWzBdLFxuICAgIGRldmVsb3A6IHsgbGFiZWw6ICdEZXZlbG9wbWVudCcsIGNvbGxlY3Rpb246IGxvY2FsZUNvbGxlY3Rpb25zLmVuWzFdIH0sXG4gICAgcmVmZXJlbmNlOiB7IGxhYmVsOiAnUmVmZXJlbmNlJywgY29sbGVjdGlvbjogbG9jYWxlQ29sbGVjdGlvbnMuZW5bMl0gfSxcbiAgfSxcbn0gc2F0aXNmaWVzIFJlY29yZDxEb2NzTG9jYWxlLCBHdWlkZU1vZHVsZXM+XG5cbi8qKlxuICogR3VpZGUgc2lkZWJhciB3aXRoIGRpcmVjdCBsaW5rcyBpbnRvIHRoZSBmaXJzdCBkZXZlbG9wbWVudCBhbmQgcmVmZXJlbmNlIHBhZ2VzLlxuICpcbiAqIEBwYXJhbSBsb2NhbGUgLSBSb3V0ZSB0cmVlIHdob3NlIGd1aWRlIHNpZGViYXIgaXMgYmVpbmcgYnVpbHQuXG4gKiBAcmV0dXJucyBHdWlkZSBncm91cHMgZm9sbG93ZWQgYnkgdG9wLWxldmVsIGxpbmtzIHRvIHRoZSBvdGhlciBkb2N1bWVudGF0aW9uIG1vZHVsZXMuXG4gKi9cbmZ1bmN0aW9uIGd1aWRlU2lkZWJhcihsb2NhbGU6IERvY3NMb2NhbGUpOiBEZWZhdWx0VGhlbWUuU2lkZWJhckl0ZW1bXSB7XG4gIGNvbnN0IHsgZ3VpZGUsIGRldmVsb3AsIHJlZmVyZW5jZSB9ID0gZ3VpZGVNb2R1bGVzW2xvY2FsZV1cbiAgcmV0dXJuIFtcbiAgICAuLi5zaWRlYmFyKGxvY2FsZSwgZ3VpZGUpLFxuICAgIC4uLltkZXZlbG9wLCByZWZlcmVuY2VdLm1hcCgoeyBsYWJlbCwgY29sbGVjdGlvbiB9KSA9PiAoe1xuICAgICAgdGV4dDogbGFiZWwsXG4gICAgICBsaW5rOiBsYW5kaW5nTGluayhsb2NhbGUsIGNvbGxlY3Rpb24pLFxuICAgIH0pKSxcbiAgXVxufVxuXG4vKipcbiAqIE5hdmlnYXRpb24tYmFyIGl0ZW1zIGZvciB0aGUgbW9kdWxlcyB0aGUgZ3VpZGUgc2lkZWJhciBsaW5rcyBpbnRvLCByZWFkaW5nXG4gKiB0aGVpciBsYWJlbHMgYW5kIGNvbGxlY3Rpb25zIGZyb20gdGhlIHNoYXJlZCBwZXItbG9jYWxlIHJlY29yZC5cbiAqXG4gKiBAcGFyYW0gbG9jYWxlIC0gUm91dGUgdHJlZSB0aGUgbmF2aWdhdGlvbiBpdGVtcyBiZWxvbmcgdG8uXG4gKiBAcmV0dXJucyBUaGUgbW9kdWxlIGl0ZW1zIGZvciB0aGUgbG9jYWxlJ3MgbmF2aWdhdGlvbiBiYXIuXG4gKi9cbmZ1bmN0aW9uIG1vZHVsZU5hdihsb2NhbGU6IERvY3NMb2NhbGUpOiBEZWZhdWx0VGhlbWUuTmF2SXRlbVtdIHtcbiAgY29uc3QgeyBkZXZlbG9wLCByZWZlcmVuY2UgfSA9IGd1aWRlTW9kdWxlc1tsb2NhbGVdXG4gIGNvbnN0IHJvdXRlUHJlZml4ID0gbG9jYWxlID09PSAncm9vdCcgPyAnJyA6ICcvZW4nXG4gIHJldHVybiBbXG4gICAgeyB0ZXh0OiBkZXZlbG9wLmxhYmVsLCBsaW5rOiBsYW5kaW5nTGluayhsb2NhbGUsIGRldmVsb3AuY29sbGVjdGlvbiksIGFjdGl2ZU1hdGNoOiBgXiR7cm91dGVQcmVmaXh9L2RldmVsb3AvYCB9LFxuICAgIHsgdGV4dDogcmVmZXJlbmNlLmxhYmVsLCBsaW5rOiBsYW5kaW5nTGluayhsb2NhbGUsIHJlZmVyZW5jZS5jb2xsZWN0aW9uKSwgYWN0aXZlTWF0Y2g6IGBeJHtyb3V0ZVByZWZpeH0vcmVmZXJlbmNlL2AgfSxcbiAgXVxufVxuXG5mdW5jdGlvbiB3YXRjaENhbm9uaWNhbERvY3Moc2VydmVyOiBWaXRlRGV2U2VydmVyKTogdm9pZCB7XG4gIGNvbnN0IHNvdXJjZXMgPSBkb2NzU291cmNlRmlsZXMoKVxuICBzZXJ2ZXIud2F0Y2hlci5hZGQoc291cmNlcylcbiAgc2VydmVyLndhdGNoZXIub24oJ2NoYW5nZScsIChjaGFuZ2VkKSA9PiB7XG4gICAgaWYgKCFzb3VyY2VzLmluY2x1ZGVzKGNoYW5nZWQpKSByZXR1cm5cbiAgICBwcm9qZWN0RG9jcygpXG4gIH0pXG59XG5cbi8qKlxuICogU2VydmUgdGhlIHJhdy1NYXJrZG93biB0d2luIG9mIGVhY2ggcm91dGUgYW5kIGxsbXMudHh0IGR1cmluZyBkZXZlbG9wbWVudCxcbiAqIG1hdGNoaW5nIHdoYXQgYGJ1aWxkRW5kYCBlbWl0cyBpbnRvIHRoZSBzdGF0aWMgYnVpbGQuIFBhZ2VzIHByb2plY3QgZnJvbVxuICogdGhlaXIgY2Fub25pY2FsIHNvdXJjZXMgcGVyIHJlcXVlc3QsIHNvIGFuIGVkaXQgc2hvd3Mgd2l0aG91dCBhIHJlYnVpbGQuXG4gKi9cbmZ1bmN0aW9uIHNlcnZlUmF3TWFya2Rvd24oc2VydmVyOiBWaXRlRGV2U2VydmVyKTogdm9pZCB7XG4gIHNlcnZlci5taWRkbGV3YXJlcy51c2UocmF3TWFya2Rvd25NaWRkbGV3YXJlKGJhc2UsICgpID0+IGxsbXNUeHQoeyBiYXNlLCAuLi5zaXRlSWRlbnRpdHkgfSkpKVxufVxuXG5mdW5jdGlvbiBlc2NhcGVWdWVJbnRlcnBvbGF0aW9uKGh0bWw6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBodG1sLnJlcGxhY2VBbGwoJ3t7JywgJyYjMTIzOyYjMTIzOycpLnJlcGxhY2VBbGwoJ319JywgJyYjMTI1OyYjMTI1OycpXG59XG5cbmNvbnN0IHNoYXJlZFRoZW1lOiBQaWNrPERlZmF1bHRUaGVtZS5Db25maWcsICdzZWFyY2gnIHwgJ3NvY2lhbExpbmtzJyB8ICdlZGl0TGluayc+ID0ge1xuICBzZWFyY2g6IHtcbiAgICBwcm92aWRlcjogJ2xvY2FsJyxcbiAgICBvcHRpb25zOiB7XG4gICAgICBsb2NhbGVzOiB7XG4gICAgICAgIHJvb3Q6IHtcbiAgICAgICAgICB0cmFuc2xhdGlvbnM6IHtcbiAgICAgICAgICAgIGJ1dHRvbjoge1xuICAgICAgICAgICAgICBidXR0b25UZXh0OiAnXHU2NDFDXHU3RDIyXHU2NTg3XHU2ODYzJyxcbiAgICAgICAgICAgICAgYnV0dG9uQXJpYUxhYmVsOiAnXHU2NDFDXHU3RDIyXHU2NTg3XHU2ODYzJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtb2RhbDoge1xuICAgICAgICAgICAgICBkaXNwbGF5RGV0YWlsczogJ1x1NjYzRVx1NzkzQVx1OEJFNlx1N0VDNlx1NTIxN1x1ODg2OCcsXG4gICAgICAgICAgICAgIHJlc2V0QnV0dG9uVGl0bGU6ICdcdTZFMDVcdTk2NjRcdTY0MUNcdTdEMjInLFxuICAgICAgICAgICAgICBiYWNrQnV0dG9uVGl0bGU6ICdcdTUxNzNcdTk1RURcdTY0MUNcdTdEMjInLFxuICAgICAgICAgICAgICBub1Jlc3VsdHNUZXh0OiAnXHU2NzJBXHU2MjdFXHU1MjMwXHU3NkY4XHU1MTczXHU3RUQzXHU2NzlDJyxcbiAgICAgICAgICAgICAgZm9vdGVyOiB7XG4gICAgICAgICAgICAgICAgc2VsZWN0VGV4dDogJ1x1OTAwOVx1NjJFOScsXG4gICAgICAgICAgICAgICAgc2VsZWN0S2V5QXJpYUxhYmVsOiAnXHU1NkRFXHU4RjY2XHU5NTJFJyxcbiAgICAgICAgICAgICAgICBuYXZpZ2F0ZVRleHQ6ICdcdTUyMDdcdTYzNjInLFxuICAgICAgICAgICAgICAgIG5hdmlnYXRlVXBLZXlBcmlhTGFiZWw6ICdcdTRFMEFcdTY1QjlcdTU0MTFcdTk1MkUnLFxuICAgICAgICAgICAgICAgIG5hdmlnYXRlRG93bktleUFyaWFMYWJlbDogJ1x1NEUwQlx1NjVCOVx1NTQxMVx1OTUyRScsXG4gICAgICAgICAgICAgICAgY2xvc2VUZXh0OiAnXHU1MTczXHU5NUVEJyxcbiAgICAgICAgICAgICAgICBjbG9zZUtleUFyaWFMYWJlbDogJ0VzYyBcdTk1MkUnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICBzb2NpYWxMaW5rczogW1xuICAgIHsgaWNvbjogJ2dpdGh1YicsIGxpbms6ICdodHRwczovL2dpdGh1Yi5jb20vZGVlcHNlZWstYWkvZGVlcHNlZWstaGFybmVzcycgfSxcbiAgXSxcbiAgZWRpdExpbms6IHtcbiAgICBwYXR0ZXJuOiAoeyBmcm9udG1hdHRlciB9OiBQYWdlRGF0YSkgPT4ge1xuICAgICAgY29uc3QgZGF0YTogdW5rbm93biA9IGZyb250bWF0dGVyXG4gICAgICBjb25zdCBlZGl0U291cmNlOiB1bmtub3duID0gdHlwZW9mIGRhdGEgPT09ICdvYmplY3QnICYmIGRhdGEgIT09IG51bGwgPyBSZWZsZWN0LmdldChkYXRhLCAnZWRpdFNvdXJjZScpIDogdW5kZWZpbmVkXG4gICAgICBpZiAodHlwZW9mIGVkaXRTb3VyY2UgIT09ICdzdHJpbmcnKSB0aHJvdyBuZXcgRXJyb3IoJ1Byb2plY3RlZCBkb2N1bWVudGF0aW9uIHBhZ2UgaGFzIG5vIGVkaXRTb3VyY2UgZnJvbnRtYXR0ZXIuJylcbiAgICAgIHJldHVybiBgaHR0cHM6Ly9naXRodWIuY29tL2RlZXBzZWVrLWFpL2RlZXBzZWVrLWhhcm5lc3MvZWRpdC9tYXN0ZXIvJHtlZGl0U291cmNlfWBcbiAgICB9LFxuICAgIHRleHQ6ICdcdTU3MjggR2l0SHViIFx1NEUwQVx1N0YxNlx1OEY5MVx1NkI2NFx1OTg3NScsXG4gIH0sXG59XG5cbi8qKiBTaXRlIGJhc2UgcGF0aCwgY2FycnlpbmcgdGhlIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHNsYXNoZXMgVml0ZVByZXNzIHJlcXVpcmVzLiAqL1xuY29uc3QgYmFzZSA9IHByb2Nlc3MuZW52LkRPQ1NfQkFTRSA/PyAnLydcblxuLyoqIFNpdGUgaWRlbnRpdHkgc2hhcmVkIGJ5IHRoZSBWaXRlUHJlc3MgY29uZmlndXJhdGlvbiBhbmQgdGhlIGxsbXMudHh0IGluZGV4LiAqL1xuY29uc3Qgc2l0ZUlkZW50aXR5ID0ge1xuICB0aXRsZTogJ0RlZXBTZWVrIEhhcm5lc3MnLFxuICBkZXNjcmlwdGlvbjogJ1x1NzUyOFx1NEU4RVx1Njc4NFx1NUVGQSBBZ2VudCBIYXJuZXNzIFx1NzY4NFx1NjNEMlx1NEVGNlx1NTMxNiBTREsnLFxufVxuXG4vKipcbiAqIFRoZSBEZWVwU2VlayB3b3JkbWFyaywgaW5saW5lZCBzbyBpdHMgYGN1cnJlbnRDb2xvcmAgZmlsbHMgZm9sbG93IHRoZSBhY3RpdmVcbiAqIHRoZW1lLiBBbiBgPGltZz5gIHdvdWxkIGZyZWV6ZSB0aGUgbWFyayBhdCB0aGUgY29sb3JzIHRoZSBmaWxlIGRlY2xhcmVzLlxuICovXG5jb25zdCB3b3JkbWFyayA9IHJlYWRGaWxlU3luYyhyZXNvbHZlKGltcG9ydC5tZXRhLmRpcm5hbWUsICcuLi9wdWJsaWMvd29yZG1hcmsuc3ZnJyksICd1dGY4JylcbiAgLnRyaW0oKVxuICAucmVwbGFjZSgnPHN2ZyAnLCAnPHN2ZyBjbGFzcz1cImRzaC13b3JkbWFya1wiICcpXG5cbi8qKlxuICogSGVhZC1pbmplY3RlZCBzdHlsZXMgZm9yIHRoZSBzaXRlIGlkZW50aXR5IGFuZCBzaWRlYmFyIHNjcm9sbGJhci5cbiAqXG4gKiBUaGUgbmF2aWdhdGlvbi1iYXIgbG9ja3VwIHBhaXJzIHdpdGggYHNpdGVUaXRsZWAuIFRoZSBzY3JvbGxiYXIgcnVsZXMgcmVwbGFjZVxuICogdGhlIHNpZGViYXIncyBwbGF0Zm9ybSBiYXIsIHdoaWNoIHJlc2VydmVzIDE1cHggb2YgYSAyNjVweCBjb2x1bW4gYW5kIGRyYXdzIGFcbiAqIHRyYWNrIHRoZSByZXN0IG9mIHRoZSBuYXZpZ2F0aW9uIGhhcyBubyBib3JkZXIgZm9yOyBgc2Nyb2xsYmFyU2NyaXB0YCBzdXBwbGllc1xuICogdGhlIG1hcmtlciB0aGF0IHJldmVhbHMgdGhlIHRodW1iLiBDaHJvbWUgZHJvcHMgYDo6LXdlYmtpdC1zY3JvbGxiYXJgIG9uY2VcbiAqIGBzY3JvbGxiYXItd2lkdGhgIGlzIHNldCB0byBhbnl0aGluZyBidXQgYGF1dG9gLCBzbyB0aGUgc3RhbmRhcmQgcHJvcGVydGllc1xuICogc3RheSBiZWhpbmQgYSBxdWVyeSBvbmx5IEZpcmVmb3ggYW5zd2Vycy5cbiAqL1xuY29uc3Qgc2l0ZVN0eWxlID0gYFxuLmRzaC1sb2NrdXAgeyBkaXNwbGF5OiBpbmxpbmUtZmxleDsgYWxpZ24taXRlbXM6IGNlbnRlcjsgZ2FwOiA4cHg7IG1pbi13aWR0aDogMDsgfVxuLmRzaC13b3JkbWFyayB7IGRpc3BsYXk6IGJsb2NrOyBoZWlnaHQ6IDIycHg7IHdpZHRoOiBhdXRvOyBjb2xvcjogdmFyKC0tdnAtYy10ZXh0LTEpOyB9XG4uZHNoLXRhZyB7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS12cC1jLWJyYW5kLXNvZnQpO1xuICBib3JkZXItcmFkaXVzOiA5OTlweDtcbiAgcGFkZGluZzogMXB4IDlweDtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBmb250LXdlaWdodDogNTAwO1xuICBsaW5lLWhlaWdodDogMThweDtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgY29sb3I6IHZhcigtLXZwLWMtYnJhbmQtMSk7XG59XG5cbi5WUFNpZGViYXI6Oi13ZWJraXQtc2Nyb2xsYmFyIHsgd2lkdGg6IDZweDsgfVxuLlZQU2lkZWJhcjo6LXdlYmtpdC1zY3JvbGxiYXItdHJhY2sgeyBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDsgfVxuLlZQU2lkZWJhcjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDAuM3M7XG59XG4uVlBTaWRlYmFyW2RhdGEtc2Nyb2xsaW5nXTo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIgeyBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS12cC1jLXRleHQtMyk7IH1cbkBzdXBwb3J0cyBub3Qgc2VsZWN0b3IoOjotd2Via2l0LXNjcm9sbGJhcikge1xuICAuVlBTaWRlYmFyIHsgc2Nyb2xsYmFyLXdpZHRoOiB0aGluOyBzY3JvbGxiYXItY29sb3I6IHRyYW5zcGFyZW50IHRyYW5zcGFyZW50OyB9XG4gIC5WUFNpZGViYXJbZGF0YS1zY3JvbGxpbmddIHsgc2Nyb2xsYmFyLWNvbG9yOiB2YXIoLS12cC1jLXRleHQtMykgdHJhbnNwYXJlbnQ7IH1cbn1cbmBcblxuLyoqXG4gKiBNYXJrIHRoZSBzaWRlYmFyIHdoaWxlIGl0IHNjcm9sbHMsIHNvIGl0cyBzY3JvbGxiYXIgcmVzdHMgaW52aXNpYmxlLlxuICpcbiAqIEEgc2l6ZWQgYDo6LXdlYmtpdC1zY3JvbGxiYXJgIG9wdHMgdGhlIGVsZW1lbnQgb3V0IG9mIHRoZSBwbGF0Zm9ybSdzXG4gKiBzZWxmLWhpZGluZyBvdmVybGF5IGJhciwgbGVhdmluZyBvbmUgcGFpbnRlZCBhdCBhbGwgdGltZXM7IG5vdGhpbmcgaW4gQ1NTXG4gKiByZXBvcnRzIHRoYXQgYW4gZWxlbWVudCBpcyBzY3JvbGxpbmcuIFRoZSBsaXN0ZW5lciBjYXB0dXJlcyBpbnN0ZWFkIG9mXG4gKiBidWJibGluZyBiZWNhdXNlIHNjcm9sbCBldmVudHMgZG8gbm90IGJ1YmJsZSwgYW5kIG1hcmtzIGEgYGRhdGEtYCBhdHRyaWJ1dGVcbiAqIHJhdGhlciB0aGFuIGEgY2xhc3MgYmVjYXVzZSBWdWUgcmV3cml0ZXMgYGNsYXNzYCB3aG9sZXNhbGUgd2hlbiBpdCBwYXRjaGVzXG4gKiB0aGUgZWxlbWVudC5cbiAqL1xuY29uc3Qgc2Nyb2xsYmFyU2NyaXB0ID0gYFxuKCgpID0+IHtcbiAgbGV0IGlkbGVcbiAgYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0XG4gICAgaWYgKCEodGFyZ2V0IGluc3RhbmNlb2YgRWxlbWVudCkgfHwgIXRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ1ZQU2lkZWJhcicpKSByZXR1cm5cbiAgICB0YXJnZXQuZGF0YXNldC5zY3JvbGxpbmcgPSAnJ1xuICAgIGNsZWFyVGltZW91dChpZGxlKVxuICAgIGlkbGUgPSBzZXRUaW1lb3V0KCgpID0+IGRlbGV0ZSB0YXJnZXQuZGF0YXNldC5zY3JvbGxpbmcsIDgwMClcbiAgfSwgdHJ1ZSlcbn0pKClcbmBcblxuLyoqXG4gKiBOYXZpZ2F0aW9uLWJhciB0aXRsZTogdGhlIERlZXBTZWVrIHdvcmRtYXJrIGFuZCB0aGUgcmVsZWFzZS1zdGFnZSB0YWcuXG4gKiBWaXRlUHJlc3MgcmVuZGVycyBgc2l0ZVRpdGxlYCBhcyBIVE1MLlxuICpcbiAqIEBwYXJhbSBwcmV2aWV3VGFnIC0gTG9jYWxpemVkIHJlbGVhc2Utc3RhZ2UgbGFiZWwuXG4gKiBAcmV0dXJucyBNYXJrdXAgcGxhY2VkIGJlc2lkZSB0aGUgbmF2aWdhdGlvbi1iYXIgaG9tZSBsaW5rLlxuICovXG5mdW5jdGlvbiBzaXRlVGl0bGUocHJldmlld1RhZzogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIGA8c3BhbiBjbGFzcz1cImRzaC1sb2NrdXBcIj4ke3dvcmRtYXJrfTxzcGFuIGNsYXNzPVwiZHNoLXRhZ1wiPiR7cHJldmlld1RhZ308L3NwYW4+PC9zcGFuPmBcbn1cblxuZXhwb3J0IGRlZmF1bHQgd2l0aE1lcm1haWQoe1xuICB0aXRsZTogc2l0ZUlkZW50aXR5LnRpdGxlLFxuICBkZXNjcmlwdGlvbjogc2l0ZUlkZW50aXR5LmRlc2NyaXB0aW9uLFxuICBiYXNlLFxuICB0cmFuc2Zvcm1IZWFkOiAoeyBzaXRlQ29uZmlnIH0pID0+IGNvZGVHcm91cEZhbGxiYWNrSGVhZChzaXRlQ29uZmlnLm1wYSksXG4gIC8qKiBFbWl0IHRoZSByYXctTWFya2Rvd24gdHdpbiBvZiBldmVyeSByb3V0ZSBwbHVzIGxsbXMudHh0IGJlc2lkZSB0aGUgcmVuZGVyZWQgc2l0ZS4gKi9cbiAgYnVpbGRFbmQoc2l0ZUNvbmZpZzogU2l0ZUNvbmZpZykge1xuICAgIGVtaXRSYXdNYXJrZG93blBhZ2VzKHNpdGVDb25maWcub3V0RGlyKVxuICAgIHdyaXRlRmlsZVN5bmMocmVzb2x2ZShzaXRlQ29uZmlnLm91dERpciwgJ2xsbXMudHh0JyksIGxsbXNUeHQoeyBiYXNlLCAuLi5zaXRlSWRlbnRpdHkgfSkpXG4gIH0sXG4gIGhlYWQ6IFtcbiAgICAvLyBWaXRlUHJlc3MgbGVhdmVzIGhlYWQgaHJlZnMgdW50b3VjaGVkLCBzbyB0aGUgYmFzZSBiZWxvbmdzIGhlcmUgZXhwbGljaXRseS5cbiAgICBbJ2xpbmsnLCB7IHJlbDogJ2ljb24nLCB0eXBlOiAnaW1hZ2Uvc3ZnK3htbCcsIGhyZWY6IGAke2Jhc2V9ZmF2aWNvbi5zdmdgIH1dLFxuICAgIFsnc3R5bGUnLCB7fSwgc2l0ZVN0eWxlXSxcbiAgICBbJ3NjcmlwdCcsIHt9LCBzY3JvbGxiYXJTY3JpcHRdLFxuICBdLFxuICBjbGVhblVybHM6IHRydWUsXG4gIHNyY0RpcjogJy5nZW5lcmF0ZWQnLFxuICBjYWNoZURpcjogJy5jYWNoZScsXG4gIG91dERpcjogJy5kaXN0JyxcbiAgbG9jYWxlczoge1xuICAgIHJvb3Q6IHtcbiAgICAgIGxhYmVsOiAnXHU3QjgwXHU0RjUzXHU0RTJEXHU2NTg3JyxcbiAgICAgIGxhbmc6ICd6aC1DTicsXG4gICAgICB0aGVtZUNvbmZpZzoge1xuICAgICAgICBzaXRlVGl0bGU6IHNpdGVUaXRsZSgnXHU2MjgwXHU2NzJGXHU5ODg0XHU4OUM4JyksXG4gICAgICAgIG5hdjogW1xuICAgICAgICAgIHsgdGV4dDogJ1x1NTE2NVx1OTVFOCcsIGxpbms6IGxhbmRpbmdMaW5rKCdyb290JywgZ3VpZGVNb2R1bGVzLnJvb3QuZ3VpZGUpLCBhY3RpdmVNYXRjaDogJ14vZ3VpZGUvJyB9LFxuICAgICAgICAgIC4uLm1vZHVsZU5hdigncm9vdCcpLFxuICAgICAgICBdLFxuICAgICAgICBzaWRlYmFyOiB7XG4gICAgICAgICAgJy9ndWlkZS8nOiBndWlkZVNpZGViYXIoJ3Jvb3QnKSxcbiAgICAgICAgICAnL2RldmVsb3AvJzogc2lkZWJhcigncm9vdCcsICd6aC1kZXZlbG9wJyksXG4gICAgICAgICAgJy9yZWZlcmVuY2UvJzogc2lkZWJhcigncm9vdCcsICd6aC1yZWZlcmVuY2UnKSxcbiAgICAgICAgfSxcbiAgICAgICAgb3V0bGluZTogeyBsYWJlbDogJ1x1NjcyQ1x1OTg3NVx1NzZFRVx1NUY1NScgfSxcbiAgICAgICAgZG9jRm9vdGVyOiB7IHByZXY6ICdcdTRFMEFcdTRFMDBcdTdCQzcnLCBuZXh0OiAnXHU0RTBCXHU0RTAwXHU3QkM3JyB9LFxuICAgICAgICBkYXJrTW9kZVN3aXRjaExhYmVsOiAnXHU1OTE2XHU4OUMyJyxcbiAgICAgICAgbGlnaHRNb2RlU3dpdGNoVGl0bGU6ICdcdTUyMDdcdTYzNjJcdTUyMzBcdTZENDVcdTgyNzJcdTRFM0JcdTk4OTgnLFxuICAgICAgICBkYXJrTW9kZVN3aXRjaFRpdGxlOiAnXHU1MjA3XHU2MzYyXHU1MjMwXHU2REYxXHU4MjcyXHU0RTNCXHU5ODk4JyxcbiAgICAgICAgc2lkZWJhck1lbnVMYWJlbDogJ1x1ODNEQ1x1NTM1NScsXG4gICAgICAgIHJldHVyblRvVG9wTGFiZWw6ICdcdThGRDRcdTU2REVcdTk4NzZcdTkwRTgnLFxuICAgICAgICBsYW5nTWVudUxhYmVsOiAnXHU1MjA3XHU2MzYyXHU4QkVEXHU4QTAwJyxcbiAgICAgICAgc2tpcFRvQ29udGVudExhYmVsOiAnXHU4REYzXHU4MUYzXHU1MTg1XHU1QkI5JyxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBlbjoge1xuICAgICAgbGFiZWw6ICdFbmdsaXNoJyxcbiAgICAgIGxhbmc6ICdlbi1VUycsXG4gICAgICBsaW5rOiAnL2VuLycsXG4gICAgICB0aGVtZUNvbmZpZzoge1xuICAgICAgICBzaXRlVGl0bGU6IHNpdGVUaXRsZSgnUHJldmlldycpLFxuICAgICAgICBuYXY6IFtcbiAgICAgICAgICB7IHRleHQ6ICdHdWlkZScsIGxpbms6IGxhbmRpbmdMaW5rKCdlbicsIGd1aWRlTW9kdWxlcy5lbi5ndWlkZSksIGFjdGl2ZU1hdGNoOiAnXi9lbi9ndWlkZS8nIH0sXG4gICAgICAgICAgLi4ubW9kdWxlTmF2KCdlbicpLFxuICAgICAgICBdLFxuICAgICAgICBzaWRlYmFyOiB7XG4gICAgICAgICAgJy9lbi9ndWlkZS8nOiBndWlkZVNpZGViYXIoJ2VuJyksXG4gICAgICAgICAgJy9lbi9kZXZlbG9wLyc6IHNpZGViYXIoJ2VuJywgJ2VuLWRldmVsb3AnKSxcbiAgICAgICAgICAnL2VuL3JlZmVyZW5jZS8nOiBzaWRlYmFyKCdlbicsICdlbi1yZWZlcmVuY2UnKSxcbiAgICAgICAgfSxcbiAgICAgICAgZWRpdExpbms6IHtcbiAgICAgICAgICBwYXR0ZXJuOiAoeyBmcm9udG1hdHRlciB9OiBQYWdlRGF0YSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZGF0YTogdW5rbm93biA9IGZyb250bWF0dGVyXG4gICAgICAgICAgICBjb25zdCBlZGl0U291cmNlOiB1bmtub3duID0gdHlwZW9mIGRhdGEgPT09ICdvYmplY3QnICYmIGRhdGEgIT09IG51bGwgPyBSZWZsZWN0LmdldChkYXRhLCAnZWRpdFNvdXJjZScpIDogdW5kZWZpbmVkXG4gICAgICAgICAgICBpZiAodHlwZW9mIGVkaXRTb3VyY2UgIT09ICdzdHJpbmcnKSB0aHJvdyBuZXcgRXJyb3IoJ1Byb2plY3RlZCBkb2N1bWVudGF0aW9uIHBhZ2UgaGFzIG5vIGVkaXRTb3VyY2UgZnJvbnRtYXR0ZXIuJylcbiAgICAgICAgICAgIHJldHVybiBgaHR0cHM6Ly9naXRodWIuY29tL2RlZXBzZWVrLWFpL2RlZXBzZWVrLWhhcm5lc3MvZWRpdC9tYXN0ZXIvJHtlZGl0U291cmNlfWBcbiAgICAgICAgICB9LFxuICAgICAgICAgIHRleHQ6ICdFZGl0IHRoaXMgcGFnZSBvbiBHaXRIdWInLFxuICAgICAgICB9LFxuICAgICAgICBvdXRsaW5lOiB7IGxhYmVsOiAnT24gdGhpcyBwYWdlJyB9LFxuICAgICAgICBkb2NGb290ZXI6IHsgcHJldjogJ1ByZXZpb3VzJywgbmV4dDogJ05leHQnIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHZpdGU6IHtcbiAgICAvLyBgc3JjRGlyYCBwdXRzIHRoZSBWaXRlIHJvb3QgaW5zaWRlIHRoZSBkaXNwb3NhYmxlIGdlbmVyYXRlZCB0cmVlLCB3aG9zZVxuICAgIC8vIG93biBgcHVibGljL2Agbm8gdHJhY2tlZCBhc3NldCBjYW4gbGl2ZSBpbi5cbiAgICBwdWJsaWNEaXI6IHJlc29sdmUoaW1wb3J0Lm1ldGEuZGlybmFtZSwgJy4uL3B1YmxpYycpLFxuICAgIHBsdWdpbnM6IFtcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ2RlZXBzZWVrLWhhcm5lc3MtZG9jLXByb2plY3RvcicsXG4gICAgICAgIGNvbmZpZ3VyZVNlcnZlcihzZXJ2ZXIpIHtcbiAgICAgICAgICB3YXRjaENhbm9uaWNhbERvY3Moc2VydmVyKVxuICAgICAgICAgIHNlcnZlUmF3TWFya2Rvd24oc2VydmVyKVxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICBdLFxuICB9LFxuICBtYXJrZG93bjoge1xuICAgIGNvbmZpZyhtZCkge1xuICAgICAgaXNvbGF0ZUNvZGVHcm91cFJhZGlvcyhtZClcbiAgICAgIGNvbnN0IHJlbmRlclRleHQgPSBtZC5yZW5kZXJlci5ydWxlcy50ZXh0XG4gICAgICBjb25zdCByZW5kZXJDb2RlID0gbWQucmVuZGVyZXIucnVsZXMuY29kZV9pbmxpbmVcbiAgICAgIGNvbnN0IHJlbmRlckZlbmNlID0gbWQucmVuZGVyZXIucnVsZXMuZmVuY2VcbiAgICAgIGlmIChyZW5kZXJUZXh0ID09PSB1bmRlZmluZWQpIHRocm93IG5ldyBFcnJvcignVml0ZVByZXNzIE1hcmtkb3duIHJlbmRlcmVyIGlzIG1pc3NpbmcgdGhlIHRleHQgcmVuZGVyaW5nIHJ1bGUuJylcbiAgICAgIGlmIChyZW5kZXJDb2RlID09PSB1bmRlZmluZWQpIHRocm93IG5ldyBFcnJvcignVml0ZVByZXNzIE1hcmtkb3duIHJlbmRlcmVyIGlzIG1pc3NpbmcgdGhlIGlubGluZS1jb2RlIHJlbmRlcmluZyBydWxlLicpXG4gICAgICBpZiAocmVuZGVyRmVuY2UgPT09IHVuZGVmaW5lZCkgdGhyb3cgbmV3IEVycm9yKCdWaXRlUHJlc3MgTWFya2Rvd24gcmVuZGVyZXIgaXMgbWlzc2luZyB0aGUgZmVuY2UgcmVuZGVyaW5nIHJ1bGUuJylcbiAgICAgIG1kLnJlbmRlcmVyLnJ1bGVzLnRleHQgPSAoLi4uYXJncykgPT4gZXNjYXBlVnVlSW50ZXJwb2xhdGlvbihyZW5kZXJUZXh0KC4uLmFyZ3MpKVxuICAgICAgbWQucmVuZGVyZXIucnVsZXMuY29kZV9pbmxpbmUgPSAoLi4uYXJncykgPT4gZXNjYXBlVnVlSW50ZXJwb2xhdGlvbihyZW5kZXJDb2RlKC4uLmFyZ3MpKVxuICAgICAgY29uc3QgcmVuZGVyZWRGZW5jZXMgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpXG4gICAgICBtZC5yZW5kZXJlci5ydWxlcy5mZW5jZSA9ICguLi5hcmdzKSA9PiB7XG4gICAgICAgIGNvbnN0IFt0b2tlbnMsIGluZGV4XSA9IGFyZ3NcbiAgICAgICAgY29uc3QgdG9rZW4gPSB0b2tlbnNbaW5kZXhdXG4gICAgICAgIGlmICh0b2tlbiA9PT0gdW5kZWZpbmVkKSB0aHJvdyBuZXcgRXJyb3IoJ1ZpdGVQcmVzcyBjb2RlLWZlbmNlIHJlbmRlcmVyIHJlY2VpdmVkIG5vIHRva2VuLicpXG4gICAgICAgIC8vIE1lcm1haWQgb3V0cHV0IGVtYmVkcyB0aGUgdG9rZW4gcG9zaXRpb24sIGFuZCBWaXRlUHJlc3Mgc25pcHBldHMgcmVzb2x2ZSBzb3VyY2UgZmlsZXMgZHVyaW5nIHJlbmRlcmluZy5cbiAgICAgICAgaWYgKFsnbWVybWFpZCcsICdtbWQnXS5pbmNsdWRlcyh0b2tlbi5pbmZvLnRyaW0oKS5zcGxpdCgvXFxzKy8sIDEpWzBdID8/ICcnKSkgcmV0dXJuIHJlbmRlckZlbmNlKC4uLmFyZ3MpXG4gICAgICAgIGlmIChSZWZsZWN0LmdldCh0b2tlbiwgJ3NyYycpICE9PSB1bmRlZmluZWQpIHJldHVybiByZW5kZXJGZW5jZSguLi5hcmdzKVxuICAgICAgICAvLyBLZWVwIHRoZSBjYWNoZSBidWlsZC1sb2NhbDsgYSBkZXYgcmVuZGVyZXIgY2FuIHN1cnZpdmUgbWFueSBITVIgdXBkYXRlcy5cbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHJldHVybiByZW5kZXJGZW5jZSguLi5hcmdzKVxuICAgICAgICBjb25zdCBrZXkgPSBKU09OLnN0cmluZ2lmeShbdG9rZW4uY29udGVudCwgdG9rZW4uaW5mbywgdG9rZW4ubWFya3VwLCB0b2tlbi5hdHRyc10pXG4gICAgICAgIGNvbnN0IGNhY2hlZCA9IHJlbmRlcmVkRmVuY2VzLmdldChrZXkpXG4gICAgICAgIGlmIChjYWNoZWQgIT09IHVuZGVmaW5lZCkgcmV0dXJuIGNhY2hlZFxuICAgICAgICBjb25zdCBodG1sID0gcmVuZGVyRmVuY2UoLi4uYXJncylcbiAgICAgICAgcmVuZGVyZWRGZW5jZXMuc2V0KGtleSwgaHRtbClcbiAgICAgICAgcmV0dXJuIGh0bWxcbiAgICAgIH1cbiAgICB9LFxuICB9LFxuICBtZXJtYWlkOiB7fSxcbiAgdGhlbWVDb25maWc6IHNoYXJlZFRoZW1lLFxufSlcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvY2Fzc2lvZGFsbGEvRG9jdW1lbnRvcy9naXRodWIvZGVlcHNlZWstaGFybmVzcy93ZWJzaXRlLy52aXRlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL2Nhc3Npb2RhbGxhL0RvY3VtZW50b3MvZ2l0aHViL2RlZXBzZWVrLWhhcm5lc3Mvd2Vic2l0ZS8udml0ZXByZXNzL2NvZGUtZ3JvdXBzLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL2Nhc3Npb2RhbGxhL0RvY3VtZW50b3MvZ2l0aHViL2RlZXBzZWVrLWhhcm5lc3Mvd2Vic2l0ZS8udml0ZXByZXNzL2NvZGUtZ3JvdXBzLnRzXCI7LyoqIElzb2xhdGVzIG5hdGl2ZSBjb2RlLWdyb3VwIHJhZGlvcyBmcm9tIGNvcGllcyByZW5kZXJlZCBpbiBsb2NhbCBzZWFyY2guICovXG5cbmltcG9ydCB0eXBlIHsgSGVhZENvbmZpZywgTWFya2Rvd25SZW5kZXJlciB9IGZyb20gJ3ZpdGVwcmVzcydcblxuLyoqXG4gKiBLZWVwcyBhbGwgY29kZS1ncm91cCBjb21tYW5kcyByZWFkYWJsZSB3aGVuIE1QQSBvdXRwdXQgb21pdHMgdGhlIHRoZW1lJ3MgY2xpZW50IGhhbmRsZXJzLlxuICogQHBhcmFtIG1wYSAtIFdoZXRoZXIgdGhlIHJlc29sdmVkIHNpdGUgdXNlcyBWaXRlUHJlc3MncyBNUEEgYnVpbGQuXG4gKiBAcmV0dXJucyBNUEEtb25seSBzdHlsZXMgdGhhdCBleHBvc2UgZXZlcnkgYmxvY2sgYW5kIGhpZGUgaW5hY3RpdmUgY29udHJvbHMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb2RlR3JvdXBGYWxsYmFja0hlYWQobXBhOiBib29sZWFuIHwgdW5kZWZpbmVkKTogSGVhZENvbmZpZ1tdIHtcbiAgcmV0dXJuIG1wYSA/IFtbJ3N0eWxlJywge30sIGBcbi52cC1jb2RlLWdyb3VwIC50YWJzLCAudnAtY29kZS1ncm91cCBidXR0b24uY29weSB7IGRpc3BsYXk6IG5vbmU7IH1cbi52cC1jb2RlLWdyb3VwIC5ibG9ja3MgPiBkaXYgeyBkaXNwbGF5OiBibG9jazsgfVxuYF1dIDogW11cbn1cblxuLyoqXG4gKiBHaXZlcyBlYWNoIG5hdGl2ZSB0YWIgc3RyaXAgaXRzIG93biBmb3JtIHNvIHNlYXJjaCBleGNlcnB0cyBjYW5ub3QgY2xlYXIgdGhlIHBhZ2UncyBzZWxlY3Rpb24uXG4gKlxuICogQHBhcmFtIG1kIC0gVml0ZVByZXNzIHJlbmRlcmVyIHdpdGggdGhlIG5hdGl2ZSBjb2RlLWdyb3VwIHJ1bGVzIGluc3RhbGxlZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzb2xhdGVDb2RlR3JvdXBSYWRpb3MobWQ6IE1hcmtkb3duUmVuZGVyZXIpOiB2b2lkIHtcbiAgY29uc3QgcmVuZGVyID0gbWQucmVuZGVyZXIucnVsZXNbJ2NvbnRhaW5lcl9jb2RlLWdyb3VwX29wZW4nXVxuICBpZiAocmVuZGVyID09PSB1bmRlZmluZWQpIHRocm93IG5ldyBFcnJvcignVml0ZVByZXNzIE1hcmtkb3duIHJlbmRlcmVyIGlzIG1pc3NpbmcgdGhlIGNvZGUtZ3JvdXAgb3BlbmluZyBydWxlLicpXG4gIG1kLnJlbmRlcmVyLnJ1bGVzWydjb250YWluZXJfY29kZS1ncm91cF9vcGVuJ10gPSAoLi4uYXJncykgPT4ge1xuICAgIGNvbnN0IGh0bWwgPSByZW5kZXIoLi4uYXJncylcbiAgICBjb25zdCBvcGVuaW5nID0gJzxkaXYgY2xhc3M9XCJ0YWJzXCI+J1xuICAgIGNvbnN0IGNsb3NpbmcgPSAnPC9kaXY+PGRpdiBjbGFzcz1cImJsb2Nrc1wiPidcbiAgICBpZiAoIWh0bWwuaW5jbHVkZXMob3BlbmluZykgfHwgIWh0bWwuaW5jbHVkZXMoY2xvc2luZykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVml0ZVByZXNzIGNvZGUtZ3JvdXAgbWFya3VwIGRvZXMgbm90IGNvbnRhaW4gdGhlIGV4cGVjdGVkIHRhYiBzdHJpcC4nKVxuICAgIH1cbiAgICByZXR1cm4gaHRtbC5yZXBsYWNlKG9wZW5pbmcsICc8Zm9ybSBjbGFzcz1cInRhYnNcIiBAc3VibWl0LnByZXZlbnQ+JykucmVwbGFjZShjbG9zaW5nLCAnPC9mb3JtPjxkaXYgY2xhc3M9XCJibG9ja3NcIj4nKVxuICB9XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9ob21lL2Nhc3Npb2RhbGxhL0RvY3VtZW50b3MvZ2l0aHViL2RlZXBzZWVrLWhhcm5lc3Mvd2Vic2l0ZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvY2Fzc2lvZGFsbGEvRG9jdW1lbnRvcy9naXRodWIvZGVlcHNlZWstaGFybmVzcy93ZWJzaXRlL2RvY3MudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvY2Fzc2lvZGFsbGEvRG9jdW1lbnRvcy9naXRodWIvZGVlcHNlZWstaGFybmVzcy93ZWJzaXRlL2RvY3MudHNcIjsvKipcbiAqIENhbm9uaWNhbCBwdWJsaWNhdGlvbiBtYW5pZmVzdCBmb3IgdGhlIGRvY3VtZW50YXRpb24gd2Vic2l0ZS5cbiAqXG4gKiBNYXJrZG93biBzdGF5cyBpbiBpdHMgb3duaW5nIHJlcG9zaXRvcnkgdGllci4gVGhpcyBtYW5pZmVzdCBtYXBzIGVhY2hcbiAqIGNhbm9uaWNhbCBzb3VyY2UgaW50byBtYXRjaGluZyByb3V0ZSB0cmVlcyBmb3IgYm90aCBzaXRlIGxvY2FsZXM7IHdoZW4gYVxuICogdHJhbnNsYXRpb24gaXMgYWJzZW50LCBib3RoIHJvdXRlcyBpbnRlbnRpb25hbGx5IHByb2plY3QgdGhlIGF2YWlsYWJsZVxuICogc291cmNlIGluc3RlYWQgb2YgY29weWluZyBNYXJrZG93bi5cbiAqL1xuXG4vKiogTG9jYWxlIGtleSB1c2VkIGJ5IHRoZSBWaXRlUHJlc3Mgc2l0ZS4gKi9cbmV4cG9ydCB0eXBlIERvY3NMb2NhbGUgPSAncm9vdCcgfCAnZW4nXG5cbi8qKiBTaWRlYmFyIGNvbGxlY3Rpb24gcmVuZGVyZWQgZm9yIG9uZSBsb2NhbGUgYW5kIHRvcC1sZXZlbCBtb2R1bGUuICovXG5leHBvcnQgdHlwZSBEb2NzU2lkZWJhciA9XG4gIHwgJ3poLWd1aWRlJ1xuICB8ICd6aC1kZXZlbG9wJ1xuICB8ICd6aC1yZWZlcmVuY2UnXG4gIHwgJ2VuLWd1aWRlJ1xuICB8ICdlbi1kZXZlbG9wJ1xuICB8ICdlbi1yZWZlcmVuY2UnXG5cbi8qKiBBIHBhZ2UgcHJvamVjdGVkIGludG8gdGhlIFZpdGVQcmVzcyBzb3VyY2UgdHJlZS4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRG9jc1BhZ2Uge1xuICAvKiogVml0ZVByZXNzIGxvY2FsZSB3aG9zZSByb3V0ZSB0cmVlIG93bnMgdGhpcyBwcm9qZWN0aW9uLiAqL1xuICBsb2NhbGU6IERvY3NMb2NhbGVcbiAgLyoqIExhbmd1YWdlIG9mIHRoZSBjYW5vbmljYWwgc291cmNlIGN1cnJlbnRseSBwcm9qZWN0ZWQgYXQgdGhpcyByb3V0ZS4gKi9cbiAgY29udGVudExvY2FsZTogJ3poLUNOJyB8ICdlbi1VUydcbiAgLyoqIFJlcG9zaXRvcnktcmVsYXRpdmUgY2Fub25pY2FsIE1hcmtkb3duIHNvdXJjZS4gKi9cbiAgc291cmNlOiBzdHJpbmdcbiAgLyoqIFZpdGVQcmVzcyByb3V0ZSwgaW5jbHVkaW5nIHRoZSBgLm1kYCBzdWZmaXguICovXG4gIHJvdXRlOiBzdHJpbmdcbiAgLyoqIE5hdmlnYXRpb24gbGFiZWwgc2hvd24gaW4gdGhlIHNpZGViYXIuICovXG4gIGxhYmVsOiBzdHJpbmdcbiAgLyoqIFNpZGViYXIgY29sbGVjdGlvbiB0aGF0IG93bnMgdGhlIHBhZ2UsIG9yIG51bGwgZm9yIGEgbG9jYWxlIGhvbWUgcGFnZS4gKi9cbiAgc2lkZWJhcjogRG9jc1NpZGViYXIgfCBudWxsXG4gIC8qKiBTZWN0aW9uIGxhYmVsIHdpdGhpbiB0aGUgc2lkZWJhci4gKi9cbiAgc2VjdGlvbjogc3RyaW5nXG4gIC8qKiBTdGFibGUgb3JkZXIgd2l0aGluIHRoZSBzZWN0aW9uLiAqL1xuICBvcmRlcjogbnVtYmVyXG4gIC8qKiBIZWFkaW5nIGxldmVscyBpbmNsdWRlZCBpbiB0aGlzIHBhZ2UncyBWaXRlUHJlc3Mgb3V0bGluZS4gKi9cbiAgb3V0bGluZT86IG51bWJlciB8IHJlYWRvbmx5IFtudW1iZXIsIG51bWJlcl0gfCAnZGVlcCcgfCBmYWxzZVxuICAvKiogQWRkaXRpb25hbCByZXBvc2l0b3J5IHBhdGhzIHRoYXQgcmVzb2x2ZSB0byB0aGlzIHBhZ2UuICovXG4gIHNvdXJjZUFsaWFzZXM/OiBzdHJpbmdbXVxufVxuXG5pbnRlcmZhY2UgTWlycm9yZWRQYWdlIHtcbiAgc291cmNlOiBzdHJpbmcgfCBSZWNvcmQ8RG9jc0xvY2FsZSwgc3RyaW5nPlxuICByb3V0ZTogc3RyaW5nXG4gIGNvbnRlbnRMb2NhbGU6IERvY3NQYWdlWydjb250ZW50TG9jYWxlJ10gfCBSZWNvcmQ8RG9jc0xvY2FsZSwgRG9jc1BhZ2VbJ2NvbnRlbnRMb2NhbGUnXT5cbiAgbGFiZWw6IFJlY29yZDxEb2NzTG9jYWxlLCBzdHJpbmc+XG4gIHNpZGViYXI6IFJlY29yZDxEb2NzTG9jYWxlLCBEb2NzU2lkZWJhciB8IG51bGw+XG4gIHNlY3Rpb246IFJlY29yZDxEb2NzTG9jYWxlLCBzdHJpbmc+XG4gIG9yZGVyOiBudW1iZXJcbiAgb3V0bGluZT86IERvY3NQYWdlWydvdXRsaW5lJ11cbiAgc291cmNlQWxpYXNlcz86IHN0cmluZ1tdIHwgUGFydGlhbDxSZWNvcmQ8RG9jc0xvY2FsZSwgc3RyaW5nW10+PlxufVxuXG50eXBlIFBhaXJlZFBhZ2UgPSBPbWl0PE1pcnJvcmVkUGFnZSwgJ3NvdXJjZScgfCAnY29udGVudExvY2FsZScgfCAnc291cmNlQWxpYXNlcyc+ICYge1xuICAvKiogRW5nbGlzaCBzaWRlIG9mIGEgc2libGluZyBgZm9vLm1kYCAvIGBmb28uemgubWRgIHBhaXIuICovXG4gIHNvdXJjZTogc3RyaW5nXG4gIC8qKiBMYW5ndWFnZS1uZXV0cmFsIHJlcG9zaXRvcnkgYWxpYXNlcywgc3VjaCBhcyB0aGUgZGlyZWN0b3J5IG9mIGFuIGluZGV4IHBhZ2UuICovXG4gIHNvdXJjZUFsaWFzZXM/OiBzdHJpbmdbXVxufVxuXG5mdW5jdGlvbiBsb2NhbGl6ZWQ8VD4odmFsdWU6IFQgfCBSZWNvcmQ8RG9jc0xvY2FsZSwgVD4sIGxvY2FsZTogRG9jc0xvY2FsZSk6IFQge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAhPT0gbnVsbCAmJiAhQXJyYXkuaXNBcnJheSh2YWx1ZSlcbiAgICA/ICh2YWx1ZSBhcyBSZWNvcmQ8RG9jc0xvY2FsZSwgVD4pW2xvY2FsZV1cbiAgICA6IHZhbHVlXG59XG5cbmZ1bmN0aW9uIG1pcnJvcmVkUGFnZXMocGFnZXM6IE1pcnJvcmVkUGFnZVtdKTogRG9jc1BhZ2VbXSB7XG4gIHJldHVybiBwYWdlcy5mbGF0TWFwKHBhZ2UgPT4gKFsncm9vdCcsICdlbiddIGFzIGNvbnN0KS5tYXAoKGxvY2FsZSkgPT4ge1xuICAgIGNvbnN0IGFsaWFzZXMgPSBwYWdlLnNvdXJjZUFsaWFzZXMgPT09IHVuZGVmaW5lZFxuICAgICAgPyB1bmRlZmluZWRcbiAgICAgIDogQXJyYXkuaXNBcnJheShwYWdlLnNvdXJjZUFsaWFzZXMpID8gcGFnZS5zb3VyY2VBbGlhc2VzIDogcGFnZS5zb3VyY2VBbGlhc2VzW2xvY2FsZV1cbiAgICByZXR1cm4ge1xuICAgICAgbG9jYWxlLFxuICAgICAgY29udGVudExvY2FsZTogbG9jYWxpemVkKHBhZ2UuY29udGVudExvY2FsZSwgbG9jYWxlKSxcbiAgICAgIHNvdXJjZTogbG9jYWxpemVkKHBhZ2Uuc291cmNlLCBsb2NhbGUpLFxuICAgICAgcm91dGU6IGxvY2FsZSA9PT0gJ3Jvb3QnID8gcGFnZS5yb3V0ZSA6IGBlbi8ke3BhZ2Uucm91dGV9YCxcbiAgICAgIGxhYmVsOiBwYWdlLmxhYmVsW2xvY2FsZV0sXG4gICAgICBzaWRlYmFyOiBwYWdlLnNpZGViYXJbbG9jYWxlXSxcbiAgICAgIHNlY3Rpb246IHBhZ2Uuc2VjdGlvbltsb2NhbGVdLFxuICAgICAgb3JkZXI6IHBhZ2Uub3JkZXIsXG4gICAgICAuLi4ocGFnZS5vdXRsaW5lID09PSB1bmRlZmluZWQgPyB7fSA6IHsgb3V0bGluZTogcGFnZS5vdXRsaW5lIH0pLFxuICAgICAgLi4uKGFsaWFzZXMgPT09IHVuZGVmaW5lZCA/IHt9IDogeyBzb3VyY2VBbGlhc2VzOiBhbGlhc2VzIH0pLFxuICAgIH1cbiAgfSkpXG59XG5cbmZ1bmN0aW9uIHBhaXJlZFBhZ2VzKHBhZ2VzOiBQYWlyZWRQYWdlW10pOiBEb2NzUGFnZVtdIHtcbiAgcmV0dXJuIG1pcnJvcmVkUGFnZXMocGFnZXMubWFwKChwYWdlKSA9PiB7XG4gICAgY29uc3QgY2hpbmVzZVNvdXJjZSA9IHBhZ2Uuc291cmNlLnJlcGxhY2UoL1xcLm1kJC8sICcuemgubWQnKVxuICAgIGNvbnN0IHNoYXJlZEFsaWFzZXMgPSBwYWdlLnNvdXJjZUFsaWFzZXMgPz8gW11cbiAgICByZXR1cm4ge1xuICAgICAgLi4ucGFnZSxcbiAgICAgIHNvdXJjZTogeyByb290OiBjaGluZXNlU291cmNlLCBlbjogcGFnZS5zb3VyY2UgfSxcbiAgICAgIGNvbnRlbnRMb2NhbGU6IHsgcm9vdDogJ3poLUNOJywgZW46ICdlbi1VUycgfSxcbiAgICAgIHNvdXJjZUFsaWFzZXM6IHtcbiAgICAgICAgcm9vdDogWy4uLnNoYXJlZEFsaWFzZXMsIHBhZ2Uuc291cmNlXSxcbiAgICAgICAgZW46IFsuLi5zaGFyZWRBbGlhc2VzLCBjaGluZXNlU291cmNlXSxcbiAgICAgIH0sXG4gICAgfVxuICB9KSlcbn1cblxuY29uc3QgaG9tZUFuZEd1aWRlID0gcGFpcmVkUGFnZXMoW1xuICB7XG4gICAgc291cmNlOiAnZG9jcy91c2VyL2luZGV4Lm1kJyxcbiAgICByb3V0ZTogJ2luZGV4Lm1kJyxcbiAgICBsYWJlbDogeyByb290OiAnRGVlcFNlZWsgSGFybmVzcycsIGVuOiAnRGVlcFNlZWsgSGFybmVzcycgfSxcbiAgICBzaWRlYmFyOiB7IHJvb3Q6IG51bGwsIGVuOiBudWxsIH0sXG4gICAgc2VjdGlvbjogeyByb290OiAnXHU5OTk2XHU5ODc1JywgZW46ICdIb21lJyB9LFxuICAgIG9yZGVyOiAwLFxuICB9LFxuICB7XG4gICAgc291cmNlOiAnZG9jcy91c2VyL2d1aWRlL2luZGV4Lm1kJyxcbiAgICByb3V0ZTogJ2d1aWRlL3F1aWNrc3RhcnQubWQnLFxuICAgIGxhYmVsOiB7IHJvb3Q6ICdcdTRGN0ZcdTc1MjggV2ViIFVJJywgZW46ICdVc2UgdGhlIFdlYiBVSScgfSxcbiAgICBzaWRlYmFyOiB7IHJvb3Q6ICd6aC1ndWlkZScsIGVuOiAnZW4tZ3VpZGUnIH0sXG4gICAgc2VjdGlvbjogeyByb290OiAnXHU1MTY1XHU5NUU4JywgZW46ICdHdWlkZScgfSxcbiAgICBvcmRlcjogMSxcbiAgICBzb3VyY2VBbGlhc2VzOiBbJ2RvY3MvdXNlci9ndWlkZSddLFxuICB9LFxuICB7XG4gICAgc291cmNlOiAnZG9jcy91c2VyL2d1aWRlL3Byb3ZpZGVycy5tZCcsXG4gICAgcm91dGU6ICdndWlkZS9wcm92aWRlcnMubWQnLFxuICAgIGxhYmVsOiB7IHJvb3Q6ICdcdTkxNERcdTdGNkVcdTZBMjFcdTU3OEInLCBlbjogJ0NvbmZpZ3VyZSBtb2RlbHMnIH0sXG4gICAgc2lkZWJhcjogeyByb290OiAnemgtZ3VpZGUnLCBlbjogJ2VuLWd1aWRlJyB9LFxuICAgIHNlY3Rpb246IHsgcm9vdDogJ1x1NTE2NVx1OTVFOCcsIGVuOiAnR3VpZGUnIH0sXG4gICAgb3JkZXI6IDIsXG4gIH0sXG4gIHtcbiAgICBzb3VyY2U6ICdkb2NzL3VzZXIvZ3VpZGUvbmV0d29yay1wcm94eS5tZCcsXG4gICAgcm91dGU6ICdndWlkZS9uZXR3b3JrLXByb3h5Lm1kJyxcbiAgICBsYWJlbDogeyByb290OiAnXHU3RjUxXHU3RURDXHU0RUUzXHU3NDA2JywgZW46ICdOZXR3b3JrIHByb3h5JyB9LFxuICAgIHNpZGViYXI6IHsgcm9vdDogJ3poLWd1aWRlJywgZW46ICdlbi1ndWlkZScgfSxcbiAgICBzZWN0aW9uOiB7IHJvb3Q6ICdcdTUxNjVcdTk1RTgnLCBlbjogJ0d1aWRlJyB9LFxuICAgIG9yZGVyOiAzLFxuICB9LFxuICB7XG4gICAgc291cmNlOiAnZG9jcy91c2VyL2d1aWRlL3B5dGhvbi1zZGsubWQnLFxuICAgIHJvdXRlOiAnZ3VpZGUvcHl0aG9uLXNkay5tZCcsXG4gICAgbGFiZWw6IHsgcm9vdDogJ1B5dGhvbicsIGVuOiAnUHl0aG9uJyB9LFxuICAgIHNpZGViYXI6IHsgcm9vdDogJ3poLWd1aWRlJywgZW46ICdlbi1ndWlkZScgfSxcbiAgICBzZWN0aW9uOiB7IHJvb3Q6ICdTREsnLCBlbjogJ1NESycgfSxcbiAgICBvcmRlcjogMSxcbiAgfSxcbiAge1xuICAgIHNvdXJjZTogJ2RvY3MvdXNlci9ndWlkZS9naXRodWItcmV2aWV3Lm1kJyxcbiAgICByb3V0ZTogJ2d1aWRlL2dpdGh1Yi1yZXZpZXcubWQnLFxuICAgIGxhYmVsOiB7IHJvb3Q6ICdHaXRIdWIgXHU4QkM0XHU1QkExXHU0RjFBXHU4QkREJywgZW46ICdHaXRIdWIgcmV2aWV3IHNlc3Npb25zJyB9LFxuICAgIHNpZGViYXI6IHsgcm9vdDogJ3poLWd1aWRlJywgZW46ICdlbi1ndWlkZScgfSxcbiAgICBzZWN0aW9uOiB7IHJvb3Q6ICdcdTgxRUFcdTUyQThcdTUzMTYnLCBlbjogJ0F1dG9tYXRpb24nIH0sXG4gICAgb3JkZXI6IDEsXG4gIH0sXG4gIHtcbiAgICBzb3VyY2U6ICdkb2NzL3VzZXIvZ3VpZGUvc2NoZWR1bGUubWQnLFxuICAgIHJvdXRlOiAnZ3VpZGUvc2NoZWR1bGUubWQnLFxuICAgIGxhYmVsOiB7IHJvb3Q6ICdcdTRGMUFcdThCRERcdTUxODVcdTYzRDBcdTkxOTInLCBlbjogJ1Nlc3Npb24gcmVtaW5kZXJzJyB9LFxuICAgIHNpZGViYXI6IHsgcm9vdDogJ3poLWd1aWRlJywgZW46ICdlbi1ndWlkZScgfSxcbiAgICBzZWN0aW9uOiB7IHJvb3Q6ICdcdTgxRUFcdTUyQThcdTUzMTYnLCBlbjogJ0F1dG9tYXRpb24nIH0sXG4gICAgb3JkZXI6IDIsXG4gIH0sXG4gIHtcbiAgICBzb3VyY2U6ICdkb2NzL3VzZXIvZ3VpZGUvbWNwLW1lbW9yeS5tZCcsXG4gICAgcm91dGU6ICdndWlkZS9tY3AtbWVtb3J5Lm1kJyxcbiAgICBsYWJlbDogeyByb290OiAnXHU4QkIwXHU1RkM2IE1DUCcsIGVuOiAnTWVtb3J5IE1DUCcgfSxcbiAgICBzaWRlYmFyOiB7IHJvb3Q6ICd6aC1ndWlkZScsIGVuOiAnZW4tZ3VpZGUnIH0sXG4gICAgc2VjdGlvbjogeyByb290OiAnXHU5NkM2XHU2MjEwJywgZW46ICdJbnRlZ3JhdGlvbnMnIH0sXG4gICAgb3JkZXI6IDEsXG4gIH0sXG5dKVxuXG5jb25zdCBkZXZlbG9wID0gcGFpcmVkUGFnZXMoW1xuICB7XG4gICAgc291cmNlOiAnZG9jcy91c2VyL2RldmVsb3AvYmFzaWMvaW5kZXgubWQnLFxuICAgIHJvdXRlOiAnZGV2ZWxvcC9iYXNpYy9pbmRleC5tZCcsXG4gICAgbGFiZWw6IHsgcm9vdDogJ1x1N0IyQ1x1NEUwMFx1NEUyQSBIYXJuZXNzIFx1NjNEMlx1NEVGNicsIGVuOiAnWW91ciBmaXJzdCBIYXJuZXNzIHBsdWdpbicgfSxcbiAgICBzaWRlYmFyOiB7IHJvb3Q6ICd6aC1kZXZlbG9wJywgZW46ICdlbi1kZXZlbG9wJyB9LFxuICAgIHNlY3Rpb246IHsgcm9vdDogJ1x1NTdGQVx1Nzg0MCcsIGVuOiAnQmFzaWNzJyB9LFxuICAgIG9yZGVyOiAxLFxuICAgIHNvdXJjZUFsaWFzZXM6IFsnZG9jcy91c2VyL2RldmVsb3AvYmFzaWMnXSxcbiAgfSxcbiAge1xuICAgIHNvdXJjZTogJ2RvY3MvdXNlci9kZXZlbG9wL2Jhc2ljL3Rvb2wubWQnLFxuICAgIHJvdXRlOiAnZGV2ZWxvcC9iYXNpYy90b29sLm1kJyxcbiAgICBsYWJlbDogeyByb290OiAnXHU1RjAwXHU1M0QxXHU0RTAwXHU0RTJBIFRvb2wnLCBlbjogJ0J1aWxkIGEgdG9vbCcgfSxcbiAgICBzaWRlYmFyOiB7IHJvb3Q6ICd6aC1kZXZlbG9wJywgZW46ICdlbi1kZXZlbG9wJyB9LFxuICAgIHNlY3Rpb246IHsgcm9vdDogJ1x1NTdGQVx1Nzg0MCcsIGVuOiAnQmFzaWNzJyB9LFxuICAgIG9yZGVyOiAyLFxuICB9LFxuICB7XG4gICAgc291cmNlOiAnZG9jcy91c2VyL2RldmVsb3AvYmFzaWMvY29uZmlnLm1kJyxcbiAgICByb3V0ZTogJ2RldmVsb3AvYmFzaWMvY29uZmlnLm1kJyxcbiAgICBsYWJlbDogeyByb290OiAnXHU2M0QyXHU0RUY2XHU5MTREXHU3RjZFJywgZW46ICdQbHVnaW4gY29uZmlndXJhdGlvbicgfSxcbiAgICBzaWRlYmFyOiB7IHJvb3Q6ICd6aC1kZXZlbG9wJywgZW46ICdlbi1kZXZlbG9wJyB9LFxuICAgIHNlY3Rpb246IHsgcm9vdDogJ1x1NTdGQVx1Nzg0MCcsIGVuOiAnQmFzaWNzJyB9LFxuICAgIG9yZGVyOiAzLFxuICB9LFxuICB7XG4gICAgc291cmNlOiAnZG9jcy91c2VyL2RldmVsb3AvYmFzaWMvcHVibGlzaC5tZCcsXG4gICAgcm91dGU6ICdkZXZlbG9wL2Jhc2ljL3B1Ymxpc2gubWQnLFxuICAgIGxhYmVsOiB7IHJvb3Q6ICdcdTYyNTNcdTUzMDVcdTRFMEVcdTVCODlcdTg4QzVcdTYzRDJcdTRFRjYnLCBlbjogJ1BhY2thZ2UgYW5kIGluc3RhbGwnIH0sXG4gICAgc2lkZWJhcjogeyByb290OiAnemgtZGV2ZWxvcCcsIGVuOiAnZW4tZGV2ZWxvcCcgfSxcbiAgICBzZWN0aW9uOiB7IHJvb3Q6ICdcdTU3RkFcdTc4NDAnLCBlbjogJ0Jhc2ljcycgfSxcbiAgICBvcmRlcjogNCxcbiAgfSxcbiAge1xuICAgIHNvdXJjZTogJ2RvY3MvdXNlci9kZXZlbG9wL2ZyYW1ld29yay9pbmRleC5tZCcsXG4gICAgcm91dGU6ICdkZXZlbG9wL2ZyYW1ld29yay9pbmRleC5tZCcsXG4gICAgbGFiZWw6IHsgcm9vdDogJ1x1NjNEMlx1NEVGNlx1NEUwRVx1NzUxRlx1NTQ3RFx1NTQ2OFx1NjcxRicsIGVuOiAnUGx1Z2luIGxpZmVjeWNsZScgfSxcbiAgICBzaWRlYmFyOiB7IHJvb3Q6ICd6aC1kZXZlbG9wJywgZW46ICdlbi1kZXZlbG9wJyB9LFxuICAgIHNlY3Rpb246IHsgcm9vdDogJ1x1Njg0Nlx1NjdCNlx1ODBGRFx1NTI5QicsIGVuOiAnRnJhbWV3b3JrJyB9LFxuICAgIG9yZGVyOiAxLFxuICAgIHNvdXJjZUFsaWFzZXM6IFsnZG9jcy91c2VyL2RldmVsb3AvZnJhbWV3b3JrJ10sXG4gIH0sXG4gIHtcbiAgICBzb3VyY2U6ICdkb2NzL3VzZXIvZGV2ZWxvcC9mcmFtZXdvcmsvc2VydmljZS5tZCcsXG4gICAgcm91dGU6ICdkZXZlbG9wL2ZyYW1ld29yay9zZXJ2aWNlLm1kJyxcbiAgICBsYWJlbDogeyByb290OiAnXHU2NzBEXHU1MkExXHU0RTBFXHU0RjlEXHU4RDU2JywgZW46ICdTZXJ2aWNlcyBhbmQgZGVwZW5kZW5jaWVzJyB9LFxuICAgIHNpZGViYXI6IHsgcm9vdDogJ3poLWRldmVsb3AnLCBlbjogJ2VuLWRldmVsb3AnIH0sXG4gICAgc2VjdGlvbjogeyByb290OiAnXHU2ODQ2XHU2N0I2XHU4MEZEXHU1MjlCJywgZW46ICdGcmFtZXdvcmsnIH0sXG4gICAgb3JkZXI6IDIsXG4gIH0sXG4gIHtcbiAgICBzb3VyY2U6ICdkb2NzL3VzZXIvZGV2ZWxvcC9mcmFtZXdvcmsvZXZlbnRzLm1kJyxcbiAgICByb3V0ZTogJ2RldmVsb3AvZnJhbWV3b3JrL2V2ZW50cy5tZCcsXG4gICAgbGFiZWw6IHsgcm9vdDogJ1x1NEU4Qlx1NEVGNlx1N0NGQlx1N0VERicsIGVuOiAnRXZlbnQgc3lzdGVtJyB9LFxuICAgIHNpZGViYXI6IHsgcm9vdDogJ3poLWRldmVsb3AnLCBlbjogJ2VuLWRldmVsb3AnIH0sXG4gICAgc2VjdGlvbjogeyByb290OiAnXHU2ODQ2XHU2N0I2XHU4MEZEXHU1MjlCJywgZW46ICdGcmFtZXdvcmsnIH0sXG4gICAgb3JkZXI6IDMsXG4gIH0sXG4gIHtcbiAgICBzb3VyY2U6ICdkb2NzL3VzZXIvZGV2ZWxvcC9wcmFjdGljZS9pbmRleC5tZCcsXG4gICAgcm91dGU6ICdkZXZlbG9wL3ByYWN0aWNlL2luZGV4Lm1kJyxcbiAgICBsYWJlbDogeyByb290OiAnXHU4MEZEXHU1MjlCXHU3Njg0XHU0RTA5XHU1QzQyXHU2MkM2XHU1MjA2JywgZW46ICdDYXBhYmlsaXR5IGxheWVyaW5nJyB9LFxuICAgIHNpZGViYXI6IHsgcm9vdDogJ3poLWRldmVsb3AnLCBlbjogJ2VuLWRldmVsb3AnIH0sXG4gICAgc2VjdGlvbjogeyByb290OiAnXHU1QjlFXHU2MjE4JywgZW46ICdQcmFjdGljZScgfSxcbiAgICBvcmRlcjogMSxcbiAgICBzb3VyY2VBbGlhc2VzOiBbJ2RvY3MvdXNlci9kZXZlbG9wL3ByYWN0aWNlJ10sXG4gIH0sXG4gIHtcbiAgICBzb3VyY2U6ICdkb2NzL3VzZXIvZGV2ZWxvcC9wcmFjdGljZS9sbG0tYWRhcHRlci5tZCcsXG4gICAgcm91dGU6ICdkZXZlbG9wL3ByYWN0aWNlL2xsbS1hZGFwdGVyLm1kJyxcbiAgICBsYWJlbDogeyByb290OiAnTExNIFx1OTAwMlx1OTE0RFx1NTY2OCcsIGVuOiAnTExNIGFkYXB0ZXInIH0sXG4gICAgc2lkZWJhcjogeyByb290OiAnemgtZGV2ZWxvcCcsIGVuOiAnZW4tZGV2ZWxvcCcgfSxcbiAgICBzZWN0aW9uOiB7IHJvb3Q6ICdcdTVCOUVcdTYyMTgnLCBlbjogJ1ByYWN0aWNlJyB9LFxuICAgIG9yZGVyOiAyLFxuICB9LFxuICB7XG4gICAgc291cmNlOiAnZG9jcy91c2VyL2RldmVsb3AvcHJhY3RpY2UvZHluYW1pYy1jb3JkaXMubWQnLFxuICAgIHJvdXRlOiAnZGV2ZWxvcC9wcmFjdGljZS9keW5hbWljLWNvcmRpcy5tZCcsXG4gICAgbGFiZWw6IHsgcm9vdDogJ1x1NjMwMVx1NEU0NVx1NTMxNiBIYXJuZXNzIFx1NjNEMlx1NEVGNicsIGVuOiAnUGVyc2lzdGVudCBIYXJuZXNzIHBsdWdpbnMnIH0sXG4gICAgc2lkZWJhcjogeyByb290OiAnemgtZGV2ZWxvcCcsIGVuOiAnZW4tZGV2ZWxvcCcgfSxcbiAgICBzZWN0aW9uOiB7IHJvb3Q6ICdcdTVCOUVcdTYyMTgnLCBlbjogJ1ByYWN0aWNlJyB9LFxuICAgIG9yZGVyOiAzLFxuICB9LFxuXSlcblxuY29uc3QgY29yZGlzVHV0b3JpYWwgPSBwYWlyZWRQYWdlcygoW1xuICBbJ2luZGV4Lm1kJywgJ1x1NjAzQlx1ODlDOCcsICdPdmVydmlldyddLFxuICBbJzAxLWZpcnN0LXBsdWdpbi5tZCcsICcxLiBcdTdCMkNcdTRFMDBcdTRFMkFcdTYzRDJcdTRFRjYnLCAnMS4gWW91ciBmaXJzdCBwbHVnaW4nXSxcbiAgWycwMi1saWZlY3ljbGUtYW5kLWVmZmVjdHMubWQnLCAnMi4gXHU3NTFGXHU1NDdEXHU1NDY4XHU2NzFGXHU0RTBFXHU1MjZGXHU0RjVDXHU3NTI4JywgJzIuIExpZmVjeWNsZSBhbmQgZWZmZWN0cyddLFxuICBbJzAzLXNlcnZpY2VzLm1kJywgJzMuIFx1NjcwRFx1NTJBMScsICczLiBTZXJ2aWNlcyddLFxuICBbJzA0LWV2ZW50cy5tZCcsICc0LiBcdTRFOEJcdTRFRjYnLCAnNC4gRXZlbnRzJ10sXG4gIFsnMDUtY29uZmlnLm1kJywgJzUuIFx1OTE0RFx1N0Y2RScsICc1LiBDb25maWd1cmF0aW9uJ10sXG4gIFsnMDYtY29tcG9zaXRpb24tYW5kLWhtci5tZCcsICc2LiBcdTdFQzRcdTU0MDhcdTRFMEVcdTcwRURcdTkxQ0RcdThGN0QnLCAnNi4gQ29tcG9zaXRpb24gYW5kIEhNUiddLFxuICBbJzA3LWludG8tdGhlLWhhcm5lc3MubWQnLCAnNy4gXHU4RkRCXHU1MTY1IEhhcm5lc3MnLCAnNy4gSW50byB0aGUgaGFybmVzcyddLFxuXSBhcyBjb25zdCkubWFwKChbZmlsZSwgcm9vdExhYmVsLCBlbkxhYmVsXSwgb3JkZXIpOiBQYWlyZWRQYWdlID0+ICh7XG4gIHNvdXJjZTogYGRvY3MvY29yZGlzLXR1dG9yaWFsLyR7ZmlsZX1gLFxuICByb3V0ZTogYGRldmVsb3AvY29yZGlzLXR1dG9yaWFsLyR7ZmlsZX1gLFxuICBsYWJlbDogeyByb290OiByb290TGFiZWwsIGVuOiBlbkxhYmVsIH0sXG4gIHNpZGViYXI6IHsgcm9vdDogJ3poLWRldmVsb3AnLCBlbjogJ2VuLWRldmVsb3AnIH0sXG4gIHNlY3Rpb246IHsgcm9vdDogJ0NvcmRpcyBcdTY4NDZcdTY3QjZcdTY1NTlcdTdBMEInLCBlbjogJ0NvcmRpcyBmcmFtZXdvcmsgdHV0b3JpYWwnIH0sXG4gIG9yZGVyLFxuICAuLi4oZmlsZSA9PT0gJ2luZGV4Lm1kJyA/IHsgc291cmNlQWxpYXNlczogWydkb2NzL2NvcmRpcy10dXRvcmlhbCddIH0gOiB7fSksXG59KSkpXG5cbmNvbnN0IGNvcmRpc1ByaW1lclJlZmVyZW5jZSA9IHBhaXJlZFBhZ2VzKFtcbiAge1xuICAgIHNvdXJjZTogJ2RvY3MvY29yZGlzLXByaW1lci5tZCcsXG4gICAgcm91dGU6ICdyZWZlcmVuY2UvY29yZGlzLXByaW1lci5tZCcsXG4gICAgbGFiZWw6IHsgcm9vdDogJ0NvcmRpcyBcdTUxNjVcdTk1RTgnLCBlbjogJ0NvcmRpcyBwcmltZXInIH0sXG4gICAgc2lkZWJhcjogeyByb290OiAnemgtcmVmZXJlbmNlJywgZW46ICdlbi1yZWZlcmVuY2UnIH0sXG4gICAgc2VjdGlvbjogeyByb290OiAnXHU2OTgyXHU1RkY1JywgZW46ICdDb25jZXB0cycgfSxcbiAgICBvcmRlcjogMSxcbiAgfSxcbl0pXG5cbi8qKlxuICogU3Vic3lzdGVtIHBhZ2VzIGdyb3VwZWQgYnkgdGhlIGNvbmNlcm4gdGhleSBkb2N1bWVudCwgYXMgYFtDaGluZXNlIHNlY3Rpb24sXG4gKiBFbmdsaXNoIHNlY3Rpb24sIHBhZ2VzXWAuIE9uZSBmbGF0IGxpc3Qgb2YgZXZlcnkgc3Vic3lzdGVtIHB1c2hlZCB0aGUgcmVzdCBvZlxuICogdGhlIHJlZmVyZW5jZSBzaWRlYmFyIGJlbG93IHRoZSBmb2xkLlxuICovXG5jb25zdCBzdWJzeXN0ZW1Hcm91cHMgPSBbXG4gIFsnXHU2MDNCXHU4OUM4JywgJ092ZXJ2aWV3JywgW1xuICAgIFsnUkVBRE1FLm1kJywgJ1x1NUI1MFx1N0NGQlx1N0VERicsICdTdWJzeXN0ZW1zJ10sXG4gIF1dLFxuICBbJ1x1NTE4NVx1NjgzOFx1NEUwRVx1NEY1Q1x1NzUyOFx1NTdERicsICdDb3JlIGFuZCBzY29wZXMnLCBbXG4gICAgWydjb3JlLm1kJywgJ1x1NjgzOFx1NUZDMycsICdDb3JlJ10sXG4gICAgWydzY29wZS5tZCcsICdcdTRGNUNcdTc1MjhcdTU3REYnLCAnU2NvcGVzJ10sXG4gICAgWydpbnZhcmlhbnRzLm1kJywgJ1x1OEZEMFx1ODg0Q1x1NjVGNlx1NEUwRFx1NTNEOFx1NUYwRicsICdSdW50aW1lIGludmFyaWFudHMnXSxcbiAgXV0sXG4gIFsnXHU0RjFBXHU4QkREXHU0RTBFXHU2MzAxXHU0RTQ1XHU1MzE2JywgJ1Nlc3Npb25zIGFuZCBwZXJzaXN0ZW5jZScsIFtcbiAgICBbJ3Nlc3Npb24ubWQnLCAnXHU0RjFBXHU4QkREJywgJ1Nlc3Npb25zJ10sXG4gICAgWydzZXNzaW9uLXF1ZXJ5Lm1kJywgJ1x1NEYxQVx1OEJERFx1NjdFNVx1OEJFMicsICdTZXNzaW9uIHF1ZXJ5J10sXG4gICAgWydzZXNzaW9uLXJlZmVyZW5jZS5tZCcsICdcdTRGMUFcdThCRERcdTVGMTVcdTc1MjgnLCAnU2Vzc2lvbiByZWZlcmVuY2VzJ10sXG4gICAgWydzZXNzaW9uLXRpdGxlLm1kJywgJ1x1NEYxQVx1OEJERFx1NjgwN1x1OTg5OCcsICdTZXNzaW9uIHRpdGxlcyddLFxuICAgIFsnc2Vzc2lvbi1wcm9qZWN0aW9uLm1kJywgJ1x1NEYxQVx1OEJERFx1NjI5NVx1NUY3MScsICdTZXNzaW9uIHByb2plY3Rpb25zJ10sXG4gICAgWydwZXJzaXN0ZW5jZS5tZCcsICdcdTRGMUFcdThCRERcdTYzMDFcdTRFNDVcdTUzMTYnLCAnU2Vzc2lvbiBwZXJzaXN0ZW5jZSddLFxuICAgIFsnc3BpbGwubWQnLCAnU3BpbGwgXHU1QjU4XHU1MEE4JywgJ1NwaWxsIHN0b3JhZ2UnXSxcbiAgICBbJ3Nlc3Npb24tdGVsZW1ldHJ5Lm1kJywgJ1x1OTA2NVx1NkQ0QicsICdTZXNzaW9uVGVsZW1ldHJ5QmFja2VuZCddLFxuICBdXSxcbiAgWydcdTZBMjFcdTU3OEJcdTRFMEVcdTRFMEFcdTRFMEJcdTY1ODcnLCAnTW9kZWwgYW5kIGNvbnRleHQnLCBbXG4gICAgWydsbG0tc3RyZWFtaW5nLm1kJywgJ0xMTSBcdTZENDFcdTVGMEZcdTU0Q0RcdTVFOTQnLCAnTExNIHN0cmVhbWluZyddLFxuICAgIFsndG9rZW4tbWV0ZXIubWQnLCAnVG9rZW4gXHU4QkExXHU5MUNGJywgJ1Rva2VuIG1ldGVyaW5nJ10sXG4gICAgWydzeXN0ZW0tcHJvbXB0Lm1kJywgJ1x1N0NGQlx1N0VERlx1NjNEMFx1NzkzQVx1OEJDRCcsICdTeXN0ZW0gcHJvbXB0cyddLFxuICAgIFsnY29tcGFjdGlvbi5tZCcsICdcdTRFMEFcdTRFMEJcdTY1ODdcdTUzOEJcdTdGMjknLCAnQ29tcGFjdGlvbiddLFxuICBdXSxcbiAgWydcdTYyNjdcdTg4NENcdTRFMEVcdTVERTVcdTUxNzcnLCAnRXhlY3V0aW9uIGFuZCB0b29scycsIFtcbiAgICBbJ3Rvb2xzLm1kJywgJ1x1NURFNVx1NTE3NycsICdUb29scyddLFxuICAgIFsnc2hlbGwubWQnLCAnQmFzaCBcdTYyNjdcdTg4NEMnLCAnQmFzaCBleGVjdXRpb24nXSxcbiAgICBbJ3N1YnByb2Nlc3MubWQnLCAnXHU1QjUwXHU4RkRCXHU3QTBCJywgJ1N1YnByb2Nlc3NlcyddLFxuICAgIFsndGVybWluYWwubWQnLCAnUFRZIFx1NEYxQVx1OEJERCcsICdQVFkgc2Vzc2lvbnMnXSxcbiAgICBbJ2pvYnMubWQnLCAnXHU1NDBFXHU1M0YwXHU0RUZCXHU1MkExJywgJ0JhY2tncm91bmQgam9icyddLFxuICAgIFsnZmlsZXN5c3RlbS5tZCcsICdcdTY1ODdcdTRFRjZcdTdDRkJcdTdFREYnLCAnRmlsZXN5c3RlbSddLFxuICAgIFsnbHNwLm1kJywgJ0xTUCBcdTVCRkNcdTgyMkEnLCAnTFNQIG5hdmlnYXRpb24nXSxcbiAgICBbJ3B0Yy1ydW50aW1lLm1kJywgJ1BUQyBcdThGRDBcdTg4NENcdTY1RjYnLCAnUFRDIHJ1bnRpbWUnXSxcbiAgICBbJ3dlYi5tZCcsICdXZWIgXHU4QkJGXHU5NUVFJywgJ1dlYiBhY2Nlc3MnXSxcbiAgICBbJ3NraWxscy5tZCcsICdcdTYyODBcdTgwRkQnLCAnU2tpbGxzJ10sXG4gICAgWyd3b3JrZmxvdy5tZCcsICdcdTVERTVcdTRGNUNcdTZENDEnLCAnV29ya2Zsb3dzJ10sXG4gICAgWydzdWJhZ2VudC5tZCcsICdcdTVCNTBcdTRFRTNcdTc0MDYnLCAnU3ViYWdlbnRzJ10sXG4gIF1dLFxuICBbJ1x1N0I1Nlx1NzU2NVx1NEUwRVx1NEVBNFx1NEU5MicsICdQb2xpY3kgYW5kIGludGVyYWN0aW9uJywgW1xuICAgIFsnYXBwcm92YWwubWQnLCAnXHU1QkExXHU2Mjc5JywgJ0FwcHJvdmFscyddLFxuICAgIFsncGVybWlzc2lvbi1wcmVzZXRzLm1kJywgJ1x1Njc0M1x1OTY1MFx1OTg4NFx1OEJCRScsICdQZXJtaXNzaW9uIHByZXNldHMnXSxcbiAgICBbJ3NhbmRib3gubWQnLCAnXHU2Qzk5XHU3QkIxJywgJ1NhbmRib3hpbmcnXSxcbiAgICBbJ3BsYW4ubWQnLCAnXHU4QkExXHU1MjEyXHU2QTIxXHU1RjBGJywgJ1BsYW4gbW9kZSddLFxuICAgIFsndXNlci1xdWVzdGlvbnMubWQnLCAnXHU3NTI4XHU2MjM3XHU0RUE0XHU0RTkyJywgJ1VzZXIgaW50ZXJhY3Rpb24nXSxcbiAgICBbJ2NvbW1hbmRzLm1kJywgJ1x1NTQ3RFx1NEVFNCcsICdIdW1hbiBjb21tYW5kcyddLFxuICAgIFsnZ29hbC5tZCcsICdcdTc2RUVcdTY4MDcnLCAnR29hbHMnXSxcbiAgICBbJ3NjaGVkdWxlLm1kJywgJ1x1NUI5QVx1NjVGNlx1NjNEMFx1OTE5MicsICdTY2hlZHVsZWQgcmVtaW5kZXJzJ10sXG4gIF1dLFxuICBbJ1x1NUU3M1x1NTNGMFx1NEUwRVx1NjNBNVx1NTE2NScsICdQbGF0Zm9ybSBhbmQgYWNjZXNzJywgW1xuICAgIFsnd2ViLXNlcnZlci5tZCcsICdIVFRQIFx1NjcwRFx1NTJBMVx1NTY2OCcsICdIVFRQIHNlcnZlciddLFxuICAgIFsnd2ViLWNsaWVudC5tZCcsICdXZWIgQ2xpZW50IFx1NjdCNlx1Njc4NCcsICdXZWIgQ2xpZW50IGFyY2hpdGVjdHVyZSddLFxuICAgIFsnY2xpZW50LW1vZHVsZXMubWQnLCAnXHU1QkEyXHU2MjM3XHU3QUVGXHU2QTIxXHU1NzU3JywgJ0NsaWVudCBtb2R1bGVzJ10sXG4gICAgWydzbG90cy5tZCcsICdcdTVCQTJcdTYyMzdcdTdBRUYgU2xvdHMnLCAnQ2xpZW50IHNsb3RzJ10sXG4gICAgWydjbGllbnQtcmVzb3VyY2VzLm1kJywgJ1x1NUJBMlx1NjIzN1x1N0FFRlx1OEQ0NFx1NkU5MCcsICdDbGllbnQgcmVzb3VyY2VzJ10sXG4gICAgWydzaWRlYmFyLXJpZ2h0Lm1kJywgJ1x1NTNGM1x1NEZBNyBTaWRlYmFyJywgJ1JpZ2h0IFNpZGViYXInXSxcbiAgICBbJ2NvbnZlcnNhdGlvbi5tZCcsICdDb252ZXJzYXRpb24gXHU3RUM0XHU4OEM1JywgJ0NvbnZlcnNhdGlvbiBhc3NlbWJseSddLFxuICAgIFsndHlwZXJ0Lm1kJywgJ1R5cGVydCcsICdUeXBlcnQnXSxcbiAgICBbJ3N0b3JhZ2UubWQnLCAnXHU1QjU4XHU1MEE4JywgJ1N0b3JhZ2UnXSxcbiAgICBbJ3dvcmtzcGFjZS5tZCcsICdcdTVERTVcdTRGNUNcdTUzM0EnLCAnV29ya3NwYWNlcyddLFxuICAgIFsnc2V0dGluZ3MubWQnLCAnXHU3NTI4XHU2MjM3XHU4QkJFXHU3RjZFJywgJ1VzZXIgc2V0dGluZ3MnXSxcbiAgICBbJ2NyZWRlbnRpYWxzLm1kJywgJ1x1NzUyOFx1NjIzN1x1NTFFRFx1NjM2RScsICdVc2VyIGNyZWRlbnRpYWxzJ10sXG4gIF1dLFxuXSBhcyBjb25zdFxuXG5jb25zdCBzdWJzeXN0ZW1zUmVmZXJlbmNlID0gc3Vic3lzdGVtR3JvdXBzLmZsYXRNYXAoKFtyb290U2VjdGlvbiwgZW5TZWN0aW9uLCBmaWxlc10pID0+IHBhaXJlZFBhZ2VzKFxuICBmaWxlcy5tYXAoKFtmaWxlLCByb290TGFiZWwsIGVuTGFiZWxdLCBvcmRlcik6IFBhaXJlZFBhZ2UgPT4gKHtcbiAgICBzb3VyY2U6IGBkb2NzL3N1YnN5c3RlbXMvJHtmaWxlfWAsXG4gICAgcm91dGU6IGZpbGUgPT09ICdSRUFETUUubWQnID8gJ3JlZmVyZW5jZS9zdWJzeXN0ZW1zL2luZGV4Lm1kJyA6IGByZWZlcmVuY2Uvc3Vic3lzdGVtcy8ke2ZpbGV9YCxcbiAgICBsYWJlbDogeyByb290OiByb290TGFiZWwsIGVuOiBlbkxhYmVsIH0sXG4gICAgc2lkZWJhcjogeyByb290OiAnemgtcmVmZXJlbmNlJywgZW46ICdlbi1yZWZlcmVuY2UnIH0sXG4gICAgc2VjdGlvbjogeyByb290OiByb290U2VjdGlvbiwgZW46IGVuU2VjdGlvbiB9LFxuICAgIG9yZGVyLFxuICAgIC8vIFN1YnN5c3RlbSBwYWdlcyBjYXJyeSBsb25nIHRoaXJkLWxldmVsIHNlY3Rpb25zIGEgdHdvLWxldmVsIG91dGxpbmUgcmVhY2hlcy5cbiAgICBvdXRsaW5lOiBbMiwgM10sXG4gICAgLi4uKGZpbGUgPT09ICdSRUFETUUubWQnID8geyBzb3VyY2VBbGlhc2VzOiBbJ2RvY3Mvc3Vic3lzdGVtcyddIH0gOiB7fSksXG4gIH0pKSxcbikpXG5cbmNvbnN0IHJlZmVyZW5jZSA9IFtcbiAgLy8gYGRvY3MvZGVlcHNlZWstbGxtLWFwaS13aXJlLWV4dGVuc2lvbnMubWRgIGlzIGEgcmVwb3NpdG9yeS1vbmx5IHByb3ZpZGVyIHByb3RvY29sIHJlZmVyZW5jZS5cbiAgLy8gUHJvamVjdGVkIGxpbmtzIGludGVudGlvbmFsbHkgcmVzb2x2ZSB0byBpdHMgR2l0SHViIHNvdXJjZSBpbnN0ZWFkIG9mIGEgcHVibGljIHNpdGUgcm91dGUuXG4gIC4uLnBhaXJlZFBhZ2VzKChbXG4gICAgWydkb2NzL2FyY2hpdGVjdHVyZS5tZCcsICdyZWZlcmVuY2UvaW5kZXgubWQnLCAnXHU2N0I2XHU2Nzg0JywgJ0FyY2hpdGVjdHVyZScsIDBdLFxuICBdIGFzIGNvbnN0KS5tYXAoKFtzb3VyY2UsIHJvdXRlLCByb290TGFiZWwsIGVuTGFiZWwsIG9yZGVyXSk6IFBhaXJlZFBhZ2UgPT4gKHtcbiAgICBzb3VyY2UsXG4gICAgcm91dGUsXG4gICAgbGFiZWw6IHsgcm9vdDogcm9vdExhYmVsLCBlbjogZW5MYWJlbCB9LFxuICAgIHNpZGViYXI6IHsgcm9vdDogJ3poLXJlZmVyZW5jZScsIGVuOiAnZW4tcmVmZXJlbmNlJyB9LFxuICAgIHNlY3Rpb246IHsgcm9vdDogJ1x1Njk4Mlx1NUZGNScsIGVuOiAnQ29uY2VwdHMnIH0sXG4gICAgb3JkZXIsXG4gIH0pKSksXG4gIC4uLnBhaXJlZFBhZ2VzKChbXG4gICAgWydkb2NzL2NhcGFiaWxpdHktc2VhbXMubWQnLCAncmVmZXJlbmNlL2NhcGFiaWxpdHktc2VhbXMubWQnLCAnXHU4MEZEXHU1MjlCXHU2NzBEXHU1MkExJywgJ0NhcGFiaWxpdHkgc2VydmljZXMnLCAyXSxcbiAgICBbJ2RvY3MvYWdlbnQtbGlmZWN5Y2xlLm1kJywgJ3JlZmVyZW5jZS9hZ2VudC1saWZlY3ljbGUubWQnLCAnQWdlbnQgXHU3NTFGXHU1NDdEXHU1NDY4XHU2NzFGJywgJ0FnZW50IGxpZmVjeWNsZScsIDNdLFxuICAgIFsnZG9jcy90b29sLWV4ZWN1dGlvbi1waXBlbGluZS5tZCcsICdyZWZlcmVuY2UvdG9vbC1leGVjdXRpb24tcGlwZWxpbmUubWQnLCAnVG9vbCBcdTYyNjdcdTg4NEMnLCAnVG9vbCBleGVjdXRpb24nLCA0XSxcbiAgICBbJ2RvY3MvYXBpLWdhdGV3YXkubWQnLCAncmVmZXJlbmNlL2FwaS1nYXRld2F5Lm1kJywgJ0FQSSBHYXRld2F5JywgJ0FQSSBHYXRld2F5JywgNV0sXG4gIF0gYXMgY29uc3QpLm1hcCgoW3NvdXJjZSwgcm91dGUsIHJvb3RMYWJlbCwgZW5MYWJlbCwgb3JkZXJdKTogUGFpcmVkUGFnZSA9PiAoe1xuICAgIHNvdXJjZSxcbiAgICByb3V0ZSxcbiAgICBsYWJlbDogeyByb290OiByb290TGFiZWwsIGVuOiBlbkxhYmVsIH0sXG4gICAgc2lkZWJhcjogeyByb290OiAnemgtcmVmZXJlbmNlJywgZW46ICdlbi1yZWZlcmVuY2UnIH0sXG4gICAgc2VjdGlvbjogeyByb290OiAnXHU2OTgyXHU1RkY1JywgZW46ICdDb25jZXB0cycgfSxcbiAgICBvcmRlcixcbiAgfSkpKSxcbiAgLi4ucGFpcmVkUGFnZXMoKFtcbiAgICBbJ2RvY3MvY29uZmlnLWNhdGFsb2cubWQnLCAncmVmZXJlbmNlL2NvbmZpZy1jYXRhbG9nLm1kJywgJ1x1NjNEMlx1NEVGNlx1OTE0RFx1N0Y2RScsICdQbHVnaW4gY29uZmlndXJhdGlvbiddLFxuICAgIFsnZG9jcy90b29sLWNhdGFsb2cubWQnLCAncmVmZXJlbmNlL3Rvb2wtY2F0YWxvZy5tZCcsICdUb29sIFNjaGVtYScsICdUb29sIHNjaGVtYXMnXSxcbiAgICBbJ2RvY3MvcGVyc2lzdGVuY2UtY2F0YWxvZy5tZCcsICdyZWZlcmVuY2UvcGVyc2lzdGVuY2UtY2F0YWxvZy5tZCcsICdcdTYzMDFcdTRFNDVcdTUzMTZcdTRFOEJcdTRFRjYnLCAnUGVyc2lzdGVuY2UgZXZlbnRzJywgJ2RlZXAnXSxcbiAgXSBhcyBjb25zdCkubWFwKChbc291cmNlLCByb3V0ZSwgcm9vdExhYmVsLCBlbkxhYmVsLCBvdXRsaW5lXSwgb3JkZXIpOiBQYWlyZWRQYWdlID0+ICh7XG4gICAgc291cmNlLFxuICAgIHJvdXRlLFxuICAgIGxhYmVsOiB7IHJvb3Q6IHJvb3RMYWJlbCwgZW46IGVuTGFiZWwgfSxcbiAgICBzaWRlYmFyOiB7IHJvb3Q6ICd6aC1yZWZlcmVuY2UnLCBlbjogJ2VuLXJlZmVyZW5jZScgfSxcbiAgICBzZWN0aW9uOiB7IHJvb3Q6ICdcdTc1MUZcdTYyMTBcdTUzQzJcdTgwMDMnLCBlbjogJ0dlbmVyYXRlZCByZWZlcmVuY2UnIH0sXG4gICAgb3JkZXIsXG4gICAgLi4uKG91dGxpbmUgPT09IHVuZGVmaW5lZCA/IHt9IDogeyBvdXRsaW5lIH0pLFxuICB9KSkpLFxuICAuLi5wYWlyZWRQYWdlcygoW1xuICAgIFsnY29udGV4dC5tZCcsICdDb250ZXh0JywgJ0NvbnRleHQnXSxcbiAgICBbJ2V2ZW50cy5tZCcsICdFdmVudHMnLCAnRXZlbnRzJ10sXG4gICAgWydmaWJlci5tZCcsICdGaWJlcicsICdGaWJlciddLFxuICAgIFsncmVnaXN0cnkubWQnLCAnUGx1Z2luIFJlZ2lzdHJ5JywgJ1BsdWdpbiBSZWdpc3RyeSddLFxuICAgIFsnc2VydmljZS5tZCcsICdTZXJ2aWNlJywgJ1NlcnZpY2UnXSxcbiAgXSBhcyBjb25zdCkubWFwKChbZmlsZSwgcm9vdExhYmVsLCBlbkxhYmVsXSwgb3JkZXIpOiBQYWlyZWRQYWdlID0+ICh7XG4gICAgc291cmNlOiBgZG9jcy9jb3JkaXMtYXBpLyR7ZmlsZX1gLFxuICAgIHJvdXRlOiBgcmVmZXJlbmNlL2NvcmRpcy1hcGkvJHtmaWxlfWAsXG4gICAgbGFiZWw6IHsgcm9vdDogcm9vdExhYmVsLCBlbjogZW5MYWJlbCB9LFxuICAgIHNpZGViYXI6IHsgcm9vdDogJ3poLXJlZmVyZW5jZScsIGVuOiAnZW4tcmVmZXJlbmNlJyB9LFxuICAgIHNlY3Rpb246IHsgcm9vdDogJ0NvcmRpcyBBUEknLCBlbjogJ0NvcmRpcyBDb3JlIEFQSScgfSxcbiAgICBvcmRlcixcbiAgfSkpKSxcbiAgLi4ubWlycm9yZWRQYWdlcygoW1xuICAgIFsnaW5oZXJpdGVkLm1kJywgJ1x1N0VFN1x1NjI3Rlx1NjNBNVx1NTNFM1x1OTc2MicsICdJbmhlcml0ZWQgc3VyZmFjZSddLFxuICBdIGFzIGNvbnN0KS5tYXAoKFtmaWxlLCByb290TGFiZWwsIGVuTGFiZWxdLCBvcmRlcik6IE1pcnJvcmVkUGFnZSA9PiAoe1xuICAgIHNvdXJjZTogYGRvY3MvY29yZGlzLWFwaS8ke2ZpbGV9YCxcbiAgICByb3V0ZTogYHJlZmVyZW5jZS9jb3JkaXMtYXBpLyR7ZmlsZX1gLFxuICAgIGNvbnRlbnRMb2NhbGU6ICdlbi1VUycsXG4gICAgbGFiZWw6IHsgcm9vdDogcm9vdExhYmVsLCBlbjogZW5MYWJlbCB9LFxuICAgIHNpZGViYXI6IHsgcm9vdDogJ3poLXJlZmVyZW5jZScsIGVuOiAnZW4tcmVmZXJlbmNlJyB9LFxuICAgIHNlY3Rpb246IHsgcm9vdDogJ0NvcmRpcyBBUEknLCBlbjogJ0NvcmRpcyBDb3JlIEFQSScgfSxcbiAgICBvcmRlcjogb3JkZXIgKyA1LFxuICB9KSkpLFxuICAuLi5wYWlyZWRQYWdlcygoW1xuICAgIFsnYWRkaW5nLWEtcGFja2FnZS5tZCcsICdcdTY1QjBcdTU4OUUgUGFja2FnZScsICdBZGRpbmcgYSBwYWNrYWdlJ10sXG4gICAgWydhZGRpbmctYS10b29sLm1kJywgJ1x1NjVCMFx1NTg5RSBUb29sJywgJ0FkZGluZyBhIHRvb2wnXSxcbiAgICBbJ2FkZGluZy1hbi1sbG0tYWRhcHRlci5tZCcsICdcdTY1QjBcdTU4OUUgTExNIEFkYXB0ZXInLCAnQWRkaW5nIGFuIExMTSBhZGFwdGVyJ10sXG4gICAgWydhZGRpbmctYS1zZXR0aW5ncy1jYXJkLm1kJywgJ1x1NjVCMFx1NTg5RVx1OEJCRVx1N0Y2RVx1NTM2MVx1NzI0NycsICdBZGRpbmcgYSBzZXR0aW5ncyBjYXJkJ10sXG4gICAgWydleHRlbnNpb24tY29va2Jvb2subWQnLCAnXHU2MjY5XHU1QzU1XHU2QTIxXHU1RjBGJywgJ0V4dGVuc2lvbiBwYXR0ZXJucyddLFxuICBdIGFzIGNvbnN0KS5tYXAoKFtmaWxlLCByb290TGFiZWwsIGVuTGFiZWxdLCBvcmRlcik6IFBhaXJlZFBhZ2UgPT4gKHtcbiAgICBzb3VyY2U6IGBkb2NzL2Nvb2tib29rLyR7ZmlsZX1gLFxuICAgIHJvdXRlOiBgcmVmZXJlbmNlL2Nvb2tib29rLyR7ZmlsZX1gLFxuICAgIGxhYmVsOiB7IHJvb3Q6IHJvb3RMYWJlbCwgZW46IGVuTGFiZWwgfSxcbiAgICBzaWRlYmFyOiB7IHJvb3Q6ICd6aC1yZWZlcmVuY2UnLCBlbjogJ2VuLXJlZmVyZW5jZScgfSxcbiAgICBzZWN0aW9uOiB7IHJvb3Q6ICdcdTVGMDBcdTUzRDFcdTYyNEJcdTUxOEMnLCBlbjogJ0Nvb2tib29rJyB9LFxuICAgIG9yZGVyLFxuICB9KSkpLFxuXVxuXG4vKipcbiAqIFNpZGViYXIgY29sbGVjdGlvbnMgb2YgZWFjaCBsb2NhbGUsIGluIHRoZSBvcmRlciB0aGUgc2l0ZSdzIG5hdmlnYXRpb25cbiAqIHByZXNlbnRzIHRoZW0uIFRoZSBuYXZpZ2F0aW9uIGJhciBhbmQgdGhlIGxsbXMudHh0IGluZGV4IGJvdGggcmVhZCB0aGlzXG4gKiBzZXF1ZW5jZSwgc28gYSBuZXcgY29sbGVjdGlvbiBsYW5kcyBpbiBib3RoIHN1cmZhY2VzIHRvZ2V0aGVyLlxuICovXG5leHBvcnQgY29uc3QgbG9jYWxlQ29sbGVjdGlvbnMgPSB7XG4gIHJvb3Q6IFsnemgtZ3VpZGUnLCAnemgtZGV2ZWxvcCcsICd6aC1yZWZlcmVuY2UnXSxcbiAgZW46IFsnZW4tZ3VpZGUnLCAnZW4tZGV2ZWxvcCcsICdlbi1yZWZlcmVuY2UnXSxcbn0gYXMgY29uc3Qgc2F0aXNmaWVzIFJlY29yZDxEb2NzTG9jYWxlLCByZWFkb25seSBEb2NzU2lkZWJhcltdPlxuXG4vKiogQSBzaWRlYmFyIGdyb3VwLCBtYXRjaGVkIHRvIHBhZ2VzIGJ5IGBsYWJlbGAuICovXG5leHBvcnQgaW50ZXJmYWNlIERvY3NTZWN0aW9uIHtcbiAgLyoqIEdyb3VwIGhlYWRpbmcsIGVxdWFsIHRvIHRoZSBgc2VjdGlvbmAgZmllbGQgb2YgZXZlcnkgcGFnZSBpdCBob2xkcy4gKi9cbiAgbGFiZWw6IHN0cmluZ1xuICAvKiogUmVuZGVyIHRoZSBncm91cCBjb2xsYXBzZWQgdW50aWwgaXQgaG9sZHMgdGhlIHBhZ2UgYmVpbmcgcmVhZC4gKi9cbiAgY29sbGFwc2VkPzogYm9vbGVhblxufVxuXG4vKipcbiAqIEV2ZXJ5IHNpZGViYXIgZ3JvdXAsIGluIHRoZSBvcmRlciBpdHMgbG9jYWxlIHJlbmRlcnMgaXQuXG4gKlxuICogVGhlIHN1YnN5c3RlbSBncm91cHMgY29sbGFwc2UgYmVjYXVzZSB0b2dldGhlciB0aGV5IG91dG51bWJlciB0aGUgcmVzdCBvZiB0aGVcbiAqIHJlZmVyZW5jZSBzaWRlYmFyOyBleHBhbmRlZCwgdGhleSBwdXNoIGV2ZXJ5IG90aGVyIGdyb3VwIGJlbG93IHRoZSBmb2xkLlxuICovXG5jb25zdCBzZWN0aW9uczogUmVjb3JkPERvY3NMb2NhbGUsIHJlYWRvbmx5IERvY3NTZWN0aW9uW10+ID0ge1xuICByb290OiBbXG4gICAgeyBsYWJlbDogJ1x1NTE2NVx1OTVFOCcgfSwgeyBsYWJlbDogJ1NESycgfSwgeyBsYWJlbDogJ1x1ODFFQVx1NTJBOFx1NTMxNicgfSwgeyBsYWJlbDogJ1x1OTZDNlx1NjIxMCcgfSxcbiAgICB7IGxhYmVsOiAnXHU1N0ZBXHU3ODQwJyB9LCB7IGxhYmVsOiAnXHU2ODQ2XHU2N0I2XHU4MEZEXHU1MjlCJyB9LCB7IGxhYmVsOiAnXHU1QjlFXHU2MjE4JyB9LCB7IGxhYmVsOiAnQ29yZGlzIFx1Njg0Nlx1NjdCNlx1NjU1OVx1N0EwQicgfSxcbiAgICB7IGxhYmVsOiAnXHU2OTgyXHU1RkY1JyB9LCB7IGxhYmVsOiAnXHU3NTFGXHU2MjEwXHU1M0MyXHU4MDAzJyB9LCB7IGxhYmVsOiAnQ29yZGlzIEFQSScgfSwgeyBsYWJlbDogJ1x1NUYwMFx1NTNEMVx1NjI0Qlx1NTE4QycgfSxcbiAgICB7IGxhYmVsOiAnXHU2MDNCXHU4OUM4JyB9LFxuICAgIHsgbGFiZWw6ICdcdTUxODVcdTY4MzhcdTRFMEVcdTRGNUNcdTc1MjhcdTU3REYnLCBjb2xsYXBzZWQ6IHRydWUgfSxcbiAgICB7IGxhYmVsOiAnXHU0RjFBXHU4QkREXHU0RTBFXHU2MzAxXHU0RTQ1XHU1MzE2JywgY29sbGFwc2VkOiB0cnVlIH0sXG4gICAgeyBsYWJlbDogJ1x1NkEyMVx1NTc4Qlx1NEUwRVx1NEUwQVx1NEUwQlx1NjU4NycsIGNvbGxhcHNlZDogdHJ1ZSB9LFxuICAgIHsgbGFiZWw6ICdcdTYyNjdcdTg4NENcdTRFMEVcdTVERTVcdTUxNzcnLCBjb2xsYXBzZWQ6IHRydWUgfSxcbiAgICB7IGxhYmVsOiAnXHU3QjU2XHU3NTY1XHU0RTBFXHU0RUE0XHU0RTkyJywgY29sbGFwc2VkOiB0cnVlIH0sXG4gICAgeyBsYWJlbDogJ1x1NUU3M1x1NTNGMFx1NEUwRVx1NjNBNVx1NTE2NScsIGNvbGxhcHNlZDogdHJ1ZSB9LFxuICBdLFxuICBlbjogW1xuICAgIHsgbGFiZWw6ICdHdWlkZScgfSwgeyBsYWJlbDogJ1NESycgfSwgeyBsYWJlbDogJ0F1dG9tYXRpb24nIH0sIHsgbGFiZWw6ICdJbnRlZ3JhdGlvbnMnIH0sXG4gICAgeyBsYWJlbDogJ0Jhc2ljcycgfSwgeyBsYWJlbDogJ0ZyYW1ld29yaycgfSwgeyBsYWJlbDogJ1ByYWN0aWNlJyB9LCB7IGxhYmVsOiAnQ29yZGlzIGZyYW1ld29yayB0dXRvcmlhbCcgfSxcbiAgICB7IGxhYmVsOiAnQ29uY2VwdHMnIH0sIHsgbGFiZWw6ICdHZW5lcmF0ZWQgcmVmZXJlbmNlJyB9LCB7IGxhYmVsOiAnQ29yZGlzIENvcmUgQVBJJyB9LCB7IGxhYmVsOiAnQ29va2Jvb2snIH0sXG4gICAgeyBsYWJlbDogJ092ZXJ2aWV3JyB9LFxuICAgIHsgbGFiZWw6ICdDb3JlIGFuZCBzY29wZXMnLCBjb2xsYXBzZWQ6IHRydWUgfSxcbiAgICB7IGxhYmVsOiAnU2Vzc2lvbnMgYW5kIHBlcnNpc3RlbmNlJywgY29sbGFwc2VkOiB0cnVlIH0sXG4gICAgeyBsYWJlbDogJ01vZGVsIGFuZCBjb250ZXh0JywgY29sbGFwc2VkOiB0cnVlIH0sXG4gICAgeyBsYWJlbDogJ0V4ZWN1dGlvbiBhbmQgdG9vbHMnLCBjb2xsYXBzZWQ6IHRydWUgfSxcbiAgICB7IGxhYmVsOiAnUG9saWN5IGFuZCBpbnRlcmFjdGlvbicsIGNvbGxhcHNlZDogdHJ1ZSB9LFxuICAgIHsgbGFiZWw6ICdQbGF0Zm9ybSBhbmQgYWNjZXNzJywgY29sbGFwc2VkOiB0cnVlIH0sXG4gIF0sXG59XG5cbi8qKlxuICogUGxhY2VtZW50IGFuZCBjb2xsYXBzZSBiZWhhdmlvciBvZiBvbmUgc2lkZWJhciBncm91cC5cbiAqXG4gKiBAcGFyYW0gbG9jYWxlIC0gUm91dGUgdHJlZSB3aG9zZSBzaWRlYmFyIGlzIGJlaW5nIGJ1aWx0LlxuICogQHBhcmFtIGxhYmVsIC0gU2VjdGlvbiBsYWJlbCBjYXJyaWVkIGJ5IHRoZSBwYWdlcyBpbiB0aGUgZ3JvdXAuXG4gKiBAcmV0dXJucyBUaGUgZGVjbGFyZWQgZ3JvdXAsIHBsdXMgaXRzIHplcm8tYmFzZWQgcG9zaXRpb24gaW4gdGhlIGxvY2FsZS5cbiAqIEB0aHJvd3MgV2hlbiB0aGUgbG9jYWxlIGRlY2xhcmVzIG5vIHBsYWNlbWVudCBmb3IgdGhlIGxhYmVsLiBSYW5raW5nIGJ5IGxpc3RcbiAqICAgbWVtYmVyc2hpcCBhbG9uZSB3b3VsZCBzb3J0IGFuIHVuZGVjbGFyZWQgZ3JvdXAgc2lsZW50bHkgYWhlYWQgb2YgZXZlcnlcbiAqICAgZGVjbGFyZWQgb25lLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2VjdGlvblNwZWMobG9jYWxlOiBEb2NzTG9jYWxlLCBsYWJlbDogc3RyaW5nKTogRG9jc1NlY3Rpb24gJiB7IGluZGV4OiBudW1iZXIgfSB7XG4gIGNvbnN0IGRlY2xhcmVkID0gc2VjdGlvbnNbbG9jYWxlXVxuICBjb25zdCBzZWN0aW9uID0gZGVjbGFyZWQuZmluZChjYW5kaWRhdGUgPT4gY2FuZGlkYXRlLmxhYmVsID09PSBsYWJlbClcbiAgaWYgKHNlY3Rpb24gPT09IHVuZGVmaW5lZCkgdGhyb3cgbmV3IEVycm9yKGBTaWRlYmFyIHNlY3Rpb24gXCIke2xhYmVsfVwiIGhhcyBubyBwbGFjZW1lbnQgaW4gdGhlICR7bG9jYWxlfSBsb2NhbGUuYClcbiAgcmV0dXJuIHsgLi4uc2VjdGlvbiwgaW5kZXg6IGRlY2xhcmVkLmluZGV4T2Yoc2VjdGlvbikgfVxufVxuXG4vKiogRXZlcnkgY2Fub25pY2FsIHBhZ2UgcHVibGlzaGVkIGJ5IHRoZSBkb2N1bWVudGF0aW9uIHdlYnNpdGUuICovXG5leHBvcnQgY29uc3QgZG9jc1BhZ2VzOiBEb2NzUGFnZVtdID0gW1xuICAuLi5ob21lQW5kR3VpZGUsXG4gIC4uLmRldmVsb3AsXG4gIC4uLmNvcmRpc1R1dG9yaWFsLFxuICAuLi5jb3JkaXNQcmltZXJSZWZlcmVuY2UsXG4gIC4uLnN1YnN5c3RlbXNSZWZlcmVuY2UsXG4gIC4uLnJlZmVyZW5jZSxcbl1cblxuLyoqXG4gKiBQYWdlcyBvZiBvbmUgc2lkZWJhciBjb2xsZWN0aW9uLCBpbiB0aGUgb3JkZXIgdGhlIHNpZGViYXIgbGlzdHMgdGhlbS5cbiAqXG4gKiBAcGFyYW0gbG9jYWxlIC0gUm91dGUgdHJlZSB3aG9zZSBzaWRlYmFyIGlzIGJlaW5nIGJ1aWx0LlxuICogQHBhcmFtIGNvbGxlY3Rpb24gLSBTaWRlYmFyIGNvbGxlY3Rpb24gdG8gcmVhZC5cbiAqIEByZXR1cm5zIFRoZSBjb2xsZWN0aW9uJ3MgcGFnZXMsIG9yZGVyZWQgYnkgc2VjdGlvbiBwbGFjZW1lbnQgdGhlbiBieSBgb3JkZXJgLlxuICovXG5leHBvcnQgZnVuY3Rpb24gb3JkZXJlZFBhZ2VzKGxvY2FsZTogRG9jc0xvY2FsZSwgY29sbGVjdGlvbjogRG9jc1NpZGViYXIpOiBEb2NzUGFnZVtdIHtcbiAgcmV0dXJuIGRvY3NQYWdlc1xuICAgIC5maWx0ZXIocGFnZSA9PiBwYWdlLmxvY2FsZSA9PT0gbG9jYWxlICYmIHBhZ2Uuc2lkZWJhciA9PT0gY29sbGVjdGlvbilcbiAgICAuc29ydCgobGVmdCwgcmlnaHQpID0+IChcbiAgICAgIHNlY3Rpb25TcGVjKGxvY2FsZSwgbGVmdC5zZWN0aW9uKS5pbmRleCAtIHNlY3Rpb25TcGVjKGxvY2FsZSwgcmlnaHQuc2VjdGlvbikuaW5kZXhcbiAgICAgIHx8IGxlZnQub3JkZXIgLSByaWdodC5vcmRlclxuICAgICkpXG59XG5cbi8qKlxuICogU2l0ZS1yZWxhdGl2ZSBsaW5rIGZvciBhIHB1Ymxpc2hlZCByb3V0ZS5cbiAqXG4gKiBAcGFyYW0gcm91dGUgLSBNYW5pZmVzdCByb3V0ZSwgaW5jbHVkaW5nIGl0cyBgLm1kYCBzdWZmaXguXG4gKiBAcmV0dXJucyBUaGUgbGluayBWaXRlUHJlc3Mgc2VydmVzIHRoZSByb3V0ZSBhdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJvdXRlTGluayhyb3V0ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIGAvJHtyb3V0ZS5yZXBsYWNlKC8oPzppbmRleCk/XFwubWQkLywgJycpfWBcbn1cblxuLyoqXG4gKiBXaGVyZSBhIHRvcC1sZXZlbCBuYXZpZ2F0aW9uIGl0ZW0gbGFuZHMuXG4gKlxuICogVGhlIHRhcmdldCBpcyBkZXJpdmVkIHJhdGhlciB0aGFuIHdyaXR0ZW4gZG93bjogYSBjb2xsZWN0aW9uIHdob3NlIGZpcnN0IHBhZ2VcbiAqIGlzIHJlbmFtZWQgb3IgcmVvcmRlcmVkIHdvdWxkIG90aGVyd2lzZSBsZWF2ZSB0aGUgbmF2aWdhdGlvbiBiYXIgcG9pbnRpbmcgYXRcbiAqIGEgcm91dGUgdGhlIG1hbmlmZXN0IG5vIGxvbmdlciBwdWJsaXNoZXMuXG4gKlxuICogQHBhcmFtIGxvY2FsZSAtIFJvdXRlIHRyZWUgdGhlIG5hdmlnYXRpb24gaXRlbSBiZWxvbmdzIHRvLlxuICogQHBhcmFtIGNvbGxlY3Rpb24gLSBTaWRlYmFyIGNvbGxlY3Rpb24gdGhlIGl0ZW0gb3BlbnMuXG4gKiBAcmV0dXJucyBTaXRlLXJlbGF0aXZlIGxpbmsgb2YgdGhlIGNvbGxlY3Rpb24ncyBmaXJzdCBwYWdlLlxuICogQHRocm93cyBXaGVuIHRoZSBjb2xsZWN0aW9uIHB1Ymxpc2hlcyBubyBwYWdlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbGFuZGluZ0xpbmsobG9jYWxlOiBEb2NzTG9jYWxlLCBjb2xsZWN0aW9uOiBEb2NzU2lkZWJhcik6IHN0cmluZyB7XG4gIGNvbnN0IGZpcnN0ID0gb3JkZXJlZFBhZ2VzKGxvY2FsZSwgY29sbGVjdGlvbilbMF1cbiAgaWYgKGZpcnN0ID09PSB1bmRlZmluZWQpIHRocm93IG5ldyBFcnJvcihgU2lkZWJhciBjb2xsZWN0aW9uIFwiJHtjb2xsZWN0aW9ufVwiIHB1Ymxpc2hlcyBubyBwYWdlLmApXG4gIHJldHVybiByb3V0ZUxpbmsoZmlyc3Qucm91dGUpXG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9ob21lL2Nhc3Npb2RhbGxhL0RvY3VtZW50b3MvZ2l0aHViL2RlZXBzZWVrLWhhcm5lc3Mvc2NyaXB0c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvY2Fzc2lvZGFsbGEvRG9jdW1lbnRvcy9naXRodWIvZGVlcHNlZWstaGFybmVzcy9zY3JpcHRzL3Byb2plY3QtZG9jLXNpdGUudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvY2Fzc2lvZGFsbGEvRG9jdW1lbnRvcy9naXRodWIvZGVlcHNlZWstaGFybmVzcy9zY3JpcHRzL3Byb2plY3QtZG9jLXNpdGUudHNcIjsvKipcbiAqIEJ1aWxkLXRpbWUgcHJvamVjdGlvbiBmcm9tIGNhbm9uaWNhbCByZXBvc2l0b3J5IE1hcmtkb3duIGludG8gVml0ZVByZXNzLlxuICpcbiAqIFRoZSBnZW5lcmF0ZWQgdHJlZSBpcyBkaXNwb3NhYmxlOiBzb3VyY2VzIHN0YXkgaW4gdGhlaXIgb3duaW5nIGBkb2NzL2BcbiAqIHRpZXIsIHdoaWxlIHRoaXMgYWRhcHRlciByZXdyaXRlcyBjcm9zcy1zb3VyY2UgbGlua3MgZm9yIHRoZSBwdWJsaWMgc2l0ZS5cbiAqIFRoZSBzYW1lIHByb2plY3Rpb24gYWxzbyBlbWl0cyBhIHJhdy1NYXJrZG93biB0d2luIG9mIGV2ZXJ5IHJvdXRlIGludG8gdGhlXG4gKiBidWlsZCBvdXRwdXQsIHNvIGEgcGFnZSdzIFVSTCwgbWludXMgYW55IHRyYWlsaW5nIHNsYXNoLCBwbHVzIGAubWRgIHNlcnZlc1xuICogaXQgYXMgcGxhaW4gTWFya2Rvd24uXG4gKi9cblxuaW1wb3J0IHtcbiAgY29weUZpbGVTeW5jLCBleGlzdHNTeW5jLCBsc3RhdFN5bmMsIG1rZGlyU3luYywgcmVhZEZpbGVTeW5jLCByZWFscGF0aFN5bmMsIHJtU3luYywgc3RhdFN5bmMsIHdyaXRlRmlsZVN5bmMsXG59IGZyb20gJ25vZGU6ZnMnXG5pbXBvcnQgeyBiYXNlbmFtZSwgZGlybmFtZSwgZXh0bmFtZSwgcG9zaXgsIHJlbGF0aXZlLCByZXNvbHZlLCBzZXAgfSBmcm9tICdub2RlOnBhdGgnXG5pbXBvcnQgeyBmcm9tTWFya2Rvd24gfSBmcm9tICdtZGFzdC11dGlsLWZyb20tbWFya2Rvd24nXG5pbXBvcnQgeyBnZm1Gcm9tTWFya2Rvd24gfSBmcm9tICdtZGFzdC11dGlsLWdmbSdcbmltcG9ydCB7IGdmbSB9IGZyb20gJ21pY3JvbWFyay1leHRlbnNpb24tZ2ZtJ1xuaW1wb3J0IHR5cGUgeyBOb2RlcyB9IGZyb20gJ21kYXN0J1xuaW1wb3J0IHsgZG9jc1BhZ2VzLCBsb2NhbGVDb2xsZWN0aW9ucywgb3JkZXJlZFBhZ2VzLCB0eXBlIERvY3NMb2NhbGUsIHR5cGUgRG9jc1BhZ2UgfSBmcm9tICcuLi93ZWJzaXRlL2RvY3MudHMnXG5pbXBvcnQge1xuICBpc0V4dGVybmFsT3JBYnNvbHV0ZU1hcmtkb3duVXJsLFxuICBtYXJrZG93bkRlc3RpbmF0aW9uLFxuICBzcGxpdE1hcmtkb3duVXJsVGFyZ2V0LFxufSBmcm9tICcuL21hcmtkb3duLnRzJ1xuXG5jb25zdCBSRVBPU0lUT1JZX1VSTCA9ICdodHRwczovL2dpdGh1Yi5jb20vZGVlcHNlZWstYWkvZGVlcHNlZWstaGFybmVzcydcbmNvbnN0IHJvb3QgPSByZXNvbHZlKGltcG9ydC5tZXRhLmRpcm5hbWUsICcuLicpXG5jb25zdCBnZW5lcmF0ZWRSb290ID0gcmVzb2x2ZShyb290LCAnd2Vic2l0ZS8uZ2VuZXJhdGVkJylcblxuLyoqXG4gKiBSZXNvbHZlIHRoZSBwdWJsaWMgcmVwb3NpdG9yeSByZWYgdXNlZCBieSBwcm9qZWN0ZWQgc291cmNlIGxpbmtzLlxuICpcbiAqIEBwYXJhbSBlbnZpcm9ubWVudCBCdWlsZCBlbnZpcm9ubWVudCBjb250YWluaW5nIGFuIG9wdGlvbmFsIGV4cGxpY2l0IHB1YmxpYyByZWYuXG4gKiBAcmV0dXJucyBUaGUgY29uZmlndXJlZCBwdWJsaWMgcmVmLCBvciBgbWFzdGVyYC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlc29sdmVSZXBvc2l0b3J5UmVmKGVudmlyb25tZW50OiBOb2RlSlMuUHJvY2Vzc0Vudik6IHN0cmluZyB7XG4gIHJldHVybiBlbnZpcm9ubWVudC5ET0NTX1JFUE9TSVRPUllfUkVGID8/ICdtYXN0ZXInXG59XG5cbmludGVyZmFjZSBSZXBsYWNlbWVudCB7XG4gIHN0YXJ0OiBudW1iZXJcbiAgZW5kOiBudW1iZXJcbiAgdmFsdWU6IHN0cmluZ1xufVxuXG50eXBlIFJld3JpdGFibGVOb2RlID0gRXh0cmFjdDxOb2RlcywgeyB0eXBlOiAnbGluaycgfCAnaW1hZ2UnIHwgJ2RlZmluaXRpb24nIH0+XG5cbi8qKiBJbnB1dHMgZm9yIHJld3JpdGluZyBvbmUgY2Fub25pY2FsIE1hcmtkb3duIHBhZ2UuICovXG5leHBvcnQgaW50ZXJmYWNlIFJld3JpdGVNYXJrZG93bk9wdGlvbnMge1xuICBsb2NhbGU6IERvY3NMb2NhbGVcbiAgc291cmNlUGF0aDogc3RyaW5nXG4gIHJvdXRlOiBzdHJpbmdcbiAgcGFnZXM6IERvY3NQYWdlW11cbiAgcmVwb1Jvb3Q6IHN0cmluZ1xuICByZXBvc2l0b3J5UmVmOiBzdHJpbmdcbiAgLyoqXG4gICAqIFBsYWNlIG9uZSByZWZlcmVuY2VkIGltYWdlIGJlc2lkZSB0aGUgcHJvamVjdGVkIHBhZ2UgYW5kIHJldHVybiB0aGUgVVJMIHRvXG4gICAqIHJlYWNoIGl0IGZyb20gdGhhdCBwYWdlLiBBIEdpdEh1YiByYXcgVVJMIGNhbm5vdCBzZXJ2ZSB0aGlzIHJlcG9zaXRvcnkgXHUyMDE0XG4gICAqIGByYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tYCBhbnN3ZXJzIDQwNCBmb3IgYSBwcml2YXRlIG9uZSwgYW5kIG5vIHJlYWRlciBvZlxuICAgKiB0aGUgc2l0ZSBpcyBhdXRoZW50aWNhdGVkIHRvIGl0IFx1MjAxNCBzbyBhbiBpbWFnZSB0cmF2ZWxzIGludG8gdGhlIGdlbmVyYXRlZFxuICAgKiB0cmVlIGFuZCBWaXRlIGJ1bmRsZXMgaXQgbGlrZSBhbnkgb3RoZXIgc2l0ZSBhc3NldC4gT21pdHRlZCBieSBjYWxsZXJzIHRoYXRcbiAgICogb25seSByZXdyaXRlIHRleHQsIHdoaWNoIHRoZW4gbGVhdmUgaW1hZ2VzIHBvaW50aW5nIGF0IHRoZSByZXBvc2l0b3J5LlxuICAgKi9cbiAgcGxhY2VJbWFnZT86IChhYnNQYXRoOiBzdHJpbmcpID0+IHN0cmluZ1xufVxuXG5mdW5jdGlvbiByZXBvUGF0aChhYnNQYXRoOiBzdHJpbmcsIHJlcG9Sb290OiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gcmVsYXRpdmUocmVwb1Jvb3QsIGFic1BhdGgpLnNwbGl0KHNlcCkuam9pbignLycpXG59XG5cbi8vIGAjZnJhZ21lbnRgIHN1ZmZpeGVzIHBhc3MgdGhyb3VnaCB2ZXJiYXRpbS4gR2VuZXJhdGVkIGNvcmRpcy1zdXJmYWNlXG4vLyBoZWFkaW5ncyBjYXJyeSBleHBsaWNpdCBgPGEgaWQ+YCBhbmNob3JzIHdpdGggdGhlIEdpdEh1YiBzbHVnLCBzbyB0aG9zZVxuLy8gZnJhZ21lbnRzIHJlc29sdmUgb24gdGhlIHB1Ymxpc2hlZCBzaXRlIHRvbzsgaGFuZC13cml0dGVuIGhlYWRpbmdzIHJlbHkgb25cbi8vIFZpdGVQcmVzcydzIG93biBzbHVnZ2VyLCB3aGljaCBkaWZmZXJzIGZyb20gR2l0SHViJ3MgZm9yIHB1bmN0dWF0aW9uLWhlYXZ5XG4vLyB0ZXh0IFx1MjAxNCBoYW5kLWF1dGhvcmVkIGNyb3NzLXBhZ2UgZnJhZ21lbnRzIHNob3VsZCBwcmVmZXIgcGxhaW4tdGV4dCBoZWFkaW5nc1xuLy8gb3IgZXhwbGljaXQgYW5jaG9ycy5cbmZ1bmN0aW9uIGRlY29kZVBhdGgocGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHBhdGgpXG4gIH0gY2F0Y2gge1xuICAgIHRocm93IG5ldyBFcnJvcihgcHJvamVjdC1kb2Mtc2l0ZTogbWFsZm9ybWVkIHBlcmNlbnQgZXNjYXBlIGluICR7SlNPTi5zdHJpbmdpZnkocGF0aCl9LmApXG4gIH1cbn1cblxuZnVuY3Rpb24gcm91dGVUYXJnZXQoZnJvbVJvdXRlOiBzdHJpbmcsIHRvUm91dGU6IHN0cmluZywgc3VmZml4OiBzdHJpbmcpOiBzdHJpbmcge1xuICBjb25zdCB0YXJnZXQgPSBwb3NpeC5yZWxhdGl2ZShwb3NpeC5kaXJuYW1lKGZyb21Sb3V0ZSksIHRvUm91dGUpXG4gIHJldHVybiBgJHt0YXJnZXQuc3RhcnRzV2l0aCgnLicpID8gdGFyZ2V0IDogYC4vJHt0YXJnZXR9YH0ke3N1ZmZpeH1gXG59XG5cbmZ1bmN0aW9uIHNvdXJjZU1hcChwYWdlczogRG9jc1BhZ2VbXSk6IE1hcDxzdHJpbmcsIE1hcDxEb2NzTG9jYWxlLCBEb2NzUGFnZT4+IHtcbiAgY29uc3QgbWFwID0gbmV3IE1hcDxzdHJpbmcsIE1hcDxEb2NzTG9jYWxlLCBEb2NzUGFnZT4+KClcbiAgZm9yIChjb25zdCBwYWdlIG9mIHBhZ2VzKSB7XG4gICAgZm9yIChjb25zdCBzb3VyY2Ugb2YgW3BhZ2Uuc291cmNlLCAuLi4ocGFnZS5zb3VyY2VBbGlhc2VzID8/IFtdKV0pIHtcbiAgICAgIGNvbnN0IGxvY2FsaXplZCA9IG1hcC5nZXQoc291cmNlKSA/PyBuZXcgTWFwPERvY3NMb2NhbGUsIERvY3NQYWdlPigpXG4gICAgICBpZiAobG9jYWxpemVkLmhhcyhwYWdlLmxvY2FsZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBwcm9qZWN0LWRvYy1zaXRlOiBkdXBsaWNhdGUgc291cmNlIG9yIGFsaWFzICR7SlNPTi5zdHJpbmdpZnkoc291cmNlKX0gZm9yIGxvY2FsZSAke0pTT04uc3RyaW5naWZ5KHBhZ2UubG9jYWxlKX0uYClcbiAgICAgIH1cbiAgICAgIGxvY2FsaXplZC5zZXQocGFnZS5sb2NhbGUsIHBhZ2UpXG4gICAgICBtYXAuc2V0KHNvdXJjZSwgbG9jYWxpemVkKVxuICAgIH1cbiAgfVxuICByZXR1cm4gbWFwXG59XG5cbmZ1bmN0aW9uIGNvdW50ZXJwYXJ0U291cmNlKHNvdXJjZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHNvdXJjZS5lbmRzV2l0aCgnLnpoLm1kJylcbiAgICA/IHNvdXJjZS5yZXBsYWNlKC9cXC56aFxcLm1kJC8sICcubWQnKVxuICAgIDogc291cmNlLnJlcGxhY2UoL1xcLm1kJC8sICcuemgubWQnKVxufVxuXG5mdW5jdGlvbiByZXNvbHZlUmVwb3NpdG9yeVRhcmdldChzb3VyY2VBYnM6IHN0cmluZywgcmF3UGF0aDogc3RyaW5nLCByZXBvUm9vdDogc3RyaW5nKTogeyBhYnNQYXRoOiBzdHJpbmc7IGxpbmU/OiBudW1iZXIgfSB7XG4gIGNvbnN0IGRlY29kZWQgPSBkZWNvZGVQYXRoKHJhd1BhdGgpXG4gIGxldCBhYnNQYXRoID0gcmVzb2x2ZShkaXJuYW1lKHNvdXJjZUFicyksIGRlY29kZWQpXG4gIGlmIChleGlzdHNTeW5jKGFic1BhdGgpKSByZXR1cm4geyBhYnNQYXRoIH1cblxuICBjb25zdCBsaW5lTWF0Y2ggPSBkZWNvZGVkLm1hdGNoKC86KFxcZCspJC8pXG4gIGlmIChsaW5lTWF0Y2ggIT09IG51bGwpIHtcbiAgICBjb25zdCBsaW5lVGV4dCA9IGxpbmVNYXRjaFsxXVxuICAgIGlmIChsaW5lVGV4dCA9PT0gdW5kZWZpbmVkKSB0aHJvdyBuZXcgRXJyb3IoJ3Byb2plY3QtZG9jLXNpdGU6IGxpbmUgc3VmZml4IG1hdGNoZWQgd2l0aG91dCBhIGxpbmUgbnVtYmVyLicpXG4gICAgYWJzUGF0aCA9IHJlc29sdmUoZGlybmFtZShzb3VyY2VBYnMpLCBkZWNvZGVkLnNsaWNlKDAsIC1saW5lTWF0Y2hbMF0ubGVuZ3RoKSlcbiAgICBpZiAoZXhpc3RzU3luYyhhYnNQYXRoKSkgcmV0dXJuIHsgYWJzUGF0aCwgbGluZTogTnVtYmVyLnBhcnNlSW50KGxpbmVUZXh0LCAxMCkgfVxuICB9XG5cbiAgaWYgKGV4dG5hbWUoZGVjb2RlZCkgPT09ICcnKSB7XG4gICAgY29uc3QgbWFya2Rvd24gPSByZXNvbHZlKGRpcm5hbWUoc291cmNlQWJzKSwgYCR7ZGVjb2RlZH0ubWRgKVxuICAgIGlmIChleGlzdHNTeW5jKG1hcmtkb3duKSkgcmV0dXJuIHsgYWJzUGF0aDogbWFya2Rvd24gfVxuICAgIGNvbnN0IGluZGV4ID0gcmVzb2x2ZShkaXJuYW1lKHNvdXJjZUFicyksIGRlY29kZWQsICdpbmRleC5tZCcpXG4gICAgaWYgKGV4aXN0c1N5bmMoaW5kZXgpKSByZXR1cm4geyBhYnNQYXRoOiBpbmRleCB9XG4gIH1cblxuICB0aHJvdyBuZXcgRXJyb3IoYHByb2plY3QtZG9jLXNpdGU6ICR7cmVwb1BhdGgoc291cmNlQWJzLCByZXBvUm9vdCl9IGxpbmtzIHRvIG1pc3NpbmcgcGF0aCAke0pTT04uc3RyaW5naWZ5KHJhd1BhdGgpfS5gKVxufVxuXG5mdW5jdGlvbiBnaXRodWJUYXJnZXQoXG4gIGFic1BhdGg6IHN0cmluZyxcbiAgbGluZTogbnVtYmVyIHwgdW5kZWZpbmVkLFxuICBzdWZmaXg6IHN0cmluZyxcbiAgcmVwb3NpdG9yeVJlZjogc3RyaW5nLFxuICByZXBvUm9vdDogc3RyaW5nLFxuICBpbWFnZTogYm9vbGVhbixcbik6IHN0cmluZyB7XG4gIGNvbnN0IHBhdGggPSByZXBvUGF0aChhYnNQYXRoLCByZXBvUm9vdClcbiAgaWYgKGltYWdlKSByZXR1cm4gYGh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9kZWVwc2Vlay1haS9kZWVwc2Vlay1oYXJuZXNzLyR7cmVwb3NpdG9yeVJlZn0vJHtwYXRofSR7c3VmZml4fWBcbiAgY29uc3Qga2luZCA9IGxzdGF0U3luYyhhYnNQYXRoKS5pc0RpcmVjdG9yeSgpID8gJ3RyZWUnIDogJ2Jsb2InXG4gIGNvbnN0IGxpbmVTdWZmaXggPSBsaW5lID09PSB1bmRlZmluZWQgPyBzdWZmaXggOiBgI0wke2xpbmV9YFxuICByZXR1cm4gYCR7UkVQT1NJVE9SWV9VUkx9LyR7a2luZH0vJHtyZXBvc2l0b3J5UmVmfS8ke3BhdGh9JHtsaW5lU3VmZml4fWBcbn1cblxuLyoqXG4gKiBSZXdyaXRlIHJlcG9zaXRvcnktcmVsYXRpdmUgbGlua3Mgd2l0aG91dCByZXNlcmlhbGl6aW5nIE1hcmtkb3duLlxuICpcbiAqIEBwYXJhbSBzb3VyY2UgTWFya2Rvd24gdGV4dCBmcm9tIHRoZSBjYW5vbmljYWwgZmlsZS5cbiAqIEBwYXJhbSBvcHRpb25zIFNvdXJjZSwgcm91dGUsIG1hbmlmZXN0LCBhbmQgcmVwb3NpdG9yeSBjb250ZXh0LlxuICogQHJldHVybnMgTWFya2Rvd24gd2hvc2UgcHVibGlzaGVkIGxpbmtzIHJlc29sdmUgaW5zaWRlIHRoZSBzaXRlIG9yIHRvIEdpdEh1Yi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJld3JpdGVNYXJrZG93bihzb3VyY2U6IHN0cmluZywgb3B0aW9uczogUmV3cml0ZU1hcmtkb3duT3B0aW9ucyk6IHN0cmluZyB7XG4gIGNvbnN0IHNvdXJjZUFicyA9IHJlc29sdmUob3B0aW9ucy5yZXBvUm9vdCwgb3B0aW9ucy5zb3VyY2VQYXRoKVxuICBjb25zdCBwdWJsaXNoZWQgPSBzb3VyY2VNYXAob3B0aW9ucy5wYWdlcylcbiAgY29uc3QgdHJlZSA9IGZyb21NYXJrZG93bihzb3VyY2UsIHsgZXh0ZW5zaW9uczogW2dmbSgpXSwgbWRhc3RFeHRlbnNpb25zOiBbZ2ZtRnJvbU1hcmtkb3duKCldIH0pXG4gIGNvbnN0IHJlcGxhY2VtZW50czogUmVwbGFjZW1lbnRbXSA9IFtdXG5cbiAgY29uc3QgcmV3cml0ZSA9IChub2RlOiBSZXdyaXRhYmxlTm9kZSk6IHZvaWQgPT4ge1xuICAgIGlmIChpc0V4dGVybmFsT3JBYnNvbHV0ZU1hcmtkb3duVXJsKG5vZGUudXJsKSkgcmV0dXJuXG4gICAgY29uc3QgeyBwYXRoLCBzdWZmaXggfSA9IHNwbGl0TWFya2Rvd25VcmxUYXJnZXQobm9kZS51cmwpXG4gICAgaWYgKHBhdGggPT09ICcnKSByZXR1cm5cbiAgICBjb25zdCB7IGFic1BhdGgsIGxpbmUgfSA9IHJlc29sdmVSZXBvc2l0b3J5VGFyZ2V0KHNvdXJjZUFicywgcGF0aCwgb3B0aW9ucy5yZXBvUm9vdClcbiAgICBjb25zdCB0YXJnZXRQYXRoID0gcmVwb1BhdGgoYWJzUGF0aCwgb3B0aW9ucy5yZXBvUm9vdClcbiAgICBjb25zdCBpc0xhbmd1YWdlU3dpdGNoZXIgPSB0YXJnZXRQYXRoID09PSBjb3VudGVycGFydFNvdXJjZShvcHRpb25zLnNvdXJjZVBhdGgpXG4gICAgY29uc3QgdGFyZ2V0TG9jYWxlOiBEb2NzTG9jYWxlID0gaXNMYW5ndWFnZVN3aXRjaGVyXG4gICAgICA/IG9wdGlvbnMubG9jYWxlID09PSAncm9vdCcgPyAnZW4nIDogJ3Jvb3QnXG4gICAgICA6IG9wdGlvbnMubG9jYWxlXG4gICAgY29uc3QgcGFnZSA9IHB1Ymxpc2hlZC5nZXQodGFyZ2V0UGF0aCk/LmdldCh0YXJnZXRMb2NhbGUpXG4gICAgY29uc3QgbmV4dFVybCA9IHBhZ2UgIT09IHVuZGVmaW5lZFxuICAgICAgPyByb3V0ZVRhcmdldChvcHRpb25zLnJvdXRlLCBwYWdlLnJvdXRlLCBzdWZmaXgpXG4gICAgICA6IG5vZGUudHlwZSA9PT0gJ2ltYWdlJyAmJiBvcHRpb25zLnBsYWNlSW1hZ2UgIT09IHVuZGVmaW5lZFxuICAgICAgICAvLyBUaGUgc3VmZml4IHJpZGVzIGFsb25nIGV4YWN0bHkgYXMgdGhlIEdpdEh1YiBicmFuY2gga2VlcHMgaXQ6IGFuIFNWR1xuICAgICAgICAvLyB2aWV3IGZyYWdtZW50IG9yIGEgVml0ZSBxdWVyeSBjaGFuZ2VzIHdoYXQgdGhlIHJlZmVyZW5jZSBtZWFucy5cbiAgICAgICAgPyBgJHtvcHRpb25zLnBsYWNlSW1hZ2UoYWJzUGF0aCl9JHtzdWZmaXh9YFxuICAgICAgICA6IGdpdGh1YlRhcmdldChhYnNQYXRoLCBsaW5lLCBzdWZmaXgsIG9wdGlvbnMucmVwb3NpdG9yeVJlZiwgb3B0aW9ucy5yZXBvUm9vdCwgbm9kZS50eXBlID09PSAnaW1hZ2UnKVxuXG4gICAgY29uc3QgZGVzdGluYXRpb24gPSBtYXJrZG93bkRlc3RpbmF0aW9uKHNvdXJjZSwgbm9kZSlcbiAgICByZXBsYWNlbWVudHMucHVzaCh7XG4gICAgICBzdGFydDogZGVzdGluYXRpb24uc3RhcnQsXG4gICAgICBlbmQ6IGRlc3RpbmF0aW9uLmVuZCxcbiAgICAgIHZhbHVlOiBuZXh0VXJsLFxuICAgIH0pXG4gIH1cblxuICBjb25zdCB2aXNpdCA9IChub2RlOiBOb2Rlcyk6IHZvaWQgPT4ge1xuICAgIGlmICgobm9kZS50eXBlID09PSAnbGluaycgfHwgbm9kZS50eXBlID09PSAnaW1hZ2UnIHx8IG5vZGUudHlwZSA9PT0gJ2RlZmluaXRpb24nKSAmJiAndXJsJyBpbiBub2RlKSByZXdyaXRlKG5vZGUpXG4gICAgaWYgKCdjaGlsZHJlbicgaW4gbm9kZSkge1xuICAgICAgZm9yIChjb25zdCBjaGlsZCBvZiBub2RlLmNoaWxkcmVuKSB2aXNpdChjaGlsZClcbiAgICB9XG4gIH1cbiAgdmlzaXQodHJlZSlcblxuICBsZXQgcHJvamVjdGVkID0gc291cmNlXG4gIGZvciAoY29uc3QgcmVwbGFjZW1lbnQgb2YgcmVwbGFjZW1lbnRzLnNvcnQoKGEsIGIpID0+IGIuc3RhcnQgLSBhLnN0YXJ0KSkge1xuICAgIHByb2plY3RlZCA9IHByb2plY3RlZC5zbGljZSgwLCByZXBsYWNlbWVudC5zdGFydCkgKyByZXBsYWNlbWVudC52YWx1ZSArIHByb2plY3RlZC5zbGljZShyZXBsYWNlbWVudC5lbmQpXG4gIH1cbiAgcmV0dXJuIHByb2plY3RlZFxufVxuXG4vKipcbiAqIFJlY29yZCBjYW5vbmljYWwgZWRpdCBhbmQgcmF3LU1hcmtkb3duIHRhcmdldHMgaW4gVml0ZVByZXNzIGZyb250bWF0dGVyLlxuICpcbiAqIEBwYXJhbSBtYXJrZG93biBQcm9qZWN0ZWQgTWFya2Rvd24gY29udGVudC5cbiAqIEBwYXJhbSBwYWdlIFB1YmxpY2F0aW9uIG1hbmlmZXN0IGVudHJ5IGZvciB0aGUgY29udGVudC5cbiAqIEByZXR1cm5zIE1hcmtkb3duIHdpdGggcHJvamVjdGlvbi1vd25lZCBmcm9udG1hdHRlciBmaWVsZHMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhZGRQcm9qZWN0aW9uRnJvbnRtYXR0ZXIobWFya2Rvd246IHN0cmluZywgcGFnZTogUGljazxEb2NzUGFnZSwgJ3NvdXJjZScgfCAnb3V0bGluZScgfCAncm91dGUnIHwgJ3NpZGViYXInPik6IHN0cmluZyB7XG4gIGNvbnN0IGZpZWxkcyA9IFtcbiAgICBgZWRpdFNvdXJjZTogJHtKU09OLnN0cmluZ2lmeShwYWdlLnNvdXJjZSl9YCxcbiAgICAuLi4ocGFnZS5zaWRlYmFyID09PSBudWxsID8gW10gOiBbYHJhd01hcmtkb3duUGF0aDogJHtKU09OLnN0cmluZ2lmeShwYWdlLnJvdXRlKX1gXSksXG4gICAgLi4uKHBhZ2Uub3V0bGluZSA9PT0gdW5kZWZpbmVkID8gW10gOiBbYG91dGxpbmU6ICR7SlNPTi5zdHJpbmdpZnkocGFnZS5vdXRsaW5lKX1gXSksXG4gIF0uam9pbignXFxuJylcbiAgaWYgKG1hcmtkb3duLnN0YXJ0c1dpdGgoJy0tLVxcbicpKSByZXR1cm4gbWFya2Rvd24ucmVwbGFjZSgnLS0tXFxuJywgYC0tLVxcbiR7ZmllbGRzfVxcbmApXG4gIHJldHVybiBgLS0tXFxuJHtmaWVsZHN9XFxuLS0tXFxuXFxuJHttYXJrZG93bn1gXG59XG5cbi8qKiBUaGUgc3dpdGNoZXIgbGluZSBhIGNhbm9uaWNhbCBwYWdlIGNhcnJpZXMgc28gaXRzIEdpdEh1YiByZWFkZXIgY2FuIHJlYWNoIHRoZSBvdGhlciBsYW5ndWFnZS4gKi9cbmNvbnN0IExBTkdVQUdFX1NXSVRDSEVSID0gL14oPzpFbmdsaXNoIFxcfCBcXFtcdTRFMkRcdTY1ODdcXF1cXChbXildKlxcKXxcXFtFbmdsaXNoXFxdXFwoW14pXSpcXCkgXFx8IFx1NEUyRFx1NjU4NykkL1xuXG4vKiogVGhlIHJlcG9zaXRvcnkgYmFkZ2UgYSBjYW5vbmljYWwgcGFnZSBjYXJyaWVzIGZvciBpdHMgR2l0SHViIHJlYWRlci4gKi9cbmNvbnN0IFJFUE9TSVRPUllfQkFER0UgPSAvXlxcWyFcXFtbXlxcXV0qXFxdXFwoaHR0cHM6XFwvXFwvaW1nXFwuc2hpZWxkc1xcLmlvXFwvW14pXSpcXClcXF1cXChbXildKlxcKSQvXG5cbi8qKlxuICogRHJvcCB0aGUgbGluZXMgdGhhdCBhZGRyZXNzIGEgY2Fub25pY2FsIHBhZ2UncyBHaXRIdWIgcmVhZGVyLlxuICpcbiAqIFRoZSBzaXRlIGNhcnJpZXMgYSBsb2NhbGUgc3dpdGNoZXIgaW4gaXRzIG5hdmlnYXRpb24gYmFyIGFuZCBsaW5rcyB0aGVcbiAqIHJlcG9zaXRvcnkgZnJvbSBldmVyeSBwYWdlLCBzbyBwcm9qZWN0aW5nIHRoZXNlIGxpbmVzIHdvdWxkIHJlcGVhdCBib3RoIFx1MjAxNCB0aGVcbiAqIHN3aXRjaGVyIGFzIHRoZSBmaXJzdCBlbGVtZW50IHVuZGVyIGVhY2ggaGVhZGluZy5cbiAqXG4gKiBAcGFyYW0gbWFya2Rvd24gUmV3cml0dGVuIGNhbm9uaWNhbCBNYXJrZG93biBjb250ZW50LlxuICogQHJldHVybnMgVGhlIGNvbnRlbnQgd2l0aG91dCB0aGUgc3dpdGNoZXIgbGluZSBvciB0aGUgcmVwb3NpdG9yeSBiYWRnZS5cbiAqL1xuZnVuY3Rpb24gd2l0aG91dFJlcG9zaXRvcnlDaHJvbWUobWFya2Rvd246IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IGxpbmVzID0gbWFya2Rvd24uc3BsaXQoJ1xcbicpXG4gIGNvbnN0IHN3aXRjaGVyID0gbGluZXMuZmluZEluZGV4KGxpbmUgPT4gTEFOR1VBR0VfU1dJVENIRVIudGVzdChsaW5lKSlcbiAgLy8gT25seSB0aGUgc3dpdGNoZXIgaW50cm9kdWNpbmcgdGhlIHBhZ2UgcXVhbGlmaWVzOyBmdXJ0aGVyIGRvd24gdGhlIHNhbWVcbiAgLy8gdGV4dCBpcyBwcm9zZSBvciBhIHNhbXBsZSByYXRoZXIgdGhhbiB0aGUgcGFnZSdzIG93biBoZWFkZXIuXG4gIGlmIChzd2l0Y2hlciAhPT0gLTEgJiYgc3dpdGNoZXIgPCA4KSB7XG4gICAgbGluZXMuc3BsaWNlKHN3aXRjaGVyLCBsaW5lc1tzd2l0Y2hlciArIDFdID09PSAnJyA/IDIgOiAxKVxuICB9XG4gIGNvbnN0IGJhZGdlID0gbGluZXMuZmluZExhc3RJbmRleChsaW5lID0+IFJFUE9TSVRPUllfQkFER0UudGVzdChsaW5lKSlcbiAgaWYgKGJhZGdlICE9PSAtMSkge1xuICAgIGxpbmVzLnNwbGljZShsaW5lc1tiYWRnZSAtIDFdID09PSAnJyA/IGJhZGdlIC0gMSA6IGJhZGdlLCBsaW5lc1tiYWRnZSAtIDFdID09PSAnJyA/IDIgOiAxKVxuICB9XG4gIHJldHVybiBsaW5lcy5qb2luKCdcXG4nKVxufVxuXG4vKipcbiAqIFNlbGVjdCB0aGUgTWFya2Rvd24gcmVuZGVyZWQgZm9yIG9uZSBwdWJsaXNoZWQgcGFnZS5cbiAqXG4gKiBAcGFyYW0gbWFya2Rvd24gUmV3cml0dGVuIGNhbm9uaWNhbCBNYXJrZG93biBjb250ZW50LlxuICogQHBhcmFtIHBhZ2UgUHVibGljYXRpb24gbWFuaWZlc3QgZW50cnkgZm9yIHRoZSBjb250ZW50LlxuICogQHJldHVybnMgRnVsbCBNYXJrZG93biBmb3Igb3JkaW5hcnkgcGFnZXMgb3IgZnJvbnRtYXR0ZXItb25seSBNYXJrZG93biBmb3IgYSBsb2NhbGUgaG9tZSBwYWdlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcHJvamVjdGVkUGFnZUNvbnRlbnQobWFya2Rvd246IHN0cmluZywgcGFnZTogRG9jc1BhZ2UpOiBzdHJpbmcge1xuICBpZiAocGFnZS5zaWRlYmFyICE9PSBudWxsKSByZXR1cm4gd2l0aG91dFJlcG9zaXRvcnlDaHJvbWUobWFya2Rvd24pXG4gIGlmICghbWFya2Rvd24uc3RhcnRzV2l0aCgnLS0tXFxuJykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYHByb2plY3QtZG9jLXNpdGU6IGxvY2FsZSBob21lIHNvdXJjZSAke0pTT04uc3RyaW5naWZ5KHBhZ2Uuc291cmNlKX0gbXVzdCBzdGFydCB3aXRoIFlBTUwgZnJvbnRtYXR0ZXIuYClcbiAgfVxuICBjb25zdCBjbG9zaW5nRGVsaW1pdGVyID0gJ1xcbi0tLVxcbidcbiAgY29uc3QgY2xvc2luZyA9IG1hcmtkb3duLmluZGV4T2YoY2xvc2luZ0RlbGltaXRlciwgNClcbiAgaWYgKGNsb3NpbmcgPT09IC0xKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBwcm9qZWN0LWRvYy1zaXRlOiBsb2NhbGUgaG9tZSBzb3VyY2UgJHtKU09OLnN0cmluZ2lmeShwYWdlLnNvdXJjZSl9IGhhcyB1bmNsb3NlZCBZQU1MIGZyb250bWF0dGVyLmApXG4gIH1cbiAgcmV0dXJuIG1hcmtkb3duLnNsaWNlKDAsIGNsb3NpbmcgKyBjbG9zaW5nRGVsaW1pdGVyLmxlbmd0aClcbn1cblxuLyoqXG4gKiBUaGUgcmVwb3NpdG9yeSBmaWxlIG9uZSBpbWFnZSByZWZlcmVuY2UgcmVzb2x2ZXMgdG8sIG9yIGB1bmRlZmluZWRgIHdoZW4gdGhlXG4gKiB0YXJnZXQgaXMgbm90IGEgbG9jYWwgZmlsZSB0aGlzIGJ1aWxkIG1heSBwdWJsaXNoLlxuICogQHBhcmFtIGFic1BhdGggLSByZXNvbHZlZCBpbWFnZSB0YXJnZXQuXG4gKiBAcGFyYW0gcmVwb1Jvb3QgLSByZXBvc2l0b3J5IHJvb3QgZXZlcnkgcHVibGlzaGVkIGltYWdlIG11c3Qgc3RheSBpbnNpZGUuXG4gKiBAcmV0dXJucyB0aGUgZmlsZSdzIHJlYWwgcGF0aCwgb3IgYHVuZGVmaW5lZGAgd2hlbiBpdCBtdXN0IG5vdCBiZSBjb3BpZWQuXG4gKlxuICogT25seSBhIHJlZ3VsYXIgZmlsZSB3aG9zZSByZWFsIHBhdGggc3RheXMgaW5zaWRlIHRoZSByZXBvc2l0b3J5IHF1YWxpZmllcy5cbiAqIFB1YmxpY2F0aW9uIGNvcGllcyB0aGUgYnl0ZXMgaW50byB0aGUgc2l0ZSwgc28gYSByZWZlcmVuY2UgZXNjYXBpbmcgdGhlXG4gKiByZXBvc2l0b3J5IFx1MjAxNCBgLi4vLi4vLnNzaC9pZF9yc2FgLCBvciBhIHN5bWxpbmsgcG9pbnRpbmcgb3V0IG9mIHRoZSB0cmVlIFx1MjAxNFxuICogd291bGQgcHV0IGEgYnVpbGQtbWFjaGluZSBmaWxlIG9uIHRoZSBzaXRlOyBgZXhpc3RzU3luY2AgYWxvbmUsIHdoaWNoIGlzIGFsbFxuICogbGluayByZXNvbHV0aW9uIG5lZWRzLCBkb2VzIG5vdCBhbnN3ZXIgdGhhdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHB1Ymxpc2hhYmxlSW1hZ2UoYWJzUGF0aDogc3RyaW5nLCByZXBvUm9vdDogc3RyaW5nKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgY29uc3QgcmVhbCA9IHJlYWxwYXRoU3luYyhhYnNQYXRoKVxuICBjb25zdCBpbnNpZGUgPSByZWFsID09PSByZXBvUm9vdCB8fCByZWFsLnN0YXJ0c1dpdGgoYCR7cmVwb1Jvb3R9JHtzZXB9YClcbiAgcmV0dXJuIGluc2lkZSAmJiBzdGF0U3luYyhyZWFsKS5pc0ZpbGUoKSA/IHJlYWwgOiB1bmRlZmluZWRcbn1cblxuLyoqIEV2ZXJ5IGxvY2FsIGltYWdlIGEgcHVibGlzaGVkIHBhZ2UgcmVmZXJlbmNlcywgcmVzb2x2ZWQgdG8gaXRzIHJlcG9zaXRvcnkgZmlsZS4gKi9cbmZ1bmN0aW9uIHJlZmVyZW5jZWRJbWFnZXMoKTogc3RyaW5nW10ge1xuICBjb25zdCBmb3VuZCA9IG5ldyBTZXQ8c3RyaW5nPigpXG4gIGZvciAoY29uc3QgcGFnZSBvZiBkb2NzUGFnZXMpIHtcbiAgICBjb25zdCBzb3VyY2VBYnMgPSByZXNvbHZlKHJvb3QsIHBhZ2Uuc291cmNlKVxuICAgIGlmICghZXhpc3RzU3luYyhzb3VyY2VBYnMpKSBjb250aW51ZVxuICAgIHJld3JpdGVNYXJrZG93bihyZWFkRmlsZVN5bmMoc291cmNlQWJzLCAndXRmOCcpLCB7XG4gICAgICBzb3VyY2VQYXRoOiBwYWdlLnNvdXJjZSxcbiAgICAgIGxvY2FsZTogcGFnZS5sb2NhbGUsXG4gICAgICByb3V0ZTogcGFnZS5yb3V0ZSxcbiAgICAgIHBhZ2VzOiBkb2NzUGFnZXMsXG4gICAgICByZXBvUm9vdDogcm9vdCxcbiAgICAgIHJlcG9zaXRvcnlSZWY6ICdtYXN0ZXInLFxuICAgICAgcGxhY2VJbWFnZTogKGFic1BhdGgpID0+IHtcbiAgICAgICAgY29uc3QgcmVhbCA9IHB1Ymxpc2hhYmxlSW1hZ2UoYWJzUGF0aCwgcm9vdClcbiAgICAgICAgaWYgKHJlYWwgIT09IHVuZGVmaW5lZCkgZm91bmQuYWRkKHJlYWwpXG4gICAgICAgIHJldHVybiAnJ1xuICAgICAgfSxcbiAgICB9KVxuICB9XG4gIHJldHVybiBbLi4uZm91bmRdXG59XG5cbi8qKlxuICogRmlsZXMgd2F0Y2hlZCBieSB0aGUgbG9jYWwgVml0ZVByZXNzIGRldiBzZXJ2ZXI6IGV2ZXJ5IGNhbm9uaWNhbCBNYXJrZG93blxuICogc291cmNlLCBwbHVzIHRoZSBpbWFnZXMgdGhleSBwdWJsaXNoLiBXaXRob3V0IHRoZSBpbWFnZXMsIHJlcGxhY2luZyBhXG4gKiBzY3JlZW5zaG90IGxlYXZlcyB0aGUgcHJldmlvdXMgY29weSBpbiB0aGUgZ2VuZXJhdGVkIHRyZWUgdW50aWwgc29tZXRoaW5nXG4gKiB0b3VjaGVzIHRoZSBNYXJrZG93biBiZXNpZGUgaXQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkb2NzU291cmNlRmlsZXMoKTogc3RyaW5nW10ge1xuICByZXR1cm4gWy4uLm5ldyBTZXQoWy4uLmRvY3NQYWdlcy5tYXAocGFnZSA9PiByZXNvbHZlKHJvb3QsIHBhZ2Uuc291cmNlKSksIC4uLnJlZmVyZW5jZWRJbWFnZXMoKV0pXVxufVxuXG4vKiogTWFuaWZlc3QgYW5kIHJlcG9zaXRvcnkgaW5wdXRzIGZvciBvbmUgcHJvamVjdGlvbiBwYXNzLiAqL1xuZXhwb3J0IGludGVyZmFjZSBQcm9qZWN0aW9uQ29udGV4dCB7XG4gIC8qKiBQYWdlcyB0byBwcm9qZWN0LiAqL1xuICBwYWdlczogRG9jc1BhZ2VbXVxuICAvKiogUmVwb3NpdG9yeSByb290IGV2ZXJ5IHNvdXJjZSBhbmQgcGxhY2VkIGltYWdlIG11c3QgbGl2ZSB1bmRlci4gKi9cbiAgcmVwb1Jvb3Q6IHN0cmluZ1xuICAvKiogUHVibGljIHJlZiB1c2VkIGJ5IHByb2plY3RlZCBHaXRIdWIgbGlua3MuICovXG4gIHJlcG9zaXRvcnlSZWY6IHN0cmluZ1xufVxuXG5mdW5jdGlvbiBkZWZhdWx0UHJvamVjdGlvbkNvbnRleHQoKTogUHJvamVjdGlvbkNvbnRleHQge1xuICByZXR1cm4geyBwYWdlczogZG9jc1BhZ2VzLCByZXBvUm9vdDogcm9vdCwgcmVwb3NpdG9yeVJlZjogcmVzb2x2ZVJlcG9zaXRvcnlSZWYocHJvY2Vzcy5lbnYpIH1cbn1cblxuLyoqXG4gKiBQcm9qZWN0IGV2ZXJ5IHBhZ2UgYW5kIGl0cyBpbWFnZXMgaW50byBvbmUgdGFyZ2V0IHRyZWUuXG4gKlxuICogYGVudHJpZXNgIGFyZSB3aGF0IGdldHMgZW1pdHRlZDsgbGluayByZXNvbHV0aW9uIGFsd2F5cyByZWFkcyB0aGUgY2Fub25pY2FsXG4gKiBgY29udGV4dC5wYWdlc2AsIHNvIGFuIGFsaWFzIGVudHJ5IHNoYXJpbmcgYSBzb3VyY2Ugd2l0aCBpdHMgaW5kZXggcm91dGVcbiAqIGVtaXRzIGF0IGl0cyBvd24gcGF0aCB3aGlsZSBsaW5rcyBrZWVwIHRhcmdldGluZyBjYW5vbmljYWwgcm91dGVzLlxuICovXG5mdW5jdGlvbiBwcm9qZWN0UGFnZXNJbnRvKFxuICB0YXJnZXRSb290OiBzdHJpbmcsXG4gIGNvbnRleHQ6IFByb2plY3Rpb25Db250ZXh0LFxuICBwYWdlQ29udGVudDogKG1hcmtkb3duOiBzdHJpbmcsIHBhZ2U6IERvY3NQYWdlKSA9PiBzdHJpbmcsXG4gIGVudHJpZXM6IERvY3NQYWdlW10gPSBjb250ZXh0LnBhZ2VzLFxuKTogdm9pZCB7XG4gIGNvbnN0IHJvdXRlcyA9IG5ldyBTZXQ8c3RyaW5nPigpXG4gIC8qKiBQcm9qZWN0ZWQgcGF0aCB0byB0aGUgcmVwb3NpdG9yeSBmaWxlIHRoYXQgY2xhaW1lZCBpdCwgcGFnZXMgYW5kIGltYWdlcyBhbGlrZS4gKi9cbiAgY29uc3QgY2xhaW1lZCA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KClcblxuICAvKiogUmVzZXJ2ZSBvbmUgcHJvamVjdGVkIHBhdGgsIHJlZnVzaW5nIGEgc2Vjb25kIHNvdXJjZSBmb3IgaXQuICovXG4gIGNvbnN0IGNsYWltID0gKHRhcmdldDogc3RyaW5nLCBzb3VyY2VBYnM6IHN0cmluZyk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IGhvbGRlciA9IGNsYWltZWQuZ2V0KHRhcmdldClcbiAgICBpZiAoaG9sZGVyICE9PSB1bmRlZmluZWQgJiYgaG9sZGVyICE9PSBzb3VyY2VBYnMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYHByb2plY3QtZG9jLXNpdGU6ICR7cmVwb1BhdGgoc291cmNlQWJzLCBjb250ZXh0LnJlcG9Sb290KX0gYW5kICR7cmVwb1BhdGgoaG9sZGVyLCBjb250ZXh0LnJlcG9Sb290KX1gXG4gICAgICAgICsgYCBib3RoIHByb2plY3QgdG8gJHtyZWxhdGl2ZSh0YXJnZXRSb290LCB0YXJnZXQpLnNwbGl0KHNlcCkuam9pbignLycpfS5gLFxuICAgICAgKVxuICAgIH1cbiAgICAvLyBBIGZpbGUgdGhlIHByb2plY3Rpb24gZGlkIG5vdCBjbGFpbSBpcyBhbm90aGVyIHByb2R1Y2VyJ3Mgb3V0cHV0IFx1MjAxNCBpblxuICAgIC8vIHRoZSB0d2luIHBhc3MsIHRoZSBidWlsZCBWaXRlUHJlc3MganVzdCB3cm90ZSwgaW5jbHVkaW5nIGBwdWJsaWMvYFxuICAgIC8vIGNvcGllcy4gT3ZlcndyaXRpbmcgb25lIHdvdWxkIHNpbGVudGx5IGNvcnJ1cHQgdGhlIHNpdGUuXG4gICAgaWYgKGhvbGRlciA9PT0gdW5kZWZpbmVkICYmIGV4aXN0c1N5bmModGFyZ2V0KSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgcHJvamVjdC1kb2Mtc2l0ZTogJHtyZXBvUGF0aChzb3VyY2VBYnMsIGNvbnRleHQucmVwb1Jvb3QpfSB3b3VsZCBvdmVyd3JpdGUgZXhpc3RpbmcgYnVpbGQgZmlsZWBcbiAgICAgICAgKyBgICR7cmVsYXRpdmUodGFyZ2V0Um9vdCwgdGFyZ2V0KS5zcGxpdChzZXApLmpvaW4oJy8nKX0uYCxcbiAgICAgIClcbiAgICB9XG4gICAgY2xhaW1lZC5zZXQodGFyZ2V0LCBzb3VyY2VBYnMpXG4gIH1cblxuICBmb3IgKGNvbnN0IHBhZ2Ugb2YgZW50cmllcykge1xuICAgIGlmIChyb3V0ZXMuaGFzKHBhZ2Uucm91dGUpKSB0aHJvdyBuZXcgRXJyb3IoYHByb2plY3QtZG9jLXNpdGU6IGR1cGxpY2F0ZSByb3V0ZSAke0pTT04uc3RyaW5naWZ5KHBhZ2Uucm91dGUpfS5gKVxuICAgIHJvdXRlcy5hZGQocGFnZS5yb3V0ZSlcbiAgICBjb25zdCBzb3VyY2VBYnMgPSByZXNvbHZlKGNvbnRleHQucmVwb1Jvb3QsIHBhZ2Uuc291cmNlKVxuICAgIGlmICghZXhpc3RzU3luYyhzb3VyY2VBYnMpIHx8ICFsc3RhdFN5bmMoc291cmNlQWJzKS5pc0ZpbGUoKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBwcm9qZWN0LWRvYy1zaXRlOiBzb3VyY2UgJHtKU09OLnN0cmluZ2lmeShwYWdlLnNvdXJjZSl9IGRvZXMgbm90IGV4aXN0IG9yIGlzIG5vdCBhIGZpbGUuYClcbiAgICB9XG4gICAgY29uc3Qgb3V0cHV0ID0gcmVzb2x2ZSh0YXJnZXRSb290LCBwYWdlLnJvdXRlKVxuICAgIC8vIENsYWltZWQgYmVmb3JlIHRoZSBpbWFnZXMgYXJlIHBsYWNlZDogYSBwYWdlIGFuZCBhbiBpbWFnZSBsYW5kaW5nIG9uIG9uZVxuICAgIC8vIHBhdGggd291bGQgb3RoZXJ3aXNlIG92ZXJ3cml0ZSBlYWNoIG90aGVyIGluIHdoaWNoZXZlciBvcmRlciB0aGV5IHJhbi5cbiAgICBjbGFpbShvdXRwdXQsIHNvdXJjZUFicylcbiAgICBta2RpclN5bmMoZGlybmFtZShvdXRwdXQpLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KVxuICAgIGNvbnN0IG1hcmtkb3duID0gcmVhZEZpbGVTeW5jKHNvdXJjZUFicywgJ3V0ZjgnKVxuICAgIGNvbnN0IHByb2plY3RlZCA9IHJld3JpdGVNYXJrZG93bihtYXJrZG93biwge1xuICAgICAgc291cmNlUGF0aDogcGFnZS5zb3VyY2UsXG4gICAgICBsb2NhbGU6IHBhZ2UubG9jYWxlLFxuICAgICAgcm91dGU6IHBhZ2Uucm91dGUsXG4gICAgICBwYWdlczogY29udGV4dC5wYWdlcyxcbiAgICAgIHJlcG9Sb290OiBjb250ZXh0LnJlcG9Sb290LFxuICAgICAgcmVwb3NpdG9yeVJlZjogY29udGV4dC5yZXBvc2l0b3J5UmVmLFxuICAgICAgcGxhY2VJbWFnZTogKGFic1BhdGgpID0+IHtcbiAgICAgICAgY29uc3QgcmVhbCA9IHB1Ymxpc2hhYmxlSW1hZ2UoYWJzUGF0aCwgY29udGV4dC5yZXBvUm9vdClcbiAgICAgICAgaWYgKHJlYWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgIGBwcm9qZWN0LWRvYy1zaXRlOiAke3BhZ2Uuc291cmNlfSByZWZlcmVuY2VzIGltYWdlICR7cmVwb1BhdGgoYWJzUGF0aCwgY29udGV4dC5yZXBvUm9vdCl9LGBcbiAgICAgICAgICAgICsgJyB3aGljaCBpcyBub3QgYSByZWd1bGFyIGZpbGUgaW5zaWRlIHRoZSByZXBvc2l0b3J5LicsXG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICAgIC8vIEJlc2lkZSB0aGUgcGFnZSB0aGF0IHJlZmVyZW5jZXMgaXQsIHVuZGVyIGl0cyBvd24gYmFzZW5hbWU6IGVhY2hcbiAgICAgICAgLy8gbG9jYWxlJ3Mgcm91dGUgdHJlZSBnZXRzIGl0cyBvd24gY29weSwgc28gb25lIHJlbGF0aXZlIFVSTCBpcyBjb3JyZWN0XG4gICAgICAgIC8vIGZyb20gYm90aC5cbiAgICAgICAgY29uc3QgbmFtZSA9IGJhc2VuYW1lKHJlYWwpXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHJlc29sdmUoZGlybmFtZShvdXRwdXQpLCBuYW1lKVxuICAgICAgICBjbGFpbSh0YXJnZXQsIHJlYWwpXG4gICAgICAgIGNvcHlGaWxlU3luYyhyZWFsLCB0YXJnZXQpXG4gICAgICAgIC8vIEVuY29kZWQgYmVjYXVzZSB0aGUgZGVzdGluYXRpb24gaXMgYSBNYXJrZG93biBpbmxpbmUgdGFyZ2V0LCB3aGVyZSBhblxuICAgICAgICAvLyB1bmVzY2FwZWQgc3BhY2Ugd291bGQgZW5kIGl0IGVhcmx5LlxuICAgICAgICByZXR1cm4gYC4vJHtlbmNvZGVVUkkobmFtZSl9YFxuICAgICAgfSxcbiAgICB9KVxuICAgIHdyaXRlRmlsZVN5bmMob3V0cHV0LCBwYWdlQ29udGVudChwcm9qZWN0ZWQsIHBhZ2UpKVxuICB9XG59XG5cbi8qKiBSZWJ1aWxkIHRoZSBkaXNwb3NhYmxlIFZpdGVQcmVzcyBzb3VyY2UgdHJlZSBmcm9tIHRoZSBwdWJsaWNhdGlvbiBtYW5pZmVzdC4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcm9qZWN0RG9jcygpOiB2b2lkIHtcbiAgcm1TeW5jKGdlbmVyYXRlZFJvb3QsIHsgcmVjdXJzaXZlOiB0cnVlLCBmb3JjZTogdHJ1ZSB9KVxuICBwcm9qZWN0UGFnZXNJbnRvKGdlbmVyYXRlZFJvb3QsIGRlZmF1bHRQcm9qZWN0aW9uQ29udGV4dCgpLCAobWFya2Rvd24sIHBhZ2UpID0+XG4gICAgYWRkUHJvamVjdGlvbkZyb250bWF0dGVyKHByb2plY3RlZFBhZ2VDb250ZW50KG1hcmtkb3duLCBwYWdlKSwgcGFnZSkpXG59XG5cbi8qKlxuICogU3RyaXAgdGhlIGxlYWRpbmcgWUFNTCBmcm9udG1hdHRlciBvZiBhIHByb2plY3RlZCBwYWdlLlxuICpcbiAqIEBwYXJhbSBtYXJrZG93biBSZXdyaXR0ZW4gY2Fub25pY2FsIE1hcmtkb3duIGNvbnRlbnQuXG4gKiBAcGFyYW0gc291cmNlIFJlcG9zaXRvcnktcmVsYXRpdmUgcGFnZSBzb3VyY2UsIG5hbWVkIGJ5IHRoZSBmYWlsdXJlLlxuICogQHJldHVybnMgVGhlIGNvbnRlbnQgYWZ0ZXIgdGhlIGZyb250bWF0dGVyIGJsb2NrLCBvciB0aGUgaW5wdXQgd2hlbiBub25lIG9wZW5zIGl0LlxuICovXG5mdW5jdGlvbiB3aXRob3V0RnJvbnRtYXR0ZXIobWFya2Rvd246IHN0cmluZywgc291cmNlOiBzdHJpbmcpOiBzdHJpbmcge1xuICBpZiAoIW1hcmtkb3duLnN0YXJ0c1dpdGgoJy0tLVxcbicpKSByZXR1cm4gbWFya2Rvd25cbiAgY29uc3QgY2xvc2luZ0RlbGltaXRlciA9ICdcXG4tLS1cXG4nXG4gIGNvbnN0IGNsb3NpbmcgPSBtYXJrZG93bi5pbmRleE9mKGNsb3NpbmdEZWxpbWl0ZXIsIDQpXG4gIGlmIChjbG9zaW5nID09PSAtMSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgcHJvamVjdC1kb2Mtc2l0ZTogJHtKU09OLnN0cmluZ2lmeShzb3VyY2UpfSBoYXMgdW5jbG9zZWQgWUFNTCBmcm9udG1hdHRlci5gKVxuICB9XG4gIHJldHVybiBtYXJrZG93bi5zbGljZShjbG9zaW5nICsgY2xvc2luZ0RlbGltaXRlci5sZW5ndGgpLnJlcGxhY2UoL15cXG4rLywgJycpXG59XG5cbi8qKlxuICogVGhlIHJhdy1NYXJrZG93biB0d2luIG9mIG9uZSBwdWJsaXNoZWQgcGFnZS5cbiAqXG4gKiBGcm9udG1hdHRlciBpcyBWaXRlUHJlc3MgcmVuZGVyaW5nIGNvbmZpZ3VyYXRpb24gYW5kIGlzIGRyb3BwZWQuIEEgbG9jYWxlXG4gKiBob21lIHBhZ2UgdGhlcmVmb3JlIGtlZXBzIGl0cyBib2R5IGhlcmUsIHdoaWxlIHRoZSByZW5kZXJlZCBzaXRlIHRydW5jYXRlc1xuICogaXQgdG8gdGhlIGZyb250bWF0dGVyIHJlZGlyZWN0LlxuICpcbiAqIEBwYXJhbSBtYXJrZG93biBSZXdyaXR0ZW4gY2Fub25pY2FsIE1hcmtkb3duIGNvbnRlbnQuXG4gKiBAcGFyYW0gc291cmNlIFJlcG9zaXRvcnktcmVsYXRpdmUgcGFnZSBzb3VyY2UsIG5hbWVkIGJ5IGZyb250bWF0dGVyIGZhaWx1cmVzLlxuICogQHJldHVybnMgUGxhaW4gTWFya2Rvd24gd2l0aG91dCBmcm9udG1hdHRlciBvciByZXBvc2l0b3J5IGNocm9tZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJhd01hcmtkb3duUGFnZUNvbnRlbnQobWFya2Rvd246IHN0cmluZywgc291cmNlOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gd2l0aG91dFJlcG9zaXRvcnlDaHJvbWUod2l0aG91dEZyb250bWF0dGVyKG1hcmtkb3duLCBzb3VyY2UpKVxufVxuXG4vKipcbiAqIFBhcmVudC1sZXZlbCBhbGlhcyByb3V0ZSBvZiBhbiBpbmRleCByb3V0ZSwgb3IgYHVuZGVmaW5lZGAgZm9yIG90aGVyIHJvdXRlcy5cbiAqXG4gKiBUaGUgcmVuZGVyZWQgc2l0ZSBzaG93cyBhbiBpbmRleCByb3V0ZSBhcyBhIGRpcmVjdG9yeSBVUkwsIHNvIFwiYXBwZW5kXG4gKiBgLm1kYFwiIG5hdHVyYWxseSBsYW5kcyBvbiBgPGRpcj4ubWRgIG9uY2UgdGhlIHRyYWlsaW5nIHNsYXNoIGlzIGRyb3BwZWQuXG4gKiBUaGUgcm9vdCBgaW5kZXgubWRgIGhhcyBubyBwYXJlbnQgdG8gYWxpYXMgaW50by5cbiAqL1xuZnVuY3Rpb24gaW5kZXhBbGlhc1JvdXRlKHJvdXRlOiBzdHJpbmcpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICBjb25zdCBtYXRjaCA9IC9eKC4rKVxcL2luZGV4XFwubWQkLy5leGVjKHJvdXRlKVxuICByZXR1cm4gbWF0Y2g/LlsxXSA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogYCR7bWF0Y2hbMV19Lm1kYFxufVxuXG4vKipcbiAqIFNpdGUtcmVsYXRpdmUgTWFya2Rvd24gZmlsZXMgdGhlIHJhdy1NYXJrZG93biBwcm9qZWN0aW9uIGVtaXRzOiBldmVyeVxuICogcm91dGUsIHBsdXMgb25lIHBhcmVudC1sZXZlbCBhbGlhcyBwZXIgaW5kZXggcm91dGUuXG4gKlxuICogQHBhcmFtIHBhZ2VzIFBhZ2VzIHRvIHByb2plY3QsIGRlZmF1bHRpbmcgdG8gdGhlIHB1YmxpY2F0aW9uIG1hbmlmZXN0LlxuICogQHJldHVybnMgVGhlIGVtaXR0ZWQgcGF0aHMsIHJvdXRlcyBmaXJzdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJhd01hcmtkb3duRmlsZXMocGFnZXM6IERvY3NQYWdlW10gPSBkb2NzUGFnZXMpOiBzdHJpbmdbXSB7XG4gIGNvbnN0IGFsaWFzZXMgPSBwYWdlcy5tYXAocGFnZSA9PiBpbmRleEFsaWFzUm91dGUocGFnZS5yb3V0ZSkpLmZpbHRlcihhbGlhcyA9PiBhbGlhcyAhPT0gdW5kZWZpbmVkKVxuICByZXR1cm4gWy4uLnBhZ2VzLm1hcChwYWdlID0+IHBhZ2Uucm91dGUpLCAuLi5hbGlhc2VzXVxufVxuXG4vKipcbiAqIEVtaXQgdGhlIHJhdy1NYXJrZG93biB0d2luIG9mIGV2ZXJ5IHB1Ymxpc2hlZCByb3V0ZSBpbnRvIGEgYnVpbHQgc2l0ZSwgc29cbiAqIHN0YXRpYyBob3N0aW5nIHNlcnZlcyB0aGUgcGFnZSdzIFVSTCwgbWludXMgYW55IHRyYWlsaW5nIHNsYXNoLCBwbHVzIGAubWRgXG4gKiBhcyBwbGFpbiBNYXJrZG93bi4gRWFjaCBpbmRleCByb3V0ZSBhbHNvIGVtaXRzIGEgcGFyZW50LWxldmVsIGFsaWFzIHR3aW4sXG4gKiBwcm9qZWN0ZWQgb3ZlciB0aGUgYWxpYXMgcm91dGUgc28gaXRzIHJlbGF0aXZlIGxpbmtzIHN0YXkgY29ycmVjdC5cbiAqIFJlZmVyZW5jZWQgaW1hZ2VzIGFyZSBjb3BpZWQgYmVzaWRlIHRoZSBwYWdlcywga2VlcGluZyB0aGUgc2FtZSByZWxhdGl2ZVxuICogVVJMcyB2YWxpZCBpbiBib3RoIHRyZWVzLiBFeGlzdGluZyBidWlsZCBmaWxlcyBzdGF5IGluIHBsYWNlLCBhbmQgYSBuYW1lXG4gKiBjb2xsaXNpb24gd2l0aCBvbmUgZmFpbHMgdGhlIGVtaXNzaW9uLiBNYXJrZG93biBmaWxlcyBjYXJyeSBhIFVURi04IEJPTSBzb1xuICogYnJvd3NlciBuYXZpZ2F0aW9uIGRlY29kZXMgdGhlbSBldmVuIHdoZW4gc3RhdGljIGhvc3Rpbmcgb21pdHMgYSBjaGFyc2V0LlxuICpcbiAqIEBwYXJhbSBvdXREaXIgQnVpbGQgb3V0cHV0IGRpcmVjdG9yeSB0byBlbWl0IGludG8uXG4gKiBAcGFyYW0gY29udGV4dCBNYW5pZmVzdCBhbmQgcmVwb3NpdG9yeSBpbnB1dHMsIGRlZmF1bHRpbmcgdG8gdGhpcyByZXBvc2l0b3J5LlxuICovXG5leHBvcnQgZnVuY3Rpb24gZW1pdFJhd01hcmtkb3duUGFnZXMob3V0RGlyOiBzdHJpbmcsIGNvbnRleHQ6IFByb2plY3Rpb25Db250ZXh0ID0gZGVmYXVsdFByb2plY3Rpb25Db250ZXh0KCkpOiB2b2lkIHtcbiAgY29uc3QgYWxpYXNlcyA9IGNvbnRleHQucGFnZXMuZmxhdE1hcCgocGFnZSkgPT4ge1xuICAgIGNvbnN0IGFsaWFzID0gaW5kZXhBbGlhc1JvdXRlKHBhZ2Uucm91dGUpXG4gICAgcmV0dXJuIGFsaWFzID09PSB1bmRlZmluZWQgPyBbXSA6IFt7IC4uLnBhZ2UsIHJvdXRlOiBhbGlhcyB9XVxuICB9KVxuICBwcm9qZWN0UGFnZXNJbnRvKFxuICAgIG91dERpcixcbiAgICBjb250ZXh0LFxuICAgIChtYXJrZG93biwgcGFnZSkgPT4gYFxcdUZFRkYke3Jhd01hcmtkb3duUGFnZUNvbnRlbnQobWFya2Rvd24sIHBhZ2Uuc291cmNlKX1gLFxuICAgIFsuLi5jb250ZXh0LnBhZ2VzLCAuLi5hbGlhc2VzXSxcbiAgKVxufVxuXG4vKipcbiAqIFJhdyBNYXJrZG93biBzZXJ2ZWQgZm9yIG9uZSBzaXRlIHJvdXRlLlxuICpcbiAqIERldi1zZXJ2ZXIgY291bnRlcnBhcnQgb2Yge0BsaW5rIGVtaXRSYXdNYXJrZG93blBhZ2VzfTogaW1hZ2VzIGFyZSBub3RcbiAqIGNvcGllZCBiZWNhdXNlIHRoZSBnZW5lcmF0ZWQgdHJlZSBhbHJlYWR5IHNlcnZlcyB0aGVtIGJlc2lkZSB0aGUgcGFnZS5cbiAqXG4gKiBAcGFyYW0gcm91dGUgTWFuaWZlc3Qgcm91dGUsIGluY2x1ZGluZyBpdHMgYC5tZGAgc3VmZml4LlxuICogQHBhcmFtIGNvbnRleHQgTWFuaWZlc3QgYW5kIHJlcG9zaXRvcnkgaW5wdXRzLCBkZWZhdWx0aW5nIHRvIHRoaXMgcmVwb3NpdG9yeS5cbiAqIEByZXR1cm5zIFRoZSBwcm9qZWN0ZWQgcGFnZSwgb3IgYHVuZGVmaW5lZGAgd2hlbiB0aGUgbWFuaWZlc3QgZG9lcyBub3QgcHVibGlzaCB0aGUgcm91dGUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByYXdNYXJrZG93blJvdXRlKHJvdXRlOiBzdHJpbmcsIGNvbnRleHQ6IFByb2plY3Rpb25Db250ZXh0ID0gZGVmYXVsdFByb2plY3Rpb25Db250ZXh0KCkpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICBjb25zdCBwYWdlID0gY29udGV4dC5wYWdlcy5maW5kKGNhbmRpZGF0ZSA9PiBjYW5kaWRhdGUucm91dGUgPT09IHJvdXRlKVxuICBpZiAocGFnZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdW5kZWZpbmVkXG4gIGNvbnN0IG1hcmtkb3duID0gcmVhZEZpbGVTeW5jKHJlc29sdmUoY29udGV4dC5yZXBvUm9vdCwgcGFnZS5zb3VyY2UpLCAndXRmOCcpXG4gIHJldHVybiByYXdNYXJrZG93blBhZ2VDb250ZW50KHJld3JpdGVNYXJrZG93bihtYXJrZG93biwge1xuICAgIHNvdXJjZVBhdGg6IHBhZ2Uuc291cmNlLFxuICAgIGxvY2FsZTogcGFnZS5sb2NhbGUsXG4gICAgcm91dGU6IHBhZ2Uucm91dGUsXG4gICAgcGFnZXM6IGNvbnRleHQucGFnZXMsXG4gICAgcmVwb1Jvb3Q6IGNvbnRleHQucmVwb1Jvb3QsXG4gICAgcmVwb3NpdG9yeVJlZjogY29udGV4dC5yZXBvc2l0b3J5UmVmLFxuICAgIHBsYWNlSW1hZ2U6IGFic1BhdGggPT4gYC4vJHtlbmNvZGVVUkkoYmFzZW5hbWUoYWJzUGF0aCkpfWAsXG4gIH0pLCBwYWdlLnNvdXJjZSlcbn1cblxuLyoqIFNpdGUgaWRlbnRpdHkgd3JpdHRlbiBpbnRvIGxsbXMudHh0LiAqL1xuZXhwb3J0IGludGVyZmFjZSBMbG1zVHh0U2l0ZSB7XG4gIC8qKiBTaXRlIGJhc2UgcGF0aCwgY2FycnlpbmcgdGhlIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHNsYXNoZXMgVml0ZVByZXNzIHJlcXVpcmVzLiAqL1xuICBiYXNlOiBzdHJpbmdcbiAgLyoqIFNpdGUgdGl0bGUuICovXG4gIHRpdGxlOiBzdHJpbmdcbiAgLyoqIFNpdGUgZGVzY3JpcHRpb24uICovXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmdcbn1cblxuLyoqIExvY2FsZSBncm91cHMgbGxtcy50eHQgbGlzdHMsIGluIHRoZSBvcmRlciB0aGUgc2l0ZSdzIG5hdmlnYXRpb24gcHJlc2VudHMgdGhlbS4gKi9cbmNvbnN0IGxsbXNUeHRMb2NhbGVzOiByZWFkb25seSB7IGhlYWRpbmc6IHN0cmluZzsgbG9jYWxlOiBEb2NzTG9jYWxlIH1bXSA9IFtcbiAgeyBoZWFkaW5nOiAnXHU3QjgwXHU0RjUzXHU0RTJEXHU2NTg3JywgbG9jYWxlOiAncm9vdCcgfSxcbiAgeyBoZWFkaW5nOiAnRW5nbGlzaCcsIGxvY2FsZTogJ2VuJyB9LFxuXVxuXG4vKipcbiAqIFRoZSBsbG1zLnR4dCBpbmRleCBvZiBldmVyeSBwdWJsaXNoZWQgcGFnZSdzIHJhdy1NYXJrZG93biB0d2luLlxuICpcbiAqIExpbmtzIGFyZSBzaXRlLWFic29sdXRlIHNvIGFuIGFnZW50IHJlc29sdmVzIHRoZW0gYWdhaW5zdCB0aGUgaG9zdCBpdFxuICogZmV0Y2hlZCBsbG1zLnR4dCBmcm9tOyBsb2NhbGUgaG9tZSBwYWdlcyBzdGF5IG91dCBiZWNhdXNlIHRoaXMgZmlsZSBpcyB0aGVcbiAqIGFnZW50LWZhY2luZyBlbnRyeSBwb2ludCBpdHNlbGYuXG4gKlxuICogQHBhcmFtIHNpdGUgU2l0ZSBpZGVudGl0eSBhbmQgYmFzZSBwYXRoLlxuICogQHJldHVybnMgbGxtcy50eHQgY29udGVudCBsaXN0aW5nIGJvdGggbG9jYWxlIHRyZWVzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbGxtc1R4dChzaXRlOiBMbG1zVHh0U2l0ZSk6IHN0cmluZyB7XG4gIGNvbnN0IGxpbmVzID0gW1xuICAgIGAjICR7c2l0ZS50aXRsZX1gLFxuICAgICcnLFxuICAgIGA+ICR7c2l0ZS5kZXNjcmlwdGlvbn1gLFxuICAgICcnLFxuICAgICdcdTk4NzVcdTk3NjIgVVJMIFx1NTNCQlx1NjM4OVx1NjcyQlx1NUMzRVx1NjU5Q1x1Njc2MFx1NTE4RFx1NTJBMCBgLm1kYCBcdTUzNzNcdTRFM0FcdThCRTVcdTk4NzVcdTUzOUZcdTU5Q0IgTWFya2Rvd24oXHU2ODM5XHU4REVGXHU1Rjg0XHU3NTI4IGAvaW5kZXgubWRgKTtcdTRFMEJcdTY1QjlcdTUyMTdcdTg4NjhcdTY2MkZcdTU0MDRcdTk4NzVcdTdDQkVcdTc4NkVcdTU3MzBcdTU3NDBcdTMwMDJEcm9wIGFueSB0cmFpbGluZyBzbGFzaCBhbmQgYXBwZW5kIGAubWRgIHRvIGEgcGFnZSBVUkwgZm9yIGl0cyByYXcgTWFya2Rvd24gKHRoZSBzaXRlIHJvb3QgaXMgYC9pbmRleC5tZGApOyB0aGUgbGlzdCBiZWxvdyBjYXJyaWVzIHRoZSBleGFjdCBhZGRyZXNzZXMuJyxcbiAgXVxuICBmb3IgKGNvbnN0IHsgaGVhZGluZywgbG9jYWxlIH0gb2YgbGxtc1R4dExvY2FsZXMpIHtcbiAgICBsaW5lcy5wdXNoKCcnLCBgIyMgJHtoZWFkaW5nfWAsICcnKVxuICAgIGZvciAoY29uc3QgY29sbGVjdGlvbiBvZiBsb2NhbGVDb2xsZWN0aW9uc1tsb2NhbGVdKSB7XG4gICAgICBmb3IgKGNvbnN0IHBhZ2Ugb2Ygb3JkZXJlZFBhZ2VzKGxvY2FsZSwgY29sbGVjdGlvbikpIHtcbiAgICAgICAgbGluZXMucHVzaChgLSBbJHtwYWdlLmxhYmVsfV0oJHtzaXRlLmJhc2V9JHtwYWdlLnJvdXRlfSk6ICR7cGFnZS5zZWN0aW9ufWApXG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBgJHtsaW5lcy5qb2luKCdcXG4nKX1cXG5gXG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9ob21lL2Nhc3Npb2RhbGxhL0RvY3VtZW50b3MvZ2l0aHViL2RlZXBzZWVrLWhhcm5lc3Mvc2NyaXB0c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvY2Fzc2lvZGFsbGEvRG9jdW1lbnRvcy9naXRodWIvZGVlcHNlZWstaGFybmVzcy9zY3JpcHRzL21hcmtkb3duLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL2Nhc3Npb2RhbGxhL0RvY3VtZW50b3MvZ2l0aHViL2RlZXBzZWVrLWhhcm5lc3Mvc2NyaXB0cy9tYXJrZG93bi50c1wiOy8qKiBTaGFyZWQgTWFya2Rvd24gcGFyc2luZyBhbmQgZGVwdGgtZmlyc3QgdHJhdmVyc2FsIGZvciBkb2N1bWVudGF0aW9uIGdhdGVzLiAqL1xuXG5pbXBvcnQgeyBmcm9tTWFya2Rvd24gfSBmcm9tICdtZGFzdC11dGlsLWZyb20tbWFya2Rvd24nXG5pbXBvcnQgeyBnZm1Gcm9tTWFya2Rvd24gfSBmcm9tICdtZGFzdC11dGlsLWdmbSdcbmltcG9ydCB7IGdmbSB9IGZyb20gJ21pY3JvbWFyay1leHRlbnNpb24tZ2ZtJ1xuaW1wb3J0IHR5cGUgeyBOb2RlcyB9IGZyb20gJ21kYXN0J1xuXG4vKiogT25lIGF1dGhvcmVkIE1hcmtkb3duIGxpbmUgb3V0c2lkZSBmZW5jZWQgY29kZSBhbmQgcmVuZGVyZWQtYXdheSBIVE1MIGNvbW1lbnRzLiAqL1xuZXhwb3J0IGludGVyZmFjZSBNYXJrZG93blByb3NlTGluZSB7XG4gIC8qKiAxLWJhc2VkIHNvdXJjZSBsaW5lIG51bWJlci4gKi9cbiAgaW5kZXg6IG51bWJlclxuICAvKiogU291cmNlIHRleHQgd2l0aG91dCBub3JtYWxpemF0aW9uLiAqL1xuICByYXc6IHN0cmluZ1xufVxuXG4vKiogT25lIHBhcnNlZCBNYXJrZG93biBoZWFkaW5nLCByZXRhaW5pbmcgaXRzIGF1dGhvcmVkIGZpcnN0IGxpbmUgYW5kIHJlbmRlcmVkIHRleHQuICovXG5leHBvcnQgaW50ZXJmYWNlIE1hcmtkb3duSGVhZGluZ0xpbmUgZXh0ZW5kcyBNYXJrZG93blByb3NlTGluZSB7XG4gIC8qKiBQYXJzZWQgQVRYIG9yIFNldGV4dCBoZWFkaW5nIGRlcHRoLiAqL1xuICBkZXB0aDogMSB8IDIgfCAzIHwgNCB8IDUgfCA2XG4gIC8qKiBSZW5kZXJlZCBoZWFkaW5nIHRleHQsIGV4Y2x1ZGluZyByYXcgSFRNTCBzdWNoIGFzIGNvbW1lbnRzLiAqL1xuICB0ZXh0OiBzdHJpbmdcbn1cblxuLyoqIE9uZSBjb2RlIGJsb2NrIGZyb20gYSBwYXJzZWQgTWFya2Rvd24gc291cmNlLiAqL1xuZXhwb3J0IGludGVyZmFjZSBNYXJrZG93bkZlbmNlIHtcbiAgLyoqIDEtYmFzZWQgc291cmNlIGxpbmUgb2YgdGhlIG9wZW5pbmcgZmVuY2UuICovXG4gIGxpbmU6IG51bWJlclxuICAvKiogSW5mby1zdHJpbmcgbGFuZ3VhZ2UgKGl0cyBmaXJzdCB3b3JkKSwgbnVsbCBvbiBhIGJhcmUgb3IgaW5kZW50ZWQgYmxvY2suICovXG4gIGxhbmc6IHN0cmluZyB8IG51bGxcbiAgLyoqIEZ1bGwgaW5mbyBzdHJpbmcgKGUuZy4gYHRzIGlnbm9yZS1jaGVja2ApLCAnJyBvbiBhIGJhcmUgb3IgaW5kZW50ZWQgYmxvY2suICovXG4gIGluZm86IHN0cmluZ1xuICAvKiogQmxvY2sgYm9keSB3aXRob3V0IHRoZSBmZW5jZSBkZWxpbWl0ZXJzLiAqL1xuICBjb2RlOiBzdHJpbmdcbiAgLyoqXG4gICAqIFdoZXRoZXIgYSBjbG9zaW5nIGZlbmNlIGRlbGltaXRlciB0ZXJtaW5hdGVzIHRoZSBibG9jayBcdTIwMTQgbWRhc3Qgc2lsZW50bHlcbiAgICogY2xvc2VzIGFuIHVudGVybWluYXRlZCBmZW5jZSBhdCBlbmQgb2YgZmlsZS4gRmFsc2Ugb24gaW5kZW50ZWRcbiAgICogKG5vbi1mZW5jZWQpIGJsb2Nrcywgd2hvc2UgZW5kIGxpbmUgaXMgY29kZS5cbiAgICovXG4gIGNsb3NlZDogYm9vbGVhblxufVxuXG4vKiogUGFyc2UgR2l0SHViLWZsYXZvcmVkIE1hcmtkb3duIHdpdGggdGhlIHJlcG9zaXRvcnkncyBzdGFuZGFyZCBleHRlbnNpb25zLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlTWFya2Rvd24oc291cmNlOiBzdHJpbmcpOiBOb2RlcyB7XG4gIHJldHVybiBmcm9tTWFya2Rvd24oc291cmNlLCB7IGV4dGVuc2lvbnM6IFtnZm0oKV0sIG1kYXN0RXh0ZW5zaW9uczogW2dmbUZyb21NYXJrZG93bigpXSB9KVxufVxuXG4vKipcbiAqIFZpc2l0IGEgTWFya2Rvd24gdHJlZSBkZXB0aC1maXJzdDsgcmV0dXJuaW5nIGZhbHNlIHBydW5lcyBhIG5vZGUncyBjaGlsZHJlbi5cbiAqIEBwYXJhbSBub2RlIC0gY3VycmVudCB0cmVlIG5vZGUuXG4gKiBAcGFyYW0gdmlzaXRvciAtIGNhbGxiYWNrIGludm9rZWQgYmVmb3JlIGVhY2ggbm9kZSdzIGNoaWxkcmVuLlxuICovXG5leHBvcnQgZnVuY3Rpb24gdmlzaXRNYXJrZG93bihub2RlOiBOb2RlcywgdmlzaXRvcjogKG5vZGU6IE5vZGVzKSA9PiBib29sZWFuIHwgdm9pZCk6IHZvaWQge1xuICBpZiAodmlzaXRvcihub2RlKSA9PT0gZmFsc2UpIHJldHVyblxuICBpZiAoJ2NoaWxkcmVuJyBpbiBub2RlKSB7XG4gICAgZm9yIChjb25zdCBjaGlsZCBvZiBub2RlLmNoaWxkcmVuKSB2aXNpdE1hcmtkb3duKGNoaWxkLCB2aXNpdG9yKVxuICB9XG59XG5cbi8qKiBNYXJrZG93biBub2RlcyB3aG9zZSBhdXRob3JlZCBkZXN0aW5hdGlvbiBvY2N1cGllcyBhIHJlcGxhY2VhYmxlIHNvdXJjZSByYW5nZS4gKi9cbmV4cG9ydCB0eXBlIE1hcmtkb3duRGVzdGluYXRpb25Ob2RlID0gRXh0cmFjdDxOb2RlcywgeyB0eXBlOiAnbGluaycgfCAnaW1hZ2UnIHwgJ2RlZmluaXRpb24nIH0+XG5cbi8qKiBPbmUgYXV0aG9yZWQgTWFya2Rvd24gZGVzdGluYXRpb24gYW5kIGl0cyBhYnNvbHV0ZSBzb3VyY2Ugb2Zmc2V0cy4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTWFya2Rvd25EZXN0aW5hdGlvbiB7XG4gIHN0YXJ0OiBudW1iZXJcbiAgZW5kOiBudW1iZXJcbiAgdXJsOiBzdHJpbmdcbn1cblxuLyoqIFdoZXRoZXIgYSBNYXJrZG93biBVUkwgaXMgZXh0ZXJuYWwsIHJlcG9zaXRvcnktcm9vdCBhYnNvbHV0ZSwgb3IgcHVyZWx5IGluLXBhZ2UuICovXG5leHBvcnQgZnVuY3Rpb24gaXNFeHRlcm5hbE9yQWJzb2x1dGVNYXJrZG93blVybCh1cmw6IHN0cmluZyk6IGJvb2xlYW4ge1xuICByZXR1cm4gdXJsLnN0YXJ0c1dpdGgoJyMnKVxuICAgIHx8IHVybC5zdGFydHNXaXRoKCcvLycpXG4gICAgfHwgdXJsLnN0YXJ0c1dpdGgoJy8nKVxuICAgIHx8IC9eW2EtekEtWl1bYS16QS1aMC05Ky4tXSo6Ly50ZXN0KHVybClcbn1cblxuLyoqIFNwbGl0IG9uZSBNYXJrZG93biBVUkwgd2l0aG91dCBub3JtYWxpemluZyBpdHMgcXVlcnkgb3IgZnJhZ21lbnQgc3VmZml4LiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNwbGl0TWFya2Rvd25VcmxUYXJnZXQodXJsOiBzdHJpbmcpOiB7IHBhdGg6IHN0cmluZzsgc3VmZml4OiBzdHJpbmcgfSB7XG4gIGNvbnN0IGJvdW5kYXJ5ID0gdXJsLnNlYXJjaCgvWz8jXS8pXG4gIGlmIChib3VuZGFyeSA9PT0gLTEpIHJldHVybiB7IHBhdGg6IHVybCwgc3VmZml4OiAnJyB9XG4gIHJldHVybiB7IHBhdGg6IHVybC5zbGljZSgwLCBib3VuZGFyeSksIHN1ZmZpeDogdXJsLnNsaWNlKGJvdW5kYXJ5KSB9XG59XG5cbmZ1bmN0aW9uIHNraXBXaGl0ZXNwYWNlKHNvdXJjZTogc3RyaW5nLCBzdGFydDogbnVtYmVyKTogbnVtYmVyIHtcbiAgbGV0IGluZGV4ID0gc3RhcnRcbiAgd2hpbGUgKC9cXHMvLnRlc3Qoc291cmNlW2luZGV4XSA/PyAnJykpIGluZGV4ICs9IDFcbiAgcmV0dXJuIGluZGV4XG59XG5cbmZ1bmN0aW9uIGxhYmVsRW5kKHNvdXJjZTogc3RyaW5nKTogbnVtYmVyIHtcbiAgY29uc3QgZmlyc3QgPSBzb3VyY2UuaW5kZXhPZignWycpXG4gIGlmIChmaXJzdCA9PT0gLTEpIHJldHVybiAtMVxuICBsZXQgZGVwdGggPSAwXG4gIGZvciAobGV0IGluZGV4ID0gZmlyc3Q7IGluZGV4IDwgc291cmNlLmxlbmd0aDsgaW5kZXggKz0gMSkge1xuICAgIGNvbnN0IGNoYXIgPSBzb3VyY2VbaW5kZXhdXG4gICAgaWYgKGNoYXIgPT09ICdcXFxcJykgaW5kZXggKz0gMVxuICAgIGVsc2UgaWYgKGNoYXIgPT09ICdbJykgZGVwdGggKz0gMVxuICAgIGVsc2UgaWYgKGNoYXIgPT09ICddJykge1xuICAgICAgZGVwdGggLT0gMVxuICAgICAgaWYgKGRlcHRoID09PSAwKSByZXR1cm4gaW5kZXhcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xXG59XG5cbmZ1bmN0aW9uIGRlc3RpbmF0aW9uUmFuZ2UocmF3Tm9kZTogc3RyaW5nLCB0eXBlOiBNYXJrZG93bkRlc3RpbmF0aW9uTm9kZVsndHlwZSddKTogeyBzdGFydDogbnVtYmVyOyBlbmQ6IG51bWJlciB9IHtcbiAgY29uc3QgZW5kT2ZMYWJlbCA9IGxhYmVsRW5kKHJhd05vZGUpXG4gIGlmIChlbmRPZkxhYmVsID09PSAtMSkgdGhyb3cgbmV3IEVycm9yKGBtYXJrZG93bjogY2Fubm90IGxvY2F0ZSBsYWJlbCBlbmQgaW4gJHtKU09OLnN0cmluZ2lmeShyYXdOb2RlKX1gKVxuICBsZXQgc3RhcnQ6IG51bWJlclxuICBpZiAodHlwZSA9PT0gJ2RlZmluaXRpb24nKSB7XG4gICAgY29uc3QgY29sb24gPSByYXdOb2RlLmluZGV4T2YoJzonLCBlbmRPZkxhYmVsICsgMSlcbiAgICBpZiAoY29sb24gPT09IC0xKSB0aHJvdyBuZXcgRXJyb3IoYG1hcmtkb3duOiBjYW5ub3QgbG9jYXRlIGRlZmluaXRpb24gc2VwYXJhdG9yIGluICR7SlNPTi5zdHJpbmdpZnkocmF3Tm9kZSl9YClcbiAgICBzdGFydCA9IHNraXBXaGl0ZXNwYWNlKHJhd05vZGUsIGNvbG9uICsgMSlcbiAgfSBlbHNlIHtcbiAgICBpZiAocmF3Tm9kZVtlbmRPZkxhYmVsICsgMV0gIT09ICcoJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBtYXJrZG93bjogY2Fubm90IGxvY2F0ZSBpbmxpbmUgZGVzdGluYXRpb24gaW4gJHtKU09OLnN0cmluZ2lmeShyYXdOb2RlKX1gKVxuICAgIH1cbiAgICBzdGFydCA9IHNraXBXaGl0ZXNwYWNlKHJhd05vZGUsIGVuZE9mTGFiZWwgKyAyKVxuICB9XG4gIGlmIChyYXdOb2RlW3N0YXJ0XSA9PT0gJzwnKSB7XG4gICAgZm9yIChsZXQgaW5kZXggPSBzdGFydCArIDE7IGluZGV4IDwgcmF3Tm9kZS5sZW5ndGg7IGluZGV4ICs9IDEpIHtcbiAgICAgIGlmIChyYXdOb2RlW2luZGV4XSA9PT0gJ1xcXFwnKSBpbmRleCArPSAxXG4gICAgICBlbHNlIGlmIChyYXdOb2RlW2luZGV4XSA9PT0gJz4nKSByZXR1cm4geyBzdGFydDogc3RhcnQgKyAxLCBlbmQ6IGluZGV4IH1cbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKGBtYXJrZG93bjogY2Fubm90IGxvY2F0ZSBhbmdsZS1icmFja2V0IGRlc3RpbmF0aW9uIGVuZCBpbiAke0pTT04uc3RyaW5naWZ5KHJhd05vZGUpfWApXG4gIH1cbiAgbGV0IGRlcHRoID0gMFxuICBmb3IgKGxldCBpbmRleCA9IHN0YXJ0OyBpbmRleCA8IHJhd05vZGUubGVuZ3RoOyBpbmRleCArPSAxKSB7XG4gICAgY29uc3QgY2hhciA9IHJhd05vZGVbaW5kZXhdXG4gICAgaWYgKGNoYXIgPT09ICdcXFxcJykgaW5kZXggKz0gMVxuICAgIGVsc2UgaWYgKGNoYXIgPT09ICcoJykgZGVwdGggKz0gMVxuICAgIGVsc2UgaWYgKGNoYXIgPT09ICcpJykge1xuICAgICAgaWYgKGRlcHRoID09PSAwKSByZXR1cm4geyBzdGFydCwgZW5kOiBpbmRleCB9XG4gICAgICBkZXB0aCAtPSAxXG4gICAgfSBlbHNlIGlmICgvXFxzLy50ZXN0KGNoYXIgPz8gJycpICYmIGRlcHRoID09PSAwKSB7XG4gICAgICByZXR1cm4geyBzdGFydCwgZW5kOiBpbmRleCB9XG4gICAgfVxuICB9XG4gIHJldHVybiB7IHN0YXJ0LCBlbmQ6IHJhd05vZGUubGVuZ3RoIH1cbn1cblxuLyoqIExvY2F0ZSBvbmUgcGFyc2VkIGRlc3RpbmF0aW9uIGluIHRoZSBvcmlnaW5hbCBNYXJrZG93biB3aXRob3V0IHJlc2VyaWFsaXppbmcgaXQuICovXG5leHBvcnQgZnVuY3Rpb24gbWFya2Rvd25EZXN0aW5hdGlvbihzb3VyY2U6IHN0cmluZywgbm9kZTogTWFya2Rvd25EZXN0aW5hdGlvbk5vZGUpOiBNYXJrZG93bkRlc3RpbmF0aW9uIHtcbiAgY29uc3Qgc3RhcnQgPSBub2RlLnBvc2l0aW9uPy5zdGFydC5vZmZzZXRcbiAgY29uc3QgZW5kID0gbm9kZS5wb3NpdGlvbj8uZW5kLm9mZnNldFxuICBpZiAoc3RhcnQgPT09IHVuZGVmaW5lZCB8fCBlbmQgPT09IHVuZGVmaW5lZCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgbWFya2Rvd246IGRlc3RpbmF0aW9uICR7SlNPTi5zdHJpbmdpZnkobm9kZS51cmwpfSBoYXMgbm8gc291cmNlIG9mZnNldHNgKVxuICB9XG4gIGNvbnN0IHJhbmdlID0gZGVzdGluYXRpb25SYW5nZShzb3VyY2Uuc2xpY2Uoc3RhcnQsIGVuZCksIG5vZGUudHlwZSlcbiAgY29uc3QgYWJzb2x1dGUgPSB7IHN0YXJ0OiBzdGFydCArIHJhbmdlLnN0YXJ0LCBlbmQ6IHN0YXJ0ICsgcmFuZ2UuZW5kIH1cbiAgcmV0dXJuIHsgLi4uYWJzb2x1dGUsIHVybDogc291cmNlLnNsaWNlKGFic29sdXRlLnN0YXJ0LCBhYnNvbHV0ZS5lbmQpIH1cbn1cblxuLyoqXG4gKiBFeHRyYWN0IGV2ZXJ5IHBhcnNlZCBjb2RlIGJsb2NrIHdpdGggaXRzIGluZm8gc3RyaW5nLCBpbiBkb2N1bWVudCBvcmRlci5cbiAqIEBwYXJhbSBzb3VyY2UgLSBNYXJrZG93biBzb3VyY2UgdG8gc2Nhbi5cbiAqIEByZXR1cm5zIGVhY2ggYmxvY2sncyBvcGVuaW5nIGxpbmUsIGxhbmd1YWdlLCBpbmZvIHN0cmluZywgYW5kIGJvZHkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtYXJrZG93bkZlbmNlcyhzb3VyY2U6IHN0cmluZyk6IE1hcmtkb3duRmVuY2VbXSB7XG4gIGNvbnN0IGxpbmVzID0gc291cmNlLnNwbGl0KCdcXG4nKVxuICBjb25zdCBmZW5jZXM6IE1hcmtkb3duRmVuY2VbXSA9IFtdXG4gIHZpc2l0TWFya2Rvd24ocGFyc2VNYXJrZG93bihzb3VyY2UpLCAobm9kZSkgPT4ge1xuICAgIGlmIChub2RlLnR5cGUgIT09ICdjb2RlJyB8fCBub2RlLnBvc2l0aW9uID09PSB1bmRlZmluZWQpIHJldHVyblxuICAgIGNvbnN0IGxhbmcgPSBub2RlLmxhbmcgPz8gbnVsbFxuICAgIGNvbnN0IG1ldGEgPSBub2RlLm1ldGEgPz8gJydcbiAgICBjb25zdCBpbmZvID0gbGFuZyA9PT0gbnVsbCA/ICcnIDogbWV0YSA9PT0gJycgPyBsYW5nIDogYCR7bGFuZ30gJHttZXRhfWBcbiAgICBjb25zdCBlbmRMaW5lID0gbGluZXNbbm9kZS5wb3NpdGlvbi5lbmQubGluZSAtIDFdID8/ICcnXG4gICAgY29uc3QgY2xvc2VkID0gL14gezAsM30oYHszLH18fnszLH0pXFxzKiQvLnRlc3QoZW5kTGluZSlcbiAgICBmZW5jZXMucHVzaCh7IGxpbmU6IG5vZGUucG9zaXRpb24uc3RhcnQubGluZSwgbGFuZywgaW5mbywgY29kZTogbm9kZS52YWx1ZSwgY2xvc2VkIH0pXG4gIH0pXG4gIHJldHVybiBmZW5jZXNcbn1cblxuLyoqIFRleHQgYSByZWFkZXIgc2VlcyBmcm9tIG9uZSBNYXJrZG93biBub2RlOyByYXcgSFRNTCBpdHNlbGYgY29udHJpYnV0ZXMgbm9uZS4gKi9cbmZ1bmN0aW9uIHJlbmRlcmVkVGV4dChub2RlOiBOb2Rlcyk6IHN0cmluZyB7XG4gIGlmIChub2RlLnR5cGUgPT09ICd0ZXh0JyB8fCBub2RlLnR5cGUgPT09ICdpbmxpbmVDb2RlJykgcmV0dXJuIG5vZGUudmFsdWVcbiAgaWYgKG5vZGUudHlwZSA9PT0gJ2ltYWdlJyB8fCBub2RlLnR5cGUgPT09ICdpbWFnZVJlZmVyZW5jZScpIHJldHVybiBub2RlLmFsdCA/PyAnJ1xuICBpZiAobm9kZS50eXBlID09PSAnYnJlYWsnKSByZXR1cm4gJyAnXG4gIGlmICgnY2hpbGRyZW4nIGluIG5vZGUpIHJldHVybiBub2RlLmNoaWxkcmVuLm1hcChjaGlsZCA9PiByZW5kZXJlZFRleHQoY2hpbGQpKS5qb2luKCcnKVxuICByZXR1cm4gJydcbn1cblxuLyoqIFJldHVybiBldmVyeSBwYXJzZWQgTWFya2Rvd24gaGVhZGluZyB3aXRoIGl0cyByZW5kZXJlZCB0ZXh0IGFuZCBzb3VyY2UgbGluZS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtYXJrZG93bkhlYWRpbmdMaW5lcyhzb3VyY2U6IHN0cmluZyk6IE1hcmtkb3duSGVhZGluZ0xpbmVbXSB7XG4gIGNvbnN0IHJhd0xpbmVzID0gc291cmNlLnNwbGl0KCdcXG4nKVxuICBjb25zdCBoZWFkaW5nczogTWFya2Rvd25IZWFkaW5nTGluZVtdID0gW11cbiAgdmlzaXRNYXJrZG93bihwYXJzZU1hcmtkb3duKHNvdXJjZSksIChub2RlKSA9PiB7XG4gICAgaWYgKG5vZGUudHlwZSAhPT0gJ2hlYWRpbmcnIHx8IG5vZGUucG9zaXRpb24gPT09IHVuZGVmaW5lZCkgcmV0dXJuXG4gICAgaGVhZGluZ3MucHVzaCh7XG4gICAgICBkZXB0aDogbm9kZS5kZXB0aCxcbiAgICAgIGluZGV4OiBub2RlLnBvc2l0aW9uLnN0YXJ0LmxpbmUsXG4gICAgICByYXc6IHJhd0xpbmVzW25vZGUucG9zaXRpb24uc3RhcnQubGluZSAtIDFdID8/ICcnLFxuICAgICAgdGV4dDogcmVuZGVyZWRUZXh0KG5vZGUpLFxuICAgIH0pXG4gIH0pXG4gIHJldHVybiBoZWFkaW5nc1xufVxuXG50eXBlIENvbHVtblJhbmdlID0gcmVhZG9ubHkgW3N0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyXVxudHlwZSBPZmZzZXRSYW5nZSA9IHJlYWRvbmx5IFtzdGFydDogbnVtYmVyLCBlbmQ6IG51bWJlcl1cblxuLyoqIFNvdXJjZS1jb2x1bW4gcmFuZ2VzIG9jY3VwaWVkIGJ5IHBhcnNlZCBIVE1MIGNvbW1lbnRzLCBrZXllZCBieSBzb3VyY2UgbGluZS4gKi9cbmZ1bmN0aW9uIGh0bWxDb21tZW50UmFuZ2VzKHNvdXJjZTogc3RyaW5nLCByYXdMaW5lczogcmVhZG9ubHkgc3RyaW5nW10pOiBNYXA8bnVtYmVyLCBDb2x1bW5SYW5nZVtdPiB7XG4gIGNvbnN0IGNvbW1lbnRzOiBPZmZzZXRSYW5nZVtdID0gW11cbiAgdmlzaXRNYXJrZG93bihwYXJzZU1hcmtkb3duKHNvdXJjZSksIChub2RlKSA9PiB7XG4gICAgaWYgKG5vZGUudHlwZSAhPT0gJ2h0bWwnIHx8IG5vZGUucG9zaXRpb24/LnN0YXJ0Lm9mZnNldCA9PT0gdW5kZWZpbmVkKSByZXR1cm5cbiAgICBsZXQgY3Vyc29yID0gMFxuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICBjb25zdCBzdGFydCA9IG5vZGUudmFsdWUuaW5kZXhPZignPCEtLScsIGN1cnNvcilcbiAgICAgIGlmIChzdGFydCA8IDApIGJyZWFrXG4gICAgICBjb25zdCBjbG9zZSA9IG5vZGUudmFsdWUuaW5kZXhPZignLS0+Jywgc3RhcnQgKyAnPCEtLScubGVuZ3RoKVxuICAgICAgY29uc3QgZW5kID0gY2xvc2UgPCAwID8gbm9kZS52YWx1ZS5sZW5ndGggOiBjbG9zZSArICctLT4nLmxlbmd0aFxuICAgICAgY29tbWVudHMucHVzaChbbm9kZS5wb3NpdGlvbi5zdGFydC5vZmZzZXQgKyBzdGFydCwgbm9kZS5wb3NpdGlvbi5zdGFydC5vZmZzZXQgKyBlbmRdKVxuICAgICAgY3Vyc29yID0gZW5kXG4gICAgfVxuICB9KVxuXG4gIGNvbnN0IHJhbmdlcyA9IG5ldyBNYXA8bnVtYmVyLCBDb2x1bW5SYW5nZVtdPigpXG4gIGxldCBsaW5lT2Zmc2V0ID0gMFxuICByYXdMaW5lcy5mb3JFYWNoKChyYXcsIGluZGV4KSA9PiB7XG4gICAgY29uc3QgbGluZUVuZCA9IGxpbmVPZmZzZXQgKyByYXcubGVuZ3RoXG4gICAgZm9yIChjb25zdCBbc3RhcnQsIGVuZF0gb2YgY29tbWVudHMpIHtcbiAgICAgIGNvbnN0IGZyb20gPSBNYXRoLm1heChzdGFydCwgbGluZU9mZnNldClcbiAgICAgIGNvbnN0IHRvID0gTWF0aC5taW4oZW5kLCBsaW5lRW5kKVxuICAgICAgY29uc3QgY292ZXJzRW1wdHlMaW5lID0gcmF3Lmxlbmd0aCA9PT0gMCAmJiBzdGFydCA8PSBsaW5lT2Zmc2V0ICYmIGVuZCA+IGxpbmVPZmZzZXRcbiAgICAgIGlmIChmcm9tIDwgdG8gfHwgY292ZXJzRW1wdHlMaW5lKSB7XG4gICAgICAgIGNvbnN0IGxpbmVSYW5nZXMgPSByYW5nZXMuZ2V0KGluZGV4ICsgMSkgPz8gW11cbiAgICAgICAgbGluZVJhbmdlcy5wdXNoKFtmcm9tIC0gbGluZU9mZnNldCwgdG8gLSBsaW5lT2Zmc2V0XSlcbiAgICAgICAgcmFuZ2VzLnNldChpbmRleCArIDEsIGxpbmVSYW5nZXMpXG4gICAgICB9XG4gICAgfVxuICAgIGxpbmVPZmZzZXQgPSBsaW5lRW5kICsgMVxuICB9KVxuICByZXR1cm4gcmFuZ2VzXG59XG5cbi8qKiBXaGV0aGVyIGEgc291cmNlIGxpbmUgcmV0YWlucyBub24td2hpdGVzcGFjZSB0ZXh0IGFmdGVyIEhUTUwgY29tbWVudHMgZGlzYXBwZWFyLiAqL1xuZnVuY3Rpb24gaGFzUmVuZGVyZWRUZXh0T3V0c2lkZUNvbW1lbnRzKHJhdzogc3RyaW5nLCByYW5nZXM6IHJlYWRvbmx5IENvbHVtblJhbmdlW10gfCB1bmRlZmluZWQpOiBib29sZWFuIHtcbiAgaWYgKHJhbmdlcyA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdHJ1ZVxuICBsZXQgY3Vyc29yID0gMFxuICBsZXQgdmlzaWJsZSA9ICcnXG4gIGZvciAoY29uc3QgW3N0YXJ0LCBlbmRdIG9mIFsuLi5yYW5nZXNdLnNvcnQoKGxlZnQsIHJpZ2h0KSA9PiBsZWZ0WzBdIC0gcmlnaHRbMF0pKSB7XG4gICAgdmlzaWJsZSArPSByYXcuc2xpY2UoY3Vyc29yLCBzdGFydClcbiAgICBjdXJzb3IgPSBNYXRoLm1heChjdXJzb3IsIGVuZClcbiAgfVxuICB2aXNpYmxlICs9IHJhdy5zbGljZShjdXJzb3IpXG4gIHJldHVybiB2aXNpYmxlLnRyaW0oKS5sZW5ndGggPiAwXG59XG5cbi8qKlxuICogUmV0dXJuIHNvdXJjZSBsaW5lcyBvdXRzaWRlIGNvZGUgYmxvY2tzIGFuZCBIVE1MIGNvbW1lbnRzLlxuICogQHBhcmFtIHNvdXJjZSAtIE1hcmtkb3duIHNvdXJjZSB3aG9zZSBwcm9zZSBzaG91bGQgYmUgcmV0YWluZWQgdmVyYmF0aW0uXG4gKiBAcmV0dXJucyB1bmZlbmNlZCBsaW5lcyB3aXRoIHRoZWlyIG9yaWdpbmFsIDEtYmFzZWQgbG9jYXRpb25zLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbWFya2Rvd25Qcm9zZUxpbmVzKHNvdXJjZTogc3RyaW5nKTogTWFya2Rvd25Qcm9zZUxpbmVbXSB7XG4gIGNvbnN0IHJhd0xpbmVzID0gc291cmNlLnNwbGl0KCdcXG4nKVxuICBjb25zdCBjb21tZW50cyA9IGh0bWxDb21tZW50UmFuZ2VzKHNvdXJjZSwgcmF3TGluZXMpXG4gIGNvbnN0IGZlbmNlZCA9IG5ldyBTZXQ8bnVtYmVyPigpXG4gIHZpc2l0TWFya2Rvd24ocGFyc2VNYXJrZG93bihzb3VyY2UpLCAobm9kZSkgPT4ge1xuICAgIGlmIChub2RlLnR5cGUgIT09ICdjb2RlJyB8fCBub2RlLnBvc2l0aW9uID09PSB1bmRlZmluZWQpIHJldHVyblxuICAgIGZvciAobGV0IGxpbmUgPSBub2RlLnBvc2l0aW9uLnN0YXJ0LmxpbmU7IGxpbmUgPD0gbm9kZS5wb3NpdGlvbi5lbmQubGluZTsgbGluZSArPSAxKSBmZW5jZWQuYWRkKGxpbmUpXG4gIH0pXG4gIGNvbnN0IGtlcHQ6IE1hcmtkb3duUHJvc2VMaW5lW10gPSBbXVxuICByYXdMaW5lcy5mb3JFYWNoKChyYXcsIGkpID0+IHtcbiAgICBpZiAoZmVuY2VkLmhhcyhpICsgMSkpIHJldHVyblxuICAgIGlmIChoYXNSZW5kZXJlZFRleHRPdXRzaWRlQ29tbWVudHMocmF3LCBjb21tZW50cy5nZXQoaSArIDEpKSkge1xuICAgICAga2VwdC5wdXNoKHsgaW5kZXg6IGkgKyAxLCByYXcgfSlcbiAgICB9XG4gIH0pXG4gIHJldHVybiBrZXB0XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9ob21lL2Nhc3Npb2RhbGxhL0RvY3VtZW50b3MvZ2l0aHViL2RlZXBzZWVrLWhhcm5lc3Mvd2Vic2l0ZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvY2Fzc2lvZGFsbGEvRG9jdW1lbnRvcy9naXRodWIvZGVlcHNlZWstaGFybmVzcy93ZWJzaXRlL3Jhdy1tYXJrZG93bi50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9jYXNzaW9kYWxsYS9Eb2N1bWVudG9zL2dpdGh1Yi9kZWVwc2Vlay1oYXJuZXNzL3dlYnNpdGUvcmF3LW1hcmtkb3duLnRzXCI7LyoqIERldmVsb3BtZW50IHJlc3BvbnNlcyBmb3IgcHVibGlzaGVkIE1hcmtkb3duIGFuZCB0aGUgZG9jdW1lbnRhdGlvbiBpbmRleC4gKi9cbmltcG9ydCB0eXBlIHsgQ29ubmVjdCB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgeyByYXdNYXJrZG93blJvdXRlIH0gZnJvbSAnLi4vc2NyaXB0cy9wcm9qZWN0LWRvYy1zaXRlLnRzJ1xuXG4vKipcbiAqIFNlcnZlIHB1Ymxpc2hlZCBzb3VyY2UgdGV4dCB3aGlsZSBwcmVzZXJ2aW5nIFZpdGUncyBNYXJrZG93biBtb2R1bGUgaW1wb3J0cy5cbiAqIEV4cGxpY2l0IGBkc2gtcmF3PTFgIGZldGNoZXMgcmV0dXJuIDQwNCBmb3IgdW5wdWJsaXNoZWQgTWFya2Rvd24gcm91dGVzLlxuICpcbiAqIEBwYXJhbSBiYXNlIFNpdGUgVVJMIHByZWZpeCB3aXRoIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHNsYXNoZXMuXG4gKiBAcGFyYW0gaW5kZXggUmVuZGVyIHRoZSBjdXJyZW50IGxsbXMudHh0IGluZGV4LlxuICogQHJldHVybnMgTWlkZGxld2FyZSBmb3IgdGhlIFZpdGUgZGV2ZWxvcG1lbnQgc2VydmVyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmF3TWFya2Rvd25NaWRkbGV3YXJlKGJhc2U6IHN0cmluZywgaW5kZXg6ICgpID0+IHN0cmluZyk6IENvbm5lY3QuTmV4dEhhbmRsZUZ1bmN0aW9uIHtcbiAgcmV0dXJuIChyZXEsIHJlcywgbmV4dCkgPT4ge1xuICAgIGlmIChyZXEudXJsID09PSB1bmRlZmluZWQgfHwgKHJlcS5tZXRob2QgIT09ICdHRVQnICYmIHJlcS5tZXRob2QgIT09ICdIRUFEJykpIHtcbiAgICAgIG5leHQoKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGxldCB1cmw6IFVSTFxuICAgIHRyeSB7XG4gICAgICB1cmwgPSBuZXcgVVJMKHJlcS51cmwsICdodHRwOi8vZG9jcy5sb2NhbCcpXG4gICAgfSBjYXRjaCAoX2Vycm9yKSB7XG4gICAgICAvLyBNYWxmb3JtZWQgdGFyZ2V0cyBiZWxvbmcgdG8gVml0ZSdzIHJlcXVlc3QgaGFuZGxpbmcsIG5vdCByYXctcm91dGUgbG9va3VwLlxuICAgICAgbmV4dCgpXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgaWYgKCF1cmwucGF0aG5hbWUuc3RhcnRzV2l0aChiYXNlKSkge1xuICAgICAgbmV4dCgpXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY29uc3QgcGF0aCA9IHVybC5wYXRobmFtZS5zbGljZShiYXNlLmxlbmd0aClcbiAgICBjb25zdCBleHBsaWNpdCA9IHBhdGguZW5kc1dpdGgoJy5tZCcpICYmIHVybC5zZWFyY2hQYXJhbXMuZ2V0KCdkc2gtcmF3JykgPT09ICcxJ1xuICAgIGNvbnN0IGRlc3RpbmF0aW9uID0gcmVxLmhlYWRlcnNbJ3NlYy1mZXRjaC1kZXN0J11cbiAgICAvLyBTY3JpcHQgaW1wb3J0cyBhbHdheXMgYmVsb25nIHRvIFZpdGUsIGluY2x1ZGluZyBpbXBvcnRzIGNhcnJ5aW5nIGEgcXVlcnkuXG4gICAgaWYgKGRlc3RpbmF0aW9uICE9PSB1bmRlZmluZWQgJiYgZGVzdGluYXRpb24gIT09ICdkb2N1bWVudCcgJiYgIShkZXN0aW5hdGlvbiA9PT0gJ2VtcHR5JyAmJiBleHBsaWNpdCkpIHtcbiAgICAgIG5leHQoKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGNvbnN0IGNvbnRlbnQgPSBwYXRoID09PSAnbGxtcy50eHQnID8gaW5kZXgoKSA6IHBhdGguZW5kc1dpdGgoJy5tZCcpID8gcmF3TWFya2Rvd25Sb3V0ZShwYXRoKSA6IHVuZGVmaW5lZFxuICAgIGlmIChjb250ZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmICghZXhwbGljaXQpIHtcbiAgICAgICAgbmV4dCgpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgcmVzLnN0YXR1c0NvZGUgPSA0MDRcbiAgICAgIHJlcy5lbmQoKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHJlcy5zZXRIZWFkZXIoJ0NvbnRlbnQtVHlwZScsIGAke3BhdGggPT09ICdsbG1zLnR4dCcgPyAndGV4dC9wbGFpbicgOiAndGV4dC9tYXJrZG93bid9OyBjaGFyc2V0PXV0Zi04YClcbiAgICByZXMuZW5kKHJlcS5tZXRob2QgPT09ICdIRUFEJyA/IHVuZGVmaW5lZCA6IGNvbnRlbnQpXG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFFQSxTQUFTLGdCQUFBQSxlQUFjLGlCQUFBQyxzQkFBcUI7QUFDNUMsU0FBUyxXQUFBQyxnQkFBZTtBQUd4QixTQUFTLG1CQUFtQjs7O0FDR3JCLFNBQVMsc0JBQXNCLEtBQXdDO0FBQzVFLFNBQU8sTUFBTSxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUc7QUFBQTtBQUFBO0FBQUEsQ0FHN0IsQ0FBQyxJQUFJLENBQUM7QUFDUDtBQU9PLFNBQVMsdUJBQXVCLElBQTRCO0FBQ2pFLFFBQU0sU0FBUyxHQUFHLFNBQVMsTUFBTSwyQkFBMkI7QUFDNUQsTUFBSSxXQUFXLE9BQVcsT0FBTSxJQUFJLE1BQU0scUVBQXFFO0FBQy9HLEtBQUcsU0FBUyxNQUFNLDJCQUEyQixJQUFJLElBQUksU0FBUztBQUM1RCxVQUFNLE9BQU8sT0FBTyxHQUFHLElBQUk7QUFDM0Is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QUV2RSxZQUFJLFFBQVEsSUFBSSxhQUFhLGFBQWMsUUFBTyxZQUFZLEdBQUcsSUFBSTtBQUNyRSxjQUFNLE1BQU0sS0FBSyxVQUFVLENBQUMsTUFBTSxTQUFTLE1BQU0sTUFBTSxNQUFNLFFBQVEsTUFBTSxLQUFLLENBQUM7QUFDakYsY0FBTSxTQUFTLGVBQWUsSUFBSSxHQUFHO0FBQ3JDLFlBQUksV0FBVyxPQUFXLFFBQU87QUFDakMsY0FBTSxPQUFPLFlBQVksR0FBRyxJQUFJO0FBQ2hDLHVCQUFlLElBQUksS0FBSyxJQUFJO0FBQzVCLGVBQU87QUFBQSxNQUNUO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVMsQ0FBQztBQUFBLEVBQ1YsYUFBYTtBQUNmLENBQUM7IiwKICAibmFtZXMiOiBbInJlYWRGaWxlU3luYyIsICJ3cml0ZUZpbGVTeW5jIiwgInJlc29sdmUiLCAiZnJvbU1hcmtkb3duIiwgImdmbUZyb21NYXJrZG93biIsICJnZm0iLCAibG9jYWxpemVkIiwgImZyb21NYXJrZG93biIsICJnZm0iLCAiZ2ZtRnJvbU1hcmtkb3duIiwgImJhc2UiLCAiX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUiLCAiZGV2ZWxvcCIsICJyZWZlcmVuY2UiLCAicmVhZEZpbGVTeW5jIiwgInJlc29sdmUiLCAiX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUiLCAid3JpdGVGaWxlU3luYyJdCn0K
