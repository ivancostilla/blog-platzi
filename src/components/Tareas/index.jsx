import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as tareasActions from '../../Redux/actions/tareasActions';

class Tareas extends Component {
    componentDidMount() {
        this.props.traerTodas()
    }
    
    render() {
        return (
            <div>
                Tareas
            </div>
        )
    }
}

const mapStateToProps = ({ tareasReducer }) => tareasReducer;

export default connect(mapStateToProps, tareasActions)(Tareas);