import { useParams } from "react-router-dom"

export const InvestmentDetails: React.FC = () => {
    const { id } = useParams();
    alert(id);
    return (
        <>Investment Details</>
    )
}