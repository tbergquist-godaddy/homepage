// @flow

declare module '@docusaurus/useBaseUrl' {
  declare export default any;
}

declare module '@docusaurus/useDocusaurusContext' {
  declare export default any;
}

declare module '@docusaurus/Link' {
  declare export default any;
}

declare module '@theme/Layout' {
  declare export default any;
}

declare module '@docusaurus/router' {
  declare export default any;
  declare export function Redirect(props: { +to: string }): React.Node;
}
