import { KubeServiceBase, KubeResourceType } from "@azurepipelines/azdevops-kube-summary/dist/Contracts/KubeServiceBase";

export interface IKubeSummaryData {
    pods: string;
    deployments: string;
    services: string;
    replicaSets: string;
    daemonSets: string;
    statefulSets: string;
}

export class AzureDevOpsKubeService extends KubeServiceBase {
    constructor(private _kubeSummaryData: IKubeSummaryData) {
        super();
    }

    fetch(resourceType: KubeResourceType): Promise<any> {
        switch (resourceType) {
            case KubeResourceType.Pods:
                return Promise.resolve(safeParseJson(this._kubeSummaryData.pods));
            case KubeResourceType.Deployments:
                return Promise.resolve(safeParseJson(this._kubeSummaryData.deployments));
            case KubeResourceType.Services:
                return Promise.resolve(safeParseJson(this._kubeSummaryData.services));
            case KubeResourceType.ReplicaSets:
                return Promise.resolve(safeParseJson(this._kubeSummaryData.replicaSets));
            case KubeResourceType.DaemonSets:
                return Promise.resolve(safeParseJson(this._kubeSummaryData.daemonSets));
            case KubeResourceType.StatefulSets:
                return Promise.resolve(safeParseJson(this._kubeSummaryData.statefulSets));
        }

        return Promise.resolve({});
    }
}

function safeParseJson(input?: string): any {
    let output = {};
    if (input) {
        try {
            output = JSON.parse(input) || {};
        }
        catch (e) { }
    }

    return output;
}
