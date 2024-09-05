import { Construct } from "constructs";
import { App, Chart, ChartProps, Helm } from "cdk8s";
import { getApplicationConfigurations } from "./apps/index.ts";
import { Router } from "./router/index.ts";

export class Homelab extends Chart {
  constructor(
    scope: Construct,
    id: string,
    props: ChartProps = {},
    apps: any[]
  ) {
    super(scope, id, props);

    new Router(scope);

    const label = { app: "hello-k8s" };
  }
}

const app = new App();
const applications = await getApplicationConfigurations("..");

new Homelab(app, "homelab", {}, applications);
app.synth();
