import { Service as KubernetesService } from "@cdktf/provider-kubernetes/lib/service";
import { Construct } from "constructs";

export default class Service extends KubernetesService {
  constructor(scope: Construct, id: string, port: any) {
    const serviceName = `${id}-service`;
    const appId = { app: id };
    super(scope, serviceName, {
      metadata: {
        name: serviceName,
        namespace: id,
      },
      spec: {
        selector: appId,
        type: "ClusterIP",
        port,
      },
    });
  }
}
