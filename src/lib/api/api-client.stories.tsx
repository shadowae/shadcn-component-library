import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { useApi, apiRequest } from './api-client';
import { Button } from '../component-library/button/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../component-library/card/card';

// Component to demonstrate useApi hook
const ApiDemo = () => {
  const [endpoint, setEndpoint] = useState('https://jsonplaceholder.typicode.com/posts/1');
  const { data, loading, error, success, refetch } = useApi({
    endpoint,
    method: 'GET',
  });

  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>API Client Demo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Endpoint URL:</label>
          <input
            type="text"
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Status:</span>
            {loading && <span className="text-blue-500">Loading...</span>}
            {error && <span className="text-red-500">Error</span>}
            {success && <span className="text-green-500">Success</span>}
          </div>
          
          <div className="bg-gray-100 p-3 rounded max-h-[200px] overflow-auto">
            <pre className="text-xs">
              {error 
                ? JSON.stringify(error, null, 2) 
                : JSON.stringify(data, null, 2)}
            </pre>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={() => refetch()} disabled={loading}>
          {loading ? 'Loading...' : 'Fetch Data'}
        </Button>
      </CardFooter>
    </Card>
  );
};

const meta = {
  title: 'API/ApiClient',
  component: ApiDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ApiDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ManualApiRequest: Story = {
  render: () => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    
    const handleFetch = async () => {
      setLoading(true);
      setError(null);
      
      const result = await apiRequest({
        endpoint: 'https://jsonplaceholder.typicode.com/posts/1',
        method: 'GET',
      });
      
      setLoading(false);
      
      if (result.error) {
        setError(result.error);
      } else {
        setData(result.data);
      }
    };
    
    return (
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>Manual API Request Demo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Status:</span>
              {loading && <span className="text-blue-500">Loading...</span>}
              {error && <span className="text-red-500">Error</span>}
              {data && <span className="text-green-500">Success</span>}
            </div>
            
            <div className="bg-gray-100 p-3 rounded max-h-[200px] overflow-auto">
              <pre className="text-xs">
                {error 
                  ? JSON.stringify(error, null, 2) 
                  : JSON.stringify(data, null, 2)}
              </pre>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleFetch} disabled={loading}>
            {loading ? 'Loading...' : 'Make API Request'}
          </Button>
        </CardFooter>
      </Card>
    );
  },
};