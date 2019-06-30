import React from 'react'
import { FormControl } from 'react-bootstrap'

export class CustomToggle extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();

        this.props.onClick(e);
    }

    render() {
        return (
            <a href="" onClick={this.handleClick}>
                {this.props.children}
            </a>
        );
    }
}

export class CustomMenu extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleChange = this.handleChange.bind(this);

        this.state = { value: '' };
    }

    handleChange(e) {
        const eValue = e.target.value.toLowerCase()
        this.setState({ value: eValue });
        this.props.handleSearchAddressChange(eValue)
    }

    render() {
        const {
            children,
            style,
            className,
            'aria-labelledby': labeledBy,
        } = this.props;

        const { value } = this.state;

        return (
            <div style={style} className={className} aria-labelledby={labeledBy}>
                <FormControl
                    autoFocus
                    className="mb-1"
                    placeholder="Введите адрес для поиска..."
                    onChange={this.handleChange}                    
                    value={value}
                    onSelect={this.props.onSelected}
                />
                <ul className="list-unstyled block-holder bg-white">
                    {React.Children.toArray(children)}
                </ul>
            </div>
        );
    }
}

