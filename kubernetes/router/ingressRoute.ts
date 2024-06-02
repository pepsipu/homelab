import * as k8s from "@pulumi/kubernetes";
import * as pulumi from "@pulumi/pulumi";

export interface TraefikIngressRouteArgs {
  namespace: pulumi.Input<string>;
  pattern: pulumi.Input<string>;
  services: {
    name: pulumi.Input<string>;
    port?: pulumi.Input<number>;
    kind?: pulumi.Input<string>;
  }[];
}

export default class TraefikIngressRoute extends pulumi.ComponentResource {
  constructor(
    name: string,
    args: TraefikIngressRouteArgs,
    opts?: pulumi.ResourceOptions
  ) {
    super("pkg:index:TraefikRoute", name, {}, opts);

    new k8s.apiextensions.CustomResource(`${name}-ingress-route`, {
      apiVersion: "traefik.io/v1alpha1",
      kind: "IngressRoute",
      metadata: { namespace: args.namespace },
      spec: {
        entryPoints: ["web"],
        routes: [
          {
            match: args.pattern,
            kind: "Rule",
            services: args.services,
          },
        ],
      },
    });
  }
}
