// src/services/precedentService.ts
import axios from 'axios';

interface RequestPrecedent {
    caseId: string;
    year: string;
    headline: string;
    court: string;
    decision: string;
    summary: string;
    legalClauses: string[];
}

export const addPrecedent = async (precedent: RequestPrecedent) => {
    try {
        const response = await axios.post(
            'http://localhost:9080/legal_officer/precedents/add',
            precedent
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                switch (error.response.status) {
                    case 400:
                        throw new Error(
                            error.response.data?.errors?.join('\n') || 'Validation failed'
                        );
                    case 404:
                        throw new Error('Case ID not found');
                    case 500:
                        throw new Error('Server error occurred');
                    default:
                        throw new Error('Unknown error occurred');
                }
            }
        }
        throw new Error('Unknown error occurred');
    }
};

export const fetchPrecedents = async () => {
    try {
        const response = await axios.get('http://localhost:9080/legal_officer/precedents');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch precedents');
    }
};