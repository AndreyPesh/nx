const DynamicRoutePage = ({ params }: { params: { dynamic: string } }) => {
  return(
    <>
      <h2>params {params.dynamic}</h2>
      <h2>Dynamic page</h2>
    </>
  )
};

export default DynamicRoutePage;