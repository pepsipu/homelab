import { Deployment as KubernetesDeployment } from "@cdktf/provider-kubernetes/lib/deployment";
import { Construct } from "constructs";

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
}
