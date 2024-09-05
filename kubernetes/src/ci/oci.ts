import { ApiObject } from "cdk8s";
import { Construct } from "constructs";

interface OCIRepositoryProps {
  name: string;
  timeout: string;
  url: string;
}

export class OCIRepository extends ApiObject {
  constructor(scope: Construct, id: string, props: OCIRepositoryProps) {
    super(scope, id, {
      apiVersion: "source.toolkit.fluxcd.io/v1beta2",
      kind: "OCIRepository",
      metadata: {
        name: props.name,
        namespace: "flux-system",
      },
      spec: {
        interval: props.timeout,
        url: props.url,
        ref: {
          tag: "latest",
        },
      },
    });
  }
}
