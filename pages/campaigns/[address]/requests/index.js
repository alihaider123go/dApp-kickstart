import { Button, Label, Table } from 'semantic-ui-react';
import Layout from '../../../../components/Layout';
import Link from 'next/link';
import Campaign from '../../../../ethereum/campaign';
import RequestRow from '../../../../components/RequestRow';

const RequestIndex = (props) => {

function renderRequests(){
    const {Header,Row,HeaderCell,Body} = Table;
    return (
        <Table>
            <Header>
                <Row>
                    <HeaderCell>ID</HeaderCell>
                    <HeaderCell>Description</HeaderCell>
                    <HeaderCell>Amount</HeaderCell>
                    <HeaderCell>Recipient</HeaderCell>
                    <HeaderCell>Approval Count</HeaderCell>
                    <HeaderCell>Approve</HeaderCell>
                    <HeaderCell>Finalize</HeaderCell>
                </Row>
            </Header>
            <Body>
                {renderRequestsRow()}
            </Body>
        </Table>
    );
}

function renderRequestsRow(){
    return props.requests.map((request,index) => {
        return (
            <RequestRow request={request} key={index} address={props.address} id={index} approversCount={props.approversCount}/>
        )
    });
}

    return (
        <Layout>
            <Link href={`/campaigns/${props.address}/requests/new`}>
                <Button floated='right' primary>Add Request</Button>
            </Link>
            <h3>Requests!</h3>
            {renderRequests()}
            <Label>Found {props.requestsCount} requests</Label>
        </Layout>
    );
};

RequestIndex.getInitialProps = async (props) => {
    const address = props.query.address;
    const campaign = Campaign(address);
    const requestsCount = await campaign.methods.getRequestsCount().call();
    const approversCount = await campaign.methods.approversCount().call();
    const requests = await Promise.all(
        Array(parseInt(requestsCount)).fill().map((element,index)=>{
            return campaign.methods.requests(index).call();
        })
    );


        const formatedRequests =requests.map(request => {
            return {
                description: request.description,
                value: request.value.toString(),
                recipient: request.recipient,
                complete: request.complete,
                approvalCount: request.approvalCount.toString(),
            }
        });

    return { 
        address,
        requests:formatedRequests,
        requestsCount: requestsCount.toString(),
        approversCount:approversCount.toString(),
    };
};


export default RequestIndex;