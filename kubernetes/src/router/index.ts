import { Construct } from "constructs";
import { RouterRoles } from "./roles/index.ts";
import { Chart, Helm } from "cdk8s";

export class Router extends Chart {
  constructor(scope: Construct) {
    super(scope, "router", {});
    new RouterRoles(this);
    new Helm(this, "traefik", {
      chart: "traefik/traefik",
    });
  }
}
