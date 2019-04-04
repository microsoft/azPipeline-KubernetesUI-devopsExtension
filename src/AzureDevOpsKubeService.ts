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
    constructor(
        private _kubeSummaryData: IKubeSummaryData,
        private _fetchKubernetesObjects: (o: string, p?: { [key: string]: string }) => Promise<IKubeSummaryData>
    ) {
        super();

        const kubeObjectsToFetch: string[] = ["daemonSets", "statefulSets", "pods", "services"];
        const queryString: string = kubeObjectsToFetch.join(',');
        this._dataPromise = this._fetchKubernetesObjects(queryString);
    }

    fetch(resourceType: KubeResourceType, labelSelector?: string): Promise<any> {
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
                    let podList = safeParseJson(queryResult.pods);
                    // filter the pods to suit to given filter
                    if (labelSelector) {
                        // get all label filter and then check each pod to suit to that filter
                        let pods: any[] = [];
                        const originalPods = podList.items || [];
                        const labelDict = this._getLabelDict(labelSelector);
                        originalPods.forEach(pod => {
                            if (pod && pod.metadata && pod.metadata.labels) {
                                const matched = Object.keys(labelDict).every(key => {
                                    return pod.metadata.labels[key].toLowerCase() === labelDict[key].toLowerCase();
                                });

                                if (matched) {
                                    pods.push(pod);
                                }
                            }
                        });

                        podList.items = pods;
                    }

                    return podList;
                });
            case KubeResourceType.Services:
                return this._dataPromise.then((queryResult) => {
                    return safeParseJson(queryResult.services);
                });
        }

        return Promise.resolve({});
    }

    public getPodLog(podName: string): Promise<string> {
        let params: { [key: string]: string } = {};
        params["podname"] = podName;
        return this._fetchKubernetesObjects("podLog", params).then(output => (output as any).podLog);
    }

    private _getLabelDict(labelSelector: string): { [key: string]: string } {
        let labelDict: { [key: string]: string } = {};
        const labels: string[] = labelSelector.split(",");
        if (labels && labels.length > 0) {
            labels.forEach(label => {
                const keyValue: string[] = label.split("=");
                if (keyValue && keyValue.length === 2) {
                    labelDict[keyValue[0]] = keyValue[1];
                }
            });
        }

        return labelDict;
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
