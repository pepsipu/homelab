import * as k8s from "@pulumi/kubernetes";

const autheliaChart = new k8s.helm.v3.Chart("authelia", {
  chart: "authelia",
  version: "0.8.58",
  fetchOpts: {
    repo: "https://charts.authelia.com",
  },
});
