import React from 'react';
import { Clock } from 'lucide-react';
import Card from '../ui/Card';
import { format } from 'date-fns';

interface Payment {
  id: number;
  referanceNo: string;
  amount: number;
  createdAt: [number, number];
  legalOfficerId: number;
  usersId: number;
}

interface PaymentHistoryTabProps {
  payments: Payment[];
}

const PaymentHistoryTab: React.FC<PaymentHistoryTabProps> = ({ payments }) => {
  const formatDate = (timestamp: [number, number]) => {
    // Convert the timestamp array to milliseconds
    const date = new Date(timestamp[0] * 1000);
    return format(date, 'yyyy-MM-dd HH:mm');
  };

  return (
    <div className="space-y-8">
      <Card>
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          ගෙවීම් ඉතිහාසය
        </h3>

        {payments.length === 0 ? (
          <p className="text-gray-500">No payment history found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ගෙවීම් අංකය
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    මුදල
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    දිනය
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    යොමු අංකය
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {payments.map((payment) => (
                  <tr key={payment.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {payment.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      LKR {payment.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(payment.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payment.referanceNo}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default PaymentHistoryTab;