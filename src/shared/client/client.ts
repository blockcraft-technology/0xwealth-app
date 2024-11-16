import axios from 'axios';
export class Client {
    private readonly _apiUrl = `http://localhost:3000`;
    async getBalance(address:string) {
        return [
            {
              "id": 1,
              "name": "Bitcoin",
              "symbol": "BTC",
              "amount": 0.00035914,
              "value": 33.04088,
              "change": -2,
              "assetPrice": 92000
            },
            {
              "id": 2,
              "name": "Dollar",
              "symbol": "USDC",
              "amount": 73.317645,
              "value": 73.317645,
              "change": 0,
              "assetPrice": 1
            }
          ];          
        const { data } = await axios.get(`${this._apiUrl}/balances/address/${address}`);
        return data;
    }
}