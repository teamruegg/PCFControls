import * as React from "react";
import * as ApexCharts from 'apexcharts'
import ReactVersion from './ReactVersion';


export interface IRadarChartProps {
	numberOfFaces?: number;
	numberFacesChanged?: (newValue: number) => void;
}


export class RadarChart extends React.Component<IRadarChartProps> {
	constructor(props: IRadarChartProps) {
		super(props);

		this.state = {
			numberOfFaces: props.numberOfFaces || 3,
			imagesFadeIn: true,
		};
	}

	public componentWillReceiveProps(newProps: IRadarChartProps): void {
		this.setState(newProps);
	}

	public render(): JSX.Element {

		return (
			<div className={"msFacepileExample"}>
				<ReactVersion/>
				
			</div>
		);
	}
}