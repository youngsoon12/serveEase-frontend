import React from 'react';

const TableDetailPage = ({ params }: { params: { tableId: string } }) => {
  return <div>page {params.tableId} </div>;
};

export default TableDetailPage;
