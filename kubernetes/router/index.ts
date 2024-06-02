import * as k8s from "@pulumi/kubernetes";
import TraefikIngressRoute from "./ingressRoute";

export const traefikNamespace = new k8s.core.v1.Namespace("traefik", {
  metadata: {
    name: "traefik",
  },
});

const traefik = new k8s.helm.v3.Chart(
  "traefik",
  {
    namespace: traefikNamespace.metadata.name,
    chart: "traefik",
    version: "28.2.0",
    fetchOpts: {
      repo: "https://helm.traefik.io/traefik",
    },
  },
  { dependsOn: [traefikNamespace] }
);

const dashboard = new TraefikIngressRoute("dashboard", {
  namespace: traefikNamespace.metadata.name,
  pattern: "PathPrefix(`/`)",
  services: [
    {
      name: "api@internal",
      kind: "TraefikService",
    },
  ],
});
