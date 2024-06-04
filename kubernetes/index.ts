import { Construct } from "constructs";
import { App, TerraformStack } from "cdktf";

import { KubernetesProvider } from "@cdktf/provider-kubernetes/lib/provider";
import { HelmProvider } from "@cdktf/provider-helm/lib/provider";
import { Release as HelmRelease } from "@cdktf/provider-helm/lib/release";
import WebService from "./web";

const kubernetesConfig = {
  configPath: "~/.kube/config",
};

class Homelab extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);
    const kubernetes = new KubernetesProvider(
      this,
      "kubernetes",
      kubernetesConfig
    );

    new HelmProvider(this, "helm", {
      kubernetes: kubernetesConfig,
    });

    new HelmRelease(this, "traefik", {
      name: "traefik",
      repository: "https://traefik.github.io/charts",
      chart: "traefik",
      values: [
        JSON.stringify({
          dashboard: {
            enable: true,
            ingressRoute: true,
          },
        }),
      ],
    });

    // new HelmRelease(this, "authelia", {
    //   name: "authelia",
    //   repository: "https://charts.authelia.com",
    //   chart: "authelia",
    // });

    new WebService(this, "httpd", {
      image: "nginx:latest",
      authenticated: false,
    });
  }
}

const app = new App();
new Homelab(app, "homelab");
app.synth();
