import * as React from 'react';

class ReactVersion extends React.Component
{
    public render()
    {
        return(
            <div>
                <h3>React version in control: {React.version}</h3>
                <h3>React version in host window: {(window as any).React.version}</h3>
            </div>
        );
        
    }
}


export default ReactVersion;
