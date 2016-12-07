import prettyCron from 'prettycron';
import React from 'react';
import {Table, Container} from 'reactstrap';

class ScheduleTable extends React.Component {
    render() {
        return (
            <Container style={{
                padding: "20px"
            }}>
                <h3
                    style={{
                    textAlign: "center",
                    marginBottom: "30px"
                }}>Scheduled Jobs</h3>
                <Table striped bordered responsive>
                    <thead>
                        <tr>
                            <th>Schedule Id</th>
                            <th>Integration Name</th>
                            <th>Setting Name</th>
                            <th>Cron</th>
                            <th>Next Run</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.schedules.map(this.buildRow)}
                    </tbody>
                </Table>
            </Container>
        );
    }

    buildRow(schedule, idx) {
        return (
            <tr key={idx}>
                <td>{schedule.ScheduleId}</td>
                <td>{schedule.IntegrationName}</td>
                <td>{schedule.IntegrationSettingKey}</td>
                <td>{prettyCron.toString(schedule.CronExpression)}</td>
                <td>{prettyCron.getNext(schedule.CronExpression)}</td>
            </tr>
        );
    }
}

ScheduleTable.propTypes = {
    schedules: React.PropTypes.array.isRequired
};

export default ScheduleTable;
