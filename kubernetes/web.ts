import { Construct } from "constructs";

import Deployment from "./resources/deployment";
import IngressRoute from "./resources/ingressRoute";
import { Namespace } from "@cdktf/provider-kubernetes/lib/namespace";

export default class WebService extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new Namespace(this, id, {
      metadata: {
        name: id,
      },
    });

    const deployment = new Deployment(this, id, [
      {
        name: id,
        image: "httpd:latest",
        port: [{ containerPort: 80 }],
      },
    ]);

    const service = deployment.createService(id);

    new IngressRoute(this, id, {
      service,
      middlewares: [],
      pattern: "PathPrefix(`/`)",
    });
  }
}
