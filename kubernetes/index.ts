import { Construct } from "constructs";
import { App, TerraformStack } from "cdktf";

import { KubernetesProvider } from "@cdktf/provider-kubernetes/lib/provider";
import { HelmProvider } from "@cdktf/provider-helm/lib/provider";
import { Release as HelmRelease } from "@cdktf/provider-helm/lib/release";

const kubernetesConfig = {
  configPath: "~/.kube/config",
};

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);
    new KubernetesProvider(this, "kubernetes", kubernetesConfig);

    new HelmProvider(this, "helm", {
      kubernetes: kubernetesConfig,
    });

    new HelmRelease(this, "nginx", {
      name: "nginx",
      repository: "https://charts.bitnami.com/bitnami",
      chart: "nginx",
    });
  }
}

const app = new App();
new MyStack(app, "homelab");
app.synth();
