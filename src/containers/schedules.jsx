import React from 'react';
import BaseContainer from './basecontainer.jsx';
import ScheduleTable from '../components/scheduletable.jsx';
import Loadable from '../components/loadable.jsx';

export default class ScheduleContainer extends BaseContainer {
    constructor(props) {
        super(true, props);
        this.state = {
            isLoading: true,
            schedules: []
        };
    }

    async loadState() {
        this.setState({isLoading: true});
        let apiKey = await this.props.deps.spxClient.apiKey();
        if (apiKey.error) {
            this.setState({isLoading: false, schedules: []});
            alert('Error loading schedules');
            return;
        }

        let schedules = await this.props.deps.spieClient.get('Event/ScheduledEventsByApiKey/' + apiKey.val);
        if (schedules.error || schedules.val.Error.ErrorOcurred) {
            this.setState({isLoading: false, schedules: []});
            alert('Error loading schedules');
            return;
        }

        this.setState({isLoading: false, schedules: schedules.val.Value});
    }

    renderContainer() {
        return (
            <Loadable isLoading={this.state.isLoading}>
                <ScheduleTable schedules={this.state.schedules}/>
            </Loadable>
        );
    }
}
