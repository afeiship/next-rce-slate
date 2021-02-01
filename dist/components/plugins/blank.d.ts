/// <reference types="react" />
declare const _default: {
    name: string;
    importer: (el: any, children: any) => import("slate").Text | undefined;
    exporter: (node: any, children: any) => string | undefined;
    hooks: {
        leaf: (_: any, { attributes, children, leaf }: {
            attributes: any;
            children: any;
            leaf: any;
        }) => JSX.Element | undefined;
    };
};
export default _default;
