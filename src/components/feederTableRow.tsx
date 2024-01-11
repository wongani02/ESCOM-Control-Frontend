

import axios from "axios";
import { FunctionComponent } from "react";

interface FeederTableRowValueProps {
    id: number
}

const getFeederDetails = async (number: number) =>{
        try {
            const response = await axios.get(`https://escom-control-backend-production.up.railway.app/api/ses-control/feeder-single/${number}/`)
            // console.log(typeof(response.data))
            return  response.data
        } catch (e) {
            console.log(e)
        }
    }
 
const FeederTableRowValue: FunctionComponent<FeederTableRowValueProps> = async ({id}) => {

    const feeder:Feeder = await getFeederDetails(id)

    // const [feederDetails, setFeederDetails] = useState<Feeder>();

    // useEffect(()=>{
    //     const getFeederDetails = async (number: number) =>{
            
    //         const response = await axios.get(`https://escom-control-backend-production.up.railway.app/api/ses-control/feeder-single/${number}/`)
    //         // console.log(typeof(response.data))
    //         const data:Feeder = await response.data

    //         setFeederDetails(data)
            
    //     }

    //     getFeederDetails(id)

    // })

    

    return ( 
        <div>
            {feeder?.feeder}
        </div>
    );
}
 
export default FeederTableRowValue;