import { getSession } from "../autorest-session";
import { CadlProgram } from "../interfaces";
import { formatFile } from "../utils/format";

export async function emitPackage(filePath: string, program: CadlProgram): Promise<void> {
  const name = program.serviceInformation.name.toLowerCase().replace(/ /g, "-");
  const description = program.serviceInformation.doc;
  const content = JSON.stringify(getPackage(name, description as string));
  const session = getSession();
  session.writeFile({ filename: filePath, content: formatFile(content, filePath) });
}

const getPackage = (name: string, description: string) => ({
  name: `@typespec-api-spec/${name}`,
  author: "Microsoft Corporation",
  description,
  license: "MIT",
  dependencies: {
    "@typespec/compiler": "^0.41.0",
    "@typespec/rest": "^0.41.0",
    "@typespec/http": "^0.41.0",
    "@typespec/versioning": "^0.41.0",
    "@typespec/prettier-plugin-typespec": "^0.41.0",
    "@azure-tools/typespec-azure-core": "^0.27.0",
    "@azure-tools/typespec-autorest": "^0.27.0",
    prettier: "^2.7.1",
  },
  private: true,
});
