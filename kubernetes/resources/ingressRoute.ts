import { Manifest } from "@cdktf/provider-kubernetes/lib/manifest";
import { Construct } from "constructs";
import Service from "./service";

export interface IngressRouteConfig {
  service: Service;
  pattern: string;
  middlewares: any[];
}

// FIXME: currently, cdktf doesn't allow manifest crd bootstrapping.
// the current workaround is to comment out ingress route and then uncomment after traefik is installed :3

export default class IngressRoute extends Manifest {
  constructor(
    scope: Construct,
    id: string,
    { service, pattern, middlewares }: IngressRouteConfig
  ) {
    const ingressRouteName = `${id}-ingress-route`;
    super(scope, ingressRouteName, {
      manifest: {
        apiVersion: "traefik.io/v1alpha1",
        kind: "IngressRoute",
        metadata: {
          name: ingressRouteName,
          namespace: id,
        },
        spec: {
          entryPoints: ["web", "websecure"],
          routes: [
            {
              kind: "Rule",
              match: pattern,
              middlewares,
              services: [
                {
                  kind: "Service",
                  name: service.id,
                  port: 80,
                  scheme: "http",
                },
              ],
            },
          ],
        },
      },
    });
  }
}
