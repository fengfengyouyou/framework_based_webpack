import React from 'react'

function withA(Component, newProps) {
    class MidComponent extends React.Component {
        componentDidMount() {
            // console.log(this.props, newProps)
            console.log(this.props.forwardedRef)
        }
        render() {
            const { forwardedRef, ...rest } = this.props;
            return (
                <div>
                    <h1>12113</h1>
                    <Component ref={forwardedRef} {...rest} />
                </div>
            )
        }
    }
    return React.forwardRef((props, ref) => {
        return <MidComponent {...props} forwardedRef={ref} />
    });
}
export default withA