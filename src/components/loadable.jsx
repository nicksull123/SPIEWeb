import React from 'react';

class Loadable extends React.Component {
    render() {
        if (this.props.isLoading)
            return (
                <div className="loader">
                    loading...
                </div>
            );

        return (this.props.children);
    }
}

Loadable.propTypes = {
    isLoading: React.PropTypes.bool.isRequired
};

export default Loadable;
