import { Construct } from "constructs";
import { App, Chart, ChartProps, Helm } from "cdk8s";
import { getApplicationConfigurations } from "./apps/index.ts";
import { TraefikRouter } from "./router/index.ts";
import { FluxInstallation } from "./ci/index.ts";

export class Homelab extends Chart {
  constructor(
    scope: Construct,
    id: string,
    props: ChartProps = {},
    apps: any[]
  ) {
    super(scope, id, props);

    new FluxInstallation(this, "flux-repository", {
      name: "homelab-repo",
      url: "oci://ghcr.io/pepsipu/homelab/manifests",
    });
    new TraefikRouter(this, "traefik-router");
  }
}

const app = new App();
const applications = await getApplicationConfigurations("..");

new Homelab(app, "homelab", {}, applications);
app.synth();
