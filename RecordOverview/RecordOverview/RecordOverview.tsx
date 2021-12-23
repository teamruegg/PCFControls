import * as React from "react";
import { IInputs, IOutputs } from "./generated/ManifestTypes";


export interface RelatedRecordInfo {
    EntityCollectionName: string;
    TotalCount: number;
}

export interface RecordOverviewProps {
    id: string;
    context: ComponentFramework.Context<IInputs>;
}


export const RecordOverview: React.FC<RecordOverviewProps> = (overviewProps: RecordOverviewProps) => {

    const [relatedRecords, setRelatedRecords] = React.useState(Array<RelatedRecordInfo>());

    React.useEffect(() => {
        const retrieveAndSetData = async () => {
            let relatedRecords = await retrieveData(overviewProps.context, overviewProps.id);
            setRelatedRecords(relatedRecords);
        }
        retrieveAndSetData();
    },[overviewProps.id]);


    const retrieveData = async (context: ComponentFramework.Context<IInputs>, id: string) => {


        if(context.userSettings.userName==="")//local environment
        {

           return  [{ EntityCollectionName: "Activities", TotalCount: 36 }, 
                    { EntityCollectionName: "Cases", TotalCount: 9},
                    { EntityCollectionName: "Opportunities", TotalCount: 12 }];
        }


        let activityFilter = `?$filter=_regardingobjectid_value eq ${id}&$apply=aggregate($count as ActivityCount)`;
        let activityResponse = await context.webAPI.retrieveMultipleRecords("activitypointer", activityFilter);

        let relatedRecords = Array<RelatedRecordInfo>();
        if (activityResponse && activityResponse.entities && activityResponse.entities.length === 1) {
            let entity = activityResponse.entities[0];
            let activityCount = entity["ActivityCount"] as number;
            relatedRecords.push({ EntityCollectionName: "Activities", TotalCount: activityCount });
        }

        let caseFilter = `?$filter=_customerid_value eq ${id}&$apply=aggregate($count as CaseCount)`;
        let caseResponse = await context.webAPI.retrieveMultipleRecords("incident", caseFilter);
        if (caseResponse && caseResponse.entities && caseResponse.entities.length === 1) {
            let entity = caseResponse.entities[0];
            let caseCount = entity["CaseCount"] as number;
            relatedRecords.push({ EntityCollectionName: "Cases", TotalCount: caseCount });
        }


        let opportunityFilter = `?$filter=_customerid_value eq ${id}&$apply=aggregate($count as OpportunityCount)`;
        let opportunityResponse = await context.webAPI.retrieveMultipleRecords("opportunity", opportunityFilter);
        if (opportunityResponse && opportunityResponse.entities && opportunityResponse.entities.length === 1) {
            let entity = opportunityResponse.entities[0];
            let opportunityCount = entity["OpportunityCount"] as number;
            relatedRecords.push({ EntityCollectionName: "Opportunities", TotalCount: opportunityCount });
        }

        return relatedRecords;


    }

    let relatedRecordsInfo: any = null;
    if (relatedRecords && relatedRecords.length > 0) {
        relatedRecordsInfo = (
            relatedRecords.map((relatedRecord: RelatedRecordInfo) => (
            <div key={relatedRecord.EntityCollectionName} className={"overviewItem"}>
                <div className={"itemTitle"}>{relatedRecord.TotalCount}</div>
                <div className={"itemSubTitle"}>{relatedRecord.EntityCollectionName}</div>
            </div>
            ))
            );
        }

return (
    <div className= {"overviewCont"}>
    {relatedRecordsInfo}
    </div>
    ); 
}