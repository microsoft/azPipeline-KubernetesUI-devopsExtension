import { KubeServiceBase, KubeResourceType } from "@azurepipelines/azdevops-kube-summary/dist/Contracts/KubeServiceBase";

export interface IKubeSummaryData {
    pods?: string;
    deployments?: string;
    services?: string;
    replicaSets?: string;
    daemonSets?: string;
    statefulSets?: string;
}

export class AzureDevOpsKubeService extends KubeServiceBase {
    constructor(private _kubeSummaryData: IKubeSummaryData, private _fetchKubernetesObjects: (o: string) => Promise<IKubeSummaryData>) {
        super();

        const kubeObjectsToFetch: string[] = ["daemonSets", "statefulSets", "pods", "services"];
        const queryString: string = kubeObjectsToFetch.join(',');
        this._dataPromise = this._fetchKubernetesObjects(queryString);
    }

    fetch(resourceType: KubeResourceType): Promise<any> {
        switch (resourceType) {
            case KubeResourceType.Deployments:
                return Promise.resolve(safeParseJson(this._kubeSummaryData.deployments));
            case KubeResourceType.ReplicaSets:
                return Promise.resolve(safeParseJson(this._kubeSummaryData.replicaSets));
            case KubeResourceType.DaemonSets:
                return this._dataPromise.then((queryResult) => {
                    return safeParseJson(queryResult.daemonSets);
                });
            case KubeResourceType.StatefulSets:
                return this._dataPromise.then((queryResult) => {
                    return safeParseJson(queryResult.statefulSets);
                });
            case KubeResourceType.Pods:
                return this._dataPromise.then((queryResult) => {
                    return safeParseJson(queryResult.pods);
                });
            case KubeResourceType.Services:
                return this._dataPromise.then((queryResult) => {
                    return safeParseJson(queryResult.services);
                });
        }

        return Promise.resolve({});
    }

    private _dataPromise: Promise<IKubeSummaryData>;
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
