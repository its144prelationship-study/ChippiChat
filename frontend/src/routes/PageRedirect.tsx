type PageRedirectProps = {
  to: string;
};

const PageRedirect: React.ComponentType<PageRedirectProps> = ({ to }) => {
  window.location.href = `${to}`
  return null
}

export default PageRedirect