import * as React from "react";
import { IInputs, IOutputs } from "../generated/ManifestTypes";


export interface CurrentRecordInfo {
    EntityCollectionName: string;
    Level1IsCompleted: boolean;
    Level2IsCompleted: boolean;
    Level3IsCompleted: boolean;
    Level4IsCompleted: boolean;
    Level5IsCompleted: boolean;
    CompletionScore: number;
}

export interface RecordOverviewProps {
    id: string;
    context: ComponentFramework.Context<IInputs>;
}

export const CheckInstructionOverview: React.FC<RecordOverviewProps> = (overviewProps: RecordOverviewProps) => {

    const [currentRecords, setRelatedRecords] = React.useState(Array<CurrentRecordInfo>());

/*     React.useEffect(() => {
        const retrieveAndSetData = async () => {
            let relatedRecords = await retrieveData(overviewProps.context, overviewProps.id);
            setRelatedRecords(relatedRecords);
        }
        retrieveAndSetData();
    },[overviewProps.id]); */


    const retrieveData = async (context: ComponentFramework.Context<IInputs>, id: string) => {

        // Used for PCF Testing, check if local environment and retrun sample data set
        if(context.userSettings.userName==="")
        {

           return  [
               { EntityCollectionName: "ur_fiveschecklist", 
                    ur_name: "Checklist - 1 - Sort (Seiri)-A-Employee belongings",
                    ur_level1iscompleted: true,
                    ur_level2iscompleted: true,
                    ur_level3iscompleted: true,  
                    ur_level4iscompleted: false,
                    ur_level5iscompleted: false,
                    ur_completionscore: 0.20
                }
            ];
        }
        let relatedRecords = Array<CurrentRecordInfo>();
        return relatedRecords;
    }
    let relatedRecordsInfo: any = null;
    if (currentRecords && currentRecords.length > 0) {
        relatedRecordsInfo = (
            currentRecords.map((relatedRecord: CurrentRecordInfo) => (
            <div key={relatedRecord.EntityCollectionName} className={"overviewItem"}>
                <div className={"itemTitle"}>{relatedRecord.EntityCollectionName}</div>
                <div className={"itemSubTitle"}>{relatedRecord.CompletionScore}</div>
                {/* <div className={"itemSubTitle"}>{relatedRecord.Level1IsCompleted}</div>
                <div className={"itemSubTitle"}>{relatedRecord.Level2IsCompleted}</div>
                <div className={"itemSubTitle"}>{relatedRecord.Level3IsCompleted}</div>
                <div className={"itemSubTitle"}>{relatedRecord.Level4IsCompleted}</div>
                <div className={"itemSubTitle"}>{relatedRecord.Level5IsCompleted}</div> */}
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
