import { useEffect, useState } from 'react';
import { CardGroup, Button} from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import { useRouter } from 'next/navigation'

const CampaignIndex = (props) => {
    const router = useRouter()

    function renderCampaigns(){
        const items =props.campaigns.map(address => {
            return {
                header: address,
                description:<a href={'/campaigns/'+address}>View Campaign</a>,
                fluid:true
            }
        });

        return <CardGroup items={items}/>;
    }

    function renderAddCampaignBtn(){
        return  <Button floated='right' content='Create Campaign' icon='add circle' primary onClick={() => router.push('/campaigns/new')}/>;  
    }

    return (
        <Layout>
            <div>
                <h3>Open Campaigns!</h3>
                {renderAddCampaignBtn()}
                {renderCampaigns()}
                
            </div>
        </Layout>
    );
};

CampaignIndex.getInitialProps = async () => {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns };
};


export default CampaignIndex;