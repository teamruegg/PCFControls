import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { FacepileBasicExample, IFacepileBasicExampleProps } from "./Facepile";

export class ReactStandardControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	// reference to the notifyOutputChanged method
	private notifyOutputChanged: () => void;
	// reference to the container div
	private theContainer: HTMLDivElement;
	// reference to the React props, prepopulated with a bound event handler
	private props: IFacepileBasicExampleProps = {
	  numberFacesChanged: this.numberFacesChanged.bind(this)
	};
	/**
	 * Empty constructor.
	 */
	constructor()
	{

	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{
		// Add control initialization code
		this.notifyOutputChanged = notifyOutputChanged;
    	this.props.numberOfFaces = context.parameters.numberOfFaces.raw || 3;
    	this.theContainer = container;
	}


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		// Add code to update control view
		if (context.updatedProperties.includes("numberOfFaces"))
      	this.props.numberOfFaces = context.parameters.numberOfFaces.raw || 3;

    	// Render the React component into the div container
    	ReactDOM.render(
			// Create the React component
			React.createElement(
				FacepileBasicExample, // the class type of the React component found in Facepile.tsx
				this.props
			),
      		this.theContainer
    	);
	}

	/**
	 * Called by the React component when it detects a change in the number of faces shown
	 * @param newValue The newly detected number of faces
	 */
	private numberFacesChanged(newValue: number) {
		// only update if the number of faces has truly changed
		if (this.props.numberOfFaces !== newValue) {
		this.props.numberOfFaces = newValue;
		this.notifyOutputChanged();
		}
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		numberOfFaces: this.props.numberOfFaces
		return {};
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		// Add code to cleanup control if necessary
		ReactDOM.unmountComponentAtNode(this.theContainer);
	}
}