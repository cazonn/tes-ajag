// services/shipping.service.ts
import axios from 'axios';

const RAJAONGKIR_API_URL = 'https://api.rajaongkir.com/starter';
const API_KEY = process.env.RAJAONGKIR_API_KEY;

export const calculateShippingCost = async (origin: string, destination: string, weight: number, courier: string) => {
  try {
    const response = await axios.post(
      `${RAJAONGKIR_API_URL}/cost`,
      { origin, destination, weight, courier },
      { headers: { key: API_KEY } }
    );
    return response.data.rajaongkir.results[0].costs;
  } catch (error) {
    throw new Error('RajaOngkir Cost Calculation Failed');
  }
};