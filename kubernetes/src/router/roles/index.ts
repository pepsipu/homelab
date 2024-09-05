import { Chart, Include } from "cdk8s";
import { Construct } from "constructs";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class RouterRoles extends Chart {
  constructor(scope: Construct) {
    super(scope, "router-roles", {});

    new Include(this, "router-account", {
      url: path.join(__dirname, "./00-account.yaml"),
    });

    new Include(this, "router-role", {
      url: path.join(__dirname, "./00-role.yaml"),
    });

    new Include(this, "router-role-binding", {
      url: path.join(__dirname, "./01-role-binding.yaml"),
    });
  }
}
