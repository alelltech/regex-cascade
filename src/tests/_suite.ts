import * as assert from "assert";
// import { cascadeMatch } from "..";
import { cascadeMatch } from "../../dist/index";

describe("Default Suite", () => {
  after(() => {
    delete process.env.EXT;
  });

  it("cascadeMatch", async () => {
    const str = [
      `    type: git`,
      `    ref: refs/tags/v1`,
      `    endpoint: CorePipelines`,
      `trigger:`,
      `  enabled: false`,
      `parameters:`,
      `- name: environment`,
      `  displayName: Environment`,
      `  type: string`,
      `  default: dev`,
      `  values:`,
      `  - dev`,
      `  - test`,
      `  - prod`,
      `- name: action`,
      `  displayName: Action`,
      `  type: string`,
      `  default: plan`,
      `  values:`,
      `  - plan`,
      `  - apply`,
      `  - destroy`,
      `variables:`,
      `- name: PRIVATE_AGENT_DEFAULT`,
      `  value: DefaultAgent`,
      `- name: PRIVATE_AGENT_SHARED`,
      `- name: environment`,
      `  value: dev`,
      ``,
    ].join("\n");

    const results = cascadeMatch(
      [
        {
          regex: /- {0,}name {0,}: {0,}environment(.|\n )+/im,
          name: "param-environments",
          cascade: [
            { regex: / {1,}- ([^: \n]+)/gim, name: "param-environment" },
          ],
        },
        {
          regex:
            /- {1,}name {0,}: {0,}environment {0,}\n {2,}value: {1,}([^\n]+)/gim,
          name: "var-environments",
        },
      ],
      str
    );

    assert(results, "result must be defined");
    assert(results.length > 0, "result must more than 1 item.");
  });
});
