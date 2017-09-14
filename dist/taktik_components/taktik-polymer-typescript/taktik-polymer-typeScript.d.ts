/**
 * A TypeScript class decorator that defines a custom element with name
 * `tagname` and the decorated class.
 */
import 'reflect-metadata';
export declare function customElement(tagname: string): (clazz: any) => void;
/**
 * A TypeScript class decorator that declare a global class
 * `tagname` and the decorated class.
 */
export declare function jsElement(): (clazz: any) => void;
export interface PropertyOptions {
    notify?: boolean;
}
/**
 * A TypeScript property decorator factory that defines this as a Polymer
 * property.
 *
 * This function must be invoked to return a decorator.
 */
export declare function property<T>(options?: PropertyOptions): (proto: any, propName: string) => any;
export declare function domElement<T>(): (proto: any, propName: string) => any;
/**
 * A TypeScript property decorator factory that causes the decorated method to
 * be called when a property changes. `targets` is either a single property
 * name, or a list of property names.
 *
 * This function must be invoked to return a decorator.
 */
export declare function observe(targets: string | string[]): (proto: any, propName: string) => any;
