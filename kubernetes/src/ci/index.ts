import { Chart, ChartProps, Include } from "cdk8s";
import { Construct } from "constructs";
import { OCIRepository } from "./oci.ts";

// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

interface FluxInstallationProps extends ChartProps {
  name: string;
  url: string;
}

export class FluxInstallation extends Chart {
  constructor(scope: Construct, id: string, props: FluxInstallationProps) {
    super(scope, id, props);

    new Include(this, "flux-controllers", {
      url: "https://github.com/fluxcd/flux2/releases/latest/download/install.yaml",
    });

    new OCIRepository(this, "oci-repo", {
      name: props.name,
      url: props.url,
      interval: "0m30s",
    });
  }
}
