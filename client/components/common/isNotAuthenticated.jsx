import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


/**
 *
 * @param ComposedComponent
 * @returns {Object}
 */
export default (ComposedComponent) => {
  
  /**
   *
   */
  class isAuthenticated extends React.Component {
  
    /**
     *
     */
    componentWillMount() {
      if (this.props.isAuthenticated) {
        this.context.router.push('/documents');
      }
    }
  
    /**
     *
     * @param nextProps - next props after component update
     */
    componentWillUpdate(nextProps) {
      if (nextProps.isAuthenticated) {
        this.context.router.push('/documents');
      }
    }
  
    /**
     *
     * @returns {XML}
     */
    render() {
      return (
        <ComposedComponent />
      );
    }
  }

  isAuthenticated.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
  };

  isAuthenticated.defaultProps = {
    isAuthenticated: false,
  };

  isAuthenticated.contextTypes = {
    router: PropTypes.object
  };

  const mapStateToProps = state => {
    return {
      isAuthenticated: state.auth.isAuthenticated,
    }
  };

  return connect(mapStateToProps)(isAuthenticated);
};