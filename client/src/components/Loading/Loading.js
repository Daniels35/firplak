import React from 'react';
import { Oval } from 'react-loader-spinner';

const Loading = ({ isLoading }) => {
  return (
    isLoading && (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', marginTop: '20px' }}>
        <Oval color="#0693e3" height={60} width={60} />
      </div>
    )
  );
};

export default Loading;
