import axios from 'axios';
export class Client {
    private readonly _apiUrl = `http://localhost:3000`;
    async getBalance(address:string) {
        // return [
        //     {
        //       "id": 1,
        //       "name": "Bitcoin",
        //       "symbol": "BTC",
        //       "amount": 0.0002815,
        //       "value": 25.898,
        //       "change": -2,
        //       "assetPrice": 92000
        //     },
        //     {
        //       "id": 2,
        //       "name": "Dollar",
        //       "symbol": "USDC",
        //       "amount": 63.317655,
        //       "value": 63.317655,
        //       "change": 0,
        //       "assetPrice": 1
        //     }
        //   ]
          
        const { data } = await axios.get(`${this._apiUrl}/balances/address/${address}`);
        return data;
    }

    async reportLendingPayload(payload: any) {
        const { data } = await axios.post(`${this._apiUrl}/ops/reportLending`, payload);
        return { data };
    }

    async requestLoanAddress(userWallet: string) {
        const { data } = await axios.post(`${this._apiUrl}/ops/requestLoanWallet`, {
            userWallet,
        });
        return { data };
    }
}