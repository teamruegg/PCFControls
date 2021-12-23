import * as React from 'react';
import { Checklist, IChecklistProps } from "./Checklist";
import { Depths } from '@fluentui/theme';

export interface IOverviewProps {
    name: string;
}

export class Overview extends React.Component<IOverviewProps> {
    constructor(props: IOverviewProps) {
        super(props)
    }

    public render(): JSX.Element {

        const checklistProps: IChecklistProps = {
            name:"Checklist - 1 - Sort (Seiri)-A-Employee belongings",
            completionscore: 0.4,
            level1iscompleted: true,
            level2iscompleted: true,
            level3iscompleted: false,  
            level4iscompleted: false,
            level5iscompleted: false,
        };
        return(
            <div className= {"overviewPane"} style={{ boxShadow: Depths.depth8 }}>
                <div className={"overviewHeader"}>Check assessment adherence</div>
                <div className={"overviewCategory"}>Category: Employee belongings</div>
                <div className={"overviewPrincipal"}>Principal: Sort (Seiri)</div>
                <Checklist{...checklistProps}/>
            </div>

            
        )
    };
};


