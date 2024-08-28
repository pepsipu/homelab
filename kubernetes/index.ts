import { Construct } from "constructs";
import { App, Chart, ChartProps, Helm } from "cdk8s";
import { Deployment, Service } from "cdk8s-plus-30";
import * as argo from "@opencdk8s/cdk8s-argocd-resources";

export class Homelab extends Chart {
  constructor(scope: Construct, id: string, props: ChartProps = {}) {
    super(scope, id, props);

    new argo.ArgoCdApplication(this, "HomelabApp", {
      metadata: {
        name: "homelab",
        namespace: "argocd",
      },
      spec: {
        project: "default",
        source: {
          repoURL: "https://github.com/pepsipu/homelab.git",
          path: "examplepath",
          targetRevision: "HEAD",
        },
        destination: {
          server: "https://kubernetes.default.svc",
        },
        syncPolicy: {
          syncOptions: ["ApplyOutOfSyncOnly=true"],
        },
      },
    });

    new argo.ArgoCdProject(this, "HomelabProject", {
      metadata: {
        name: "homelab",
        namespace: "argocd",
      },
      spec: {
        description: "my homelab!!",
        sourceRepos: ["*"],
        destination: [
          {
            namespace: "default",
            server: "https://kubernetes.default.svc",
          },
        ],
      },
    });

    // const openebs = new Helm(this, "openebs", {
    //   chart: "openebs/openebs",
    //   version: "2.5",
    // });

    const label = { app: "hello-k8s" };
  }
}

const app = new App();
new Homelab(app, "homelab");
app.synth();
