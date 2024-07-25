import Layout from '../../../components/Layout';
import Campaign from '../../../ethereum/campaign';
import { CardGroup,  GridRow, GridColumn, Grid, Button} from 'semantic-ui-react';
import web3 from '../../../ethereum/web3';
import ContributeForm from '../../../components/ContributeForm';
import Link from 'next/link'

const CampaignShow = (props) => {
    
    function renderCards(){
        
        const {
            minContribution,
            balance,
            requestsCount,
            approversCount,
            manager
        } = props;
        
        const items = [
            {
                header: manager,
                meta: 'Address of Manager',
                description:'The manager created this campaign and can create requests to withdraw money',
                style:{
                    overflowWrap:'break-word'
                }
            },
            {
                header: minContribution,
                meta: 'Minimum Contribution (wei)',
                description: 'You must contribute at least this much wei to become an approver',
            },
            {
                header: requestsCount,
                meta: 'Number of Requests',
                description: 'A request tries to withdraw money from the contract. Requests must be approved by approvers',
            },
            {
                header: approversCount,
                meta: 'Number of Approvers',
                description: 'Number of people who have already donated to this campaign',
            },
            {
                header: web3.utils.fromWei(balance,'ether'),
                meta: 'Campaign Balance (ether)',
                description: 'The balance is how much money this campaign has left to spend.',
            }
        ];
        
        return <CardGroup items={items}/>;
    }

    return (
        <Layout>
            <h3>Campaign Details!</h3>
            <Grid>
                <GridRow>
                    <GridColumn width={10}>
                        {renderCards()}
                    </GridColumn>
                    <GridColumn width={6}>
                        <ContributeForm address={props.address}/>
                    </GridColumn>
                </GridRow>
                <GridRow>
                    <GridColumn width={10}>
                        <Link href={`/campaigns/${props.address}/requests`}>
                            <Button primary>View Requests</Button>
                        </Link>
                    </GridColumn>
                </GridRow>
            </Grid>
        </Layout>
    );
};

CampaignShow.getInitialProps = async (props) => {
    const campaign = Campaign(props.query.address);
    const summary = await campaign.methods.getSummary().call();
    return { 
        address:props.query.address,
        minContribution: summary[0].toString(),
        balance: summary[1].toString(),
        requestsCount: summary[2].toString(),
        approversCount: summary[3].toString(),
        manager: summary[4],
    };
};

export default CampaignShow;