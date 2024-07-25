import { useEffect, useState } from 'react';
import { Button,FormField,Form,Input,Message} from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';
import { useRouter } from 'next/navigation'

const ContributeForm = (props) => {
    const [amount,setAmount] = useState('');
    const [errorMsg,setErrorMsg] = useState('');
    const [contributing,setContributing] = useState(false);    
    const router = useRouter()

    const onSubmit=async(e)=>{
        e.preventDefault();
        setContributing(true);
        setErrorMsg('');

        try {
            const accounts = await web3.eth.getAccounts();
            const campaign = Campaign(props.address);

            await campaign.methods.contribute().send({from:accounts[0],value:web3.utils.toWei(amount,'ether')});
            setContributing(false);
            setAmount('');
            router.refresh();
        } catch (err) {
            setErrorMsg(err.message);
            setContributing(false);
        }

    }
    
    return (
            <div>
                <h3>Contribute to this Campaign!</h3>
                <Form error={!!errorMsg} onSubmit={onSubmit}>
                    <FormField>
                        <label>Amount to Contribution</label>
                        <Input label='ether' labelPosition='right' value={amount} onChange={(e)=>{setAmount(e.target.value)}}/>
                    </FormField>
                    <Message
                        error
                        header='Oops!'
                        content={errorMsg}
                    />
                    <Button loading={contributing} disabled={contributing} primary>Contribute!</Button>
                </Form>
            </div>
    );
};


export default ContributeForm;