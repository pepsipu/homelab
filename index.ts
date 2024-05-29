import * as kx from "@pulumi/kubernetesx";

const appName = "nginx";

const pb = new kx.PodBuilder({
  containers: [{ image: "nginx", ports: { http: 80 } }],
});

const deployment = new kx.Deployment(appName, {
  spec: pb.asDeploymentSpec(),
});
deployment.createService();

export const name = deployment.metadata.name;
