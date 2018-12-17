/*
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the MIT license.
*/

import * as React from "react";
import { showRootComponent } from "../Common";
import { IKubeService } from "@azurepipelines/azdevops-kube-summary/dist/Contracts/Contracts";
import { AzureDevOpsKubeService } from "../AzureDevOpsService/AzureDevOpsService";
import { IKubeSummaryProps, KubeSummary } from "@azurepipelines/azdevops-kube-summary/dist/WebUI/Components/KubeSummary";

const service: IKubeService = new AzureDevOpsKubeService("82e34269-de6c-4dfb-aac8-e8d459896a5e", "default");
const props: IKubeSummaryProps = {
  kubeService: service,
  title: "Azure Voting App on Kubernetes"
};

showRootComponent(React.createElement(KubeSummary, props));