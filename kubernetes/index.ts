import * as k8s from "@pulumi/kubernetes";
import * as kx from "@pulumi/kubernetesx";

import { traefikServiceIp } from "./traefik";

const appName = "whoami";

const pb = new kx.PodBuilder({
  containers: [{ image: "traefik/whoami", ports: { web: 80 } }],
});

const deployment = new kx.Deployment(appName, {
  spec: pb.asDeploymentSpec(),
});
deployment.createService();

// const whoamiIngress = new k8s.networking.v1.Ingress("whoami-ingress", {
//   metadata: {
//     name: "whoami-ingress",
//   },
//   spec: {
//     rules: [
//       {
//         http: {
//           paths: [
//             {
//               path: "/",
//               pathType: "Prefix",
//               backend: {
//                 service: {
//                   name: appName,
//                   port: {
//                     name: "web",
//                   },
//                 },
//               },
//             },
//           ],
//         },
//       },
//     ],
//   },
// });
// export const name = deployment.metadata.name;

export const traefikService = traefikServiceIp;
