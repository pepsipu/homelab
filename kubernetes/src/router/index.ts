import { Construct } from "constructs";
import { Chart, ChartProps, Helm } from "cdk8s";

export class TraefikRouter extends Chart {
  constructor(scope: Construct, id: string, props: ChartProps = {}) {
    super(scope, id, props);
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
