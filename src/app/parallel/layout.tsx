
const Parallel = (props: {children: React.ReactNode, team: React.ReactNode, analytics: React.ReactNode}) => {
  return(
    <>
      {props.children}
      {props.team}
      {props.analytics}
    </>
  )
}

export default Parallel;