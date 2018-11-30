
# Azure Pipelines Kubernetes UI

## Overview

This repo contains the code for azure devops extension of kubernetes UI that is being built in repo [azpipelines-kubernetesUI](https://github.com/Microsoft/azpipelines-kubernetesUI).

The main constituent:
- `AzureDevOpsKubeService` - the ServiceEndpoint based implementation of `IKubeService` that is used in Azure Pipelines

## Build

    npm install
    npm run build

## Dependencies

This repository depends on the following packages:

- [azure-devops-extension-sdk](https://github.com/Microsoft/azure-devops-extension-sdk): Required module for Azure DevOps extensions which allows communication between the host page and the extension iframe.
- [azure-devops-extension-api](https://github.com/Microsoft/azure-devops-extension-api): Contains REST client libraries for the various Azure DevOps feature areas.
- [@kubernetes/client-node](https://github.com/kubernetes-client/javascript): The Javascript clients for Kubernetes implemented in typescript.

Some external dependencies:
- `React` - Is used to render the UI in the samples, and is a dependency of `azure-devops-ui`.
- `TypeScript` - Samples are written in TypeScript and complied to JavaScript
- `SASS` - Extension samples are styled using SASS (which is compiled to CSS and delivered in webpack js bundles).
- `webpack` - Is used to gather dependencies into a single javascript bundle for each sample.

## Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
