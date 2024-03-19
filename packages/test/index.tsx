import React from 'react';
import ReactDom from 'react-dom/client';
import { VAR1, Com1 } from './home';

const root = document.querySelector('#root')!;
export const Test = () => (
  <div>
    헬로 {VAR1}
    <Com1 />
  </div>
);
export const ROOT = ReactDom.createRoot(root);
export type Test = { hoho: HO };
type HO = string;
