import { Construct } from "constructs";
import { Chart, Helm } from "cdk8s";

export class Router extends Chart {
  constructor(scope: Construct) {
    super(scope, "router", {});
    new Helm(this, "traefik", {
      chart: "traefik",
      repo: "https://traefik.github.io/charts",
      values: {
        ingressRoute: {
          dashboard: {
            enabled: true,
          },
        },
      },
    });
  }
}
