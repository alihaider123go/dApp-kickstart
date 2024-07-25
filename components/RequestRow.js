import React from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';

const RequestRow = (props) => {



    const onApprove=async(e)=>{
        const campaign = Campaign(props.address);
        const accounts = await web3.eth.getAccounts();
        await campaign.methods.approveRequest(props.id).send({from:accounts[0]});
    }

    const onFinalize=async(e)=>{
        const campaign = Campaign(props.address);
        const accounts = await web3.eth.getAccounts();
        await campaign.methods.finalizeRequest(props.id).send({from:accounts[0]});
    }


    const {Row,Cell} = Table;

    const readyToFinalize = props.request.approvalCount > props.approvalCount/2;

    return (
        <Row disabled={props.request.complete} positive={readyToFinalize && !props.request.complete}>
            <Cell>{props.id}</Cell>
            <Cell>{props.request.description}</Cell>
            <Cell>{web3.utils.fromWei(props.request.value,'ether')}</Cell>
            <Cell>{props.request.recipient}</Cell>
            <Cell>{props.request.approvalCount}/{props.approversCount}</Cell>
            <Cell>
                {
                    props.request.complete ? null : (<Button onClick={onApprove} color='green' size='mini' basic>Approve</Button>)
                }
            </Cell>
            <Cell>
                {
                    props.request.complete ? null : (<Button onClick={onFinalize} color='orange' size='mini' basic>Finalize</Button>)
                }
            </Cell>
        </Row>
    );
};
export default RequestRow;