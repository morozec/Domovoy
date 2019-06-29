import React from 'react'

export class HouseComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }


    render() {
        return (
            <div id='component-root'>
                <div className="row">
                    <div className="col-lg-4">123</div>
                    <div className="col-lg-8">456</div>
                </div>
            </div>
        )
    }
}