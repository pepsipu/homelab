import { Construct } from "constructs";

import Deployment from "./resources/deployment";
import IngressRoute from "./resources/ingressRoute";
import { Namespace } from "@cdktf/provider-kubernetes/lib/namespace";
import Service from "./resources/service";

export interface WebServiceConfig {
  image: string;
  authenticated: boolean;
}

export default class WebService extends Construct {
  constructor(scope: Construct, id: string, config: WebServiceConfig) {
    super(scope, id);

    new Namespace(this, id, {
      metadata: {
        name: id,
      },
    });

    const deployment = new Deployment(this, id, [
      {
        name: id,
        image: config.image,
        port: [{ containerPort: 80 }],
      },
    ]);

    const service = new Service(this, id, [
      {
        protocol: "TCP",
        port: 80,
        targetPort: "80",
      },
    ]);

    new IngressRoute(this, id, {
      service,
      middlewares: [],
      pattern: "PathPrefix(`/`)",
    });
  }
}
