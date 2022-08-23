import React from 'react';
import { Panel } from '../../../components/Panel';
import { PriorityPanel } from './PriorityPanel';
import { ProjectPanel } from './ProjectPanel';
import { RecentTicketPanel } from './RecentTicketPanel';
import { StatusPanel } from './StatusPanel';

export const Dashboard = ({
    token
}) => {
    return (
        <div className="row">
            <div className="col-12 stats">
                <div className="row">
                    <div className="col-4 center">
                        <ProjectPanel token={token}/>
                    </div>
                    <div className="col-4 center">
                        <StatusPanel token={token}/>
                    </div>
                    <div className="col-4 center">
                        <PriorityPanel token={token}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-8 center">
                        <RecentTicketPanel token={token}/>
                    </div>
                    <div className="col-4 center">
                        <Panel
                            title="Active Tickets"
                        >
                            <p>okay</p>
                        </Panel>
                    </div>
                </div>
            </div>
        </div>
    );
};