// declaration.d.ts
declare module "*.css" {
  const content: Record<string, string>;
  export default content;
}

declare module "*.svg" {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}
