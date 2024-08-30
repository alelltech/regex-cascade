# regex-cascade

Cascade multiple and nested Regex expressions

```console
$ npm i -s @alell/regex-cascade
```

```ts
import { cascadeMatch } from "@alell/regex-cascade";

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

```

*If you like our project help us to make more best solutions.*

> `Bitcoin` / network `BTC`:
>
> `1NvnQAp2e46Fqv4YaoYTioypJZdq4Kc3Az`



> `Etherium` / network `Etherium`:
>
> `0x38a2113604fb3d642bbd009301e94848a499cea4`

> `BitTorrent` / network `Tron`:
>
> `TD9LHa5BjWQpf4oP3uYWP8ghnojJWJy53C`
