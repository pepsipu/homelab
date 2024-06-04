import { Deployment as KubernetesDeployment } from "@cdktf/provider-kubernetes/lib/deployment";
import { Construct } from "constructs";
import Service from "./service";

export default class Deployment extends KubernetesDeployment {
  constructor(scope: Construct, id: string, container: any) {
    const deploymentName = `${id}-deployment`;
    const appId = { app: id };
    super(scope, deploymentName, {
      metadata: {
        name: deploymentName,
        namespace: id,
      },
      spec: {
        selector: {
          matchLabels: appId,
        },
        template: {
          metadata: {
            labels: appId,
          },
          spec: {
            container,
          },
        },
      },
    });
  }

  createService(id: string): Service {
    return new Service(this, id, [
      {
        protocol: "TCP",
        port: 80,
        targetPort: "80",
      },
    ]);
  }
}
