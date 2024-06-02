import * as k8s from "@pulumi/kubernetes";
import * as kx from "@pulumi/kubernetesx";

import TraefikRoute from "./traefikRoute";

const appName = "whoami";

const pb = new kx.PodBuilder({
  containers: [{ image: "traefik/whoami", ports: { web: 80 } }],
});

const deployment = new kx.Deployment(appName, {
  spec: pb.asDeploymentSpec(),
});
const service = deployment.createService();

new TraefikRoute(appName, {
  namespace: traefikNamespace.metadata.name,
  prefix: "/",
  service: service,
});
