import { useEffect, useState } from 'react';
import { Button,FormField,Form,Input,Message} from 'semantic-ui-react';
import Layout from '../../../../components/Layout';
import Campaign from '../../../../ethereum/campaign';
import web3 from '../../../../ethereum/web3';
import { useRouter } from 'next/navigation'

const NewRequest = (props) => {
    const [description,setDescription] = useState('');
    const [amount,setAmount] = useState('');
    const [recipientAddress,setRecipientAddress] = useState('');
    const [errorMsg,setErrorMsg] = useState('');
    const [creating,setCreating] = useState(false);    
    const router = useRouter()

    const onSubmit=async(e)=>{
        e.preventDefault();
        setCreating(true);
        setErrorMsg('');
        const campaign = Campaign(props.address);

        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.createRequest(description,web3.utils.toWei(amount,'ether'),recipientAddress).send({'from':accounts[0]});
            setCreating(false);
            setDescription('');
            setAmount('');
            setRecipientAddress('');
            // router.push('/');
        } catch (err) {
            setErrorMsg(err.message);
            setCreating(false);
        }

    }
    
    return (
        <Layout>
            <div>
                <h3>Create a Request!</h3>
                <Form error={!!errorMsg} onSubmit={onSubmit}>
                    <FormField>
                        <label>Description</label>
                        <Input value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
                    </FormField>
                    <FormField>
                        <label>Amount in Ether</label>
                        <Input label='ether' labelPosition='right' value={amount} onChange={(e)=>{setAmount(e.target.value)}}/>
                    </FormField>
                    <FormField>
                        <label>Recipient</label>
                        <Input value={recipientAddress} onChange={(e)=>{setRecipientAddress(e.target.value)}}/>
                    </FormField>
                    <Message
                        error
                        header='Oops!'
                        content={errorMsg}
                    />
                    <Button loading={creating} disabled={creating} primary>Create!</Button>
                </Form>
            </div>
        </Layout>
    );
};

NewRequest.getInitialProps = async (props) => {
    return { 
        address:props.query.address,
    };
};

export default NewRequest;