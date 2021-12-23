import * as React from 'react';
import { Card, ICardTokens, ICardSectionStyles, ICardSectionTokens } from '@uifabric/react-cards';
import { FontWeights, Icon, IIconStyles, Image, Stack, IStackTokens, Text, ITextStyles } from 'office-ui-fabric-react';
import { initializeIcons } from '@uifabric/icons';


export interface IChecklistProps {
    name: string;
    completionscore: number,
    level1iscompleted: boolean,
    level2iscompleted: boolean,
    level3iscompleted: boolean,  
    level4iscompleted: boolean,
    level5iscompleted: boolean,
}
    
const sectionStackTokens: IStackTokens = { childrenGap: 20 };
const cardTokens: ICardTokens = { childrenMargin: 12 };
const footerCardSectionTokens: ICardSectionTokens = { padding: '0px 0px 0px 12px' };
const isCheckedIcon = () => <Icon iconName="CheckboxComposite" />;

export class Checklist extends React.Component<IChecklistProps> {
    constructor(props: IChecklistProps) {
        super(props)
    }


    public render(): JSX.Element {

        initializeIcons();

        return(
            <Stack tokens={sectionStackTokens}>
                <Card aria-label="Basic horizontal card" horizontal tokens={cardTokens}>
                    <Card.Item>
                        <Text>Check level adherence instructions</Text>
                    </Card.Item>
                </Card>

                <Card aria-label="Clickable horizontal card " horizontal tokens={cardTokens}>
                    <Card.Section>
                        <Text variant="small">Level 1</Text>
                        <Text>The workplace ALLOWS food and, or drinks to be in shop floor.</Text>
                    </Card.Section>
                    <Card.Section tokens={footerCardSectionTokens}>
                        <Icon iconName="CheckboxComposite" />
                        <Icon iconName="Checkbox" />
                        <Icon iconName="ReportWarning" />
                    </Card.Section>
                </Card>

                <Card aria-label="Clickable horizontal card " horizontal tokens={cardTokens}>
                    <Card.Section>
                        <Text variant="small">
                        Level 2
                        </Text>
                        <Text>Employees have a DEFINED PLACE to safely place personal items without impacting production.</Text>
                    </Card.Section>
                    <Card.Section tokens={footerCardSectionTokens}>
                        <Icon iconName="CheckboxComposite" />
                        <Icon iconName="Checkbox" />
                        <Icon iconName="Warning" />
                    </Card.Section>
                </Card>
            </Stack>

/*          Workplace is FREE from personal belongings
            Area is CONSISTENTLY FREE of personal belongings
            Area has been validated as BEST IN CLASS by external audit (e.g. Employee from other Locations)
 */

        )
    };
};