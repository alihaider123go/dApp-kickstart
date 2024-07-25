import { useEffect, useState } from 'react';
import { Button,FormField,Form,Input,Message} from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { useRouter } from 'next/navigation'

const NewCampaign = (props) => {
    const [minContribution,setMinContribution] = useState('');
    const [errorMsg,setErrorMsg] = useState('');
    const [creating,setCreating] = useState(false);    
    const router = useRouter()

    const onSubmit=async(e)=>{
        e.preventDefault();
        setCreating(true);
        setErrorMsg('');

        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods.createCampaign(minContribution).send({'from':accounts[0]});
            setCreating(false);
            setMinContribution('');
            router.push('/');
        } catch (err) {
            setErrorMsg(err.message);
            setCreating(false);
        }

    }
    
    return (
        <Layout>
            <div>
                <h3>Create a Campaign!</h3>
                <Form error={!!errorMsg} onSubmit={onSubmit}>
                    <FormField>
                        <label>Minimum Contribution</label>
                            <Input label='wei' labelPosition='right' value={minContribution} onChange={(e)=>{setMinContribution(e.target.value)}}/>
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


export default NewCampaign;