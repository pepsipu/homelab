import * as k8s from "@pulumi/kubernetes";
import * as kx from "@pulumi/kubernetesx";

const namespace = new k8s.core.v1.Namespace("traefik", {
  metadata: {
    name: "traefik",
  },
});

const serviceAccount = new k8s.core.v1.ServiceAccount(
  "traefik-service-account",
  {
    metadata: {
      name: "traefik-ingress-controller",
      namespace: namespace.metadata.name,
    },
  }
);

const clusterRole = new k8s.rbac.v1.ClusterRole("traefik-cluster-role", {
  rules: [
    {
      apiGroups: [""],
      resources: ["services", "endpoints", "secrets"],
      verbs: ["get", "list", "watch"],
    },
    {
      apiGroups: ["extensions", "networking.k8s.io"],
      resources: ["ingresses"],
      verbs: ["get", "list", "watch"],
    },
    {
      apiGroups: ["extensions", "networking.k8s.io"],
      resources: ["ingresses/status"],
      verbs: ["update"],
    },
  ],
});

new k8s.rbac.v1.ClusterRoleBinding("traefik-cluster-role-binding", {
  subjects: [
    {
      kind: "ServiceAccount",
      name: serviceAccount.metadata.name,
      namespace: namespace.metadata.name,
    },
  ],
  roleRef: {
    kind: "ClusterRole",
    name: clusterRole.metadata.name,
    apiGroup: "rbac.authorization.k8s.io",
  },
});

const pb = new kx.PodBuilder({
  serviceAccountName: serviceAccount.metadata.name,
  containers: [
    {
      name: "traefik",
      image: "traefik:v3.0",
      args: [
        "--api.insecure=true",
        "--accesslog",
        "--entrypoints.web.Address=:80",
        "--entrypoints.websecure.Address=:443",
        "--providers.kubernetescrd",
      ],
      ports: [
        { name: "web", containerPort: 80 },
        { name: "websecure", containerPort: 443 },
        { name: "admin", containerPort: 8080 },
      ],
    },
  ],
});

const deployment = new kx.Deployment("traefik-deployment", {
  metadata: {
    namespace: namespace.metadata.name,
  },
  spec: pb.asDeploymentSpec(),
});

const service = deployment.createService({
  type: "LoadBalancer",
  ports: [
    { name: "web", port: 80 },
    { name: "admin", port: 8080 },
  ],
});

export const traefikServiceIp = service.status.loadBalancer.ingress[0].ip;
