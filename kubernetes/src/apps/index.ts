import fg from "fast-glob";
import path from "path";

export const x = 2;

export async function getApplicationConfigurations(dir: string) {
  const files = await fg.glob(path.join(dir, "**/app.config.mts"));
  const modules = await Promise.all(
    files.map(async (name) => await import(path.join(process.cwd(), name)))
  );
  return modules;
}
